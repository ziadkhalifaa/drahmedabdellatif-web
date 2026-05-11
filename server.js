const path = require('path');

// تحديد مسار مجلد الـ standalone الناتج عن بناء Next.js
const standaloneDir = path.join(__dirname, 'apps/web/.next/standalone');

// تغيير مسار العمل (Working Directory) لهذا المجلد ليجد Next.js ملفاته
process.chdir(standaloneDir);

// تشغيل السيرفر الفعلي لـ Next.js
// في نظام الـ Monorepo يكون المسار هو apps/web/server.js داخل مجلد الـ standalone
require('./apps/web/server.js');
