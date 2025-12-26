import path from 'node:path';
import sharp from 'sharp';
import { ImageMetadata } from '../../src/types';

export async function getImageMetadata(
  src: string,
  basePath: string,
): Promise<ImageMetadata | undefined> {
  const filename = path.resolve(basePath, 'media/images', src);

  try {
    const image = sharp(filename);
    const meta = await image.metadata();

    if (!meta.width || !meta.height || !meta.format) {
      throw new Error(`Could not read image metadata for ${filename}`);
    }

    return {
      src,
      width: meta.width,
      height: meta.height,
      format: meta.format,
    };
  } catch (error) {
    console.error(`Error reading image size for ${filename}: ${error}`);
  }
}
