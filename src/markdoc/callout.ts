import {MarkdocDeclaration} from 'build/types';

export const callout: MarkdocDeclaration = {
  tag: 'callout',
  render: 'Callout',
  attributes: {
    type: {type: String, matches: ['info', 'warning'], default: 'info'},
  },
};
