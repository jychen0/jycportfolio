import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  return {
    base: command === 'build' ? '/jycportfolio/' : './', 
    plugins: [react()]
  };
});