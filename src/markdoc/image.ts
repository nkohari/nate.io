import {MarkdocDeclaration} from '@nkohari/apocrypha';

export const image: MarkdocDeclaration = {
  node: 'image',
  tag: 'image',
  render: 'Image',
  attributes: {
    src: {type: String},
    alt: {type: String},
    rounded: {type: String, matches: ['sm', 'md', 'lg', 'xl', 'full']},
    filter: {type: String, matches: ['grayscale', 'sepia']},
  },
};
