import { Metadata } from 'src/types';
import { getPageMetadata } from 'src/util/getPageMetadata';

export function generateMetaTags(path: string, metadata: Metadata) {
  const tags: string[] = [];
  const { title, canonicalUrl, properties } = getPageMetadata(path, metadata);

  tags.push(`<title>${title}</title>`);
  tags.push(`<link rel="canonical" href="${canonicalUrl}" />`);

  for (const property of properties) {
    tags.push(`<meta property="${property.name}" content="${property.content}" />`);
  }

  return tags.join('\n');
}
