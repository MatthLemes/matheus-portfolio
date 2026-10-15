import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgTransparent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="512" height="512">
  <path d="M 12 49 L 12 15 L 32 35" fill="none" stroke="#141414" stroke-width="10.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 32 35 L 52 15 L 52 49" fill="none" stroke="#0A66C2" stroke-width="10.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`.trim();

const svgAppleTouch = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
  <rect width="180" height="180" fill="#FCFCFB"/>
  <g transform="translate(18, 18) scale(2.25)">
    <path d="M 12 49 L 12 15 L 32 35" fill="none" stroke="#141414" stroke-width="10.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 32 35 L 52 15 L 52 49" fill="none" stroke="#0A66C2" stroke-width="10.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>
`.trim();

async function run() {
  const publicDir = path.resolve('public');
  const distDir = path.resolve('dist');

  const targets = [
    { name: 'favicon-16x16.png', size: 16, svg: svgTransparent },
    { name: 'favicon-32x32.png', size: 32, svg: svgTransparent },
    { name: 'favicon-48x48.png', size: 48, svg: svgTransparent },
    { name: 'favicon-192x192.png', size: 192, svg: svgTransparent },
    { name: 'favicon-512x512.png', size: 512, svg: svgTransparent },
    { name: 'apple-touch-icon.png', size: 180, svg: svgAppleTouch },
    { name: 'apple-touch-icon-precomposed.png', size: 180, svg: svgAppleTouch },
  ];

  for (const t of targets) {
    const buffer = await sharp(Buffer.from(t.svg))
      .resize(t.size, t.size)
      .png()
      .toBuffer();

    fs.writeFileSync(path.join(publicDir, t.name), buffer);
    if (fs.existsSync(distDir)) {
      fs.writeFileSync(path.join(distDir, t.name), buffer);
    }
    console.log(`Generated ${t.name} (${t.size}x${t.size})`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
