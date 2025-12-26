import { MetadataPluginParams } from '@apocrypha/core';
import { Metadata } from '../../src/types';
import { getImageMetadata } from '../util';

export async function getThumbnail({ metadata, paths }: MetadataPluginParams<Metadata>) {
  const path = metadata.thumbnail;

  if (path) {
    const thumbnailImage = await getImageMetadata(path, paths.base);

    if (thumbnailImage) {
      return { thumbnailImage };
    }
  }
}
