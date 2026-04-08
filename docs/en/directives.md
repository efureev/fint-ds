# Directives

The package exports a small set of reusable directives.

## `v-autofocus`

Focuses the root element or the first matching focusable child.

```vue
<DsInput v-autofocus v-model="email" type="email" />
```

Use `false` to disable it or pass an options object with `selector`, `preventScroll`, and `disabled`.

## `v-autosize`

Automatically resizes a `textarea` to its content.

```vue
<textarea v-autosize v-model="text" />
```

## `v-click-outside`

Calls a handler when the user clicks outside the bound element.

```vue
<div v-click-outside="close">...</div>
```

## `v-hotkey`

Maps hotkeys to handlers.

```vue
<div v-hotkey="{ Escape: close, 'Ctrl+K': openSearch }" />
```

## `v-loading`

Mounts a loading overlay with `DsLoading`. The same feature is also available through `createLoading()`.

```vue
<div v-loading="{ loading, text: loadingText, animated: true }">Content</div>
```