import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Header } from '@nestjs/common';
import { HeroService } from '../application/hero.service';
import { AuthGuard } from '@nestjs/passport';
import { SkipThrottle } from '@nestjs/throttler';
import { RolesGuard, Roles } from '../../../common/decorators';
import { UserRole } from '@dr-ahmed/shared';

@SkipThrottle()
@Controller('hero-slides')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get()
  @Header('Cache-Control', 'public, max-age=300, stale-while-revalidate=600')
  async findAll() {
    return this.heroService.findActive();
  }

  @SkipThrottle({ default: false })
  @Get('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAllForAdmin() {
    return this.heroService.findAll();
  }

  @SkipThrottle({ default: false })
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() data: any) {
    return this.heroService.create(data);
  }

  @SkipThrottle({ default: false })
  @Patch('reorder')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async reorder(@Body() data: { orderedIds: string[] }) {
    return this.heroService.reorder(data.orderedIds);
  }

  @SkipThrottle({ default: false })
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() data: any) {
    return this.heroService.update(id, data);
  }

  @SkipThrottle({ default: false })
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    return this.heroService.remove(id);
  }
}
