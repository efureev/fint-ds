# Styling and theming

The package uses CSS variables as the main styling contract.

## Available style entry points

- `@feugene/fint-ds/styles.css` — tokens, default themes, and base rules
- `@feugene/fint-ds/base.css` — base rules only, without tokens and themes
- `@feugene/fint-ds/fonts.css` — optional remote font import

## Theme initialization

Use `initThemeEarly()` before mounting Vue to avoid a theme flash:

```ts
import { initThemeEarly } from '@feugene/fint-ds'

initThemeEarly()
```

For UI switching, use `useTheme()` or the exported `ThemeSwitcher` component.

## Persistence options

By default, the package stores the theme in `localStorage` under `fint-ds-theme`.

```ts
import { initThemeEarly, useTheme } from '@feugene/fint-ds'

initThemeEarly({ storageKey: 'my-app-theme' })

const { toggleTheme } = useTheme({ storageKey: 'my-app-theme' })
```

Disable persistence when needed:

```ts
initThemeEarly({ persist: false })
```

## Customization

Import your overrides after the package styles:

```ts
import '@feugene/fint-ds/styles.css'
import './styles/app-overrides.css'
```

Override tokens on the same selectors as the package themes:

```css
:root {
  --primary: #0ea5e9;
  --primary-foreground: #ffffff;
}

.theme-dark,
[data-theme='dark'] {
  --primary: #38bdf8;
  --primary-foreground: #082f49;
}
```

Public customization targets include colors, semantic states, sidebar tokens, chart tokens, radius values, shadows, and font variables.