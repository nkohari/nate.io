import {MarkdocDeclaration} from 'build/types';

export const attribution: MarkdocDeclaration = {
  tag: 'attribution',
  render: 'ImageAttribution',
  attributes: {
    name: {type: String, required: true},
    href: {type: String, required: true},
  },
};
