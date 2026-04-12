import {createApp} from 'vue'

import App from './App.vue'

// Вариант 1: полный пакетный CSS.
// import '@granularity-styles'
// import './styles/light-app.css'

// Вариант 2: granular-подключение только кнопки.
// В built `@granularity-button-css` уже включены `packages/granularity/src/styles/base.css`, utility-стили кнопки и DS theme `light` по умолчанию.
// import '@granularity-button-css'
// import './styles/light-app.css'

// Вариант 3: общий granular CSS для всех компонентов, зарегистрированных в `packages/granularity/src`.
// import '@granularity-all-styles'
// import './styles/light-app.css'

// Вариант 4: granular-подключение через `presetGranularity`.
// `packages/granularity/src/styles/base.css`, utility-стили компонента, DS theme и app theme собираются через `apps/playground/uno.config.ts`.

// Keep UnoCSS only for the playground shell. Package button styles must come from built dist artifacts.
import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'

createApp(App).mount('#app')