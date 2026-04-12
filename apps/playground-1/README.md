# `apps/playground-1`

Демо для **способа 1** из `packages/granularity/README.md`: root JS import + foundation layers + общий `styles.css` пакета.

## Что показывает приложение

- компоненты импортируются из `@feugene/granularity`;
- стили подключаются через `tokens.css`, `base.css`, `themes/light.css` и общий `styles.css`;
- на экране есть `DsInput` и `DsButton`, чтобы проверить и JS, и CSS сценарий самого простого подключения.

## Как работает

```ts
import { DsButton, DsInput } from '@feugene/granularity'
import '@feugene/granularity/styles/tokens.css'
import '@feugene/granularity/styles/base.css'
import '@feugene/granularity/styles/themes/light.css'
// import '@feugene/granularity/styles/themes/dark.css'
import '@feugene/granularity/styles.css'
```

## Что ожидать в `dist`

- `assets/index-*.js` — код самого demo-приложения;
- `assets/vue-*.js` — отдельный runtime `vue`;
- `assets/granularity-*.js` — отдельный чанк `@feugene/granularity`;
- `assets/granularity-*.css` — foundation-слои пакета и общий utility CSS пакета;
- `assets/index-*.css` — локальный shell CSS самого приложения.
