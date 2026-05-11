import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { MapPin, Phone, Mail } from 'lucide-react';

const FacebookIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

import { Logo } from '@/components/ui/logo';

export function Footer() {
  const t = useTranslations('footer');
  const tHero = useTranslations('hero');
  const tNav = useTranslations('nav');
  const tContact = useTranslations('contact');

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="col-span-2 space-y-6">
            <Logo className="scale-125 origin-left" />
            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-sm">
              {tHero('subtitle')}
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://www.facebook.com/DrAhmedAbdellatifClinic/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
                title={t('facebook')}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                  <FacebookIcon size={18} />
                </div>
                <span className="font-medium">{t('facebook')}</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-[var(--foreground)]">{t('quickLinks')}</h4>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/" className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors">{tNav('home')}</Link>
              <Link href="/about" className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors">{tNav('aboutUs')}</Link>
              <Link href="/services" className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors">{tNav('services')}</Link>
              <Link href="/blog" className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors">{tNav('blog')}</Link>
              <Link href="/patient-guide" className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors">{tNav('patientGuide')}</Link>
              <Link href="/contact" className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors">{tNav('contact')}</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--foreground)]">{t('contact')}</h4>
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-start gap-3 text-sm text-[var(--muted)]">
                <MapPin size={18} className="text-[var(--primary)] shrink-0" />
                <span>{tContact('address')}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                <Phone size={18} className="text-[var(--primary)] shrink-0" />
                <a href={`tel:${tContact('phone')}`} className="hover:text-[var(--primary)]">{tContact('phone')}</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                <Mail size={18} className="text-[var(--primary)] shrink-0" />
                <a href={`mailto:${tContact('email')}`} className="hover:text-[var(--primary)]">{tContact('email')}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-[var(--border)] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[var(--muted)]">
          <p>&copy; {new Date().getFullYear()} {tHero('title')}. {t('rights')}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[var(--primary)]">{t('privacy')}</Link>
            <Link href="/terms" className="hover:text-[var(--primary)]">{t('terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
