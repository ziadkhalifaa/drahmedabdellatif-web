const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SOURCE = 'C:\\Users\\ziadk\\.gemini\\antigravity\\brain\\a063d388-e671-43e4-b038-3dc1671559dd\\pwa_icon_512_1778630498238.png';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'icons');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
  // Make sure source exists
  if (!fs.existsSync(SOURCE)) {
    // Fallback: look in the current dir for any png
    console.error('Source icon not found at:', SOURCE);
    process.exit(1);
  }

  for (const size of sizes) {
    const outputPath = path.join(OUTPUT_DIR, `icon-${size}x${size}.png`);
    await sharp(SOURCE)
      .resize(size, size, { fit: 'cover' })
      .png()
      .toFile(outputPath);
    console.log(`✅ Generated: icon-${size}x${size}.png`);
  }

  console.log('\n🎉 All icons generated successfully!');
}

generateIcons().catch(console.error);
