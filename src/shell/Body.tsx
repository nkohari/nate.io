import {Suspense} from 'react';
import {motion} from 'framer-motion';
import {ArticleContent, useArticle} from '@nkohari/apocrypha/catalog';
import {DefaultLayout, MusicLayout} from 'src/components';
import {Meta, MetadataProvider} from 'src/shell';
import {Metadata} from 'src/types';

const variants = {
  initial: {
    opacity: 0,
    transition: {type: 'tween', duration: 0.2},
  },
  visible: {
    opacity: 1,
    transition: {type: 'tween', duration: 0.2},
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {type: 'tween', duration: 0.2},
  },
};

type LayoutProps = {
  children: React.ReactNode;
  metadata: Metadata;
};

const Layout = (props: LayoutProps) => {
  if (props.metadata.type === 'music') {
    return <MusicLayout {...props} />;
  } else {
    return <DefaultLayout {...props} />;
  }
};

type BodyProps = {
  path: string;
};

export const Body = ({path}: BodyProps) => {
  const article = useArticle<Metadata>(path);

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
            <ArticleContent path={path} />
          </Layout>
        </MetadataProvider>
      </motion.main>
    </Suspense>
  );
};
