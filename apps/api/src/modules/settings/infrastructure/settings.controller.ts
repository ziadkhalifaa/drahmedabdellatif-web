import { Controller, Get, Post, Body, Param, UseGuards, Header } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SkipThrottle } from '@nestjs/throttler';
import { SettingsService } from '../application/settings.service';
import { RolesGuard, Roles } from '../../../common/decorators';
import { UserRole } from '@dr-ahmed/shared';



@SkipThrottle()
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get(':key')
  @Header('Cache-Control', 'public, max-age=300, stale-while-revalidate=600')
  async get(@Param('key') key: string) {
    return this.settingsService.get(key);
  }

  @Get()
  @Header('Cache-Control', 'public, max-age=300, stale-while-revalidate=600')
  async getAll() {
    return this.settingsService.getAll();
  }

  @SkipThrottle({ default: false })
  @Post(':key')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)

  async set(@Param('key') key: string, @Body() data: any) {
    return this.settingsService.set(key, data.value);
  }
}
