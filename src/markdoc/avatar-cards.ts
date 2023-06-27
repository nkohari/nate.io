import {MarkdocDeclaration} from '@nkohari/apocrypha';

export const avatarCards: MarkdocDeclaration = {
  tag: 'avatar-cards',
  render: 'AvatarCards',
  attributes: {
    count: {type: Number},
  },
};
