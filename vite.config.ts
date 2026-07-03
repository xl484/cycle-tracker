import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/cycle-tracker/',
  build: { outDir: 'docs' },
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000
  }
});
