import { Module } from '@nestjs/common';
import { ContactController } from './infrastructure/contact.controller';
import { ContactService } from './application/contact.service';

@Module({
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
