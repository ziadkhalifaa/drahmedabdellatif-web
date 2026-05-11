const path = require('path');

// التحقق مما إذا كان المطلوب تشغيل الـ API أو الـ Web
// سنحاول تشغيل الـ API أولاً إذا كان الملف موجوداً
const apiEntry = path.join(__dirname, 'apps/api/dist/main.js');
const webEntry = path.join(__dirname, 'apps/web/.next/standalone/server.js');

if (require('fs').existsSync(apiEntry)) {
    console.log('🚀 Starting API Server...');
    require(apiEntry);
} else if (require('fs').existsSync(webEntry)) {
    console.log('🌐 Starting Web Server...');
    const standaloneDir = path.join(__dirname, 'apps/web/.next/standalone');
    process.chdir(standaloneDir);
    require('./apps/web/server.js');
} else {
    console.error('❌ No entry point found!');
}
