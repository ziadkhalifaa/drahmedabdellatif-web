import { Module } from '@nestjs/common';
import { MediaController } from './infrastructure/media.controller';
import { MediaService } from './application/media.service';
import { StorageService } from './application/storage.service';

@Module({
  controllers: [MediaController],
  providers: [MediaService, StorageService],
  exports: [MediaService, StorageService],
})
export class MediaModule {}
