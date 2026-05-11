# Dr. Ahmed Abdellatif — Medical Platform

## TECH_STACK
- **Frontend:** Next.js 16.2.6, TypeScript 5.9.3, Tailwind CSS 4.2.4, Framer Motion 12.38.0, next-intl 4.11.1
- **Backend:** NestJS 11.1.19, Prisma 6.19.3, PostgreSQL 16
- **Monorepo:** Turborepo 2.9.10, pnpm 11.0.8
- **Auth:** JWT (Passport), bcryptjs 3.0.3
- **Rich Text:** Tiptap 3.23.1 (available but not wired to admin yet)
- **UI Primitives:** Radix UI (dialog, dropdown, tabs, toast, avatar, select, switch)
- **Carousel:** Embla Carousel 8.6.0
- **Charts:** Recharts 3.8.1
- **Maps:** Leaflet 1.9.4 + react-leaflet 5.0.0
- **Logging:** Pino 10.3.1
- **Security:** Helmet 8.1.0, @nestjs/throttler 6.5.0
- **Validation:** Zod 4.4.3
- **Theme:** next-themes 0.4.6

## SYSTEM_FLOW
[Client] → Next.js (SSR/ISR) → REST API → NestJS → Prisma → PostgreSQL
                           ↓                       ↓
                    next-intl (RTL/LTR)       JWT Auth Guard
                           ↓                       ↓
                    Service Layer           WhatsApp API / Email

## ARCHITECTURE
```
dr-ahmed-platform/
├── apps/
│   ├── web/          Next.js 16 App Router (public + admin)
│   │   ├── src/
│   │   │   ├── app/[locale]/
│   │   │   │   ├── (public)/         Homepage, Blog/[slug]
│   │   │   │   └── admin/            Dashboard, CRUD pages
│   │   │   ├── components/
│   │   │   │   ├── ui/               Button, Input, Card, Section, etc.
│   │   │   │   ├── layout/           Navbar, Footer, AdminLayout, AdminSidebar
│   │   │   │   └── sections/         Hero, About, Services, WhyUs, Testimonials, Blog, Booking, Contact
│   │   │   ├── i18n/                 next-intl routing + request config
│   │   │   ├── messages/             en.json + ar.json
│   │   │   ├── lib/                  utils.ts, api.ts
│   │   │   └── styles/               globals.css (Tailwind v4)
│   │   ├── middleware.ts             next-intl middleware
│   │   └── next.config.ts
│   └── api/          NestJS 11 Clean Architecture
│       └── src/
│           ├── modules/
│           │   ├── auth/             JWT login, Passport strategy, RolesGuard
│           │   ├── appointments/     CRUD + conflict prevention + status mgmt
│           │   ├── blog/             CRUD + categories + tags + SEO fields
│           │   ├── services/         CRUD + active/inactive
│           │   ├── testimonials/     CRUD + approve/visible toggle
│           │   ├── contact/          Messages CRUD + read/unread
│           │   └── analytics/        Dashboard stats + event tracking
│           ├── common/               PrismaModule, decorators
│           └── main.ts
├── packages/
│   ├── shared/       Types, enums, constants (shared between frontend & backend)
│   ├── ui/           (reserved for shared UI components)
│   ├── config-typescript/  Base, Next.js, NestJS tsconfigs
│   └── config-eslint/      (reserved)
├── turbo.json
└── pnpm-workspace.yaml
```

## VERIFIED BUILD STATUS
- ✅ `apps/api`: `nest build` passes with 0 errors
- ✅ `apps/web`: `next build` passes with 0 errors
- ✅ Prisma Client generated for v6.19.3
- ✅ TypeScript strict mode throughout

## ORPHANS & PENDING
- [ ] **Database**: Need PostgreSQL running + `prisma db push` or `prisma migrate dev` to create tables
- [ ] **Seed data**: Run `prisma db seed` to create admin user + services
- [ ] **WhatsApp integration**: Replace placeholder `WHATSAPP_NUMBER` in constants with real number + WhatsApp Business API
- [ ] **Email service**: SMTP/SendGrid integration for appointment confirmations
- [ ] **Google Maps API key**: For map embed in contact section (static address shown for now)
- [ ] **Tiptap rich text editor**: Available as dep but not wired to admin blog form (uses plain textarea)
- [ ] **Production domain**: SSL certificates, CDN, domain config
- [ ] **JSON-LD structured data**: MedicalBusiness, Physician, Article schemas not yet added to page layouts
- [ ] **Analytics**: Google Analytics / Search Console setup
- [ ] **Images**: Clinic, doctor, logo images not yet added
- [ ] **Fonts**: Custom Arabic fonts not yet configured
- [ ] **Load testing**: No load test scripts yet
- [ ] **E2E tests**: No Playwright/Cypress tests yet
- [ ] **Docker**: No Docker Compose for local dev environment
- [ ] **CI/CD**: No GitHub Actions workflow
