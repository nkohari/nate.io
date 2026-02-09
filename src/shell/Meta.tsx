import { getAssetUrl } from '@apocrypha/core/assets';
import { getArticleModuleUrl, useCatalog } from '@apocrypha/core/catalog';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Metadata } from 'src/types';

const BASE_URL = 'https://nate.io';

type MetaProps = {
  metadata: Metadata;
};

export function Meta({ metadata }: MetaProps) {
  const location = useLocation();
  const articles = useCatalog();

  const title = metadata.title ? `${metadata.title} — Nate Kohari` : 'Nate Kohari';
  const description = metadata.excerpt || metadata.subtitle;
  const canonicalUrl = `${BASE_URL}${location.pathname}`;

  useEffect(() => {
    document.title = title;
  }, [title]);

  let images: React.ReactNode;
  let outgoingLinks: React.ReactNode;

  if (metadata.images) {
    images = metadata.images.map((image) => {
      const href = getAssetUrl(`images/${image.src}`);
      if (!href) return null;

      return <link key={image.src} rel="preload" as="image" href={href} />;
    });
  }

  if (metadata.outgoingLinks) {
    outgoingLinks = metadata.outgoingLinks
      .filter((url) => url.startsWith('/'))
      .map((path: string) => {
        const article = articles[path];
        if (!article) return null;

        const href = getArticleModuleUrl(article.id);
        if (!href) return null;

        return <link key={path} rel="prefetch" as="script" href={href} crossOrigin="anonymous" />;
      });
  }

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
    properties.set('article:published_time', metadata.date.toISOString());
  }

  if (metadata.ogImage) {
    properties.set('og:image', `${BASE_URL}${metadata.ogImage}`);
    properties.set('og:image:width', '1200');
    properties.set('og:image:height', '630');
    properties.set('twitter:card', 'summary_large_image');
    properties.set('twitter:image', `${BASE_URL}${metadata.ogImage}`);
  }

  return (
    <>
      <title>{title}</title>
      <link rel="canonical" href={canonicalUrl} />

      {Array.from(properties.entries()).map(([name, content]) => (
        <meta key={name} property={name} content={content} />
      ))}

      {images}
      {outgoingLinks}
    </>
  );
}
