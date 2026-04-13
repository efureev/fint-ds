import { createApp } from 'vue'

import { initThemeEarly } from '@feugene/granularity'

import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'
import './styles/showcase-theme.css'

import App from './App.vue'
import { router } from './app/router'


initThemeEarly()

createApp(App)
  .use(router)
  .mount('#app')