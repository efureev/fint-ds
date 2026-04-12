import { createApp } from 'vue'

import App from './App.vue'
import '@unocss/reset/tailwind-compat.css'
import '@feugene/granularity/styles/tokens.css'
import '@feugene/granularity/styles/base.css'
import '@feugene/granularity/styles/themes/light.css'
import '@feugene/granularity/components/DsButton/styles.css'
import './app.css'

createApp(App).mount('#app')
