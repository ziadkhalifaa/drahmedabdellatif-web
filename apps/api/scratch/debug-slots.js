// Test getAvailableSlots for clinic-october on 2026-05-28
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function generateTimeSlots(startTime, endTime, duration) {
  const slots = [];
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);

  let current = new Date();
  current.setHours(startH, startM, 0, 0);

  const end = new Date();
  end.setHours(endH, endM, 0, 0);

  while (current < end) {
    const h = current.getHours().toString().padStart(2, '0');
    const m = current.getMinutes().toString().padStart(2, '0');
    slots.push(`${h}:${m}`);
    current.setMinutes(current.getMinutes() + duration);
  }
  return slots;
}

async function main() {
  const clinicId = 'clinic-october';
  const dateStr = '2026-05-28';

  const [year, month, day] = dateStr.split('-').map(Number);
  const dayOfWeek = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  console.log(`Date: ${dateStr}, Day of week (UTC): ${dayOfWeek} (0=Sun, 4=Thu)`);

  const workingHours = await prisma.clinicWorkingHours.findUnique({
    where: { clinicId_dayOfWeek: { clinicId, dayOfWeek } }
  });
  console.log('Working hours for this day:', JSON.stringify(workingHours, null, 2));

  if (!workingHours || !workingHours.isActive) {
    console.log('❌ Day is not active - no slots will be returned');
    await prisma.$disconnect();
    return;
  }

  const allSlots = await generateTimeSlots(workingHours.startTime, workingHours.endTime, workingHours.slotDuration);
  console.log('All generated slots:', allSlots);

  const startOfDay = new Date(`${dateStr}T00:00:00.000Z`);
  const endOfDay = new Date(`${dateStr}T23:59:59.999Z`);
  console.log(`Day range: ${startOfDay.toISOString()} to ${endOfDay.toISOString()}`);

  const blockedSlots = await prisma.clinicBlockedSlot.findMany({
    where: {
      clinicId,
      date: { gte: startOfDay, lte: endOfDay }
    }
  });
  console.log('Blocked slots from DB:', JSON.stringify(blockedSlots, null, 2));

  const isFullDayBlocked = blockedSlots.some(b => !b.timeSlot);
  if (isFullDayBlocked) {
    console.log('❌ Full day is blocked - returning empty array');
    await prisma.$disconnect();
    return;
  }

  const blockedTimes = new Set(blockedSlots.map(b => b.timeSlot).filter(Boolean));
  console.log('Blocked times:', [...blockedTimes]);

  const availableSlots = allSlots.filter(slot => !blockedTimes.has(slot));
  console.log('✅ Available slots returned to frontend:', availableSlots);

  await prisma.$disconnect();
}

main().catch(console.error);
