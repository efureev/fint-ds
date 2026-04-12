# Каталог компонентов

`@feugene/granularity` публикует компоненты через root barrel и через component subpath export-ы.

## Рекомендуемый импорт

Для точечного использования компонентов предпочтителен формат:

```ts

```

Для быстрого старта допустим root import:

```ts

```

## Опубликованные компоненты

По текущему component registry пакет публикует следующие компоненты:

- `DsAlert`
- `DsAvatar`
- `DsBadge`
- `DsBadgeWrap`
- `DsBottomNav`
- `DsButton`
- `DsButtonGroup`
- `DsCard`
- `DsCheckbox`
- `DsCollapse`
- `DsConfirmDialog`
- `DsDataTable`
- `DsDialog`
- `DsDrawer`
- `DsDropdown`
- `DsDropdownMenu`
- `DsEmptyState`
- `DsFileUpload`
- `DsFormField`
- `DsFormFile`
- `DsFormSection`
- `DsIcon`
- `DsImageViewer`
- `DsInput`
- `DsInputTag`
- `DsLink`
- `DsList`
- `DsLoading`
- `DsModal`
- `DsNavbar`
- `DsNumberInput`
- `DsPagination`
- `DsProgressBar`
- `DsPromptDialog`
- `DsRadio`
- `DsRadioGroup`
- `DsSelect`
- `DsSidebar`
- `DsSkeleton`
- `DsSwitch`
- `DsTable`
- `DsTabs`
- `DsTextarea`
- `DsToaster`
- `DsTooltip`
- `DsTree`
- `DsTreeSelect`

## Стили компонентов

Для каждого опубликованного компонента можно подключать component-level CSS через путь вида:

```ts
import '@feugene/granularity/components/DsButton/styles.css'
```

Важно помнить, что такие стили обычно используются вместе с foundation layers:

```ts
import '@feugene/granularity/styles/tokens.css'
import '@feugene/granularity/styles/base.css'
import '@feugene/granularity/styles/themes/light.css'
import '@feugene/granularity/components/DsButton/styles.css'
```

## Как работать с каталогом

- если нужен быстрый обзор возможностей пакета — используйте этот список как индекс компонентов;
- если нужен минимальный bundle — импортируйте только нужные компоненты через subpath;
- если приложение подключает всё через `UnoCSS`, выбор компонентов можно передавать в `presetGranularity` или `presetGranularityNode`.