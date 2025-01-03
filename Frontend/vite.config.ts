import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Set Vite to use port 3000
    host: '0.0.0.0'  // Allow external access (required for Docker)
  }
})
