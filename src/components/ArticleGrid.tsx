import { Article } from '@apocrypha/core';
import { useCatalog } from '@apocrypha/core/catalog';
import { motion } from 'motion/react';
import { useMemo } from 'react';
import { ArticleCard } from 'src/components';
import { Metadata } from 'src/types';

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

type ArticleGridProps = {
  filter?: (article: Article<Metadata>) => boolean;
  sort?: (a: Article<Metadata>, b: Article<Metadata>) => number;
};

export function ArticleGrid({ filter, sort }: ArticleGridProps) {
  const articles = useCatalog<Metadata>();

  const filteredArticles = useMemo(() => {
    const defaultFilter = (article: Article<Metadata>) =>
      article.metadata.type !== 'music' &&
      article.metadata.type !== 'page' &&
      article.metadata.state === 'live';

    const filterFn = filter || defaultFilter;

    const defaultSort = (a: Article<Metadata>, b: Article<Metadata>) => {
      const dateA = a.metadata.date?.getTime() || 0;
      const dateB = b.metadata.date?.getTime() || 0;
      return dateB - dateA;
    };

    const sortFn = sort || defaultSort;

    return Object.values(articles).filter(filterFn).sort(sortFn);
  }, [articles, filter, sort]);

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
      initial="hidden"
      animate="visible"
      variants={gridVariants}
    >
      {filteredArticles.map((article) => (
        <motion.div key={article.path} variants={itemVariants}>
          <ArticleCard id={article.path} />
        </motion.div>
      ))}
    </motion.div>
  );
}
