import { getAssetUrl } from '@apocrypha/core/assets';
import cx from 'classnames';
import { ImageMetadata } from 'src/types';

const CORNER_CLASSES = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

export type ImageCorners = keyof typeof CORNER_CLASSES;
export type ImageFilter = 'grayscale' | 'sepia';

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  children?: React.ReactNode;
  corners?: ImageCorners;
  filter?: ImageFilter;
  metadata: ImageMetadata;
};

export function Image({
  alt,
  className,
  children,
  corners,
  filter,
  metadata,
  src,
  ...props
}: ImageProps) {
  const { format, height, width } = metadata;

  let imageUrl = null;
  if (src) {
    imageUrl = getAssetUrl(`images/${src}`);
    if (!imageUrl) {
      console.warn(`Unknown image with path ${src}`);
    }
  }

  return (
    <div className={cx('mb-6 w-full', className)}>
      <img
        src={imageUrl || undefined}
        className={cx('w-full bg-background-alt', filter, corners && CORNER_CLASSES[corners])}
        data-image-format={format}
        style={{ aspectRatio: width / height }}
        {...props}
        alt={alt}
      />
      {children}
    </div>
  );
}
