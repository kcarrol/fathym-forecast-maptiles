import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/habistack': {
        target: 'https://fathym-cloud-prd.azure-api.net/habistack/weather/ground/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/habistack/, ''),
      }
    },
  },
});