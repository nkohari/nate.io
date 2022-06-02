import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { ArticleMetadata } from '../types';
import { getImageUrl } from '../util';

type ArticleMetaProps = {
  metadata: ArticleMetadata;
};

export const ArticleMeta = ({ metadata }: ArticleMetaProps) => {
  const title = metadata.title ? `${metadata.title} — Nate Kohari` : 'Nate Kohari';
  const location = useLocation();

  useEffect(() => {
    document.title = title;
  }, [title]);

  let images;
  if (metadata.images) {
    images = metadata.images.map((image) => (
      <link key={image} rel="preload" as="image" href={getImageUrl(image)} />
    ));
  }

  let outgoingLinks;
  if (metadata.outgoingLinks) {
    outgoingLinks = metadata.outgoingLinks
      .filter((link) => link.startsWith('/'))
      .map((link) => <link key={link} rel="prefetch" as="document" href={link} />);
  }

  return (
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={`https://nate.io${location.pathname}`} />
      {images}
      {outgoingLinks}
    </Helmet>
  );
};
