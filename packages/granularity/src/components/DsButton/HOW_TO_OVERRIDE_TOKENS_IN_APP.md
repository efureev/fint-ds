### Задача

Если пакет `granularity` менять не нужно, цвет `DsButton` можно переопределить в конечном приложении через CSS custom properties.

Текущая реализация `DsButton` уже читает значения из component token'ов вида `--ds-button-<tone>-...`, а они, в свою очередь, могут ссылаться на semantic token'ы `--ds-<tone>-...`.

Это означает, что в приложении есть два безопасных уровня override:

1. Переопределить semantic token целиком.
2. Переопределить только button-specific token, не затрагивая другие компоненты.

### Что лучше переопределять

#### Вариант 1. Переопределить semantic token

Используй этот путь, если новый цвет должен примениться везде, где используется конкретный tone (`DsButton`, `DsBadge`, `DsAlert` и т.д.).

Пример:

```css
:root {
  --ds-azure: #0891b2;
  --ds-azure-light: #cffafe;
  --ds-azure-foreground: #ffffff;
  --ds-azure-text: #155e75;
  --ds-azure-hover: #0e7490;
  --ds-azure-active: #155e75;
}
```

#### Вариант 2. Переопределить только `DsButton`

Используй этот путь, если новый цвет нужен только для кнопок, а остальные компоненты должны остаться на стандартной semantic-палитре.

Пример:

```css
:root {
  --ds-button-azure-background: #0369a1;
  --ds-button-azure-background-hover: #075985;
  --ds-button-azure-background-active: #0c4a6e;
  --ds-button-azure-foreground: #ffffff;
  --ds-button-azure-soft-background: #e0f2fe;
  --ds-button-azure-soft-background-hover: color-mix(in srgb, #0ea5e9 20%, var(--background));
  --ds-button-azure-soft-background-active: color-mix(in srgb, #0ea5e9 26%, var(--background));
}
```

### Где размещать override в приложении

#### Глобально для всего приложения

Подходит для brand theme / white-label / кастомной темы продукта.

```css
/* app.css */
:root {
  --ds-button-info-background: #0f766e;
  --ds-button-info-background-hover: #115e59;
  --ds-button-info-background-active: #134e4a;
  --ds-button-info-foreground: #ffffff;
}

.dark {
  --ds-button-info-background: #0f766e;
  --ds-button-info-background-hover: #115e59;
  --ds-button-info-background-active: #134e4a;
  --ds-button-info-foreground: #f8fafc;
}
```

#### Локально внутри конкретного экрана / feature-блока

Подходит для sandbox, preview и A/B-сравнений, как в `apps/playground-5/src/App.vue`.

```vue
<template>
  <section class="custom-info-scope">
    <DsButton tone="info">Info</DsButton>
  </section>
</template>

<style scoped>
.custom-info-scope {
  --ds-button-info-background: #475569;
  --ds-button-info-background-hover: #334155;
  --ds-button-info-background-active: #1e293b;
  --ds-button-info-foreground: #ffffff;
  --ds-button-info-soft-background: #e2e8f0;
  --ds-button-info-soft-background-hover: color-mix(in srgb, #475569 20%, var(--background));
  --ds-button-info-soft-background-active: color-mix(in srgb, #475569 26%, var(--background));
}
</style>
```

### Какие token'ы у `DsButton` можно переопределять

Для каждого `tone` компонент читает такие token'ы:

- `--ds-button-<tone>-background`
- `--ds-button-<tone>-background-hover`
- `--ds-button-<tone>-background-active`
- `--ds-button-<tone>-foreground`
- `--ds-button-<tone>-soft-background`
- `--ds-button-<tone>-soft-background-hover`
- `--ds-button-<tone>-soft-background-active`

На сегодня в пакете уже есть такие tone:

- `primary`
- `success`
- `warning`
- `danger`
- `info`
- `slate`
- `azure`

Отдельно `neutral` в `DsButton` использует общие surface token'ы (`--secondary`, `--secondary-hover`, `--secondary-active`, `--secondary-foreground`, `--border`).

### Когда override делать через semantic token, а когда через button token

Переопределяй `--ds-<tone>` если:

- цвет — часть общей продуктовой темы;
- этот tone должен одинаково выглядеть в нескольких компонентах;
- тебе не нужна special-case настройка именно под button contrast.

Переопределяй `--ds-button-<tone>-...` если:

- меняется только `DsButton`;
- semantic color хороший, но для filled button недостаточно контрастен;
- нужно быстро сделать preview без правок пакета.

### Рекомендации по безопасности override

1. Переопределяй сразу весь набор state token'ов: `default`, `hover`, `active`.
2. Для filled button всегда проверяй контраст текста.
3. Если используешь локальный scope, переопределяй token'ы на контейнере, который реально оборачивает `DsButton`.
4. Для dark theme задавай отдельные значения, если в продукте используется `.dark`, `.theme-dark` или `[data-theme='dark']`.
5. Если цвет меняется только для playground / demo, лучше использовать локальный scope, а не глобальный `:root`.