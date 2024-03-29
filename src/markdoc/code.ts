import {MarkdocDeclaration} from 'build/types';

export const code: MarkdocDeclaration = {
  node: 'code',
  render: 'Code',
  attributes: {
    content: {type: String},
    language: {type: String},
  },
};
