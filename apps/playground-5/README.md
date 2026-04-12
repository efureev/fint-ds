# `apps/playground-5`

Демо для **способа 5** из `packages/granularity/README.md`: генерация CSS через `UnoCSS` и `@feugene/granularity/uno-node`.

## Что показывает приложение

- JS для `DsButton` остаётся granular за счёт subpath import;
- CSS не импортируется вручную из файлов пакета;
- `presetGranularityNode()` сам подмешивает `tokens`, `base`, встроенную тему `light` и стили выбранного компонента.

## Как работает

```ts
import { presetGranularityNode } from '@feugene/granularity/uno-node'

presetGranularityNode({
  components: ['DsButton'],
})
```

## Что ожидать в `dist`

- `assets/index-*.js` — код demo-приложения;
- `assets/vue-*.js` — runtime `vue`;
- `assets/granularity-*.js` — granular JS-код `DsButton`;
- `assets/index-*.css` — CSS, сгенерированный `UnoCSS`, внутри которого уже есть foundation-слои и utility-стили `DsButton`.
