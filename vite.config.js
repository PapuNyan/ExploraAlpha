import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: {
        quality: 75, // Comprime los JPG al 75% de calidad
      },
      png: {
        quality: 75, // Comprime los PNG al 75% de calidad
      },
      webp: {
        quality: 80, // Comprime los WebP al 80% de calidad
      },
      svg: {
        multipass: true, // Optimiza el código interno de los SVG
      },
    })
  ],
  optimizeDeps: {
    include: ['react-globe.gl', 'three']
  },
  resolve: {
    alias: {
      three: 'three'
    }
  }
})