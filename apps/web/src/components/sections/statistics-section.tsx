'use client';

import { motion } from 'framer-motion';
import { CountUp } from '@/components/ui/count-up';
import { Users, Activity, Award, BookOpen } from 'lucide-react';
import { EditableText } from '@/components/editor/editable-components';

const stats = [
  {
    id: 1,
    icon: Activity,
    value: 5000,
    suffix: '+',
    titleAr: 'عمليات المسالك البولية',
    titleEn: 'Urological Surgeries',
    descAr: 'للأطفال والبالغين بأقل تدخل جراحي وأسرع تعافي.',
    descEn: 'For children and adults with minimal surgical intervention and fastest recovery.'
  },
  {
    id: 2,
    icon: BookOpen,
    value: 40,
    suffix: '+',
    titleAr: 'أبحاث علمية',
    titleEn: 'Scientific Research',
    descAr: 'منشورة في أرفع المجلات العلمية في تخصص المسالك البولية عالميًا.',
    descEn: 'Published in the most prestigious scientific journals in urology worldwide.'
  },
  {
    id: 3,
    icon: Award,
    value: 20,
    suffix: '+',
    titleAr: 'إشراف أكاديمي',
    titleEn: 'Academic Supervision',
    descAr: 'الإشراف على رسائل ماجستير ودكتوراه في مجالات علاج البروستاتا.',
    descEn: 'Supervision of Master and PhD theses in prostate treatment fields.'
  },
  {
    id: 4,
    icon: Users,
    value: 15,
    suffix: '+',
    titleAr: 'سنوات من الخبرة',
    titleEn: 'Years of Experience',
    descAr: 'في تقديم أفضل رعاية طبية لمرضى المسالك البولية.',
    descEn: 'In providing the best medical care for urology patients.'
  }
];

export function StatisticsSection() {
  return (
    <section className="relative py-24 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2000&auto=format&fit=crop')" }}>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#0a192f]/90 mix-blend-multiply z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <stat.icon size={36} className="text-[var(--accent)]" />
              </div>
              
              <div className="text-5xl lg:text-6xl font-extrabold text-white mb-2 tracking-tight">
                <CountUp to={stat.value} duration={2.5} className="font-sans" />
                <span className="text-[var(--accent)]">{stat.suffix}</span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 mt-4">
                 <EditableText contentKey={`home.stats.${stat.id}.title`} defaultAr={stat.titleAr} defaultEn={stat.titleEn} />
               </h3>
               
               <div className="text-gray-300 leading-relaxed text-sm max-w-[250px]">
                 <EditableText contentKey={`home.stats.${stat.id}.desc`} defaultAr={stat.descAr} defaultEn={stat.descEn} />
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
