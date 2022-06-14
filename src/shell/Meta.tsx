import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useArticles } from 'virtual:nateio/articles';
import { useManifest } from 'src/shell';
import { ArticleMetadata } from 'src/types';
import { getImageUrl } from 'src/util';

type MetaProps = {
  metadata: ArticleMetadata;
};

export const Meta = ({ metadata }: MetaProps) => {
  const title = metadata.title ? `${metadata.title} — Nate Kohari` : 'Nate Kohari';
  const location = useLocation();
  const articles = useArticles();
  const { getManifestEntry } = useManifest();

  const createModulePreloadLink = (path: string) => {
    const article = articles[path];
    if (!article) return null;

    const entry = getManifestEntry(article.chunkId);
    if (!entry) return null;

    return <link key={path} rel="modulepreload" href={entry.file} />;
  };

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
      .map(createModulePreloadLink);
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
