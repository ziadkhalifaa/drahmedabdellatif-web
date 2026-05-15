import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.service.findMany({ orderBy: { order: 'asc' } });
  }

  async findActive() {
    return this.prisma.service.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } });
  }

  async findOne(idOrSlug: string) {
    const service = await this.prisma.service.findFirst({
      where: {
        OR: [
          { id: idOrSlug },
          { slug: idOrSlug }
        ]
      }
    });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  async create(data: { titleAr: string; titleEn: string; descriptionAr: string; descriptionEn: string; slug: string; icon: string; image?: string; order?: number }) {
    return this.prisma.service.create({ data });
  }

  async update(id: string, data: Partial<{ titleAr: string; titleEn: string; descriptionAr: string; descriptionEn: string; slug: string; icon: string; image: string; order: number; isActive: boolean }>) {
    await this.findOne(id);
    return this.prisma.service.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.service.delete({ where: { id } });
  }
}
