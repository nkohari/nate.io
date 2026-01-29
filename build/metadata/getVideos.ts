import path from 'node:path';
import { AstWalker, MetadataPluginParams } from '@apocrypha/core';
import { Metadata } from '../../src/types';

export async function getVideos({ ast, paths }: MetadataPluginParams<Metadata>) {
  const nodes = AstWalker.findTags(ast, 'video');

  const videos = [];
  for (const node of nodes) {
    const filename = path.resolve(paths.base, 'assets/videos', node.attributes.src);
    const { src } = node.attributes;

    try {
      videos.push({
        src,
        format: path.extname(src).slice(1),
      });
    } catch (error) {
      console.error(`Error reading video metadata for ${filename}: ${error}`);
    }
  }

  if (videos.length > 0) {
    return { videos };
  }
}
