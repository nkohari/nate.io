import { Byline } from 'src/shell';
import { ArticleMetadata } from 'src/types';

type HeadlineProps = {
  metadata: ArticleMetadata;
};

export const Headline = ({ metadata }: HeadlineProps) => {
  const { title, subtitle, type } = metadata;

  // If the article doesn't have a title, don't try to show a header.
  if (!title) return null;

  return (
    <header className="mb-6">
      {title && <h1 className="text-3xl font-extrabold">{title}</h1>}
      {subtitle && <h2 className="text-lg text-gray-600 dark:text-gray-400">{subtitle}</h2>}
      {type !== 'page' && <Byline metadata={metadata} />}
    </header>
  );
};
