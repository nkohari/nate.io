import { getAssetUrl } from '@apocrypha/core/assets';
import { useMediaQuery } from 'react-responsive';
import { Ascii, CursorRipples, ImageTexture, Shader, SimplexNoise } from 'shaders/react';

export function NotFound() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <main className="relative flex-1 flex flex-col items-center justify-center">
      <Shader className="w-full max-w-[1200px] max-h-[600px] px-8">
        <Ascii
          characters="01"
          cellSize={isMobile ? 50 : 25}
          spacing={0.6}
          gamma={2}
          fontFamily="IBM Plex Mono"
        >
          <CursorRipples intensity={5} decay={10} edges="transparent">
            <SimplexNoise
              colorA="#ffffff"
              colorB="#666666"
              contrast={2}
              speed={5}
              scale={5}
              maskSource="404"
              maskType="luminance"
            >
              <ImageTexture id="404" url={getAssetUrl('images/404.png')} />
            </SimplexNoise>
          </CursorRipples>
        </Ascii>
      </Shader>
      <div className="flex flex-row items-center text-sm md:text-md italic">
        That page appears to have been eaten by a grue.
      </div>
    </main>
  );
}
