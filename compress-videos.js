import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

async function compressVideo(inputFile, outputFile, options) {
  return new Promise((resolve, reject) => {
    const inputPath = path.join(publicDir, inputFile);
    const outputPath = path.join(publicDir, outputFile);

    if (!fs.existsSync(inputPath)) {
      console.log(`⊘ ${inputFile} not found, skipping`);
      resolve(false);
      return;
    }

    const originalSize = fs.statSync(inputPath).size;

    ffmpeg(inputPath)
      .outputOptions([
        '-c:v', 'libx264',
        '-preset', 'medium',
        '-crf', options.crf || '23',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-movflags', '+faststart',
        '-vf', options.scale ? `scale=${options.scale}` : undefined
      ].filter(Boolean))
      .output(outputPath)
      .on('end', () => {
        const newSize = fs.statSync(outputPath).size;
        const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
        console.log(`✓ ${inputFile} → ${outputFile} (${(originalSize / 1024 / 1024).toFixed(1)}MB → ${(newSize / 1024 / 1024).toFixed(1)}MB, ${reduction}% reduction)`);
        resolve(true);
      })
      .on('error', (err) => {
        console.error(`✗ Error compressing ${inputFile}:`, err.message);
        reject(err);
      })
      .run();
  });
}

async function main() {
  console.log('Compressing videos...\n');

  try {
    // Compress hero video (4.8MB → target ~1-2MB)
    await compressVideo(
      'upscaled-video (1).mp4',
      'upscaled-video (1)-compressed.mp4',
      { crf: '28', scale: '1920:-2' }
    );

    // Compress head.mp4 (101MB → target ~10-15MB)
    await compressVideo(
      'head.mp4',
      'head-compressed.mp4',
      { crf: '23', scale: '1280:-2' }
    );

    console.log('\n✓ Video compression complete');
    console.log('\nTo use compressed videos, update the references in your code:');
    console.log('  - Hero.tsx: src="/upscaled-video (1)-compressed.mp4"');
    console.log('  - About.tsx: videoSrc="/head-compressed.mp4"');
  } catch (error) {
    console.error('\n✗ Compression failed:', error.message);
    console.log('\nNote: This requires FFmpeg to be installed on your system.');
    console.log('Download from: https://ffmpeg.org/download.html');
  }
}

main().catch(console.error);
