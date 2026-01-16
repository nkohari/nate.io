import path from 'node:path';
import { apocrypha } from '@apocrypha/core';
import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { readConfig } from './build/config';
import {
  getBasicMetadata,
  getContentStats,
  getEmbeddings,
  getExcerpt,
  getImages,
  getOutgoingLinks,
  getSections,
  getSpotifyData,
  getThumbnail,
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
          getThumbnail,
          getContentStats,
          getEmbeddings,
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
    cloudflare({
      persist: true,
      configPath: 'wrangler.jsonc',
    }),
  ],
  resolve: {
    alias: {
      build: path.resolve(__dirname, './build'),
      src: path.resolve(__dirname, './src'),
    },
  },
});
