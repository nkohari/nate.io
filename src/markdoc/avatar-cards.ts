import {MarkdocDeclaration} from 'build/types';

export const avatarCards: MarkdocDeclaration = {
  tag: 'avatar-cards',
  render: 'AvatarCards',
  attributes: {
    count: {type: Number},
  },
};
