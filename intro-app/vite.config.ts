import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, '../DevWithPiyush/src/DevWithPiyush.Web/wwwroot'),
    emptyOutDir: false, // Crucial: Do not clear wwwroot, as it contains site.css, site.js, favicon etc.
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        intro: resolve(__dirname, 'src/main.tsx'),
      },
      output: {
        entryFileNames: 'js/intro.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'css/intro.css';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
})
