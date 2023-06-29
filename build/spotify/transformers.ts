/* eslint-disable @typescript-eslint/no-explicit-any */

import {Album, AlbumTrack, Artist, ImageSet, Reference, Track} from '../../src/types';

const transformReleaseDate = (date: string): string => {
  const tokens = date.split('-');
  return tokens[0];
};

const transformImageSet = (images: any[]): ImageSet => {
  const findImageWithSize = (size: number) => {
    for (const image of images) {
      if (image.height === size) return image.url;
    }
  };

  return {
    small: findImageWithSize(64),
    medium: findImageWithSize(300),
    large: findImageWithSize(640),
  };
};

function createTransformer<TIn, TOut>(type: string, func: (input: TIn) => TOut) {
  return (input: TIn) => {
    try {
      return func(input);
    } catch (error) {
      console.error('Error while transforming Spotify %s: %s\n%o', type, error, input);
      throw error;
    }
  };
}

const transformReference = createTransformer(
  'reference',
  (input: any): Reference => ({
    id: input.id,
    name: input.name,
    type: input.type,
    url: input.external_urls.spotify,
  }),
);

export const transformAlbum = createTransformer(
  'album',
  (input: any): Album => ({
    artists: input.artists.map(transformArtist),
    id: input.id,
    images: transformImageSet(input.images),
    name: input.name,
    releaseYear: transformReleaseDate(input.release_date),
    popularity: input.popularity,
    tracks: input.tracks.items.map(transformAlbumTrack),
    type: 'album',
    url: input.external_urls.spotify,
  }),
);

export const transformAlbumTrack = createTransformer(
  'track',
  (input: any): AlbumTrack => ({
    artists: input.artists.map(transformReference),
    id: input.id,
    duration: input.duration_ms,
    name: input.name,
    number: input.track_number,
    previewUrl: input.preview_url,
    type: 'track',
    url: input.external_urls.spotify,
  }),
);

export const transformArtist = createTransformer(
  'artist',
  (input: any): Artist => ({
    genres: input.genres,
    id: input.id,
    name: input.name,
    popularity: input.popularity,
    type: 'artist',
    url: input.external_urls.spotify,
  }),
);

export const transformTrack = createTransformer(
  'track',
  (input: any): Track => ({
    album: transformReference(input.album),
    artists: input.artists.map(transformReference),
    id: input.id,
    name: input.name,
    popularity: input.popularity,
    previewUrl: input.preview_url,
    type: 'track',
    url: input.external_urls.spotify,
  }),
);

export const transformAlbumArray = (input: any[]): Album[] => input.map(transformAlbum);
export const transformArtistArray = (input: any[]): Artist[] => input.map(transformArtist);
export const transformTrackArray = (input: any[]): Track[] => input.map(transformTrack);
