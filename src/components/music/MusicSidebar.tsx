import { motion } from 'motion/react';
import { AlbumTrackList, Link, PoweredBySpotify } from 'src/components';
import { Album, Track } from 'src/types';

const albumVariants = {
  initial: {
    opacity: 0,
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

type MusicSidebarProps = {
  album: Album;
  track: Track;
};

export function MusicSidebar({ album, track }: MusicSidebarProps) {
  return (
    <div className="w-72 mt-6">
      <Link type="unstyled" href={album.url} className="flex flex-col items-center mb-12">
        <motion.img
          src={album.images.large}
          alt={`Cover art for ${album.name}`}
          width={280}
          height={280}
          className="rounded-md shadow-md"
          initial="initial"
          animate="visible"
          whileHover="hover"
          variants={albumVariants}
        />
      </Link>
      <AlbumTrackList album={album} highlightedTrack={track} />
      <PoweredBySpotify className="justify-end mt-4" />
    </div>
  );
}
