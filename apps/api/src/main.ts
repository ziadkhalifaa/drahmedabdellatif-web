import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import * as fs from 'fs';
import { join, resolve } from 'path';


import { AppModule } from './app.module';


let app: NestExpressApplication;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create<NestExpressApplication>(AppModule);

    // Security & Middleware
    app.use(helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
      crossOriginEmbedderPolicy: false,
    }));
    
    app.setGlobalPrefix('api', {
      exclude: ['uploads/(.*)'],
    });

    app.use(cookieParser());

    app.enableCors({
      origin: true, // في فارسيل خليه true مؤقتاً للسهولة
      credentials: true,
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    const config = new DocumentBuilder()
      .setTitle('Dr. Ahmed Abdellatif API')
      .setDescription('API for Dr. Ahmed Abdellatif Medical Platform')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.init();
  }
  return app.getHttpAdapter().getInstance();
}

// تصدير الدالة لفارسيل
export default async (req: any, res: any) => {
  const instance = await bootstrap();
  instance(req, res);
};

