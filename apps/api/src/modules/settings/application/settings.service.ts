import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async get(key: string) {
    const setting = await this.prisma.siteSettings.findUnique({ where: { key } });
    return setting?.value || null;
  }

  async getAll() {
    return this.prisma.siteSettings.findMany();
  }

  async set(key: string, value: any) {
    return this.prisma.siteSettings.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
}
