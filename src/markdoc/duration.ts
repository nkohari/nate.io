import { MarkdocDeclaration } from 'build/types';

export const duration: MarkdocDeclaration = {
  tag: 'duration',
  render: 'Duration',
  attributes: {
    since: { type: String },
    pluralize: { type: Boolean },
  },
};
