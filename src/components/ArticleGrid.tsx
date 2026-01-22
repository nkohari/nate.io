import { motion } from 'motion/react';
import { useMemo } from 'react';
import { ArticleCard } from 'src/components';
import { useArticles } from 'src/shell';

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
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

export function ArticleGrid() {
  const { articles } = useArticles();

  const filteredArticles = useMemo(() => {
    return articles.filter(
      ({ article }) => article.metadata.type === 'essay' && article.metadata.state !== 'draft',
    );
  }, [articles]);

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
      initial="hidden"
      animate="visible"
      variants={gridVariants}
    >
      {filteredArticles.map(({ article, score }) => (
        <motion.div key={article.path} layout variants={itemVariants}>
          <ArticleCard article={article} score={score} />
        </motion.div>
      ))}
    </motion.div>
  );
}
