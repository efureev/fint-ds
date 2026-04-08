# fint-ds (Vue 3)

`@feugene/fint-ds` is a Vue 3 design-system package. Consumers install the published package and use the build artifacts from `dist`.

Русская версия: [`docs/ru/installation.md`](./docs/ru/installation.md)

## Documentation

- [`docs/en/installation.md`](./docs/en/installation.md) — installation, UnoCSS setup, plugin registration
- [`docs/en/styling.md`](./docs/en/styling.md) — styles, themes, CSS variables, customization
- [`docs/en/localization.md`](./docs/en/localization.md) — built-in i18n, `vue-i18n`, `@feugene/fint-i18n`
- [`docs/en/directives.md`](./docs/en/directives.md) — package directives

Russian documentation:

- [`docs/ru/installation.md`](./docs/ru/installation.md)
- [`docs/ru/styling.md`](./docs/ru/styling.md)
- [`docs/ru/localization.md`](./docs/ru/localization.md)
- [`docs/ru/directives.md`](./docs/ru/directives.md)

## Quick start

1. Install the package:

```bash
yarn add @feugene/fint-ds
```

2. Import the package styles once in `main.ts`:

```ts
import '@feugene/fint-ds/styles.css'
```

If your app already uses UnoCSS, keep that setup on the app side and continue importing its reset / `virtual:uno.css` as usual.

3. Apply the theme before mounting the app:

```ts
import { initThemeEarly } from '@feugene/fint-ds'

initThemeEarly()
```

4. Register the plugin:

```ts
import { createApp } from 'vue'
import FintDs from '@feugene/fint-ds'

createApp(App)
  .use(FintDs)
  .mount('#app')
```

For the full setup, see [`docs/en/installation.md`](./docs/en/installation.md).
