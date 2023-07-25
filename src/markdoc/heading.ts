import {MarkdocDeclaration} from 'build/types';

export const heading: MarkdocDeclaration = {
  node: 'heading',
  render: 'Heading',
  attributes: {
    id: {type: String},
    level: {type: Number, required: true, default: 1},
  },
};
