import path from 'path';
import {AstWalker, MetadataPluginParams} from '@nkohari/apocrypha';
import sharp from 'sharp';
import {Metadata} from '../../src/types';

export async function getImages({ast, paths}: MetadataPluginParams<Metadata>) {
  const nodes = AstWalker.findTags(ast, 'image');

  const images = [];
  for (const node of nodes) {
    const filename = path.resolve(paths.base, 'media/images', node.attributes.src);

    try {
      const image = sharp(filename);
      const {src} = node.attributes;
      const {width, height, format} = await image.metadata();

      images.push({
        src,
        width,
        height,
        format,
      });
    } catch (error) {
      console.error(`Error reading image size for ${filename}: ${error}`);
    }
  }

  if (images.length > 0) {
    return {images};
  }
}
