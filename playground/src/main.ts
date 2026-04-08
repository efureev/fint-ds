import { createApp } from 'vue'

import { installI18n } from '@feugene/fint-i18n/vue'
import App from './App.vue'
import { createPlaygroundI18n } from './i18n/createPlaygroundI18n'

// Playground must include UnoCSS runtime output.
import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'

// Use the same styles as consumers of the library.
import '@ds/styles.ts'

// Register components globally like in real apps.
import FintDs from '@ds'
import { initThemeEarly } from '@ds/composables/useTheme'

// Apply theme before mount to avoid "flash".
initThemeEarly()

async function bootstrap() {
  const i18n = await createPlaygroundI18n()

  const app = createApp(App)

  installI18n(app, i18n)

  app
    .use(FintDs, { i18n })
    .mount('#app')
}

void bootstrap()
