import path from 'node:path';
import { MetadataPluginParams } from '@apocrypha/core';
import { Metadata } from '../../src/types';
import { Config } from '../config';
import { SpotifyClient } from '../spotify';
import { JsonCache } from '../util';

export function getSpotifyData(config: Config, cachePath: string) {
  const spotify = new SpotifyClient(config);
  const cache = new JsonCache(cachePath);

  return async ({ frontmatter }: MetadataPluginParams<Metadata>) => {
    const trackId = frontmatter.spotifyId;
    if (!trackId) return;

    const track = await cache.readThrough(`tracks/${trackId}`, () => spotify.getTrack(trackId));
    if (!track) return;

    const album = await cache.readThrough(`albums/${track.album.id}`, () =>
      spotify.getAlbum(track.album.id),
    );
    if (!album) return;

    return {
      spotify: { album, track },
    };
  };
}
