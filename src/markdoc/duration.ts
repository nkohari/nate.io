import {MarkdocDeclaration} from '@nkohari/apocrypha';

export const duration: MarkdocDeclaration = {
  tag: 'duration',
  render: 'Duration',
  attributes: {
    since: {type: String},
  },
};
