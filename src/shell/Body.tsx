import { Suspense } from 'react';
import { getArticleContent, useArticle } from 'virtual:nateio/articles';
import { Callout } from 'src/components';
import { Headline, Meta } from 'src/shell';

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
      <Suspense fallback={<div>Loading...</div>}>
        <Content />
      </Suspense>
    </main>
  );
};
