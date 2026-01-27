import { getAssetUrl } from '@apocrypha/core/assets';
import cx from 'classnames';
import { FILTER_PREFIX } from './AvatarFilters';

export type AvatarImageProps = {
  filter: number;
  flip?: boolean;
};

export function AvatarImage({ flip = false, filter }: AvatarImageProps) {
  return (
    <img
      src={getAssetUrl('images/avatar.webp')}
      style={{ filter: `url(#${FILTER_PREFIX}${filter})` }}
      className={cx(
        'absolute rounded-lg backface-hidden aspect-square cursor-pointer select-none',
        flip && 'rotate-y-180',
      )}
      height={280}
      width={280}
      draggable={false}
      alt="Me (Nate)"
    />
  );
}
