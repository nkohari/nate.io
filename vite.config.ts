import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import imagemin from 'vite-plugin-imagemin';
import tailwind from 'tailwindcss';
import tailwindConfig from './tailwind.config.js';
import { nateio, MarkdocTagRegistration } from './build';
import {
  getArticleState,
  getArticleType,
  getContentStats,
  getExcerpt,
  getImages,
  getOutgoingLinks,
} from './build/metadata';
import * as tags from './src/tags';

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
    nateio({
      componentsPath: './src/components',
      contentPath: './content',
      metadataPlugins: [
        getArticleState,
        getArticleType,
        getContentStats,
        getExcerpt,
        getImages,
        getOutgoingLinks,
      ],
      tags: tags as Record<string, MarkdocTagRegistration>,
    }),
    react(),
    imagemin(),
  ],
});
