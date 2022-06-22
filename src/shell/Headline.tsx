import React from 'react';
import { Callout } from 'src/components';
import { Byline } from 'src/shell';
import { ArticleMetadata } from 'src/types';

const ArticleArchivedWarning = () => (
  <Callout type="info">
    This article was written a long time ago. It's still available here for archival purposes, but
    its content might be incorrect, links may be broken, or I might now completely disagree with
    what I wrote back then.
  </Callout>
);

type HeadlineProps = {
  metadata: ArticleMetadata;
};

export const Headline = ({ metadata }: HeadlineProps) => {
  const { title, subtitle, state, type } = metadata;

  // If the article doesn't have a title, don't try to show a header.
  if (!title) return null;

  return (
    <React.Fragment>
      <header className="mb-6">
        {title && <h1 className="text-3xl font-extrabold">{title}</h1>}
        {subtitle && <h2 className="text-lg text-gray-600 dark:text-gray-400">{subtitle}</h2>}
        {type !== 'page' && <Byline metadata={metadata} />}
      </header>
      {state === 'archived' && <ArticleArchivedWarning />}
    </React.Fragment>
  );
};
