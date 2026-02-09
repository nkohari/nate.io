import fs from 'node:fs/promises';
import path from 'node:path';
import { SatoriOptions } from 'satori';

export type Font = SatoriOptions['fonts'][number];
export type FontWeight = Font['weight'];
export type FontStyle = Font['style'];

type FontAsset = {
  name: string;
  weight: FontWeight;
  style: FontStyle;
  path: string;
};

const FONTS: FontAsset[] = [
  { name: 'IBM Plex Sans', weight: 400, style: 'normal', path: 'IBMPlexSans-Regular.ttf' },
  { name: 'IBM Plex Sans', weight: 600, style: 'normal', path: 'IBMPlexSans-SemiBold.ttf' },
];

let fontPromise: Promise<Font[]> | undefined = undefined;

export function getFonts(): Promise<Font[]> {
  if (!fontPromise) {
    fontPromise = loadFonts();
  }

  return fontPromise;
}

async function loadFonts(): Promise<Font[]> {
  const fontsDir = path.resolve(process.cwd(), 'assets/fonts');

  const fonts: Font[] = [];
  for (const font of FONTS) {
    const data = await fs.readFile(path.join(fontsDir, font.path));
    fonts.push({
      name: font.name,
      data,
      weight: font.weight,
      style: font.style,
    });
  }

  return fonts;
}
