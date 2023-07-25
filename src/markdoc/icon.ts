import {MarkdocDeclaration} from 'build/types';

export const icon: MarkdocDeclaration = {
  tag: 'icon',
  render: 'Icon',
  attributes: {
    type: {type: String},
    size: {type: String, required: false},
  },
};
