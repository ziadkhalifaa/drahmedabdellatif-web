import { Controller, Get } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { PrismaService } from '../../common/prisma.service';

@SkipThrottle()
@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async check() {
    let dbStatus = 'unreachable';
    try {
      // Execute simple query to confirm database responsiveness
      await this.prisma.$queryRaw`SELECT 1`;
      dbStatus = 'healthy';
    } catch (error) {
      const err = error as any;
      dbStatus = `unhealthy: ${err.message || err}`;
    }

    return {
      status: dbStatus === 'healthy' ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      db: dbStatus,
      env: process.env.NODE_ENV || 'production',
    };
  }
}
