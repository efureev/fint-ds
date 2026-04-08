# Локализация

`@feugene/fint-ds` поставляется с готовыми переводами для `en`, `ru` и `es`, но сама локализация настраивается в конечном приложении при подключении и использовании пакета.

При этом большинство текстов можно переопределить снаружи — на стороне приложения, через собственные словари и общий i18n-слой.

Предпочтительный вариант интеграции — через `@feugene/fint-i18n`: в этом случае приложение само управляет локалью, сохранением выбранного языка и композицией переводов, а `@feugene/fint-ds` только добавляет свои locale loaders.

## Рекомендуемый вариант: `@feugene/fint-i18n`

[`@feugene/fint-i18n`](https://github.com/efureev/fint-i18n) — библиотека локализации для Vue 3 с ленивой загрузкой блоков переводов, композицией loaders и расширяемыми плагинами.

Пакет экспортирует `fintDsLocaleLoaders` для композиции в i18n-конфигурации приложения:

```ts
import { createFintI18n } from '@feugene/fint-i18n'
import { fintDsLocaleLoaders } from '@feugene/fint-ds'

const i18n = createFintI18n({
  locale: 'en',
  fallbackLocale: 'en',
  loaders: [fintDsLocaleLoaders],
})
```

В реальном приложении именно приложение определяет активную локаль, fallback-локаль, стратегию сохранения, объединяет переводы `@feugene/fint-ds` с остальными словарями проекта и при необходимости переопределяет большую часть текстов пакета своими значениями.

## Минимальное подключение через `@feugene/fint-i18n`

Если в приложении пока нет общего i18n-слоя, можно создать небольшой i18n-инстанс рядом с `main.ts` и передать его в пакет — именно так это сделано в `playground`:

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

Если нужно хранить выбранную локаль, это настраивается на стороне приложения через плагины `@feugene/fint-i18n`, например `PersistencePlugin`.

Даже в таком минимальном варианте локализация всё равно остаётся ответственностью приложения: оно создаёт i18n-инстанс, определяет locale/fallback и при необходимости подключает persistence, свои словари и внешние переопределения текстов.

## Интеграция с `vue-i18n`

Если приложение уже использует `vue-i18n`, подключить пакет можно в самом конце через адаптер `i18n`. `@feugene/fint-ds` не зависит от `vue-i18n`, но позволяет передать функцию перевода и ссылку на локаль приложения:

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

Если внешний переводчик возвращает исходный ключ, пакет использует свои встроенные словари как fallback.