import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma.service';
import { EmailService } from '../../../common/email.service';
import { AppointmentStatus, AppointmentType } from '@dr-ahmed/shared';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService
  ) {}

  async create(data: {
    patientId?: string;
    guestName?: string;
    guestPhone?: string;
    guestEmail?: string;
    type: AppointmentType;
    date: string;
    timeSlot: string;
    notes?: string;
  }) {
    const appointmentDate = new Date(data.date);

    const existing = await this.prisma.appointment.findFirst({
      where: {
        date: appointmentDate,
        timeSlot: data.timeSlot,
        status: { notIn: [AppointmentStatus.REJECTED, AppointmentStatus.CANCELLED] },
      },
    });

    if (existing) throw new ConflictException('This time slot is already booked');

    // If ONLINE, generate a meeting link (placeholder for now)
    let meetingId = null;
    let meetingUrl = null;
    if (data.type === AppointmentType.ONLINE) {
      meetingId = `room-${Math.random().toString(36).substring(2, 9)}`;
      meetingUrl = `https://meet.jit.si/${meetingId}`;
    }

    return this.prisma.appointment.create({
      data: {
        patientId: data.patientId,
        guestName: data.guestName,
        guestPhone: data.guestPhone,
        guestEmail: data.guestEmail,
        type: data.type,
        date: appointmentDate,
        timeSlot: data.timeSlot,
        notes: data.notes,
        meetingId,
        meetingUrl,
      },
      include: {
        patient: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.appointment.findMany({ 
      orderBy: { createdAt: 'desc' },
      include: { patient: true }
    });
  }

  async findByPatientId(patientId: string) {
    return this.prisma.appointment.findMany({
      where: { patientId },
      orderBy: { date: 'asc' },
    });
  }

  async findOne(id: string) {
    const appointment = await this.prisma.appointment.findUnique({ 
      where: { id },
      include: { patient: true }
    });
    if (!appointment) throw new NotFoundException('Appointment not found');
    return appointment;
  }

  async updateStatus(id: string, status: AppointmentStatus) {
    const appointment = await this.prisma.appointment.findUnique({ 
      where: { id },
      include: { patient: true }
    });
    
    if (!appointment) throw new NotFoundException('Appointment not found');
    
    const updated = await this.prisma.appointment.update({ 
      where: { id }, 
      data: { status },
      include: { patient: true }
    });

    // Send email notification if status changed to approved or rejected
    if (status === AppointmentStatus.APPROVED || status === AppointmentStatus.REJECTED) {
      const email = appointment.guestEmail || appointment.patient?.email;
      const name = appointment.guestName || appointment.patient?.name || 'مريضنا العزيز';
      
      if (email) {
        const formattedDate = new Date(appointment.date).toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        await this.emailService.sendAppointmentStatus(
          email,
          name,
          formattedDate,
          appointment.timeSlot,
          status.toLowerCase() as 'approved' | 'rejected',
          appointment.meetingUrl || undefined
        );
      }
    }

    return updated;
  }

  async getStats() {
    const [total, pending, approved, completed] = await Promise.all([
      this.prisma.appointment.count(),
      this.prisma.appointment.count({ where: { status: AppointmentStatus.PENDING } }),
      this.prisma.appointment.count({ where: { status: AppointmentStatus.APPROVED } }),
      this.prisma.appointment.count({ where: { status: AppointmentStatus.COMPLETED } }),
    ]);
    return { total, pending, approved, completed };
  }
}
