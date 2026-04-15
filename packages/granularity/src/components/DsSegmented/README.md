# DsSegmented — ТЗ и план реализации

## 1. Зачем нужен новый компонент

`DsSegmented` нужен как отдельный control для **выбора одного значения из небольшого набора взаимоисключающих опций** с
сильным визуальным акцентом на текущий выбор.

Это **не замена**:

- `DsSwitch` — потому что `switch` остаётся бинарным `true/false` контролом;
- `DsRadioGroup` — потому что radio-group остаётся более общим form-control с обычным `radiobox`/`button`
  представлением;
- `DsButtonGroup` — потому что button-group сам по себе не решает задачу единого selected-state с moving indicator.

`DsSegmented` нужен для сценариев уровня:

- `RU / EN`
- `List / Board / Calendar`
- `Day / Week / Month`
- `Draft / Review / Published`

Ключевой UX-паттерн: **selected-track / selected-fill визуально “катается” от текущей позиции к новой**, а не
пересоздаётся и не прыгает из начала.

---

## 2. Цели

### Основные

- сделать отдельный, чистый и лёгкий primitive для segmented UX;
- поддержать 2 представления:
    - `pills` — мягкий capsule / pill style;
    - `button` — вариант ближе к `DsButtonGroup`, но тоже с moving selected-fill;
- обеспечить высокое качество анимации, доступности и визуальной читаемости;
- не трогать и не усложнять текущие `DsSwitch`, `DsRadio`, `DsRadioGroup`.

### Приоритеты

1. производительность;
2. красота и аккуратность анимации;
3. лёгкость использования и предсказуемый DX;
4. минимально достаточный API без лишней кастомизационной грязи.

---

## 3. Не-цели первой версии

Чтобы компонент остался лёгким и не разрастался преждевременно, в `v1` **не включать**, если не появится реальный
запрос:

- multi-select;
- вертикальную ориентацию;
- drag / swipe gesture navigation;
- избыточный style API вида `rootClass`, `itemClass`, `indicatorClass`, `labelClass`, `trackClass`, `styles.*` и т. п.;
- alias-конфиг для произвольных ключей `options` в стиле `props.value/label/disabled`;
- отдельный дочерний primitive `DsSegmentedItem`;
- tooltip API на уровне ядра компонента;
- поддержку сложных асинхронных loading-состояний внутри самого компонента.

Если эти задачи реально понадобятся позже — лучше добавлять их отдельными небольшими итерациями.

---

## 4. Анализ внешних решений

### 4.1. `Element Plus`

Референс: `element-plus` segmented.

Что полезно взять:

- модель `options + v-model` как основной happy path;
- scoped slot для кастомного рендера опции;
- нативную radio-семантику (`role="radiogroup"` + `input[type="radio"]`);
- отдельный `selected`-элемент поверх трека с изменением `transform` и `width/height`;
- перерасчёт геометрии по `ResizeObserver`;
- `block`-режим;
- per-option `disabled`.

Что не стоит копировать напрямую:

- широкий alias API через `props.value/label/disabled` — для нашей дизайн-системы это лишний уровень сложности без явной
  пользы;
- вертикальный режим в `v1` — это отдельный набор edge cases для индикатора, размеров и клавиатурной навигации;
- слишком общий form-driven API, если нет конкретного сценария интеграции.

### 4.2. `Ant Design` / `Ant Design Vue`

Референс: `Segmented` из семейства `antd` / `ant-design-vue`.

Что полезно взять:

- поддержку иконки рядом с label;
- `block` как практичный проп для равномерного растягивания по ширине;
- `name` для реальных радио-инпутов и корректного браузерного keyboard behavior;
- shape/variant thinking: один и тот же control может иметь разные визуальные режимы без смены семантики;
- идею, что segmented — это не generic style-wrapper, а отдельный high-clarity control.

Что важно учесть как анти-примеры / риски:

- в зрелых реализациях segmented часто всплывают баги именно вокруг **анимации индикатора**: он может стартовать не из
  текущей позиции, а из начала;
- второй частый класс багов — **keyboard navigation по disabled item**;
- слишком широкий semantic-style API быстро размывает контракт компонента и ухудшает DX.

### 4.3. Вывод по внешнему анализу

Для `DsSegmented` в этой кодовой базе оптимален **узкий и качественный API**:

- `options`
- `v-model`
- `variant`
- `size`
- `block`
- `disabled`
- `name`
- `ariaLabel`
- один scoped slot для кастомного содержимого опции

Этого достаточно, чтобы закрыть реальные UI/UX-сценарии без ненужной архитектурной тяжести.

---

## 5. Позиционирование относительно текущих компонентов

### `DsSegmented` vs `DsRadioGroup`

- `DsRadioGroup` — более общий form control;
- `DsSegmented` — специальный control для компактного, визуально сильного single-choice switcher'а.

