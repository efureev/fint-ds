import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  root: fileURLToPath(new URL('./', import.meta.url)),
  plugins: [
    vue(),
    Icons({
      compiler: 'vue3',
      autoInstall: false,
    }),
    UnoCSS({
      configFile: fileURLToPath(new URL('./uno.config.ts', import.meta.url)),
    }),
  ],
  resolve: {
    alias: {
      // Keep the same alias as the library build (`@` -> `src`) so internal imports like `@/styles/*` work.
      '@': fileURLToPath(new URL('../src', import.meta.url)),
      '@ds': fileURLToPath(new URL('../src', import.meta.url)),
    },
  },
})
