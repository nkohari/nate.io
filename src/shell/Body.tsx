import React, { Suspense } from 'react';
import { Callout } from '../components';
import { getArticleModule, useArticle } from 'virtual:nateio/articles';
import { Footer } from './Footer';
import { Header } from './Header';
import { Meta } from './Meta';

const ArticleArchivedWarning = () => (
  <Callout type="info">
    This article was written a long time ago. It's still available here for archival purposes, but
    its content might be incorrect, links may be broken, or I might now completely disagree with
    what I wrote.
  </Callout>
);

type BodyProps = {
  path: string;
};

export const Body = ({ path }: BodyProps) => {
  const article = useArticle(path);
  const Content = React.lazy(getArticleModule(path));

  return (
    <main className="flex-1 flex flex-col w-full">
      <Meta metadata={article.metadata} />
      <Header metadata={article.metadata} />
      {article.metadata.state === 'archived' && <ArticleArchivedWarning />}
      <Suspense fallback={<div>Loading...</div>}>
        <Content />
      </Suspense>
      {article.metadata.footer !== false && <Footer />}
    </main>
  );
};
