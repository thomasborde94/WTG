import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      'process.env.REACT_APP_RAWG_API_KEY': JSON.stringify(env.REACT_APP_RAWG_API_KEY),
    },
    plugins: [react()],
    server: {
      proxy: {
        // Proxy les requêtes API vers le backend
        '/api': {
          target: 'http://localhost:3000', // URL du backend
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
