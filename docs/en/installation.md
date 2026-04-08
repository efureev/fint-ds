# Installation

`@feugene/fint-ds` is built for Vue 3 and ships ready-to-use component styles. You do not need a separate UnoCSS setup in the host app for the basic package integration.

## Install

```bash
yarn add @feugene/fint-ds
```

If your app already uses UnoCSS, keep that setup as-is — the package does not require scanning its own `dist` output for the basic integration.

## Import styles

For the basic setup, importing the package styles once in `main.ts` is enough:

```ts
import '@feugene/fint-ds/styles.css'
```

If you want to keep only the package base rules and provide your own tokens/themes, import `@feugene/fint-ds/base.css` instead of `styles.css`.

If the app already uses UnoCSS for its own UI, keep those imports on the app side:

```ts
import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'

import '@feugene/fint-ds/styles.css'
```

## UnoCSS setup

`presetFintDs()` is only an optional preset for the host application — for example, when you want to reuse the package rules / variants in your own templates.

It is not required for the normal use of `@feugene/fint-ds` components, because the package already ships its compiled `styles.css`.

`presetFintDs()` also only adds its own rules and safelist, and does not require scanning the published package build.

If your app already runs UnoCSS and you want to enable the package preset, this is enough:

```ts
// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetMini,
  transformerVariantGroup,
} from 'unocss'
import { presetFintDs } from '@feugene/fint-ds/uno'

export default defineConfig({
  presets: [
    presetMini(),
    presetFintDs(),
    presetAttributify(),
    presetIcons(),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
})
```

## Plugin registration

```ts
import { createApp } from 'vue'
import FintDs, { initThemeEarly } from '@feugene/fint-ds'

initThemeEarly()

createApp(App)
  .use(FintDs)
  .mount('#app')
```

The package exports components, directives, composables, and helper styles from the root entry.