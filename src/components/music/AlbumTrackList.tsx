import cx from 'classnames';
import { Duration } from 'luxon';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'src/components';
import { Album, AlbumTrack, SpotifyObject } from 'src/types';

const MAX_TRACKS = 10;

const variants = {
  track: {
    hidden: {
      y: -50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', duration: 0.4 },
    },
  },
};

type AlbumTrackListItemProps = {
  isExtra: boolean;
  isHighlighted: boolean;
  track: AlbumTrack;
};

function AlbumTrackListItem({ isExtra, isHighlighted, track }: AlbumTrackListItemProps) {
  return (
    <motion.div
      initial={isExtra ? 'hidden' : false}
      animate="visible"
      variants={variants.track}
      className={cx(
        'relative flex flex-row border-b border-divider text-sm',
        isHighlighted && 'font-semibold bg-background-alt',
        isExtra ? 'z-1' : 'z-10',
      )}
    >
      <div className="p-1 w-[2em] text-right">{track.number}.</div>
      <div className="p-1 flex-1 overflow-hidden truncate text-ellipsis">
        <Link type="subtle" href={track.url}>
          {track.name}
        </Link>
      </div>
      <div className="p-1">{Duration.fromMillis(track.duration).toFormat('m:ss')}</div>
    </motion.div>
  );
}

type AlbumTrackListProps = {
  album: Album;
  highlightedTrack: SpotifyObject;
};

export function AlbumTrackList({ album, highlightedTrack }: AlbumTrackListProps) {
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

  let showMoreLink: React.ReactNode;

  if (!expanded && album.tracks.length > MAX_TRACKS) {
    showMoreLink = (
      <Link
        type="subtle"
        role="button"
        className="cursor-pointer border-b border-divider py-1 pl-8 text-sm"
        onClick={() => setExpanded(true)}
      >
        and {album.tracks.length - MAX_TRACKS} more...
      </Link>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="border-b border-divider pb-2 text-center">
        <Link type="subtle" href={album.url}>
          {album.name} ({album.releaseYear})
        </Link>
      </div>
      <AnimatePresence>{items}</AnimatePresence>
      {showMoreLink}
    </div>
  );
}
