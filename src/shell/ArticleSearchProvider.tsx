import { useCatalog } from '@apocrypha/core/catalog';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Article, Metadata } from 'src/types';
import { cosineSimilarity, getEmbedding } from 'src/util';

export type ArticleWithScore = {
  article: Article;
  score?: number;
};

export type ArticleSearchContext = {
  query: string;
  setQuery: (query: string) => void;
  articles: ArticleWithScore[];
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

function sortByDate(articles: Article[]): ArticleWithScore[] {
  return articles
    .sort((a, b) => {
      const dateA = a.metadata.date?.getTime() || 0;
      const dateB = b.metadata.date?.getTime() || 0;
      return dateB - dateA;
    })
    .map((article) => ({ article, score: undefined }));
}

export function ArticleSearchProvider({ children }: ArticleSearchProviderProps) {
  const catalog = useCatalog<Metadata>();
  const articlesByDate = useMemo(() => sortByDate(Object.values(catalog)), [catalog]);

  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<ArticleWithScore[]>(articlesByDate);

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
    if (query.trim().length < MINIMUM_QUERY_LENGTH) {
      setArticles(articlesByDate);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const queryEmbedding = await getEmbedding(query);
        const articlesByRelevance = Object.entries(embeddings)
          .map(([path, embedding]) => {
            return {
              article: catalog[path],
              score: cosineSimilarity(embedding, queryEmbedding),
            };
          })
          .sort((a, b) => b.score - a.score);

        setArticles(articlesByRelevance);
      } catch (error) {
        console.error('Search failed:', error);
        setArticles(articlesByDate);
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [catalog, articlesByDate, embeddings, query]);

  const value = useMemo(() => ({ query, setQuery, articles }), [query, articles]);

  return <ArticleSearchContext value={value}>{children}</ArticleSearchContext>;
}

export function useArticles() {
  return useContext(ArticleSearchContext);
}
