import { MarkdocDeclaration } from 'build/types';

export const articleGrid: MarkdocDeclaration = {
  tag: 'article-grid',
  render: 'ArticleGrid',
  attributes: {
    placeholder: { type: String },
  },
};
