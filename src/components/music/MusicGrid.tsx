import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useArticles } from 'virtual:nateio/articles';
import { Link, PoweredBySpotify } from 'src/components';
import { Article } from 'src/types';

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.025 },
  },
};

const tileVariants = {
  hidden: {
    opacity: 0,
    scale: 0.25,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

const albumVariants = {
  visible: {
    scale: 1,
    rotate: 0,
  },
  hover: () => ({
    scale: 1.25,
    rotate: Math.random() > 0.5 ? 3 : -3,
    transition: { type: 'spring', stiffness: 120, damping: 5, mass: 0.5 },
  }),
};

const poweredByVariants = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 1 },
  },
};

type MusicTileProps = {
  article: Article;
};

const MusicTile = ({ article }: MusicTileProps) => {
  const { spotify } = article.metadata;
  return (
    <motion.div variants={tileVariants} className="relative">
      <motion.div
        variants={albumVariants}
        initial={false}
        animate="visible"
        whileHover="hover"
        className="hover:absolute hover:z-10 rounded-md shadow-md"
      >
        <Link type="unstyled" href={article.path}>
          <img width={300} height={300} src={spotify!.album.images.medium} className="rounded-md" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export const MusicGrid = () => {
  const articles = useArticles();

  const musicArticles = useMemo(
    () =>
      Object.values(articles)
        .filter((article) => article.metadata.type === 'music')
        .sort((a, b) =>
          a.metadata.spotify!.track.name.localeCompare(b.metadata.spotify!.track.name)
        ),
    [articles]
  );

  const tiles = musicArticles.map((article) => <MusicTile key={article.path} article={article} />);

  return (
    <div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-3 md:grid-cols-6 space-x-1 space-y-1"
      >
        {tiles}
      </motion.div>
      <motion.div initial="hidden" animate="visible" variants={poweredByVariants}>
        <PoweredBySpotify className="mt-6" />
      </motion.div>
    </div>
  );
};
