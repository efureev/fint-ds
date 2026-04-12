# `apps/playground-4`

Демо для **способа 4** из `packages/granularity/README.md`: granular JS + общий `styles.css` пакета.

## Что показывает приложение

- `DsButton` и `DsInput` импортируются через subpath export-ы;
- CSS подключается одним общим `@feugene/granularity/styles.css`;
- сценарий полезен, когда JS хочется держать granular, а CSS — подключать просто и единым файлом.

## Как работает

```ts
import { DsButton } from '@feugene/granularity/components/DsButton'
import { DsInput } from '@feugene/granularity/components/DsInput'
import '@feugene/granularity/styles/tokens.css'
import '@feugene/granularity/styles/base.css'
import '@feugene/granularity/styles/themes/light.css'
import '@feugene/granularity/styles.css'
```

## Что ожидать в `dist`

- `assets/index-*.js` — код demo-приложения;
- `assets/vue-*.js` — runtime `vue`;
- `assets/granularity-*.js` — granular JS для реально импортированных subpath entrypoint-ов;
- `assets/granularity-*.css` — foundation-слои пакета и общий utility CSS;
- `assets/index-*.css` — локальный shell CSS приложения.
