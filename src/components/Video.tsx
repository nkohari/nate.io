import { getAssetUrl } from '@apocrypha/core/assets';
import cx from 'classnames';
import { VideoMetadata } from 'src/types';
import { useReducedMotion } from 'src/util';

const CORNER_CLASSES = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

export type VideoCorners = keyof typeof CORNER_CLASSES;

export const VideoPlayMode = ['auto', 'hover'] as const;
export type VideoPlayMode = (typeof VideoPlayMode)[number];

export type VideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  children?: React.ReactNode;
  corners?: VideoCorners;
  height: number;
  width: number;
  play: VideoPlayMode;
  metadata: VideoMetadata;
};

export function Video({
  className,
  children,
  corners,
  height,
  width,
  play,
  metadata,
  src,
  ...props
}: VideoProps) {
  const reducedMotion = useReducedMotion();
  const { format } = metadata;

  let videoUrl = null;
  let posterUrl = null;

  if (src) {
    videoUrl = getAssetUrl(`videos/${src}`);

    if (!videoUrl) {
      console.warn(`Unknown video with path ${src}`);
    }

    const poster = src.replace(/\.[^.]+$/, '.webp');
    posterUrl = getAssetUrl(`videos/${poster}`);
  }

  const handleMouseEnter = (evt: React.MouseEvent<HTMLVideoElement>) => {
    if (play === 'hover' && !reducedMotion) {
      evt.currentTarget.play();
    }
  };

  const handleMouseLeave = (evt: React.MouseEvent<HTMLVideoElement>) => {
    if (play === 'hover' && !reducedMotion) {
      evt.currentTarget.pause();
      evt.currentTarget.currentTime = 0;
    }
  };

  return (
    <div className={cx('mb-6 w-full overflow-hidden', className)}>
      <video
        src={videoUrl || undefined}
        poster={posterUrl || undefined}
        className={cx('w-full bg-background-alt', corners && CORNER_CLASSES[corners])}
        data-video-format={format}
        style={{ aspectRatio: width / height }}
        controls={false}
        autoPlay={play === 'auto'}
        loop
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
      {children}
    </div>
  );
}
