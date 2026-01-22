import { useCatalog } from '@apocrypha/core/catalog';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Article, Metadata } from 'src/types';
import { cosineSimilarity, getEmbedding } from 'src/util';

type ArticleWithScore = {
  article: Article;
  score?: number;
};

type SearchResult = {
  article: Article;
  score: number;
};

type ArticleSearchContext = {
  query: string;
  setQuery: (query: string) => void;
  articles: ArticleWithScore[];
  isSearching: boolean;
};

const ArticleSearchContext = createContext<ArticleSearchContext>({} as ArticleSearchContext);

type ArticleSearchProviderProps = {
  children: React.ReactNode;
};

const MINIMUM_QUERY_LENGTH = 3;
const DEBOUNCE_DELAY = 300;

function decodeAndDequantize(embeddings: string) {
  const values = Int8Array.from(atob(embeddings), (char) => char.charCodeAt(0));
  return Array.from(values, (value) => value / 127);
}

export function ArticleSearchProvider({ children }: ArticleSearchProviderProps) {
  const catalog = useCatalog<Metadata>();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[] | undefined>();
  const [isSearching, setIsSearching] = useState(false);

  const embeddings = useMemo(() => {
    return Object.values(catalog).reduce(
      (hash, article) => {
        if (article.metadata.embeddings) {
          hash[article.path] = decodeAndDequantize(article.metadata.embeddings);
        }
        return hash;
      },
      {} as Record<string, number[]>,
    );
  }, [catalog]);

  useEffect(() => {
    const sortByRelevancy = async (query: string) => {
      const queryEmbedding = await getEmbedding(query);
      return Object.entries(embeddings)
        .map(([path, embedding]) => {
          return {
            article: catalog[path],
            score: cosineSimilarity(embedding, queryEmbedding),
          };
        })
        .sort((a, b) => b.score - a.score);
    };

    if (query.trim().length < MINIMUM_QUERY_LENGTH) {
      setSearchResults(undefined);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(async () => {
      try {
        const results = await sortByRelevancy(query);
        setSearchResults(results);
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults(undefined);
      } finally {
        setIsSearching(false);
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [catalog, embeddings, query]);

  const articles = useMemo(() => {
    // If we have search results, use them sorted by score.
    if (searchResults) {
      return searchResults.map(({ article, score }) => ({ article, score }));
    }

    // Otherwise, return all articles sorted by date.
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

  return <ArticleSearchContext value={value}>{children}</ArticleSearchContext>;
}

export function useArticles() {
  return useContext(ArticleSearchContext);
}
