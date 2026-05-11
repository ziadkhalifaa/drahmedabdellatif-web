import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma.service';
import { StorageService } from './storage.service';

@Injectable()
export class MediaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService
  ) {}

  async findAll() {
    return this.prisma.media.findMany({ orderBy: { order: 'asc' } });
  }

  async findActive() {
    return this.prisma.media.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } });
  }

  async findByType(type: string) {
    return this.prisma.media.findMany({ where: { type, isActive: true }, orderBy: { order: 'asc' } });
  }

  async findOne(id: string) {
    const media = await this.prisma.media.findUnique({ where: { id } });
    if (!media) throw new NotFoundException('Media item not found');
    return media;
  }

  async create(data: { type: string; url: string; titleAr?: string; titleEn?: string; categoryAr?: string; categoryEn?: string; order?: number }) {
    return this.prisma.media.create({ data });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.media.update({ where: { id }, data });
  }

  async remove(id: string) {
    const media = await this.findOne(id);
    if (media.url) {
      await this.storage.deleteFile(media.url);
    }
    return this.prisma.media.delete({ where: { id } });
  }
}
