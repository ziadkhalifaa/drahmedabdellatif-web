import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  // Update Hero Slides to ensure English is correct
  await prisma.heroSlide.updateMany({
    where: { titleAr: 'أ.د. أحمد عبد اللطيف' },
    data: {
      titleEn: 'Prof. Dr. Ahmed Abdellatif',
      subtitleEn: 'Professor & Consultant of Urology, Endoscopy, and Andrology'
    }
  });

  console.log('✅ Hero Slides updated successfully');
}
main().catch(console.error).finally(() => prisma.$disconnect());
