import {MarkdocDeclaration} from '@nkohari/apocrypha';

export const heading: MarkdocDeclaration = {
  node: 'heading',
  render: 'Heading',
  attributes: {
    id: {type: String},
    level: {type: Number, required: true, default: 1},
  },
};
