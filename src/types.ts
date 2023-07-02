import {Article as BaseArticle} from '@nkohari/apocrypha';
import {Album, Track} from 'build/spotify';

export type ArticleType = 'instructional' | 'narrative' | 'page' | 'vignette' | 'music';
export type ArticleState = 'archived' | 'draft' | 'live';

export type ArticleSection = {
  id: string;
  level: number;
  text: string;
};

export type Metadata = {
  type: ArticleType;
  state: ArticleState;
  sections: ArticleSection[];
  title?: string;
  subtitle?: string;
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

export type Article = BaseArticle<Metadata>;

export type Ride = {
  id: string;
  timestamp: string;
  distance: number;
  duration: number;
  averageSpeed: number;
  maxSpeed: number;
  totalElevationGain: number;
};
