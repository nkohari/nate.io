import React from 'react';
import classNames from 'classnames';
import { getImageUrl } from 'src/util';

export type ImageFilter = 'grayscale' | 'sepia';

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  children?: React.ReactNode;
  circle?: boolean;
  filter?: ImageFilter;
  format: string;
  height: number;
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

  const containerClasses = classNames(
    'mb-6 w-full rounded bg-slate-200 dark:bg-slate-700',
    className
  );
  const imageClasses = classNames(filter, {
    'rounded-full': circle,
  });

  return (
    <div className={containerClasses}>
      <img
        src={imageUrl || undefined}
        alt={alt}
        className={imageClasses}
        height={height}
        width={width}
        data-image-format={format}
        {...props}
      />
      {children}
    </div>
  );
};
