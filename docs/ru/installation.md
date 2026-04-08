# Установка

`@feugene/fint-ds` рассчитан на Vue 3 и публикует готовые стили для компонентов. Для базового использования пакета отдельная настройка UnoCSS в приложении-потребителе не обязательна.

## Установка

```bash
yarn add @feugene/fint-ds
```

Если приложение само использует UnoCSS, оставьте его настройку как есть — пакет не требует отдельно сканировать свой `dist` для базовой интеграции.

## Подключение стилей

Для базового подключения достаточно один раз импортировать стили пакета в `main.ts`:

```ts
import '@feugene/fint-ds/styles.css'
```

Если нужны только базовые правила пакета, а токены и темы вы задаёте сами, импортируйте `@feugene/fint-ds/base.css` вместо `styles.css`.

Если приложение уже использует UnoCSS для собственного интерфейса, его импорты остаются на стороне приложения:

```ts
import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'

import '@feugene/fint-ds/styles.css'
```

## Настройка UnoCSS

`presetFintDs()` нужен только как дополнительный preset для самого приложения — например, если вы хотите использовать те же rules / variants из пакета в собственных шаблонах.

Для обычного использования компонентов `@feugene/fint-ds` он не обязателен: пакет уже поставляет собранный `styles.css`.

Также `presetFintDs()` добавляет только свои правила и safelist, а не требует сканирования опубликованной сборки пакета.

Если приложение уже работает на UnoCSS и вы хотите подключить preset пакета, достаточно такого конфига:

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

## Подключение плагина

```ts
import { createApp } from 'vue'
import FintDs, { initThemeEarly } from '@feugene/fint-ds'

initThemeEarly()

createApp(App)
  .use(FintDs)
  .mount('#app')
```

Из корневой точки входа пакет экспортирует компоненты, директивы, composable-функции и служебные стили.