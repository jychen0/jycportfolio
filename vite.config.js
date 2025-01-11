import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { writeFileSync, copyFileSync } from 'fs';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    {
      name: 'copy-404',
      apply: 'build',
      closeBundle() {
        // Copy `dist/index.html` to `dist/404.html`
        copyFileSync(resolve(__dirname, 'dist/index.html'), resolve(__dirname, 'dist/404.html'));
      },
    },
  ],
});
