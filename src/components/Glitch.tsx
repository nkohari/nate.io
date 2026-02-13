import { getAssetUrl } from '@apocrypha/core/assets';
import cx from 'classnames';
import { useState } from 'react';
import { CRTScreen, Glitch as GlitchShader, ImageTexture, Shader } from 'shaders/react';
import { CORNER_CLASSES, Corners } from 'src/components/framework/Corners';
import { ImageMetadata } from 'src/types';

export type GlitchProps = {
  className?: string;
  corners?: Corners;
  src: string;
  metadata: ImageMetadata;
};

export function Glitch({ className, corners, metadata, src }: GlitchProps) {
  const [isHovering, setIsHovering] = useState(false);
  const { height, width } = metadata;

  let imageUrl = null;
  if (src) {
    imageUrl = getAssetUrl(`images/${src}`);
    if (!imageUrl) {
      console.warn(`Unknown image with path ${src}`);
    }
  }

  return (
    <div
      className={cx('mb-6 w-full', className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Shader
        shader={GlitchShader}
        className={cx('w-full overflow-hidden', corners && CORNER_CLASSES[corners])}
        style={{ aspectRatio: width / height }}
      >
        <GlitchShader intensity={isHovering ? 0.75 : 0}>
          {imageUrl && <ImageTexture url={imageUrl} objectFit="cover" />}
        </GlitchShader>
      </Shader>
    </div>
  );
}
