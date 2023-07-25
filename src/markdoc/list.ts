import {MarkdocDeclaration} from 'build/types';

export const list: MarkdocDeclaration = {
  node: 'list',
  render: 'List',
  attributes: {
    ordered: {type: Boolean},
  },
};
