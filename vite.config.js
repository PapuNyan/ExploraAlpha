import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5178,
    strictPort: true, // Esto evita que cambie de puerto si hay un error
    cors: true // Habilita Cross-Origin Resource Sharing
  }
})