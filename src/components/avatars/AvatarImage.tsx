import cx from 'classnames';

export type AvatarImageProps = {
  src: string;
  flip?: boolean;
};

export function AvatarImage({ flip = false, src }: AvatarImageProps) {
  return (
    <img
      src={src}
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
