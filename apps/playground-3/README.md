# `apps/playground-3`

Демо для **способа 3** из `packages/granularity/README.md`: точечное подключение CSS только для нужного компонента.

## Что показывает приложение

- `DsButton` импортируется через component subpath;
- CSS собирается из foundation-слоёв плюс `@feugene/granularity/components/DsButton/styles.css`;
- итоговый `dist` должен быть самым компактным по CSS среди вариантов с готовыми пакетными CSS-файлами.

## Как работает

```ts
import { DsButton } from '@feugene/granularity/components/DsButton'
import '@feugene/granularity/styles/tokens.css'
import '@feugene/granularity/styles/base.css'
import '@feugene/granularity/styles/themes/light.css'
import '@feugene/granularity/components/DsButton/styles.css'
```

## Что ожидать в `dist`

- `assets/index-*.js` — код demo-приложения;
- `assets/vue-*.js` — runtime `vue`;
- `assets/granularity-*.js` — отдельный чанк с кодом `DsButton`;
- `assets/granularity-*.css` — только `tokens`, `base`, `light theme` и `DsButton/styles.css`;
- `assets/index-*.css` — локальный shell CSS приложения.
