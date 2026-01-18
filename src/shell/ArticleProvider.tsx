import { useCatalog } from '@apocrypha/core/catalog';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSearch } from 'src/shell/SearchProvider';
import { Article, Metadata } from 'src/types';
import type { SearchResult } from 'src/shell/SearchProvider';

type ArticleWithScore = {
  article: Article;
  score?: number;
};

type ArticleContext = {
  query: string;
  setQuery: (query: string) => void;
  articles: ArticleWithScore[];
  isSearching: boolean;
};

const ArticleContext = createContext<ArticleContext>({} as ArticleContext);

type ArticleProviderProps = {
  children: React.ReactNode;
};

const MINIMUM_QUERY_LENGTH = 3;
const DEBOUNCE_DELAY = 300;

export function ArticleProvider({ children }: ArticleProviderProps) {
  const catalog = useCatalog<Metadata>();
  const { search } = useSearch();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[] | undefined>();
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (query.trim().length < MINIMUM_QUERY_LENGTH) {
      setSearchResults(undefined);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(async () => {
      try {
        const results = await search(query, 100); // Get more results for filtering
        setSearchResults(results);
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults(undefined);
      } finally {
        setIsSearching(false);
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [query, search]);

  const articles = useMemo(() => {
    // If we have search results, use them sorted by score
    if (searchResults) {
      return searchResults.map(({ article, score }) => ({ article, score }));
    }

    // Otherwise, return all articles sorted by date
    return Object.values(catalog)
      .sort((a, b) => {
        const dateA = a.metadata.date?.getTime() || 0;
        const dateB = b.metadata.date?.getTime() || 0;
        return dateB - dateA;
      })
      .map((article) => ({ article, score: undefined }));
  }, [catalog, searchResults]);

  const value = useMemo(
    () => ({
      query,
      setQuery,
      articles,
      isSearching,
    }),
    [query, articles, isSearching],
  );

  return <ArticleContext value={value}>{children}</ArticleContext>;
}

export function useArticles() {
  return useContext(ArticleContext);
}
