import { motion } from 'motion/react';
import { useMemo } from 'react';
import { ArticleCard } from 'src/components';
import { useArticles } from 'src/shell/ArticleProvider';
import { ArticleState } from 'src/types';

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
  state?: ArticleState;
};

export function ArticleGrid({ state = 'live' }: ArticleGridProps) {
  const { articles } = useArticles();

  const filteredArticles = useMemo(() => {
    return articles.filter(
      ({ article }) =>
        article.metadata.type !== 'music' &&
        article.metadata.type !== 'page' &&
        article.metadata.state === state,
    );
  }, [articles, state]);

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
      initial="hidden"
      animate="visible"
      variants={gridVariants}
    >
      {filteredArticles.map(({ article, score }) => (
        <motion.div key={article.path} variants={itemVariants}>
          <ArticleCard
            article={article}
            caption={score !== undefined ? `${(score * 100).toFixed(0)}% similar` : undefined}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
