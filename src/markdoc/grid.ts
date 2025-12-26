import { MarkdocDeclaration } from 'build/types';

export const grid: MarkdocDeclaration = {
  tag: 'grid',
  render: 'Grid',
  attributes: {
    cols: { type: Number },
    gap: { type: Number, required: false },
  },
};
