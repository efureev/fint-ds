# Localization

`@feugene/fint-ds` ships with default translations for `en`, `ru`, and `es`, but localization is configured in the consuming application when you install and use the package.

Most texts can also be overridden from the outside at the application level through your own dictionaries and shared i18n layer.

The preferred integration is `@feugene/fint-i18n`: it lets the app own the locale, persistence, and composition of translations, while `@feugene/fint-ds` only contributes its own locale loaders.

## Recommended: `@feugene/fint-i18n`

[`@feugene/fint-i18n`](https://github.com/efureev/fint-i18n) is a Vue 3 localization library with lazy-loaded translation blocks, loader composition, and extensible plugins.

The package exports `fintDsLocaleLoaders` for composition into the app-level i18n setup:

```ts
import { createFintI18n } from '@feugene/fint-i18n'
import { fintDsLocaleLoaders } from '@feugene/fint-ds'

const i18n = createFintI18n({
  locale: 'en',
  fallbackLocale: 'en',
  loaders: [fintDsLocaleLoaders],
})
```

In a real application, localization is still defined by the app itself: it chooses the active locale, fallback locale, persistence strategy, combines `@feugene/fint-ds` translations with the rest of the project dictionaries, and overrides most package texts when needed.

## Minimal setup with `@feugene/fint-i18n`

If the app does not use a shared i18n layer yet, you can create a small i18n instance next to `main.ts` and pass it to the package — this is how the `playground` is wired:

```ts
import { createApp } from 'vue'
import { createFintI18n } from '@feugene/fint-i18n'
import { installI18n } from '@feugene/fint-i18n/vue'
import FintDs, { fintDsLocaleLoaders } from '@feugene/fint-ds'

const i18n = createFintI18n({
  locale: 'en',
  fallbackLocale: 'en',
  loaders: [fintDsLocaleLoaders],
})

const app = createApp(App)

installI18n(app, i18n)

app
  .use(FintDs, { i18n })
  .mount('#app')
```

If you need locale persistence, configure it at the application level through `@feugene/fint-i18n` plugins such as `PersistencePlugin`.

Even in this minimal setup, localization is still owned by the app: it creates the i18n instance, defines locale/fallback behavior, and adds persistence, app dictionaries, or external text overrides when needed.

## `vue-i18n` integration

If your app already uses `vue-i18n`, you can connect it at the end through the `i18n` adapter. `@feugene/fint-ds` does not depend on `vue-i18n`, but it can receive the app translator and a locale ref:

```ts
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import FintDs from '@feugene/fint-ds'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {},
})

createApp(App)
  .use(i18n)
  .use(FintDs, {
    i18n: {
      locale: i18n.global.locale,
      t: (key, params) => i18n.global.t(key, params) as string,
    },
  })
```

If the external translator returns the raw key, the package falls back to its own dictionaries.