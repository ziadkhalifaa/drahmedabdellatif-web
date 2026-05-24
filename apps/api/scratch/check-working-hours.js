const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Connecting to database via Prisma...");
    const workingHours = await prisma.clinicWorkingHours.findMany({
      orderBy: [
        { clinicId: 'asc' },
        { dayOfWeek: 'asc' }
      ]
    });
    console.log("Working hours in database:");
    console.log(JSON.stringify(workingHours, null, 2));
  } catch (err) {
    console.error("Failed to query working hours:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
