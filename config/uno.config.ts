import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetMini,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import { presetFintDs } from '../src/uno.ts'

export default defineConfig({
  content: {
    // We keep some utility class strings in plain TypeScript modules (e.g. `dsButtonStyles.ts`).
    // Ensure UnoCSS extracts tokens from those `.ts` files as well, otherwise styles won't be generated.
    pipeline: {
      include: [/\.(vue|ts)($|\?)/],
    },
  },
  presets: [
    presetMini(),
    presetFintDs(),
    presetAttributify(),
    presetIcons({
      scale: 1.05,
      extraProperties: {
        display: 'inline-block',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  shortcuts: {
    'ds-page': 'max-w-[1200px] mx-auto px-6 py-6',
    'ds-h1': 'text-[28px] font-600 leading-tight text-[var(--foreground)]',
    'ds-h2': 'text-[20px] font-600 leading-tight text-[var(--foreground)]',
  },
})