### `DsSegmented` vs `DsButtonGroup`

- `DsButtonGroup` — контейнер-компоновщик кнопок;
- `DsSegmented` — stateful single-select control с нативной радио-семантикой и moving indicator.

### `DsSegmented` vs `DsSwitch`

- `DsSwitch` — бинарное действие/состояние;
- `DsSegmented` — выбор одного значения из набора.

---

## 6. Предлагаемый API `v1`

## 6.1. Типы

```ts
export type DsSegmentedVariant = 'pills' | 'button'
export type DsSegmentedSize = 'sm' | 'md' | 'lg'
export type DsSegmentedValue = string | number

export type DsSegmentedOption = {
    value: DsSegmentedValue
    label?: string
    icon?: Component
    disabled?: boolean
}
```

### Почему `string | number`, а не `boolean`

- для segmented-control это более естественная модель;
- меньше риск неоднозначностей при работе с DOM, keys, dataset и сравнением;
- бинарные сценарии с `boolean` уже закрывает `DsSwitch`.

Если позже появится реальный запрос — тип можно расширить отдельно.

## 6.2. Props

```ts
const props = withDefaults(defineProps<{
    modelValue: DsSegmentedValue
    options: DsSegmentedOption[]
    variant?: DsSegmentedVariant
    size?: DsSegmentedSize
    block?: boolean
    disabled?: boolean
    name?: string
    ariaLabel?: string
}>(), {
    variant: 'pills',
    size: 'md',
    block: false,
    disabled: false,
    name: undefined,
    ariaLabel: undefined,
})
```

### Принципы API

- `options` — основной способ использования;
- `modelValue` — controlled API, согласованный с остальной дизайн-системой;
- без uncontrolled-режима в `v1`;
- без перегруза кастомизационными пропсами;
- без variant-specific пропсов, пока нет реальной необходимости.

## 6.3. Events

```ts
const emit = defineEmits<{
    (e: 'update:modelValue', value: DsSegmentedValue): void
    (e: 'change', value: DsSegmentedValue, option: DsSegmentedOption): void
}>()
```

`change` нужен как удобный интеграционный хук без повторного поиска опции по value во внешнем коде.

## 6.4. Slots

```vue

<template #default="{ option, selected, disabled }">
  ...
</template>
```

### Почему именно один scoped slot

- даёт достаточно гибкости для текста, иконки, badge и stacked-content;
- не требует ввода отдельного `DsSegmentedItem`;
- сохраняет компактный API и хороший DX;
- не блокирует быстрый сценарий через обычные `options`.

---

## 7. Визуальные варианты

## 7.1. `variant="pills"`

Назначение:

- язык / view mode / timeframe;
- компактные и тактильно-мягкие переключатели;
- интерфейсы, где важны лёгкость и визуальная чистота.

Визуальные принципы:

- общий track — мягкий, muted, капсульный;
- selected indicator — отдельная светлая/поднятая pill-плашка;
- активный текст читается сильнее, неактивный — спокойнее;
- hover не должен спорить с selected-state;
- анимация — короткая, гладкая, без “дёргания”.

## 7.2. `variant="button"`

Назначение:

- view switchers ближе к toolbar / panel controls;
- интерфейсы, где segmented должен ощущаться более структурно и плотнее.

Визуальные принципы:

- общий контейнер ближе по языку к `DsButtonGroup`;
- выбранная заливка/трек тоже “катается” между элементами;
- unselected item визуально напоминает neutral/outline button-state;
- selected item имеет более явный контраст и чёткую геометрию.

---

## 8. Рендер-модель и DOM-анатомия

Предлагаемая структура:

```html

<div data-ds-segmented role="radiogroup" aria-label="...">
    <div data-ds-segmented-track>
        <div data-ds-segmented-indicator aria-hidden="true"></div>

        <label data-ds-segmented-item>
            <input type="radio"/>
            <span data-ds-segmented-item-content>...</span>
        </label>

        ...
    </div>
</div>
```

### Почему такая модель

- нативные `radio` дают правильную семантику и keyboard behavior;
- `label + input` упрощают hit area;
- отдельный `indicator` позволяет анимировать только геометрию selected-fill;
- контент item остаётся на месте и не пересоздаётся при смене value.

---

## 9. Анимация moving indicator

## 9.1. UX-требование

Selected-track должен **ехать из текущей позиции в новую**, а не:

- появляться заново;
- прыгать из начала трека;
- исчезать между состояниями;
- анимировать `all` и вызывать визуальную грязь.

## 9.2. Технический принцип

Индикатор — это **один постоянный абсолютный элемент** внутри трека.

Он обновляет только:

- `transform`
- `width`
- при необходимости `height`

Пример расчётной модели:

