import { Module } from '@nestjs/common';
import { ServicesController } from './infrastructure/services.controller';
import { ServicesService } from './application/services.service';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
