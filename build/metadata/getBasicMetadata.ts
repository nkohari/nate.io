import { MetadataPluginParams } from '@apocrypha/core';
import { Metadata } from '../../src/types';

export function getBasicMetadata({ frontmatter }: MetadataPluginParams<Metadata>) {
  return {
    date: frontmatter.date ? new Date(frontmatter.date) : undefined,
    title: frontmatter.title,
    subtitle: frontmatter.subtitle,
    state: frontmatter.state ?? 'live',
    type: frontmatter.type ?? 'page',
    thumbnail: frontmatter.thumbnail,
  };
}
