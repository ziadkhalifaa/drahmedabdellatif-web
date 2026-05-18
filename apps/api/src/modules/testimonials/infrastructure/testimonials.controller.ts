import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards, Header } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SkipThrottle } from '@nestjs/throttler';
import { TestimonialsService } from '../application/testimonials.service';
import { RolesGuard, Roles } from '../../../common/decorators';

@SkipThrottle()
@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Get()
  @Header('Cache-Control', 'public, max-age=300, stale-while-revalidate=600')
  async findVisible() {
    return this.testimonialsService.findVisible();
  }

  @Get('success-stories')
  @Header('Cache-Control', 'public, max-age=300, stale-while-revalidate=600')
  async getSuccessStories(@Query('limit') limit?: number) {
    return this.testimonialsService.getSuccessStories(limit);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'editor')
  @SkipThrottle({ default: false })
  @Get('all')
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.testimonialsService.findAll(+page, +limit);
  }

  @SkipThrottle({ default: false })
  @Post()
  async create(@Body() body: any) {
    return this.testimonialsService.create(body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'editor')
  @SkipThrottle({ default: false })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.testimonialsService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @SkipThrottle({ default: false })
  @Patch(':id/approve')
  async approve(@Param('id') id: string) {
    return this.testimonialsService.approve(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @SkipThrottle({ default: false })
  @Patch(':id/toggle-success-story')
  async toggleSuccessStory(@Param('id') id: string, @Body() body: { isSuccessStory: boolean }) {
    return this.testimonialsService.toggleSuccessStory(id, body.isSuccessStory);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @SkipThrottle({ default: false })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.testimonialsService.remove(id);
  }
}
