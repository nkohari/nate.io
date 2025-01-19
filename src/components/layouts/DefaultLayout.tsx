import { Byline, Callout, RightGutter, Subtitle, Title } from 'src/components';
import { Metadata } from 'src/types';

function ArticleArchivedWarning() {
  return (
    <Callout type="info">
      This article was written a long time ago. It's still available here for archival purposes, but
      its content might be incorrect, links may be broken, or I might now completely disagree with
      what I wrote back then.
    </Callout>
  );
}

type DefaultLayoutProps = {
  children: React.ReactNode;
  metadata: Metadata;
};

export function DefaultLayout({ children, metadata }: DefaultLayoutProps) {
  const { type, title, state, subtitle } = metadata;

  let header: React.ReactNode;

  if (title) {
    header = (
      <header className="mb-8">
        {type !== 'page' && <Byline metadata={metadata} />}
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </header>
    );
  }

  return (
    <>
      <div className="flex-1 flex flex-col">
        {header}
        {state === 'archived' && <ArticleArchivedWarning />}
        {children}
      </div>
      <RightGutter />
    </>
  );
}
