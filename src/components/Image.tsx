import cx from 'classnames';
import {getImageUrl} from 'src/util';

export type ImageFilter = 'grayscale' | 'sepia';

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  children?: React.ReactNode;
  filter?: ImageFilter;
  format: string;
  height: number;
  rounded?: string;
  thumbnail?: string;
  width: number;
};

export const Image = ({
  alt,
  className,
  children,
  filter,
  format,
  height,
  rounded,
  src,
  thumbnail,
  width,
  ...props
}: ImageProps) => {
  let imageUrl = null;

  if (src) {
    imageUrl = getImageUrl(src);
    if (!imageUrl) {
      console.warn(`Unknown image with path ${src}`);
    }
  }

  return (
    <div className={cx('mb-6 w-full', className)}>
      <img
        src={imageUrl || undefined}
        alt={alt}
        className={cx(
          'w-full bg-slate-200 dark:bg-slate-700',
          filter,
          rounded && `rounded-${rounded}`
        )}
        height={height}
        width={width}
        data-image-format={format}
        {...props}
      />
      {children}
    </div>
  );
};
