import { MarkdocDeclaration } from 'build/types';

export const articleSearch: MarkdocDeclaration = {
  tag: 'article-search',
  render: 'ArticleSearch',
  attributes: {
    placeholder: { type: String },
  },
};
