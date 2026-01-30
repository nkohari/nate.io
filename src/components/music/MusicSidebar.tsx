import { motion } from 'motion/react';
import { AlbumTrackList, Link, PoweredBySpotify } from 'src/components';
import { Album, Track } from 'src/types';
import recordImage from '/assets/images/record.webp';

const albumVariants = {
  initial: {
    opacity: 0.7,
    rotate: -3,
    y: -50,
  },
  visible: {
    opacity: 1,
    rotate: 3,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 12, mass: 0.6 },
  },
  hover: {
    scale: 1.1,
    rotate: -3,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const recordVariants = {
  initial: {
    x: 0,
    opacity: 0,
    y: -50,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: 'spring', stiffness: 120, damping: 12, mass: 0.6 },
  },
  hover: {
    x: -70,
    rotate: 180,
    transition: {
      x: { type: 'spring', stiffness: 120, damping: 10, mass: 0.5, delay: 0.1 },
      rotate: { duration: 0.3 },
    },
  },
};

type MusicSidebarProps = {
  album: Album;
  track: Track;
};

export function MusicSidebar({ album, track }: MusicSidebarProps) {
  return (
    <div className="w-full sm:w-72 sm:mt-6">
      <Link type="unstyled" href={album.url} className="flex flex-col items-center mb-8 sm:mb-12">
        <motion.div className="relative" initial="initial" animate="visible" whileHover="hover">
          <motion.img
            src={recordImage}
            alt="Vinyl record"
            width={280}
            height={280}
            className="absolute top-0 left-0"
            variants={recordVariants}
            transition={{ opacity: 0, duration: 0.1 }}
          />
          <motion.img
            src={album.images.large}
            alt={`Cover art for ${album.name}`}
            width={280}
            height={280}
            className="rounded-md shadow-md relative z-10"
            variants={albumVariants}
          />
        </motion.div>
      </Link>
      <div className="hidden sm:block">
        <AlbumTrackList album={album} highlightedTrack={track} />
        <PoweredBySpotify className="justify-end mt-4" />
      </div>
    </div>
  );
}
