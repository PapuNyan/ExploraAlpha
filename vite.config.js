import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Esto desactiva el bloqueo de seguridad para los túneles como Localtunnel
    allowedHosts: true, 
  }
})
