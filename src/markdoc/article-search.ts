import { MarkdocDeclaration } from 'build/types';

export const articleSearch: MarkdocDeclaration = {
  tag: 'article-search',
  render: 'ArticleSearch',
  attributes: {
    topK: { type: Number, default: 10 },
    placeholder: { type: String },
  },
};
