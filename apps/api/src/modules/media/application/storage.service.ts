import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import sharp from 'sharp';
import { randomUUID } from 'crypto';

@Injectable()
export class StorageService {
  private readonly uploadPath = path.resolve(__dirname, '../../../../uploads');

  constructor() {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async saveImage(file: Express.Multer.File): Promise<string> {
    const filename = `${randomUUID()}.webp`;
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
    const filename = `${randomUUID()}${ext}`;
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

  async uploadFile(file: Express.Multer.File, folder = ''): Promise<string> {
    const ext = path.extname(file.originalname);
    const filename = `${randomUUID()}${ext}`;
    const targetDir = folder ? path.join(this.uploadPath, folder) : this.uploadPath;
    
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const filePath = path.join(targetDir, filename);
    const fileUrl = folder ? `/uploads/${folder}/${filename}` : `/uploads/${filename}`;

    try {
      fs.writeFileSync(filePath, file.buffer);
      return fileUrl;
    } catch (error) {
      console.error('Error saving file:', error);
      throw new InternalServerErrorException('Error saving file');
    }
  }
}
