import { MetadataPluginProps } from '../../types';

export function getArticleState({ metadata }: MetadataPluginProps) {
  return { state: metadata.state || 'live' };
}
