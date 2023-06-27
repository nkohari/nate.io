import {MarkdocDeclaration} from '@nkohari/apocrypha';

export const list: MarkdocDeclaration = {
  node: 'list',
  render: 'List',
  attributes: {
    ordered: {type: Boolean},
  },
};
