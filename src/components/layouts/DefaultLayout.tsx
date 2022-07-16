import React from 'react';
import { Byline, Callout, Subtitle, Title } from 'src/components';
import { ArticleMetadata } from 'src/types';

const ArticleArchivedWarning = () => (
  <Callout type="info">
    This article was written a long time ago. It's still available here for archival purposes, but
    its content might be incorrect, links may be broken, or I might now completely disagree with
    what I wrote back then.
  </Callout>
);

type DefaultLayoutProps = {
  children: React.ReactNode;
  metadata: ArticleMetadata;
};

export const DefaultLayout = ({ children, metadata }: DefaultLayoutProps) => {
  const { type, title, state, subtitle } = metadata;

  let header;
  if (title) {
    header = (
      <header className="mb-6">
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        {type !== 'page' && <Byline metadata={metadata} />}
      </header>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {header}
      {state === 'archived' && <ArticleArchivedWarning />}
      {children}
    </div>
  );
};
