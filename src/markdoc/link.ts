import {MarkdocDeclaration} from '@nkohari/apocrypha';

export const link: MarkdocDeclaration = {
  node: 'link',
  render: 'Link',
  attributes: {
    href: {type: String},
  },
};
