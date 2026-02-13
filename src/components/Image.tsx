import { getAssetUrl } from '@apocrypha/core/assets';
import cx from 'classnames';
import { CORNER_CLASSES, Corners } from 'src/components/framework/Corners';
import { ImageMetadata } from 'src/types';

export type ImageFilter = 'grayscale' | 'sepia';

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  children?: React.ReactNode;
  corners?: Corners;
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
