import { Config } from '@markdoc/markdoc';
import { Album, Track } from 'lib/spotify';

export type ArticleType = 'instructional' | 'narrative' | 'page' | 'vignette' | 'music';
export type ArticleState = 'archived' | 'draft' | 'live';

export type ArticleSection = {
  id: string;
  level: number;
  text: string;
};

export type ArticleMetadata = {
  type: ArticleType;
  state: ArticleState;
  sections: ArticleSection[];
  title?: string;
  subtitle?: string;
  heroImage?: string;
  images?: string[];
  outgoingLinks?: string[];
  excerpt?: string;
  date?: Date;
  footer?: boolean;
  category?: string;
  readingTime?: number;
  gradeLevel?: number;
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

export type Article = {
  chunkId: string;
  metadata: ArticleMetadata;
  path: string;
};

export type MarkdocTransformConfig = Config & {
  metadata: ArticleMetadata;
};
