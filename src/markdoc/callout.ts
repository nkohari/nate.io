import {MarkdocDeclaration} from '@nkohari/apocrypha';

export const callout: MarkdocDeclaration = {
  tag: 'callout',
  render: 'Callout',
  attributes: {
    type: {type: String, matches: ['info', 'warning'], default: 'info'},
  },
};
