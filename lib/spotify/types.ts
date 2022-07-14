export type ImageSet = {
  small?: string;
  medium?: string;
  large?: string;
};

export type Reference = {
  id: string;
  name: string;
  type: 'album' | 'artist' | 'track';
  url: string;
};

export type Artist = Reference & {
  genres: string[];
  popularity: number;
};

export type Album = Reference & {
  artists: Reference[];
  images: ImageSet;
  popularity: number;
  releaseYear: string;
  tracks: AlbumTrack[];
};

export type AlbumTrack = Reference & {
  artists: Reference[];
  duration: number;
  number: number;
  previewUrl: string;
};

export type Track = Reference & {
  album: Reference;
  artists: Reference[];
  popularity: number;
  previewUrl: string;
};
