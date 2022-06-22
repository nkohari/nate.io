import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwind from 'tailwindcss';
import tailwindConfig from './tailwind.config.js';
import { ContentPlugin, MarkdocTagRegistration } from './build';
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
    ContentPlugin({
      componentsPath: './src/components',
      contentPath: './content',
      tags: Object.values(tags) as MarkdocTagRegistration[],
    }),
    react(),
  ],
});
