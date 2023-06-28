import cx from 'classnames';
import {getImageUrl} from 'src/util';

export type ImageFilter = 'grayscale' | 'sepia';

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  children?: React.ReactNode;
  circle?: boolean;
  filter?: ImageFilter;
  format: string;
  height: number;
  thumbnail?: string;
  width: number;
};

export const Image = ({
  alt,
  className,
  children,
  circle,
  filter,
  format,
  height,
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
        className={cx('w-full bg-slate-200 dark:bg-slate-700', filter, circle && 'rounded-full')}
        height={height}
        width={width}
        data-image-format={format}
        {...props}
      />
      {children}
    </div>
  );
};
