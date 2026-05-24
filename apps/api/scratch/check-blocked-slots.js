const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Connecting to database via Prisma...");
    const blockedSlots = await prisma.clinicBlockedSlot.findMany({
      orderBy: { date: 'asc' }
    });
    console.log("Clinic blocked slots in database:");
    console.log(JSON.stringify(blockedSlots, null, 2));
  } catch (err) {
    console.error("Failed to query blocked slots:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
