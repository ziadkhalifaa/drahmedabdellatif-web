import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './common/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { BlogModule } from './modules/blog/blog.module';
import { ServicesModule } from './modules/services/services.module';
import { TestimonialsModule } from './modules/testimonials/testimonials.module';
import { ContactModule } from './modules/contact/contact.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { MediaModule } from './modules/media/media.module';
import { SettingsModule } from './modules/settings/settings.module';
import { ReportsModule } from './modules/reports/reports.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        setHeaders: (res) => {
          res.set('Access-Control-Allow-Origin', '*');
          res.set('Cross-Origin-Resource-Policy', 'cross-origin');
        },
      },
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),

    PrismaModule,
    AuthModule,
    AppointmentsModule,
    BlogModule,
    ServicesModule,
    TestimonialsModule,
    ContactModule,
    AnalyticsModule,
    MediaModule,
    SettingsModule,
    ReportsModule,
  ],
})
export class AppModule {}
