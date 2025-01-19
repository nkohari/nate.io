import path from 'node:path';
import { apocrypha } from '@apocrypha/core';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { readConfig } from './build/config';
import {
  getBasicMetadata,
  getContentStats,
  getExcerpt,
  getImages,
  getOutgoingLinks,
  getSections,
  getSpotifyData,
} from './build/metadata';
import { Metadata } from './src/types';

export default defineConfig({
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
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      build: path.resolve(__dirname, './build'),
      src: path.resolve(__dirname, './src'),
    },
  },
});
