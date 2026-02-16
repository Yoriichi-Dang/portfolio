import sharp from 'sharp';
import { readFileSync } from 'fs';

const svgBuffer = readFileSync('src/assets/logo.svg');

// Generate favicon.ico (64x64, inverted colors for white appearance)
await sharp(svgBuffer)
  .resize(64, 64)
  .negate() // Invert colors: black → white
  .toFile('public/favicon.ico');

// Also generate a larger PNG version for better quality
await sharp(svgBuffer)
  .resize(192, 192)
  .negate()
  .toFile('public/favicon-192.png');

// eslint-disable-next-line no-console
console.log('✅ favicon.ico and favicon-192.png generated successfully!');
