const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Connecting to database via Prisma...");
    const clinics = await prisma.clinic.findMany({
      include: { workingHours: true }
    });
    console.log("Clinics in database:");
    console.log(JSON.stringify(clinics, null, 2));
  } catch (err) {
    console.error("Failed to query clinics:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
