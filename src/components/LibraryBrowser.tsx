import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useArticles } from 'virtual:nateio/articles';
import { ArticleMetadata } from '../types';
import { search } from '../util';
import { Badge } from './Badge';
import { Date } from './Date';
import { Input } from './Input';
import { Link } from './Link';
import { Toggle } from './Toggle';

type AbstractProps = {
  metadata: ArticleMetadata;
  path: string;
};

const Abstract = ({ metadata, path }: AbstractProps) => {
  return (
    <Link
      role="listitem"
      href={path}
      type="button"
      className="flex group mb-4 -mx-5 px-4 py-4 rounded-md border-x-4 border-transparent hover:border-blue-500 hover:bg-slate-100 dark:hover:bg-slate-700"
    >
      <div>
        <h3 className="text-xl">{metadata.title}</h3>
        <div className="flex flex-row items-center mt-1 space-x-2">
          {metadata.date && (
            <Date
              date={metadata.date}
              className="text-sm italic text-slate-500 dark:text-slate-400"
            />
          )}
          {metadata.state !== 'live' && <Badge icon={metadata.state} text={metadata.state} />}
        </div>
        <div className="text-md mt-2">{metadata.excerpt}</div>
      </div>
    </Link>
  );
};

export const LibraryBrowser = () => {
  const articles = useArticles();
  const [urlParams, setUrlParams] = useSearchParams();

  const setQuery = (query: string) => {
    const newParams = new URLSearchParams(urlParams);
    if (query.length > 0) {
      newParams.set('query', query);
    } else {
      newParams.delete('query');
    }
    setUrlParams(newParams);
  };

  const setShowArchived = (active: boolean) => {
    const newParams = new URLSearchParams(urlParams);
    if (active) {
      newParams.delete('archived');
    } else {
      newParams.set('archived', '0');
    }
    setUrlParams(newParams);
  };

  const query = urlParams.get('query') || '';
  const showArchived = urlParams.get('archived') !== '0';
  const catalogCards = useMemo(
    () => search(Object.values(articles), query, showArchived),
    [articles, query, showArchived]
  );

  const abstracts = catalogCards.map(({ metadata, path }) => {
    if (metadata.type === 'page') {
      return null;
    } else {
      return <Abstract key={path} path={path} metadata={metadata} />;
    }
  });

  return (
    <div>
      <div className="flex flex-row items-center mb-8">
        <Input className="flex-1" icon="search" value={query} onChange={setQuery} />
        <Toggle
          label="Include archived"
          active={showArchived}
          onChange={setShowArchived}
          className="ml-4"
        />
      </div>
      <div role="list">{abstracts}</div>
    </div>
  );
};
