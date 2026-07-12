import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

// Images to convert (PNG and JPG files)
const imagesToConvert = [
  '2t.png',
  '5t.png',
  'Gemini_Generated_Image_5weffr5weffr5wef-processed(lightpdf.com) (1).png',
  'Gemini_Generated_Image_sfxurysfxurysfxu (1).png',
  'Gemini_Generated_Image_v4k3oav4k3oav4k3 (1).png',
  'aurora-bg.jpg',
  'dich.png',
  'fun.png',
  'logo.png',
  'lower.png',
  'pari.png',
  'team.png',
  'upper.png',
  'images (3).png',
  'splash2.png',
  'splash4.png',
  'splash5.png',
  'splash7.png',
];

async function convertImage(imageName) {
  const inputPath = path.join(publicDir, imageName);
  const outputPath = path.join(publicDir, imageName.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
  
  try {
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✓ ${imageName} → ${path.basename(outputPath)} (${reduction}% reduction)`);
    return true;
  } catch (error) {
    console.error(`✗ Error converting ${imageName}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('Converting images to WebP...\n');
  
  let successCount = 0;
  for (const image of imagesToConvert) {
    const inputPath = path.join(publicDir, image);
    if (fs.existsSync(inputPath)) {
      const success = await convertImage(image);
      if (success) successCount++;
    } else {
      console.log(`⊘ ${image} not found, skipping`);
    }
  }
  
  console.log(`\n✓ Successfully converted ${successCount}/${imagesToConvert.length} images`);
}

main().catch(console.error);