```ts
type IndicatorMetrics = {
    ready: boolean
    x: number
    width: number
}
```

Логика:

1. после mount / update найти selected item;
2. измерить `offsetLeft` + `offsetWidth` или `getBoundingClientRect()`;
3. записать значения в CSS variables / inline style;
4. индикатор плавно переедет из старой геометрии в новую;
5. на первом paint индикатор должен появиться **сразу в текущей позиции**, без “залёта слева”.

## 9.3. Что важно для качества

- переход только по `transform, width`;
- не использовать `transition: all`;
- не демонтировать индикатор при каждом выборе;
- не рассчитывать индикатор до появления реального DOM;
- при ресайзе контейнера пересчитывать метрики;
- при reorder / replace `options` корректно пересчитывать положение;
- если selected option отсутствует — индикатор скрыть.

---

## 10. Поведение и состояния

Компонент должен поддерживать:

- обычное состояние;
- `hover`;
- `active`;
- `selected`;
- `focus-visible`;
- `disabled` всего компонента;
- `disabled` отдельных опций.

### Особые правила

- disabled item не должен становиться выбранным через mouse или keyboard;
- если `modelValue` уже указывает на disabled option, компонент должен корректно отрисоваться, но не позволять
  дальнейшее взаимодействие с этой опцией;
- при смене `options` компонент не должен падать, если текущее значение исчезло;
- при длинном тексте label должен быть аккуратный `ellipsis` или адекватный overflow policy;
- при `icon-only` вариантах hit area и selected-state должны оставаться очевидными.

---

## 11. Accessibility

`DsSegmented` должен быть полноценным single-choice control, а не только красивой декоративной группой.

### Обязательно в `v1`

- `role="radiogroup"` на корне;
- реальные `input[type="radio"]` внутри item;
- поддержка `name`;
- корректная работа `Tab` / `Shift+Tab`;
- переключение стрелками в пределах группы;
- `focus-visible` состояние без визуального шума;
- disabled items исключаются из интеракции;
- `aria-label`, если внешний label не задан.

### Важно проверить

- поведение при `block`;
- поведение при icon-only;
- контраст selected / unselected в обеих темах;
- отсутствие ловушек фокуса.

---

## 12. Performance-требования

Компонент должен оставаться лёгким даже при частом переключении.

### Обязательные требования

- без сторонних animation libraries;
- без тяжёлых watcher-цепочек на каждый item;
- один постоянный индикатор, а не ререндер всей selected-структуры;
- минимум layout thrashing: сначала read, затем write;
- пересчёт геометрии только когда это действительно нужно:
    - mount;
    - `modelValue` change;
    - `options` change;
    - resize;
- `ResizeObserver` использовать нативный, в стиле уже существующих компонентов проекта;
- анимация через `transform`, а не через `left`.

### Нежелательно

- измерять все item на каждый ховер;
- пересоздавать refs-коллекцию без необходимости;
- прокидывать десятки class/style пропсов ради кастомизации.

---

## 13. DX-требования

Компонент должен быть простым для использования в 2 основных сценариях.

### Сценарий 1 — быстрый

```vue

<DsSegmented
    v-model="locale"
    :options="[
    { value: 'ru', label: 'RU' },
    { value: 'en', label: 'EN' },
  ]"
/>
```

### Сценарий 2 — кастомный контент

```vue

<DsSegmented v-model="view" :options="viewOptions" variant="button">
  <template #default="{ option, selected }">
    <span class="inline-flex items-center gap-2">
      <component :is="option.icon" class="h-4 w-4"/>
      <span>{{ option.label }}</span>
      <DsBadge v-if="selected" size="sm">Active</DsBadge>
    </span>
  </template>
</DsSegmented>
```

### DX-принципы

- happy path без бойлерплейта;
- scoped slot только один, понятный и предсказуемый;
- без раздутого API;
- названия пропсов и событий должны быть консистентны с остальной DS.

---

## 14. Предлагаемая структура файлов

На этапе реализации компонент должен жить здесь:

```text
packages/granularity/src/components/DsSegmented/
  README.md
  DsSegmented.vue
  dsSegmentedStyles.ts
  safelist.ts
  config.ts
  index.ts
  __tests__/DsSegmented.test.ts
```

### Комментарии

- `dsSegmentedStyles.ts` — вычисление классов и size/variant-token mapping;
- `safelist.ts` — только реально нужные классы;
- `config.ts` — в текущем стиле registry компонентов;
- `index.ts` — единая точка экспорта типов и компонента.

---

## 15. Детали реализации

## 15.1. Архитектурный подход

Реализация должна быть **самодостаточной**, без попытки натянуть `DsSegmented` на `DsRadioGroup`.

Причины:

- у segmented другая DOM-анатомия;
- moving indicator — собственная логика;
- проще держать чистый контракт и не плодить ветвления в старых компонентах.

