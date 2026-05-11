import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupMedia() {
  const deleted = await prisma.media.deleteMany({
    where: {
      url: {
        endsWith: '.png'
      }
    }
  });
  console.log(`Deleted ${deleted.count} non-webp media items.`);
}

cleanupMedia().finally(() => prisma.$disconnect());
