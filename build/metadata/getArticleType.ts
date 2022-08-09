import { MetadataPluginProps } from '../types';

export function getArticleType({ metadata }: MetadataPluginProps) {
  return { type: metadata.type || 'page' };
}
