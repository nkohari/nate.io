import { ArticleContent, useArticle } from '@apocrypha/core/catalog';
import { motion } from 'motion/react';
import { Suspense } from 'react';
import { ArticleLayout, MusicLayout, PageLayout } from 'src/components';
import { ArticleSearchProvider, Meta, MetadataProvider } from 'src/shell';
import type { Metadata } from 'src/types';

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

type LayoutProps = {
  children: React.ReactNode;
  metadata: Metadata;
};

function Layout(props: LayoutProps) {
  if (props.metadata.type === 'music') {
    return <MusicLayout {...props} />;
  }

  if (props.metadata.type === 'page') {
    return <PageLayout {...props} />;
  }

  return <ArticleLayout {...props} />;
}

type BodyProps = {
  path: string;
};

export function Body({ path }: BodyProps) {
  const article = useArticle<Metadata>(path);

  return (
    <Suspense fallback={<div className="flex-1 min-h-screen" />}>
      <motion.main
        className="flex-1 flex flex-col w-full min-h-screen max-w-[900px] px-2"
        initial="initial"
        animate="visible"
        exit="exit"
        variants={variants}
      >
        <MetadataProvider metadata={article.metadata}>
          <ArticleSearchProvider>
            <Meta metadata={article.metadata} />
            <Layout metadata={article.metadata}>
              <ArticleContent path={path} />
            </Layout>
          </ArticleSearchProvider>
        </MetadataProvider>
      </motion.main>
    </Suspense>
  );
}
