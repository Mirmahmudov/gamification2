import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Classic Vite + TailwindCSS 3 konfiguratsiyasi
export default defineConfig({
  plugins: [react()],
});

