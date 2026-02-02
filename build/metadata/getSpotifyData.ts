import path from 'node:path';
import { MetadataPluginParams } from '@apocrypha/core';
import { Artist, Metadata } from '../../src/types';
import { Config } from '../config';
import { DiskCache, SpotifyClient } from '../spotify';

export function getSpotifyData(config: Config, cachePath: string) {
  const cache = new DiskCache(path.resolve(cachePath, 'spotify'));
  const spotify = new SpotifyClient(config);

  return async ({ frontmatter }: MetadataPluginParams<Metadata>) => {
    const trackId = frontmatter.spotifyId;
    if (!trackId) return;

    const track = await cache.readThrough(`tracks/${trackId}`, () => spotify.getTrack(trackId));
    if (!track) return;

    const album = await cache.readThrough(`albums/${track.album.id}`, () =>
      spotify.getAlbum(track.album.id),
    );
    if (!album) return;

    const artists: Artist[] = [];
    for (const reference of track.artists) {
      const artist = await cache.readThrough(`artists/${reference.id}`, () =>
        spotify.getArtist(reference.id),
      );
      if (artist) {
        artists.push(artist);
      }
    }

    return {
      spotify: { artists, album, track },
    };
  };
}
