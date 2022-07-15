import { useState } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { Duration } from 'luxon';
import { Link } from 'src/components';
import { Album, AlbumTrack, Reference } from 'lib/spotify';

const MAX_TRACKS = 10;

const trackVariants = {
  hidden: {
    y: -50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', duration: 0.4 },
  },
};

type AlbumTrackListItemProps = {
  isExtra: boolean;
  isHighlighted: boolean;
  track: AlbumTrack;
};

const AlbumTrackListItem = ({ isExtra, isHighlighted, track }: AlbumTrackListItemProps) => {
  const duration = Duration.fromMillis(track.duration).toFormat('m:ss');

  const classes = classNames(
    'flex flex-row relative text-sm border-b border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800',
    isHighlighted && 'font-bold bg-slate-100 dark:bg-slate-900',
    isExtra ? 'z-1' : 'z-10'
  );

  return (
    <motion.div
      initial={isExtra ? 'hidden' : false}
      animate="visible"
      variants={trackVariants}
      className={classes}
    >
      <div className="p-1 flex-0 w-7 text-right">{track.number}.</div>
      <div className="p-1 flex-1 overflow-hidden truncate text-ellipsis">
        <Link type="subtle" href={track.url}>
          {track.name}
        </Link>
      </div>
      <div className="p-1 flex-0">{duration}</div>
    </motion.div>
  );
};

type AlbumTrackListProps = {
  album: Album;
  highlightedTrack: Reference;
};

export const AlbumTrackList = ({ album, highlightedTrack }: AlbumTrackListProps) => {
  const indexOfHighlightedTrack = album.tracks.findIndex((t) => t.id === highlightedTrack.id);
  const expandByDefault = indexOfHighlightedTrack >= MAX_TRACKS;
  const [expanded, setExpanded] = useState(expandByDefault);

  const visibleTracks = expanded ? album.tracks : album.tracks.slice(0, MAX_TRACKS);
  const items = visibleTracks.map((track, index) => (
    <AlbumTrackListItem
      key={track.id}
      track={track}
      isExtra={!expandByDefault && index >= MAX_TRACKS}
      isHighlighted={track.id === highlightedTrack.id}
    />
  ));

  let showMoreLink;
  if (!expanded && album.tracks.length > MAX_TRACKS) {
    showMoreLink = (
      <Link
        type="subtle"
        role="button"
        className="text-sm py-1 pl-8 text-slate-500 dark:text-slate-400 border-b border-slate-300 dark:border-slate-700"
        onClick={() => setExpanded(true)}
      >
        and {album.tracks.length - MAX_TRACKS} more...
      </Link>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="pb-2 text-center border-b border-slate-300 dark:border-slate-700">
        <Link type="subtle" href={album.url}>
          {album.name} ({album.releaseYear})
        </Link>
      </div>
      <AnimatePresence>{items}</AnimatePresence>
      {showMoreLink}
    </div>
  );
};
