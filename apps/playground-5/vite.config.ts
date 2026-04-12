import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

export const playground5GranularityDistDir = fileURLToPath(new URL('../../packages/granularity/dist/', import.meta.url))
export const playground5VueChunkGroup = {
  name: 'vue',
  test: /node_modules[\\/](?:vue|@vue)[\\/]/,
  priority: 2,
}
export const playground5GranularityChunkGroup = {
  name: 'granularity',
  test: (id: string) => id.startsWith(playground5GranularityDistDir),
  priority: 1,
}

export default defineConfig({
  root: fileURLToPath(new URL('./', import.meta.url)),
  base: '/playground-5/',
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            playground5VueChunkGroup,
            playground5GranularityChunkGroup,
          ],
        },
      },
    },
  },
  plugins: [
    vue(),
    UnoCSS({
      configFile: fileURLToPath(new URL('./uno.config.ts', import.meta.url)),
    }),
  ],
})
