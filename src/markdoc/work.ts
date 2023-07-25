import {MarkdocDeclaration} from 'build/types';

export const work: MarkdocDeclaration = {
  tag: 'work',
  render: 'Work',
  attributes: {
    from: {type: String},
    job: {type: String},
    location: {type: String},
    note: {type: String},
    to: {type: String},
  },
};
