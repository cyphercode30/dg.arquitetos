import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC_IMAGES = join(__dirname, '..', 'public', 'images');

const WEBP_QUALITY = 80;

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getFiles(fullPath));
    } else if (extname(entry.name).toLowerCase() === '.png') {
      files.push(fullPath);
    }
  }
  return files;
}

async function convert() {
  const files = await getFiles(PUBLIC_IMAGES);
  console.log(`Found ${files.length} PNG files to convert\n`);

  let converted = 0;
  let totalSaved = 0;

  for (const file of files) {
    const outPath = file.replace(/\.png$/i, '.webp');
    try {
      const original = await stat(file);
      await sharp(file).webp({ quality: WEBP_QUALITY }).toFile(outPath);
      const result = await stat(outPath);
      const saved = original.size - result.size;
      totalSaved += saved;
      converted++;
      const pct = ((saved / original.size) * 100).toFixed(1);
      console.log(`✓ ${file.replace(PUBLIC_IMAGES, '')} → .webp (${pct}% smaller)`);
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`);
    }
  }

  console.log(`\n✅ Converted ${converted}/${files.length} files`);
  console.log(`💾 Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

convert();
