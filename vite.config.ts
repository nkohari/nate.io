import path from 'node:path';
import { apocrypha } from '@apocrypha/core';
import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { readConfig } from './build/config';
import {
  getBasicMetadata,
  getContentStats,
  getEmbeddings,
  getExcerpt,
  getImages,
  getOpenGraphImage,
  getOutgoingLinks,
  getSections,
  getSpotifyData,
  getThumbnail,
  getVideos,
} from './build/metadata';

const CACHE_ROOT = '.cache';
const SPOTIFY_CACHE = path.join(CACHE_ROOT, 'spotify');
const OG_IMAGE_CACHE = path.join(CACHE_ROOT, 'og');

export default defineConfig({
  plugins: [
    apocrypha({
      paths: {
        assets: 'assets',
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
          getVideos,
          getOutgoingLinks,
          getSections,
          getSpotifyData(readConfig(), SPOTIFY_CACHE),
          getOpenGraphImage(OG_IMAGE_CACHE),
        ],
      },
    }),
    tailwindcss(),
    react(),
    cloudflare({ configPath: 'wrangler.jsonc' }),
    viteStaticCopy({
      targets: [{ src: `${OG_IMAGE_CACHE}/*`, dest: 'og' }],
    }),
  ],
  resolve: {
    alias: {
      build: path.resolve(__dirname, './build'),
      src: path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return null;
          }

          if (id.includes('react')) {
            return 'react';
          }

          if (id.includes('motion')) {
            return 'motion';
          }

          if (id.includes('@markdoc') || id.includes('@apocrypha')) {
            return 'markdoc';
          }

          if (id.includes('prismjs')) {
            return 'prism';
          }

          return 'vendor';
        },
      },
    },
  },
});
