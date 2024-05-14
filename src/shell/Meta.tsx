import {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {useLocation} from 'react-router-dom';
import {useCatalog, getArticleModuleUrl} from '@nkohari/apocrypha/catalog';
import {getAssetUrl} from '@nkohari/apocrypha/assets';
import {Metadata} from 'src/types';

type MetaProps = {
  metadata: Metadata;
};

export const Meta = ({metadata}: MetaProps) => {
  const title = metadata.title ? `${metadata.title} — Nate Kohari` : 'Nate Kohari';
  const location = useLocation();
  const articles = useCatalog();

  const createModulePreloadLink = (path: string) => {
    const article = articles[path];
    if (!article) return null;

    const href = getArticleModuleUrl(article.id);
    if (!href) return null;

    return <link key={path} rel="prefetch" as="script" href={href} crossOrigin="anonymous" />;
  };

  useEffect(() => {
    document.title = title;
  }, [title]);

  let images;
  if (metadata.images) {
    images = metadata.images.map((image) => (
      <link key={image.src} rel="preload" as="image" href={getAssetUrl(image.src)} />
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
