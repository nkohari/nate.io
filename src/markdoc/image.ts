import {MarkdocDeclaration} from '@nkohari/apocrypha';

export const image: MarkdocDeclaration = {
  node: 'image',
  tag: 'image',
  render: 'Image',
  attributes: {
    src: {type: String},
    alt: {type: String},
    circle: {type: Boolean},
    filter: {type: String, matches: ['grayscale', 'sepia']},
  },
};
