import React, { Suspense } from 'react';
import { Callout } from '../components';
import { getArticleModule, useArticle } from 'virtual:nateio/articles';
import { ArticleFooter } from './ArticleFooter';
import { ArticleHeader } from './ArticleHeader';
import { ArticleMeta } from './ArticleMeta';

const ArticleArchivedWarning = () => (
  <Callout type="info">
    This article was written a long time ago. It's still available here for archival purposes, but
    its content might be incorrect, links may be broken, or I might now completely disagree with
    what I wrote.
  </Callout>
);

type ArticleBodyProps = {
  path: string;
};

export const ArticleBody = ({ path }: ArticleBodyProps) => {
  const article = useArticle(path);
  const Content = React.lazy(getArticleModule(path));

  return (
    <main className="flex-1 flex flex-col w-full">
      <ArticleMeta metadata={article.metadata} />
      <ArticleHeader metadata={article.metadata} />
      {article.metadata.state === 'archived' && <ArticleArchivedWarning />}
      <Suspense fallback={<div>Loading...</div>}>
        <Content />
      </Suspense>
      {article.metadata.footer !== false && <ArticleFooter />}
    </main>
  );
};
