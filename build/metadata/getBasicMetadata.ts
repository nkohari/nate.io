import { MetadataPluginParams } from '@nkohari/apocrypha';
import { Metadata } from '../../src/types';

export function getBasicMetadata({ frontmatter }: MetadataPluginParams<Metadata>) {
  return {
    date: new Date(frontmatter.date),
    title: frontmatter.title,
    subtitle: frontmatter.subtitle,
    state: frontmatter.state ?? 'live',
    type: frontmatter.type ?? 'page',
  };
}
