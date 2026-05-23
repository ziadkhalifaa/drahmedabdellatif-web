import { Module } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { PrismaModule } from '../../common/prisma.module';
import { EmailService } from '../../common/email.service';

@Module({
  imports: [PrismaModule],
  controllers: [NewsletterController],
  providers: [NewsletterService, EmailService],
  exports: [NewsletterService],
})
export class NewsletterModule {}
