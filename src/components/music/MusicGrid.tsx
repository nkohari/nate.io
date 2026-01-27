import { Article } from '@apocrypha/core';
import { useCatalog } from '@apocrypha/core/catalog';
import { motion } from 'motion/react';
import { useMemo } from 'react';
import { Link, PoweredBySpotify } from 'src/components';
import { Metadata } from 'src/types';

const tileVariants = {
  hidden: {
    opacity: 0,
    rotate: 15,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 10, mass: 0.5 },
  },
};

const albumVariants = {
  visible: {
    rotate: 0,
    scale: 1,
    zIndex: 1,
  },
  hover: () => ({
    rotate: Math.random() > 0.5 ? 3 : -3,
    scale: 1.25,
    zIndex: 10,
    transition: { type: 'spring', stiffness: 120, damping: 10, mass: 0.5 },
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
  article: Article<Metadata>;
};

function MusicTile({ article }: MusicTileProps) {
  const { album } = article.metadata.spotify!;

  return (
    <motion.div variants={tileVariants} className="hover:z-10 w-1/3 md:w-1/5 p-1 select-none">
      <motion.div initial={false} animate="visible" whileHover="hover" variants={albumVariants}>
        <Link type="unstyled" href={article.path}>
          <img
            width={300}
            height={300}
            src={album.images.medium}
            className="rounded-md"
            alt={`Cover art for ${album.name}`}
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}

export function MusicGrid() {
  const articles = useCatalog<Metadata>();

  const musicArticles = useMemo(
    () =>
      Object.values(articles)
        .filter((article) => article.metadata.type === 'music')
        .sort((a, b) =>
          a.metadata.spotify!.track.name.localeCompare(b.metadata.spotify!.track.name),
        ),
    [articles],
  );

  const tiles = musicArticles.map((article) => <MusicTile key={article.path} article={article} />);

  return (
    <div className="mt-6">
      <motion.div
        className="flex flex-row flex-wrap"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.025 }}
      >
        {tiles}
      </motion.div>
      <motion.div variants={poweredByVariants}>
        <PoweredBySpotify className="mt-6" />
      </motion.div>
    </div>
  );
}
