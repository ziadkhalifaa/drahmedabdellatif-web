import { Module } from '@nestjs/common';
import { AnalyticsController } from './infrastructure/analytics.controller';
import { AnalyticsService } from './application/analytics.service';

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
