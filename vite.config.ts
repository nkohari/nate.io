import {defineConfig} from 'vite';
import {apocrypha} from '@nkohari/apocrypha';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwind from 'tailwindcss';
import tailwindConfig from './tailwind.config.js';
import {readConfig} from './build/config';
import {
  getBasicMetadata,
  getContentStats,
  getExcerpt,
  getImages,
  getOutgoingLinks,
  getSections,
  getSpotifyData,
} from './build/metadata';
import {Metadata} from './src/types';

export default defineConfig({
  build: {
    manifest: true,
  },
  css: {
    postcss: {
      plugins: [tailwind(tailwindConfig)],
    },
  },
  plugins: [
    tsconfigPaths(),
    apocrypha<Metadata>({
      paths: {
        components: 'src/components',
        content: 'content',
        declarations: 'src/markdoc',
      },
      plugins: {
        metadata: [
          getBasicMetadata,
          getContentStats,
          getExcerpt,
          getImages,
          getOutgoingLinks,
          getSections,
          getSpotifyData(readConfig(), '.cache'),
        ],
      },
    }),
    react(),
  ],
});