При этом можно переиспользовать:

- size-токены и визуальные принципы `DsButton`;
- композиционные идеи `DsButtonGroup`;
- паттерн `ResizeObserver`, уже применяемый в проекте.

## 15.2. Измерение индикатора

Нужны:

- `rootRef` / `trackRef`;
- коллекция item refs по `option.value`;
- `indicatorStyle` как computed/ref-object;
- `scheduleMeasure()` через `nextTick`;
- один `ResizeObserver` для контейнера и, при необходимости, selected item.

## 15.3. Стили

Стили лучше строить на CSS variables + компактных utility classes.

Нужно предусмотреть как минимум:

- размеры по `sm/md/lg`;
- radius;
- paddings;
- text styles;
- background для track;
- background/shadow для indicator;
- цвет текста в `selected` / `unselected` / `disabled`.

## 15.4. Visual tokens

Предлагаемый принцип токенизации:

- общие tokens компонента: track bg, indicator bg, indicator shadow, item color, selected item color;
- variant-specific значения через computed class map или CSS variables;
- без внешнего цветового API в `v1`, если это не требуется прямо сейчас.

---

## 16. Решения, которые стоит принять заранее

### Принять

- controlled-only API;
- `options` как основная входная модель;
- scoped slot для кастомного рендера;
- `pills` как default variant;
- отдельный absolute indicator;
- нативные radio inputs;
- `block` как единственный layout-проп `v1`.

### Осознанно не брать в `v1`

- vertical;
- alias props для кастомных ключей;
- semantic `classNames/styles` объект как в `antd`;
- отдельные color props;
- мультиселект;
- внутреннее состояние вместо `v-model`.

---

## 17. План реализации

## Этап 1. Скелет компонента

- создать каталог `DsSegmented/`;
- добавить `DsSegmented.vue`, `index.ts`, `config.ts`, `safelist.ts`, `dsSegmentedStyles.ts`;
- определить публичные типы `variant`, `size`, `value`, `option`.

## Этап 2. Базовый рендер и семантика

- реализовать `options` + `v-model`;
- отрисовать `radiogroup` и реальные `radio` inputs;
- сделать click + keyboard interaction;
- добавить disabled на группу и опцию.

## Этап 3. Moving indicator

- добавить один абсолютный индикатор;
- измерять selected item после mount/update;
- пересчитывать метрики при смене value и resize;
- убедиться, что индикатор едет из текущей позиции, а не из нуля.

## Этап 4. Визуальные варианты

- собрать `pills`;
- собрать `button`;
- выровнять размеры `sm/md/lg`;
- довести hover/active/focus-visible/disabled.

## Этап 5. DX и custom rendering

- добавить scoped slot;
- проверить текст + иконки + смешанный контент;
- убедиться, что API остаётся компактным.

## Этап 6. Тесты

Добавить тесты минимум на:

- рендер options;
- controlled update;
- `change` event;
- group disabled;
- option disabled;
- keyboard navigation;
- `block`;
- `variant="pills"`;
- `variant="button"`;
- корректный пересчёт индикатора;
- отсутствие “прыжка из начала” при controlled update.

## Этап 7. Showcase

Добавить демо как минимум на:

- basic pills;
- button variant;
- icon + label;
- icon-only;
- disabled items;
- block/full-width;
- language switcher / view switcher сценарий.

---

## 18. Тестовая стратегия

### Unit / component tests

- проверка `aria` и ролей;
- проверка эмитов;
- проверка disabled behavior;
- проверка keyboard interaction;
- мок измерений через `getBoundingClientRect` / `offsetWidth` / `offsetLeft` в jsdom;
- проверка, что индикатор обновляет `transform/width`, а не исчезает.

### Visual / showcase verification

- проверить переключение между соседними и дальними сегментами;
- проверить длинные подписи;
- проверить icon-only;
- проверить тёмную/светлую тему;
- проверить плотность и визуальный баланс в `sm/md/lg`.

---

## 19. Критерии готовности

Компонент можно считать готовым, если:

- он закрывает single-choice сценарии segmented UX без участия старых компонентов;
- `pills` и `button` выглядят как два качественных, завершённых режима одного контрола;
- индикатор двигается плавно и из текущей позиции;
- клавиатура и disabled-state работают корректно;
- API небольшой и понятный;
- showcase демонстрирует реальные use-cases;
- нет миграций существующих компонентов.

---

## 20. Короткая рекомендация по старту реализации

Начинать стоит не со стилей, а в таком порядке:

1. базовая радио-семантика;
2. refs + измерение индикатора;
3. pills variant;
4. button variant;
5. scoped slot;
6. тесты;
7. showcase.

Это даст минимально рискованный и быстрый путь к качественной реализации.