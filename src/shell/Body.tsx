import { Suspense } from 'react';
import { getArticleContent, useArticle } from 'virtual:nateio/articles';
import { Callout } from 'src/components';
import { Headline, Meta } from 'src/shell';

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
  const Content = getArticleContent(path);

  return (
    <main className="flex-1 flex flex-col w-full">
      <Meta metadata={article.metadata} />
      <Headline metadata={article.metadata} />
      {article.metadata.state === 'archived' && <ArticleArchivedWarning />}
      <Suspense fallback={<div>Loading...</div>}>
        <Content />
      </Suspense>
    </main>
  );
};
