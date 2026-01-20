import { getAssetUrl } from '@apocrypha/core/assets';
import cx from 'classnames';
import { useRef, useState } from 'react';
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
  const { format } = metadata;
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

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

  const handleMouseEnter = () => {
    if (play === 'hover' && !reducedMotion && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (play === 'hover' && !reducedMotion && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div
      className={cx(
        'relative mb-6 w-full overflow-hidden',
        corners && CORNER_CLASSES[corners],
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {posterUrl && (
        <img
          src={posterUrl || undefined}
          alt="Video poster"
          className={cx(
            'absolute inset-0 w-full bg-background-alt object-cover',
            isPlaying && 'hidden',
          )}
        />
      )}
      <video
        ref={videoRef}
        src={videoUrl || undefined}
        className="w-full"
        data-video-format={format}
        style={{ aspectRatio: width / height }}
        autoPlay={play === 'auto'}
        muted
        playsInline
        loop
        {...props}
      />
      {children}
    </div>
  );
}
