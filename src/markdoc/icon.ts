import {MarkdocDeclaration} from '@nkohari/apocrypha';

export const icon: MarkdocDeclaration = {
  tag: 'icon',
  render: 'Icon',
  attributes: {
    type: {type: String},
    size: {type: String, required: false},
  },
};