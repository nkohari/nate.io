import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useArticle } from 'virtual:nateio/articles';
import { useManifest } from './ManifestProvider';
import { ArticleMetadata } from '../types';
import { getImageUrl } from '../util';

const createModulePrefetchLink = (path: string) => {
  const { getManifestEntry } = useManifest();

  const article = useArticle(path);
  if (!article) return null;

  const entry = getManifestEntry(article.filename);
  if (!entry) return null;

  return <link key={path} rel="prefetch" as="script" href={entry.file} />;
};

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
      .filter((url) => url.startsWith('/'))
      .map(createModulePrefetchLink);
  }
  console.log(outgoingLinks);

  return (
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={`https://nate.io${location.pathname}`} />
      {images}
      {outgoingLinks}
    </Helmet>
  );
};
