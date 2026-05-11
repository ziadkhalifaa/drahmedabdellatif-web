import { PrismaClient } from '@prisma/client';
import sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function seedMedia() {
  const publicDir = path.join(process.cwd(), '../web/public/images');
  const uploadDir = path.join(process.cwd(), 'uploads');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const existingImages = [
    { titleAr: 'الدكتور أحمد عبد اللطيف', titleEn: 'Dr. Ahmed Abdellatif', file: 'doctor.png', categoryAr: 'الموظفين', categoryEn: 'Staff' },
    { titleAr: 'العيادة', titleEn: 'The Clinic', file: 'clinic.png', categoryAr: 'المكان', categoryEn: 'Location' },
    { titleAr: 'جراحة المسالك', titleEn: 'Urology Surgery', file: 'urology.png', categoryAr: 'الخدمات', categoryEn: 'Services' },
  ];

  for (const img of existingImages) {
    const sourcePath = path.join(publicDir, img.file);
    const webpFilename = `${path.parse(img.file).name}.webp`;
    const targetPath = path.join(uploadDir, webpFilename);
    const dbUrl = `/uploads/${webpFilename}`;

    if (fs.existsSync(sourcePath)) {
      // Convert to webp and save to uploads
      await sharp(sourcePath).webp({ quality: 80 }).toFile(targetPath);
      console.log(`Converted and saved ${webpFilename}`);

      const exists = await prisma.media.findFirst({ where: { url: dbUrl } });
      if (!exists) {
        await prisma.media.create({
          data: {
            titleAr: img.titleAr,
            titleEn: img.titleEn,
            url: dbUrl,
            categoryAr: img.categoryAr,
            categoryEn: img.categoryEn,
            type: 'image',
            isActive: true,
            order: 0
          }
        });
        console.log(`Seeded DB for ${webpFilename}`);
      }
    }
  }
}

seedMedia().finally(() => prisma.$disconnect());
