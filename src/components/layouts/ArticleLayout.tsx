import { Byline, Callout, Link, RightGutter, Subtitle, Title } from 'src/components';
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

type ArticleLayoutProps = {
  children: React.ReactNode;
  metadata: Metadata;
};

export function ArticleLayout({ children, metadata }: ArticleLayoutProps) {
  const { type, title, state, subtitle } = metadata;

  let header: React.ReactNode;

  if (title) {
    header = (
      <header className="mb-8">
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        <Byline metadata={metadata} />
      </header>
    );
  }

  return (
    <>
      <div className="flex-1 flex flex-col">
        <Link type="subtle" icon="backUp" href="/writing" className="mb-6 text-sm text-secondary">
          My Writing
        </Link>
        {header}
        {state === 'archived' && <ArticleArchivedWarning />}
        {children}
      </div>
      <RightGutter />
    </>
  );
}
