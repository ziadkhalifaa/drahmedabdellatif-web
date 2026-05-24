const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Connecting to database via Prisma...");
    const settings = await prisma.siteSettings.findMany();
    console.log("SiteSettings in database:");
    console.log(JSON.stringify(settings, null, 2));
  } catch (err) {
    console.error("Failed to query settings:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
