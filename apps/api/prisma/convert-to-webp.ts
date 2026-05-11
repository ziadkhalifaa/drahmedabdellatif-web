import { PrismaClient } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs';
import sharp from 'sharp';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();
const uploadPath = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

async function downloadAndConvert(url: string): Promise<string | null> {
  if (!url || !url.startsWith('http')) return null;
  if (url.includes('youtube.com') || url.includes('youtu.be')) return null;

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    
    const filename = `${uuidv4()}.webp`;
    const filePath = path.join(uploadPath, filename);

    await sharp(buffer)
      .webp({ quality: 80 })
      .toFile(filePath);

    return `/uploads/${filename}`;
  } catch (error: any) {
    console.error(`Failed to process ${url}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('Starting media conversion to WebP...');

  // 1. Media
  const mediaItems = await prisma.media.findMany({ where: { type: 'image' } });
  for (const item of mediaItems) {
    const newUrl = await downloadAndConvert(item.url);
    if (newUrl) {
      await prisma.media.update({
        where: { id: item.id },
        data: { url: newUrl }
      });
      console.log(`Updated Media: ${item.id} -> ${newUrl} (Path: ${path.join(uploadPath, newUrl.replace('/uploads/', ''))})`);
    }
  }

  // 2. Testimonials
  const testimonials = await prisma.testimonial.findMany();
  for (const item of testimonials) {
    if (!item.patientAvatar || item.patientAvatar.startsWith('/uploads/')) continue;

    const newUrl = await downloadAndConvert(item.patientAvatar);
    if (newUrl) {
      await prisma.testimonial.update({
        where: { id: item.id },
        data: { patientAvatar: newUrl }
      });
      console.log(`Updated Testimonial: ${item.id} -> ${newUrl}`);
    }
  }

  console.log('Conversion completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
