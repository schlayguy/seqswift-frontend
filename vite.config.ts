import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',                        // ← THIS KILLS THE WHITE SCREEN
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Prevent 404s on .js files
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  }
})
