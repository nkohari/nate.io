import { MetadataPluginParams } from '@apocrypha/core';
import { Metadata } from '../../src/types';
import { generateOpenGraphImage } from '../opengraph';
import { ImageCache } from '../util';

function generateImageFilename(id: string) {
  return `${id.substring(1).replaceAll('/', '-')}.jpg`;
}

function getTitle(metadata: Metadata) {
  if (metadata.type === 'music') {
    return 'The Music That Made Me';
  } else {
    return metadata.title ?? 'nate.io';
  }
}

export function getOpenGraphImage(cachePath: string) {
  const cache = new ImageCache(cachePath);

  return async ({ metadata, path }: MetadataPluginParams<Metadata>) => {
    const filename = generateImageFilename(path);
    const title = getTitle(metadata);

    await cache.readThrough(filename, () => generateOpenGraphImage({ title }));

    return {
      ogImage: `/og/${filename}`,
    };
  };
}
