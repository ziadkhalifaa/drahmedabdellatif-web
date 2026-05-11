import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const media = await prisma.media.findMany();
  console.log(JSON.stringify(media, null, 2));
}

main().finally(() => prisma.$disconnect());
