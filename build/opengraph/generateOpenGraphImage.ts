import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import sharp from 'sharp';
import { OpenGraphImage } from './OpenGraphImage';
import { getBackgroundImage } from './getBackgroundImage';
import { getFonts } from './getFonts';

const WIDTH = 1200;
const HEIGHT = 630;

export type GenerateOpenGraphImageParams = {
  title: string;
};

export async function generateOpenGraphImage({ title }: GenerateOpenGraphImageParams) {
  const fonts = await getFonts();
  const backgroundImage = await getBackgroundImage();

  if (!title) {
    throw new Error(
      'Error generating OpenGraph image: cannot generate open image for an article without a title',
    );
  }

  const element = OpenGraphImage({ title, backgroundImage });
  const vector = await satori(element, {
    width: WIDTH,
    height: HEIGHT,
    fonts,
  });

  const svg = new Resvg(vector);
  const buffer = svg.render().pixels;

  return sharp(buffer, {
    raw: { width: WIDTH, height: HEIGHT, channels: 4 },
  })
    .jpeg({ quality: 90 })
    .toBuffer();
}
