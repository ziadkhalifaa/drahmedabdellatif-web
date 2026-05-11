import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import { resolve } from 'path';

const prisma = new PrismaClient();

async function main() {
  const backupPath = resolve(__dirname, '../backup_data.json');
  if (!fs.existsSync(backupPath)) {
    console.error('❌ Backup file not found. Run backup-db.ts first.');
    return;
  }

  const data = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
  console.log('🚀 Starting restore to MySQL...');

  // Clean the target database first (Optional but recommended)
  console.log('🧹 Cleaning target database...');
  await prisma.blogTag.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.medicalReport.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.service.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.media.deleteMany();
  await prisma.siteSettings.deleteMany();

  console.log('📥 Importing data...');

  // Independent tables
  await prisma.category.createMany({ data: data.categories });
  await prisma.tag.createMany({ data: data.tags });
  await prisma.user.createMany({ data: data.users });
  await prisma.service.createMany({ data: data.services });
  await prisma.media.createMany({ data: data.media });
  await prisma.testimonial.createMany({ data: data.testimonials });
  await prisma.contactMessage.createMany({ data: data.contactMessages });
  await prisma.siteSettings.createMany({ data: data.siteSettings });

  // Tables with foreign keys
  await prisma.blogPost.createMany({ data: data.blogPosts });
  await prisma.blogTag.createMany({ data: data.blogTags });
  await prisma.appointment.createMany({ data: data.appointments });
  await prisma.medicalReport.createMany({ data: data.medicalReports });

  console.log('✅ Restore completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Restore failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
