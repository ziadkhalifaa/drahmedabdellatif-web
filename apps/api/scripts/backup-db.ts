import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import { resolve } from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting backup from PostgreSQL...');
  
  const data = {
    users: await prisma.user.findMany(),
    appointments: await prisma.appointment.findMany(),
    medicalReports: await prisma.medicalReport.findMany(),
    blogPosts: await prisma.blogPost.findMany(),
    categories: await prisma.category.findMany(),
    tags: await prisma.tag.findMany(),
    blogTags: await prisma.blogTag.findMany(),
    services: await prisma.service.findMany(),
    testimonials: await prisma.testimonial.findMany(),
    contactMessages: await prisma.contactMessage.findMany(),
    media: await prisma.media.findMany(),
    siteSettings: await prisma.siteSettings.findMany(),
  };

  const backupPath = resolve(__dirname, '../backup_data.json');
  fs.writeFileSync(backupPath, JSON.stringify(data, null, 2));
  
  console.log(`✅ Backup completed! Data saved to: ${backupPath}`);
}

main()
  .catch((e) => {
    console.error('❌ Backup failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
