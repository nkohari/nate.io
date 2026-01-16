import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ArticleCard, Input } from 'src/components';
import { useSearch } from 'src/shell/SearchProvider';
import type { SearchResult } from 'src/shell/SearchProvider';

const gridVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
};

const MINIMUM_QUERY_LENGTH = 3;

type ArticleSearchProps = {
  topK?: number;
  placeholder?: string;
};

export function ArticleSearch({
  topK = 10,
  placeholder = 'Type to search articles...',
}: ArticleSearchProps) {
  const { search } = useSearch();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>();
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    if (query.trim().length < MINIMUM_QUERY_LENGTH) {
      setResults(undefined);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsWorking(true);
      try {
        const searchResults = await search(query, topK);
        setResults(searchResults);
      } catch (error) {
        console.error('Search failed:', error);
        setResults(undefined);
      } finally {
        setIsWorking(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, search, topK]);

  let content: React.ReactNode;
  if (!isWorking && results) {
    if (results.length === 0) {
      content = <div className="text-center text-secondary">No results found for "{query}"</div>;
    } else {
      content = (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={gridVariants}
        >
          {results.map(({ article, score }) => (
            <motion.div key={article.path} variants={itemVariants} className="relative">
              <ArticleCard article={article} caption={`${(score * 100).toFixed(0)}% similar`} />
            </motion.div>
          ))}
        </motion.div>
      );
    }
  }

  return (
    <div className="flex flex-col gap-6 mb-6">
      <Input
        icon="search"
        placeholder={placeholder}
        value={query}
        onChange={setQuery}
        className="w-full"
      />
      {content}
    </div>
  );
}
