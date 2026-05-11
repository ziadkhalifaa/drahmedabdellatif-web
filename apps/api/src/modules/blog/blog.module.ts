import { Module } from '@nestjs/common';
import { BlogController } from './infrastructure/blog.controller';
import { BlogService } from './application/blog.service';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
