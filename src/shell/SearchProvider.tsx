import { useCatalog } from '@apocrypha/core/catalog';
import { createContext, useContext, useMemo } from 'react';
import { Article, Metadata } from 'src/types';
import { cosineSimilarity } from 'src/util';

export type SearchResult = {
  article: Article;
  score: number;
};

type SearchContext = {
  search(query: string, topK: number): Promise<SearchResult[]>;
};

const SearchContext = createContext<SearchContext>({} as SearchContext);

type SearchProviderProps = {
  children: React.ReactNode;
};

async function generateEmbedding(text: string) {
  const response = await fetch(`/api/search/embed?q=${text}`);
  const data = await response.json();
  return data.embedding;
}

function decodeAndDequantize(embeddings: string) {
  const values = Int8Array.from(atob(embeddings), (char) => char.charCodeAt(0));
  return Array.from(values, (value) => value / 127);
}

export function SearchProvider({ children }: SearchProviderProps) {
  const catalog = useCatalog<Metadata>();

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

  const search = async (query: string, topK = 10) => {
    const queryEmbedding = await generateEmbedding(query);
    return Object.entries(embeddings)
      .map(([path, embedding]) => {
        return {
          article: catalog[path],
          score: cosineSimilarity(embedding, queryEmbedding),
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  };

  return <SearchContext value={{ search }}>{children}</SearchContext>;
}

export function useSearch() {
  return useContext(SearchContext);
}
