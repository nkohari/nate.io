import { manifest } from '@apocrypha/core/manifest';
import { Metadata } from 'src/types';

const metadata = Object.values(manifest).reduce((map, entry) => {
  map.set(entry.path, entry.metadata as Metadata);
  return map;
}, new Map<string, Metadata>());

export function getArticleMetadata(requestUrl: URL): Metadata | undefined {
  return metadata.get(requestUrl.pathname);
}
