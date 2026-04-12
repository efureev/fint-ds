# `apps/playground-2`

Демо для **способа 2** из `packages/granularity/README.md`: минимальный JS bundle через component subpath import.

## Что показывает приложение

- `DsButton` импортируется только из `@feugene/granularity/components/DsButton`;
- фокус demo — минимизация JS-графа, поэтому в `granularity`-chunk попадает только код кнопки и её общих внутренних зависимостей;
- для рабочего UI здесь намеренно оставлен общий `styles.css`, чтобы пример был максимально простым и запускаемым.

## Как работает

```ts
import { DsButton } from '@feugene/granularity/components/DsButton'
import '@feugene/granularity/styles/tokens.css'
import '@feugene/granularity/styles/base.css'
import '@feugene/granularity/styles/themes/light.css'
import '@feugene/granularity/styles.css'
```

## Что ожидать в `dist`

- `assets/index-*.js` — код demo-приложения;
- `assets/vue-*.js` — runtime `vue`;
- `assets/granularity-*.js` — отдельный чанк только с кодом `DsButton` subpath entry;
- `assets/granularity-*.css` — foundation-слои и общий utility CSS пакета;
- `assets/index-*.css` — локальный shell CSS приложения.
