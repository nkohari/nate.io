import { getAssetUrl } from '@apocrypha/core/assets';
import { useCatalog } from '@apocrypha/core/catalog';
import { manifest } from '@apocrypha/core/manifest';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Metadata } from 'src/types';
import { getPageMetadata } from 'src/util';

type MetaProps = {
  metadata: Metadata;
};

export function Meta({ metadata }: MetaProps) {
  const location = useLocation();
  const articles = useCatalog();

  const { title, canonicalUrl, properties } = getPageMetadata(
    document.location.origin,
    location.pathname,
    metadata,
  );

  useEffect(() => {
    // The meta tags are injected by the server on the first load, but once the React app mounts,
    // we take control of them to alter them as the user navigates.
    document.title = title;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
    for (const property of properties) {
      const el = document.querySelector(`meta[property="${property.name}"]`);
      el?.setAttribute('content', property.content);
    }
  }, [title, canonicalUrl, properties]);

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

        const href = manifest[article.id].moduleFilename;
        if (!href) return null;

        return <link key={path} rel="prefetch" as="script" href={href} crossOrigin="anonymous" />;
      });
  }

  return (
    <>
      {images}
      {outgoingLinks}
    </>
  );
}
