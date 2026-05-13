import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymobService } from '../../common/paymob.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymobService, PrismaService],
  exports: [PaymobService],
})
export class PaymentsModule {}
