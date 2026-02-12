import path from 'node:path';
import sharp from 'sharp';

const BACKGROUND_IMAGE = path.resolve(process.cwd(), 'assets/og.jpg');

let promise: Promise<string> | null = null;

export async function getBackgroundImage(): Promise<string> {
  if (!promise) {
    promise = loadBackgroundImage();
  }

  return promise;
}

async function loadBackgroundImage(): Promise<string> {
  const buffer = await sharp(BACKGROUND_IMAGE).jpeg({ quality: 90 }).toBuffer();
  const base64 = buffer.toString('base64');
  return `data:image/jpeg;base64,${base64}`;
}
