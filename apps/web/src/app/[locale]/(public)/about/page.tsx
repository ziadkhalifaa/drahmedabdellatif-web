import { Metadata } from 'next';
import { getMessages } from 'next-intl/server';
import { AboutContent } from './about-content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages: any = await getMessages({ locale });
  const t = messages.about;

  return {
    title: `${t.title} | Dr. Ahmed Abdellatif`,
    description: t.description,
    openGraph: {
      title: t.title,
      description: t.description,
      type: 'profile',
    },
  };
}

export default async function AboutPage() {
  return <AboutContent />;
}
