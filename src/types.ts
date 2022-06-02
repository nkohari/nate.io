export type ArticleType = 'instructional' | 'narrative' | 'page' | 'vignette';
export type ArticleState = 'archived' | 'draft' | 'live';

export type ArticleMetadata = {
  type: ArticleType;
  state: ArticleState;
  title: string;
  images?: string[];
  outgoingLinks?: string[];
  subtitle?: string;
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
};

export type Article = {
  metadata: ArticleMetadata;
  path: string;
};
