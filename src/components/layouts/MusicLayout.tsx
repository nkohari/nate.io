import cx from 'classnames';
import { ArtistList, Link, MusicSidebar } from 'src/components';
import { Metadata } from 'src/types';

type MusicLayoutProps = {
  children: React.ReactNode;
  metadata: Metadata;
};

export function MusicLayout({ children, metadata }: MusicLayoutProps) {
  const { album, track } = metadata.spotify!;

  const title = metadata.title ?? track.name;
  const titleClasses = cx(
    'font-semibold leading-tight',
    title.length > 30 ? 'text-xl' : 'text-2xl',
  );

  return (
    <div className="flex-1">
      <Link type="subtle" icon="backUp" href="/music" className="mb-6 text-sm text-secondary">
        The Music That Made Me
      </Link>
      <div className="flex flex-col sm:flex-row-reverse">
        <MusicSidebar album={album} track={track} />
        <div className="flex-1 sm:mr-16">
          <header className="mb-6">
            <h1 className={titleClasses}>
              <Link
                type="spotify"
                className="text-primary"
                href={track.url}
                icon="spotify"
                iconPosition="right"
                iconSpacing={2}
              >
                {title}
              </Link>
            </h1>
            <h2 className="text-xl text-secondary">
              by <ArtistList artists={track.artists} />
            </h2>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}
