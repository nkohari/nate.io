import { Link } from 'src/components';
import { SpotifyObject } from 'src/types';

type ArtistListItemProps = {
  artist: SpotifyObject;
};

function ArtistListItem({ artist }: ArtistListItemProps) {
  return (
    <Link type="subtle" href={artist.url}>
      {artist.name}
    </Link>
  );
}

type ArtistListProps = {
  artists: SpotifyObject[];
};

export function ArtistList({ artists }: ArtistListProps) {
  let content: React.ReactNode;

  if (artists.length === 1) {
    content = <ArtistListItem artist={artists[0]} />;
  } else {
    const conjunction = artists.some((artist) => artist.name.includes('&')) ? ' and ' : ' & ';
    const tokens = artists.map((artist) => <ArtistListItem key={artist.id} artist={artist} />);

    content = tokens.reduce((arr, token, index) => {
      if (index === 0) {
        return [token];
      } else if (artists.length > 2 && index < tokens.length - 2) {
        arr.push(',', token);
        return arr;
      } else {
        arr.push(conjunction, token);
        return arr;
      }
    }, [] as React.ReactNode[]);
  }

  return <>{content}</>;
}
