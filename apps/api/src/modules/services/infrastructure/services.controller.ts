import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Header } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SkipThrottle } from '@nestjs/throttler';
import { ServicesService } from '../application/services.service';
import { RolesGuard, Roles } from '../../../common/decorators';

@SkipThrottle()
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @Header('Cache-Control', 'public, max-age=300, stale-while-revalidate=600')
  async findAll() {
    return this.servicesService.findActive();
  }

  @Get('all')
  @Header('Cache-Control', 'public, max-age=300, stale-while-revalidate=600')
  async findAllAdmin() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  @Header('Cache-Control', 'public, max-age=300, stale-while-revalidate=600')
  async findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @SkipThrottle({ default: false })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Body() body: { 
    titleAr: string; 
    titleEn: string; 
    descriptionAr: string; 
    descriptionEn: string; 
    slug: string; 
    icon: string; 
    image?: string; 
    order?: number;
    metaTitleAr?: string;
    metaTitleEn?: string;
    metaDescriptionAr?: string;
    metaDescriptionEn?: string;
  }) {
    return this.servicesService.create(body);
  }

  @SkipThrottle({ default: false })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.servicesService.update(id, body);
  }

  @SkipThrottle({ default: false })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}
