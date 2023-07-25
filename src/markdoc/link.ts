import {MarkdocDeclaration} from 'build/types';

export const link: MarkdocDeclaration = {
  node: 'link',
  render: 'Link',
  attributes: {
    href: {type: String},
  },
};
