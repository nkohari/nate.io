import path from 'node:path';
import {defineConfig} from 'vite';
import {apocrypha} from '@nkohari/apocrypha';
import react from '@vitejs/plugin-react-swc';
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
  css: {
    postcss: {
      plugins: [tailwind(tailwindConfig)],
    },
  },
  plugins: [
    apocrypha<Metadata>({
      paths: {
        assets: 'media',
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
  resolve: {
    alias: {
      build: path.resolve(__dirname, './build'),
      src: path.resolve(__dirname, './src'),
    },
  },
});
