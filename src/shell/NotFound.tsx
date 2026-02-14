import { getAssetUrl } from '@apocrypha/core/assets';
import { Ascii, CursorRipples, ImageTexture, Shader, SimplexNoise } from 'shaders/react';
import { Link } from 'src/components';

export function NotFound() {
  return (
    <main className="relative flex-1 flex flex-col items-center justify-center pt-4">
      <Shader className="w-full max-w-[1200px] px-8">
        <Ascii characters="01" cellSize={25} spacing={0.6} gamma={2} fontFamily="IBM Plex Mono">
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
      <div className="flex flex-row items-center text-md italic">
        That page appears to have been eaten by a grue.
      </div>
    </main>
  );
}
