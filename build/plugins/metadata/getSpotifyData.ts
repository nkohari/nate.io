import { resolve } from 'path';
import { Config } from 'lib/config';
import { MetadataPluginProps } from '../../types';
import { SpotifyClient, DiskCache } from '../../../lib/spotify';

export function getSpotifyData(config: Config, cachePath: string) {
  const cache = new DiskCache(resolve(cachePath, 'spotify'));
  const spotify = new SpotifyClient(config);

  return async ({ metadata }: MetadataPluginProps) => {
    const trackId = metadata.spotifyId;
    if (!trackId) return;

    const track = await cache.readThrough(`tracks/${trackId}`, () => spotify.getTrack(trackId));
    if (!track) return;

    const albumId = track.album.id;
    const album = await cache.readThrough(`albums/${albumId}`, () => spotify.getAlbum(albumId));
    if (!album) return;

    return {
      spotify: { album, track },
    };
  };
}
