# Стилизация и темы

Пакет использует CSS variables как основной контракт кастомизации.

## Доступные точки входа для стилей

- `@feugene/fint-ds/styles.css` — токены, темы по умолчанию и базовые правила
- `@feugene/fint-ds/base.css` — только базовые правила, без токенов и тем
- `@feugene/fint-ds/fonts.css` — опциональный импорт удалённых шрифтов

## Инициализация темы

Используйте `initThemeEarly()` до монтирования Vue, чтобы избежать мигания темы:

```ts
import { initThemeEarly } from '@feugene/fint-ds'

initThemeEarly()
```

Для переключения темы в интерфейсе используйте `useTheme()` или экспортируемый компонент `ThemeSwitcher`.

## Опции хранения

По умолчанию тема хранится в `localStorage` по ключу `fint-ds-theme`.

```ts
import { initThemeEarly, useTheme } from '@feugene/fint-ds'

initThemeEarly({ storageKey: 'my-app-theme' })

const { toggleTheme } = useTheme({ storageKey: 'my-app-theme' })
```

Если хранение не нужно, отключите его:

```ts
initThemeEarly({ persist: false })
```

## Кастомизация

Подключайте свои override-стили после стилей пакета:

```ts
import '@feugene/fint-ds/styles.css'
import './styles/app-overrides.css'
```

Переопределяйте токены на тех же селекторах, что и темы пакета:

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

Публично поддерживаемые точки кастомизации включают цвета, semantic-состояния, токены sidebar, токены графиков, радиусы, тени и шрифтовые переменные.