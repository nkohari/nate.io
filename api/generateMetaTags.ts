import { Metadata } from 'src/types';
import { getPageMetadata } from 'src/util/getPageMetadata';

export function generateMetaTags(requestUrl: URL, metadata: Metadata) {
  const { title, canonicalUrl, properties } = getPageMetadata(
    requestUrl.origin,
    requestUrl.pathname,
    metadata,
  );

  const tags: string[] = [];

  tags.push(`<title>${title}</title>`);
  tags.push(`<link rel="canonical" href="${canonicalUrl}" />`);

  for (const property of properties) {
    tags.push(`<meta property="${property.name}" content="${property.content}" />`);
  }

  return tags.join('\n');
}
