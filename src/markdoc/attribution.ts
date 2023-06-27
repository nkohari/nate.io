import {MarkdocDeclaration} from '@nkohari/apocrypha';

export const attribution: MarkdocDeclaration = {
  tag: 'attribution',
  render: 'ImageAttribution',
  attributes: {
    name: {type: String, required: true},
    href: {type: String, required: true},
  },
};
