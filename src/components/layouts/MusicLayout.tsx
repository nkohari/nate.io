import React from 'react';
import { ArtistList, Link, MusicSidebar } from 'src/components';
import { ArticleMetadata } from 'src/types';

type MusicLayoutProps = {
  children: React.ReactNode;
  metadata: ArticleMetadata;
};

export const MusicLayout = ({ children, metadata }: MusicLayoutProps) => {
  const { album, track } = metadata.spotify!;
  return (
    <div className="flex flex-row flex-row-reverse">
      <MusicSidebar album={album} track={track} />
      <div className="flex-1 mr-16">
        <header className="mb-6">
          <Link
            type="subtle"
            icon="backUp"
            href="/music"
            className="mb-6 text-sm text-slate-500 dark:text-slate-400"
          >
            The Music That Made Me
          </Link>
          <h1 className="text-2xl font-bold leading-tight">
            <Link
              type="subtle"
              href={track.url}
              icon="spotify"
              iconPosition="right"
              iconSpacing={2}
              className="hover:text-[#1db954] hover:decoration-[#1db954]"
            >
              {metadata.title || track.name}
            </Link>
          </h1>
          <h2 className="text-xl text-slate-600 dark:text-slate-400">
            by <ArtistList artists={track.artists} />
          </h2>
        </header>
        {children}
      </div>
    </div>
  );
};
