import { Link } from 'src/components';
import { Reference } from 'lib/spotify';

type ArtistListItemProps = {
  artist: Reference;
};

const ArtistListItem = ({ artist }: ArtistListItemProps) => (
  <Link type="subtle" href={artist.url}>
    {artist.name}
  </Link>
);

type ArtistListProps = {
  artists: Reference[];
};

export const ArtistList = ({ artists }: ArtistListProps) => {
  let content;
  if (artists.length === 1) {
    content = <ArtistListItem artist={artists[0]} />;
  } else {
    const conjunction = artists.some((artist) => artist.name.includes('&')) ? ' and ' : ' & ';
    const tokens = artists.map((artist) => <ArtistListItem key={artist.id} artist={artist} />);

    content = tokens.reduce((arr, token, index) => {
      if (index === 0) {
        return [token];
      } else if (artists.length > 2 && index < tokens.length - 2) {
        return [...arr, ',', token];
      } else {
        return [...arr, conjunction, token];
      }
    }, [] as React.ReactNode[]);
  }

  return <>{content}</>;
};
