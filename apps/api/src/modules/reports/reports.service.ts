import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async getMyReports(patientId: string) {
    return this.prisma.medicalReport.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getReportById(id: string, patientId: string) {
    const report = await this.prisma.medicalReport.findFirst({
      where: { id, patientId },
    });
    if (!report) throw new NotFoundException('Report not found');
    return report;
  }
}
