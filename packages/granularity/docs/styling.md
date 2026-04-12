# Стилизация и темы

## Слои стилей в `granularity`

Пакет разделяет стили на несколько уровней ответственности:

- `tokens.css` — общие design tokens: шкалы, радиусы, типографика, тени, длительности, формулы и базовые переменные.
- `base.css` — базовые правила и foundation layer поверх токенов.
- `themes/*.css` — semantic values для визуального режима, например `light` и `dark`.
- `components/*/styles.css` — utility CSS конкретного компонента.
- `styles.css` — общий utility CSS для всех зарегистрированных компонентов.

## Рекомендуемый порядок импортов

```ts
import '@feugene/granularity/styles/tokens.css'
import '@feugene/granularity/styles/base.css'
import '@feugene/granularity/styles/themes/light.css'
import '@feugene/granularity/styles.css'
```

Для component-level подключения вместо `styles.css` используйте нужный `components/<Name>/styles.css`.

## Встроенные темы

Пакет публикует две встроенные темы:

- `light`
- `dark`

Подключение светлой темы:

```ts
import '@feugene/granularity/styles/themes/light.css'
```

Подключение тёмной темы:

```ts
import '@feugene/granularity/styles/themes/dark.css'
```

## Граница ответственности: `tokens` vs `theme`

Практическое правило:

- если значение одинаково для разных тем — это `tokens`;
- если значение должно меняться при переключении темы — это `theme`.

Примеры:

- `--ds-space-4`, `--ds-radius-md`, `--ds-duration-fast` → `tokens`;
- `--background`, `--primary`, `--border`, `--ring` → `theme`;
- производные значения вроде `--primary-hover`, если они рассчитываются от semantic-переменных, логично держать рядом с токенами, а не дублировать по темам.

## Сценарии подключения CSS

### Подключить весь utility CSS пакета

```ts
import '@feugene/granularity/styles/tokens.css'
import '@feugene/granularity/styles/base.css'
import '@feugene/granularity/styles/themes/light.css'
import '@feugene/granularity/styles.css'
```

Подходит, если в приложении используется несколько компонентов и не хочется подключать их стили по отдельности.

### Подключить CSS только одного компонента

```ts
import '@feugene/granularity/styles/tokens.css'
import '@feugene/granularity/styles/base.css'
import '@feugene/granularity/styles/themes/light.css'
import '@feugene/granularity/components/DsButton/styles.css'
```

Подходит, если нужен минимальный CSS и набор компонентов контролируется явно.

### Использовать свою тему приложения

Если у приложения есть собственный theme layer, вместо встроенной темы можно подключить свой CSS-файл с semantic tokens. При этом foundation-слои пакета по-прежнему остаются полезными:

```ts
import '@feugene/granularity/styles/tokens.css'
import '@feugene/granularity/styles/base.css'
import './styles/app-theme.css'
import '@feugene/granularity/components/DsButton/styles.css'
```

## Что важно помнить

- `components/*/styles.css` — это только component-level utility CSS; без `tokens`, `base` и темы компонент обычно не будет выглядеть корректно.
- `styles.css` не заменяет foundation layers, а дополняет их.
- если приложение управляет темами самостоятельно, встроенные `light` и `dark` не обязательны.