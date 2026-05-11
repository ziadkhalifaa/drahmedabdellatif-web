import { Module } from '@nestjs/common';
import { TestimonialsController } from './infrastructure/testimonials.controller';
import { TestimonialsService } from './application/testimonials.service';

@Module({
  controllers: [TestimonialsController],
  providers: [TestimonialsService],
})
export class TestimonialsModule {}
