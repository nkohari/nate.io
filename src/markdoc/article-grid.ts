import { MarkdocDeclaration } from 'build/types';

export const articleGrid: MarkdocDeclaration = {
  tag: 'article-grid',
  render: 'ArticleGrid',
  attributes: {
    state: { type: String, matches: ['live', 'archived'], default: 'live' },
  },
};
