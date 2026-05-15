import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SLUG_MAP: Record<string, string> = {
  'Holep Laser Surgery': 'holep',
  'Kidney Stones Treatment': 'kidney-stones',
  'Prostate Enlargement Treatment': 'prostate-enlargement',
  'Urinary Tract Infections': 'uti',
  'Andrology & Erectile Dysfunction': 'andrology',
  'Bladder Cancer Treatment': 'bladder-cancer',
  'Plasma Prostate Vaporization': 'plasma-vaporization',
  'Laparoscopic Prostatectomy': 'prostatectomy',
  'Rezum Water Vapor Therapy': 'rezum',
  'EchoLaser Treatment': 'echolaser',
  'Pediatric Urology': 'pediatric',
};

async function main() {
  const services = await prisma.service.findMany();
  
  for (const service of services) {
    const slug = SLUG_MAP[service.titleEn] || service.titleEn.toLowerCase().replace(/ /g, '-');
    await prisma.service.update({
      where: { id: service.id },
      data: { slug }
    });
    console.log(`Updated ${service.titleEn} -> ${slug}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
