import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { EmailService } from '../../common/email.service';

@Injectable()
export class NewsletterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async subscribe(email: string, name?: string) {
    return this.prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { isActive: true, name },
      create: { email, name },
    });
  }

  async unsubscribe(email: string) {
    return this.prisma.newsletterSubscriber.update({
      where: { email },
      data: { isActive: false },
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.newsletterSubscriber.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.newsletterSubscriber.count(),
    ]);
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async remove(id: string) {
    return this.prisma.newsletterSubscriber.delete({ where: { id } });
  }

  async sendCampaign(subject: string, content: string) {
    const subscribers = await this.prisma.newsletterSubscriber.findMany({
      where: { isActive: true },
    });

    if (subscribers.length === 0) {
      return { message: 'No active subscribers found', sentCount: 0 };
    }

    let sentCount = 0;
    for (const sub of subscribers) {
      const res = await this.emailService.sendNewsletter(sub.email, subject, content);
      if (res.success) {
        sentCount++;
      }
    }

    return { message: `Campaign sent successfully`, sentCount };
  }
}
