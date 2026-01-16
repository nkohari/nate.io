import { Article as BaseArticle } from '@apocrypha/core';
import { DateTime } from 'luxon';

export type ImageSet = {
  small?: string;
  medium?: string;
  large?: string;
};

export type SpotifyObject = {
  id: string;
  name: string;
  type: 'album' | 'artist' | 'track';
  url: string;
};

export type Artist = SpotifyObject & {
  genres: string[];
  popularity: number;
};

export type Album = SpotifyObject & {
  artists: SpotifyObject[];
  images: ImageSet;
  popularity: number;
  releaseYear: string;
  tracks: AlbumTrack[];
};

export type AlbumTrack = SpotifyObject & {
  artists: SpotifyObject[];
  duration: number;
  number: number;
  previewUrl: string;
};

export type Track = SpotifyObject & {
  album: SpotifyObject;
  artists: SpotifyObject[];
  popularity: number;
  previewUrl: string;
};

export type ArticleType = 'instructional' | 'narrative' | 'page' | 'vignette' | 'music';
export type ArticleState = 'archived' | 'draft' | 'live';

export type ArticleSection = {
  id: string;
  level: number;
  text: string;
};

export type ImageMetadata = {
  src: string;
  format: string;
  width: number;
  height: number;
};

export type Metadata = {
  type: ArticleType;
  state: ArticleState;
  sections: ArticleSection[];
  title?: string;
  subtitle?: string;
  thumbnail?: string;
  thumbnailImage?: ImageMetadata;
  images?: ImageMetadata[];
  outgoingLinks?: string[];
  excerpt?: string;
  date?: Date;
  footer?: boolean;
  category?: string;
  readingTime?: number;
  gradeLevel?: number;
  embeddings?: string;
  counts?: {
    sentences: number;
    words: number;
  };
  spotifyId?: string;
  spotify?: {
    album: Album;
    track: Track;
  };
};

export type Article = BaseArticle<Metadata>;

export type Ride = {
  id: string;
  timestamp: DateTime;
  distance: number;
  duration: number;
  averageSpeed: number;
  maxSpeed: number;
  totalElevationGain: number;
};
