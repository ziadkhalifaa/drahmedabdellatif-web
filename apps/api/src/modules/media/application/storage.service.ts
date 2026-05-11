import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService {
  private readonly uploadPath = path.resolve(__dirname, '../../../../uploads');

  constructor() {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async saveImage(file: Express.Multer.File): Promise<string> {
    const filename = `${uuidv4()}.webp`;
    const filePath = path.join(this.uploadPath, filename);

    try {
      await sharp(file.buffer)
        .webp({ quality: 80 })
        .toFile(filePath);
      
      return `/uploads/${filename}`;
    } catch (error) {
      console.error('Error processing image:', error);
      throw new InternalServerErrorException('Error processing image');
    }
  }

  async saveVideo(file: Express.Multer.File): Promise<string> {
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    const filePath = path.join(this.uploadPath, filename);

    try {
      fs.writeFileSync(filePath, file.buffer);
      return `/uploads/${filename}`;
    } catch (error) {
      console.error('Error saving video:', error);
      throw new InternalServerErrorException('Error saving video');
    }
  }

  async deleteFile(url: string): Promise<void> {
    if (!url.startsWith('/uploads/')) return;

    const filename = url.replace('/uploads/', '');
    const filePath = path.join(this.uploadPath, filename);

    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }
}
