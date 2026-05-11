import { Module } from '@nestjs/common';
import { AppointmentsController } from './infrastructure/appointments.controller';
import { AppointmentsService } from './application/appointments.service';
import { EmailService } from '../../common/email.service';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService, EmailService],
})
export class AppointmentsModule {}
