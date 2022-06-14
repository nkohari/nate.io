import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import imagemin from 'vite-plugin-imagemin';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwind from 'tailwindcss';
import tailwindConfig from './tailwind.config.js';
import {
  getArticleState,
  getArticleType,
  getContentStats,
  getExcerpt,
  getImages,
  getOutgoingLinks,
  nateio,
  MarkdocTagRegistration,
} from './build';
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
    tsconfigPaths(),
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
