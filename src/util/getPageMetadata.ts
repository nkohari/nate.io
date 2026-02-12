import { SITE_NAME } from 'src/constants';
import { Metadata } from 'src/types';

export type PageMetadataProperty = {
  name: string;
  content: string;
};

export type PageMetadata = {
  title: string;
  description: string;
  canonicalUrl: string;
  properties: PageMetadataProperty[];
};

export function getPageMetadata(baseUrl: string, path: string, metadata: Metadata): PageMetadata {
  const title = metadata.title ? `${metadata.title} — ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = `${baseUrl}${path}`;
  const description = metadata.excerpt || metadata.subtitle || '';

  const properties = new Map<string, string>([
    ['og:type', metadata.type === 'page' ? 'website' : 'article'],
    ['og:url', canonicalUrl],
    ['og:site_name', 'Nate Kohari'],
  ]);

  if (title) {
    properties.set('og:title', title);
    properties.set('twitter:title', title);
  }

  if (description) {
    properties.set('description', description);
    properties.set('og:description', description);
    properties.set('twitter:description', description);
  }

  if (metadata.date) {
    console.log(typeof metadata.date);
    properties.set('article:published_time', metadata.date.toISOString());
  }

  if (metadata.ogImage) {
    properties.set('og:image', `${baseUrl}${metadata.ogImage}`);
    properties.set('og:image:width', '1200');
    properties.set('og:image:height', '630');
    properties.set('twitter:card', 'summary_large_image');
    properties.set('twitter:image', `${baseUrl}${metadata.ogImage}`);
  }

  return {
    title,
    description,
    canonicalUrl,
    properties: Array.from(properties.entries()).map(([name, content]) => ({
      name,
      content,
    })),
  };
}
