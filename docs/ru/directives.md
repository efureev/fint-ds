# Директивы

Пакет экспортирует небольшой набор переиспользуемых директив.

## `v-autofocus`

Фокусирует корневой элемент или первый подходящий вложенный focusable-элемент.

```vue
<DsInput v-autofocus v-model="email" type="email" />
```

Чтобы отключить директиву, передайте `false`, либо используйте объект опций с `selector`, `preventScroll` и `disabled`.

## `v-autosize`

Автоматически подстраивает высоту `textarea` под контент.

```vue
<textarea v-autosize v-model="text" />
```

## `v-click-outside`

Вызывает обработчик при клике вне привязанного элемента.

```vue
<div v-click-outside="close">...</div>
```

## `v-hotkey`

Позволяет назначать обработчики на горячие клавиши.

```vue
<div v-hotkey="{ Escape: close, 'Ctrl+K': openSearch }" />
```

## `v-loading`

Монтирует loading-overlay с `DsLoading`. То же поведение доступно через `createLoading()`.

```vue
<div v-loading="{ loading, text: loadingText, animated: true }">Content</div>
```