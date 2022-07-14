import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { getArticleContent, useArticle } from 'virtual:nateio/articles';
import { DefaultLayout, MusicLayout } from 'src/components';
import { Meta, MetadataProvider } from 'src/shell';

const variants = {
  initial: {
    opacity: 0,
    transition: { type: 'tween', duration: 0.2 },
  },
  visible: {
    opacity: 1,
    transition: { type: 'tween', duration: 0.2 },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { type: 'tween', duration: 0.2 },
  },
};

type BodyProps = {
  path: string;
};

export const Body = ({ path }: BodyProps) => {
  const article = useArticle(path);
  const Content = getArticleContent(path);

  let Layout;
  if (article.metadata.type === 'music') {
    Layout = MusicLayout;
  } else {
    Layout = DefaultLayout;
  }

  return (
    <Suspense fallback={<div className="flex-1 min-h-screen" />}>
      <motion.main
        className="flex-1 flex flex-col w-full"
        initial="initial"
        animate="visible"
        exit="exit"
        variants={variants}
      >
        <MetadataProvider metadata={article.metadata}>
          <Meta metadata={article.metadata} />
          <Layout metadata={article.metadata}>
            <Content />
          </Layout>
        </MetadataProvider>
      </motion.main>
    </Suspense>
  );
};
