import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetHeroEn() {
  const keys = ['hero.title', 'hero.subtitle'];
  const defaults = {
    'hero.title': {
      en: 'Prof. Dr. Ahmed Abdellatif',
      ar: 'أ.د. أحمد عبد اللطيف'
    },
    'hero.subtitle': {
      en: 'Professor & Consultant of Urology, Kidney Surgery, Endoscopy, and Andrology',
      ar: 'أستاذ واستشاري جراحة المسالك البولية والكلى والمناظير والذكورة'
    }
  };

  for (const key of keys) {
    const setting = await prisma.siteSettings.findUnique({ where: { key } });
    if (setting) {
      const value = setting.value as any;
      value.en = defaults[key].en;
      await prisma.siteSettings.update({
        where: { key },
        data: { value }
      });
      console.log(`Reset ${key} to default English`);
    }
  }
}

resetHeroEn()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
