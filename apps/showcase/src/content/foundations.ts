import installationDocSource from '../../../../packages/granularity/docs/installation.md?raw'
import localizationDocSource from '../../../../packages/granularity/docs/localization.md?raw'
import stylingDocSource from '../../../../packages/granularity/docs/styling.md?raw'
import unocssDocSource from '../../../../packages/granularity/docs/unocss.md?raw'
import { granularityDefaultThemes, granularityThemeNames } from '../../../../packages/granularity/src/theming/themeRegistry'

type ShowcaseCodeSample = {
  title: string
  code: string
  language: string
}

export type ShowcaseQuickStartCard = {
  id: string
  title: string
  description: string
  code: string
  language: string
  note: string
}

export type ShowcaseFoundationGuide = {
  id: string
  title: string
  summary: string
  description: string
  narrativeSource: string
  sourcePath: string
  keyPoints: string[]
  recommendations: string[]
  codeSamples: ShowcaseCodeSample[]
}

function takeLeadingBlock(source: string, linesCount = 48) {
  return source
    .trim()
    .split('\n')
    .slice(0, linesCount)
    .join('\n')
}

function takeHeadingBlock(source: string, heading: string) {
  const lines = source.trim().split('\n')
  const startIndex = lines.findIndex(line => line.trim() === heading)

  if (startIndex === -1)
    return takeLeadingBlock(source)

  const block: string[] = []

  for (let index = startIndex; index < lines.length; index += 1) {
    const currentLine = lines[index]

    if (index > startIndex && currentLine.startsWith('## '))
      break

    block.push(currentLine)
  }

  return block.join('\n').trim()
}

const rootImportSnippet = `import {
  DsButton,
  DsCard,
} from '@feugene/granularity'

import '@feugene/granularity/styles.css'`

const granularImportSnippet = `import { DsButton } from '@feugene/granularity/components/DsButton'

import '@feugene/granularity/styles.css'`

const granularComponentCssSnippet = `import { DsButton } from '@feugene/granularity/components/DsButton'

import '@feugene/granularity/components/DsButton/styles.css'`

const useThemeSnippet = `import { initThemeEarly, useTheme } from '@feugene/granularity'

initThemeEarly()

const {
  isDark,
  toggleTheme,
} = useTheme()`

const unoNodeSnippet = `import { defineConfig, presetMini } from 'unocss'

import { presetGranularityNode } from '@feugene/granularity/uno-node'

export default defineConfig({
  presets: [
    presetMini(),
    presetGranularityNode({
      components: ['DsButton', 'DsCard'],
    }),
  ],
})`

const localizationSnippet = `import { createFintI18n } from '@feugene/fint-i18n'
import { DS_I18N_BLOCK, dsLocaleLoaders } from '@feugene/granularity/i18n'

const i18n = createFintI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  loaders: [dsLocaleLoaders],
})

i18n.registerBlocks([DS_I18N_BLOCK])
await i18n.loadUsedBlocks('ru')`

const foundationTokenCount = 82

const foundationBaseCssExcerpt = `html,
body {
  height: 100%;
}

body {
  margin: 0;
  font-family: var(--ds-font-ui);
  background: var(--background);
  color: var(--foreground);
}

:where(a, button) {
  background-color: transparent;
}

.ds-card {
  border-radius: var(--ds-radius-lg);
  border: 1px solid var(--border);
  background: var(--card);
  color: var(--card-foreground);
}`

const lightThemeCssExcerpt = `:root {
  --background: #f8fafc;
  --foreground: #0f172a;
  --card: #ffffff;
  --muted: #f1f5f9;
  --border: #e2e8f0;
  --ring: #6366f1;
  --primary: #4f46e5;
  --primary-foreground: #ffffff;
  --ds-success: #10b981;
  --ds-warning: #f97316;
  --ds-danger: #dc2626;
  --ds-info: #6366f1;
}`

const darkThemeCssExcerpt = `.theme-dark,
.dark,
[data-theme='dark'] {
  --background: #0f172a;
  --foreground: #f8fafc;
  --card: #1e293b;
  --muted: #334155;
  --border: #334155;
  --ring: #818cf8;
  --primary: #6366f1;
  --primary-foreground: #ffffff;
  --ds-success: #34d399;
  --ds-warning: #fb923c;
  --ds-danger: #f87171;
  --ds-info: #818cf8;
}`

const tokensCssExcerpt = `:root {
  --ds-slate-0: #ffffff;
  --ds-slate-50: #f8fafc;
  --ds-font-ui: Inter, Roboto, system-ui, sans-serif;
  --ds-font-mono: 'JetBrains Mono', ui-monospace, monospace;
  --ds-text-sm: 14px;
  --ds-text-base: 16px;
  --ds-leading-normal: 1.5;
  --ds-font-semibold: 600;
  --ds-space-2: 8px;
  --ds-space-4: 16px;
  --ds-space-8: 32px;
  --ds-space-16: 64px;
  --ds-radius-md: 8px;
  --ds-radius-lg: 12px;
  --ds-shadow-1: 0 1px 2px rgba(15, 23, 42, 0.08);
  --ds-duration-fast: 150ms;
  --ds-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ds-success-hover: color-mix(in srgb, var(--ds-success) 92%, var(--foreground));
}`

export const showcaseQuickStartCards: ShowcaseQuickStartCard[] = [
  {
    id: 'quick-start-root',
    title: 'Быстрый старт: root import + `styles.css`',
    description: 'Самый прямой сценарий из документации: root API даёт простой вход, а `styles.css` сразу подключает foundation и стили всех компонентов.',
    code: rootImportSnippet,
    language: 'ts',
    note: 'Подходит для первого подключения, прототипов и экранов, где важнее быстрый старт, чем точная настройка bundle.',
  },
  {
    id: 'quick-start-subpath-js',
    title: 'Granular JS: subpath import + `styles.css`',
    code: granularImportSnippet,
    language: 'ts',
    description: 'Сценарий для более точного `JS` bundle: компоненты импортируются через subpath exports, а CSS остаётся в общем пакетном entrypoint-е.',
    note: 'Удобный переходный вариант, если хочется уменьшить `JS`-граф без ручной сборки component-level CSS.',
  },
  {
    id: 'quick-start-component-css',
    title: 'Минимальный CSS для 1–2 компонентов',
    description: 'Если нужен точечный CSS без UnoCSS, используйте component-level bundle: он уже включает foundation и зависимости выбранного компонента.',
    code: granularComponentCssSnippet,
    language: 'ts',
    note: 'Лучше всего работает для 1–2 компонентов; при большем масштабе удобнее общий `styles.css` или preset-подход.',
  },
  {
    id: 'quick-start-uno-node',
    title: 'Предпочтительный путь: UnoCSS + `uno-node`',
    description: 'Рекомендуемый production-сценарий, если приложение уже использует UnoCSS и хочет тонко управлять foundation-слоями, темами и component CSS.',
    code: unoNodeSnippet,
    language: 'ts',
    note: '`@feugene/granularity/uno-node` автоматически подтягивает foundation layers, темы и component CSS.',
  },
  {
    id: 'quick-start-uno-pure',
    title: 'Pure/browser-safe preset: UnoCSS + `uno`',
    description: 'Специальный вариант для интеграций без node-only API и без чтения файлов с диска.',
    code: `import {
  createGranularityCssPreflights,
  presetGranularity,
} from '@feugene/granularity/uno'

presetGranularity({
  components: ['DsButton'],
  preflights: createGranularityCssPreflights([
    ':root { --primary: hotpink; --primary-foreground: white; }',
  ]),
})`,
    language: 'ts',
    note: '`@feugene/granularity/uno` используйте только когда нужен именно pure/browser-safe preset и CSS preflight-ы надо передавать явно.',
  },
]

export const showcaseFoundationStats = [
  {
    id: 'public-components',
    label: 'Компоненты в реестре',
    value: '25+',
    description: 'Showcase уже знает о публичных компонентах через generated registry и build-time API metadata.',
  },
  {
    id: 'theme-modes',
    label: 'Встроенные темы',
    value: `${granularityThemeNames.length}`,
    description: `Дефолтно пакет публикует ${granularityThemeNames.join(' и ')}, при этом по умолчанию активна ${granularityDefaultThemes.join(', ')} theme.`,
  },
  {
    id: 'token-count',
    label: 'Foundation tokens',
    value: `${foundationTokenCount}`,
    description: 'Токены уже вынесены в отдельный слой и доступны для собственного theme layer приложения.',
  },
]

export const showcaseFoundationGuides: ShowcaseFoundationGuide[] = [
  {
    id: 'styling',
    title: 'Styling layers',
    summary: 'Разделяет foundation-слои, theme CSS и component-level styles, чтобы приложение могло выбрать свой уровень контроля.',
    description: 'Стилизация в `granularity` строится вокруг нескольких слоёв: `tokens.css`, `base.css`, theme files и component-level `styles.css`. Foundations page должна объяснять этот контракт раньше, чем пользователь откроет первую компонентную страницу.',
    narrativeSource: takeLeadingBlock(stylingDocSource),
    sourcePath: 'packages/granularity/docs/styling.md',
    keyPoints: [
      '`tokens.css` хранит шкалы, формулы, типографику и базовые дизайн-токены.',
      '`base.css` добавляет foundation rules поверх токенов и не зависит от внешних Uno shortcuts.',
      '`styles.css` не заменяет foundation layers, а только добавляет component-level utility CSS.',
    ],
    recommendations: [
      'Начинайте интеграцию со стандартного порядка импортов: `tokens` → `base` → `theme` → component styles.',
      'Если хотите минимальный CSS без `UnoCSS`, подключайте `components/<Name>/styles.css` точечно.',
      'Для кастомной темы оставляйте foundation layers пакета и подменяйте только semantic theme layer.',
    ],
    codeSamples: [
      {
        title: 'Рекомендуемый порядок импортов',
        code: rootImportSnippet,
        language: 'ts',
      },
      {
        title: 'Foundation base.css excerpt',
        code: foundationBaseCssExcerpt,
        language: 'css',
      },
    ],
  },
  {
    id: 'themes',
    title: 'Themes',
    summary: 'Встроенные `light` и `dark` темы отделены от foundation-токенов и могут жить рядом с кастомными theme layers приложения.',
    description: 'Theme layer определяет semantic значения вроде `--background`, `--primary`, `--border` и статусные роли. Это позволяет использовать один набор foundations и переключать только визуальный режим.',
    narrativeSource: takeHeadingBlock(stylingDocSource, '## Встроенные темы'),
    sourcePath: 'packages/granularity/docs/styling.md',
    keyPoints: [
      `Пакет публикует встроенные темы: ${granularityThemeNames.join(', ')}.`,
      '`light.css` использует `:root`, а `dark.css` поддерживает `.theme-dark`, `.dark` и `[data-theme=\'dark\']`.',
      '`useTheme()` и `initThemeEarly()` уже дают базовый runtime-контракт для переключения темы.',
    ],
    recommendations: [
      'Инициализируйте тему максимально рано, чтобы избежать визуального flash на старте.',
      'Если приложение хранит тему само, оставляйте тот же semantic contract по CSS variables.',
      'Используйте showcase как dogfooding-площадку: shell уже живёт на тех же `light`/`dark` слоях.',
    ],
    codeSamples: [
      {
        title: 'Theme runtime API',
        code: useThemeSnippet,
        language: 'ts',
      },
      {
        title: 'Light theme excerpt',
        code: lightThemeCssExcerpt,
        language: 'css',
      },
      {
        title: 'Dark theme excerpt',
        code: darkThemeCssExcerpt,
        language: 'css',
      },
    ],
  },
  {
    id: 'tokens',
    title: 'Tokens',
    summary: 'Токены фиксируют стабильные дизайн-значения, которые не должны дублироваться по темам и компонентам.',
    description: 'Foundation tokens описывают palette scale, typography, spacing, radii, elevation и motion. Они лежат отдельно от theme layer, чтобы продукт мог переиспользовать базовый контракт и менять только semantic цвета.',
    narrativeSource: tokensCssExcerpt,
    sourcePath: 'packages/granularity/src/styles/tokens.css',
    keyPoints: [
      `В \`tokens.css\` уже вынесено ${foundationTokenCount} токенов и производных формул.`,
      'Практическое правило из docs: всё, что одинаково для тем, живёт в `tokens`, а не в theme files.',
      'Производные interaction values вроде `--primary-hover` считаются от semantic-переменных и не требуют копирования по темам.',
    ],
    recommendations: [
      'Не переносите theme-specific цвета в foundation tokens — это усложнит поддержку `light`/`dark`.',
      'Переопределяйте token layer только когда хотите менять именно базовую шкалу, а не semantic тему.',
      'Показывайте токены рядом с примерами компонентов, чтобы было видно связь между design contract и UI.',
    ],
    codeSamples: [
      {
        title: 'Foundation tokens excerpt',
        code: tokensCssExcerpt,
        language: 'css',
      },
    ],
  },
  {
    id: 'unocss',
    title: 'UnoCSS integration',
    summary: '`uno-node` остаётся предпочтительным preset-путём, а pure/browser-safe `uno` нужен для специальных интеграционных сценариев.',
    description: 'Если приложение уже использует UnoCSS, пакет даёт два preset-а. Foundations должен чётко объяснять, когда нужен node-aware preset с автоподмешиванием CSS preflight-ов, а когда — pure preset без чтения файлов с диска.',
    narrativeSource: takeLeadingBlock(unocssDocSource, 92),
    sourcePath: 'packages/granularity/docs/unocss.md',
    keyPoints: [
      '`@feugene/granularity/uno-node` автоматически подтягивает foundation layers, темы и component CSS.',
      '`@feugene/granularity/uno` не читает файлы с диска и требует явной передачи CSS preflight-ов.',
      'Preset-подход помогает собирать только реально используемые компоненты и темы.',
    ],
    recommendations: [
      'Сначала рассматривайте `uno-node`, а к pure preset переходите только при реальной архитектурной необходимости.',
      'Используйте `components`/`themes` настройки preset-а как основу для performance-полировки showcase.',
      'Связывайте narrative docs по UnoCSS с реальными demo-сценариями компонентов, а не только с конфигами.',
    ],
    codeSamples: [
      {
        title: 'Рекомендуемый `uno-node` preset',
        code: unoNodeSnippet,
        language: 'ts',
      },
      {
        title: 'Source doc excerpt',
        code: takeHeadingBlock(unocssDocSource, '## `@feugene/granularity/uno`'),
        language: 'md',
      },
    ],
  },
  {
    id: 'localization',
    title: 'Localization',
    summary: '`granularity` не навязывает свой i18n-движок и ожидает, что источником правды для переводов остаётся приложение.',
    description: 'Локализация в пакете устроена как integration contract: компоненты читают переводы из хост-приложения, а при их отсутствии используют встроенный fallback. Foundations page должна сделать это поведение прозрачным ещё до интеграции компонентных страниц.',
    narrativeSource: takeLeadingBlock(localizationDocSource, 86),
    sourcePath: 'packages/granularity/docs/localization.md',
    keyPoints: [
      'Пакет ожидает внешний i18n-слой и не создаёт собственный изолированный i18n runtime.',
      'При отсутствии перевода компонент использует fallback-текст и не ломает UI.',
      'Публичный entrypoint `@feugene/granularity/i18n` публикует `DS_I18N_BLOCK`, `dsLocaleLoaders` и adapter types.',
    ],
    recommendations: [
      'Держите словари приложения и словари дизайн-системы в одном общем i18n-слое.',
      'Переопределяйте package-level тексты на стороне приложения, а не через форк пакета.',
      'Документируйте fallback-поведение рядом с компонентами, у которых есть встроенные интерфейсные строки.',
    ],
    codeSamples: [
      {
        title: 'Минимальная интеграция i18n слоя',
        code: localizationSnippet,
        language: 'ts',
      },
      {
        title: 'Source doc excerpt',
        code: takeHeadingBlock(localizationDocSource, '## Публичный API пакета'),
        language: 'md',
      },
    ],
  },
]

export const showcaseFoundationGuideRecord = Object.fromEntries(
  showcaseFoundationGuides.map(guide => [guide.id, guide]),
) as Record<ShowcaseFoundationGuide['id'], ShowcaseFoundationGuide>

export const showcaseOverviewChecklist = [
  'Showcase уже поднят как отдельное приложение без зависимости от legacy playground shell.',
  'Data layer собирает public registry, package-level exports и generated API metadata на build-time.',
  'Следующий этап после foundations — detail pages компонентов, директив, composables и utilities.',
]

export const showcaseFoundationsChecklist = [
  'Есть единая карта интеграции: быстрый старт, granular imports и UnoCSS preset path.',
  'Narrative docs подключены прямо из `packages/granularity/docs/*`, а themes/tokens — из source layers пакета.',
  'Foundations page объясняет различие между `tokens`, `theme` и component-level styles до перехода к detail pages.',
]

export const showcaseInstallationNarrative = takeHeadingBlock(installationDocSource, '## Какой способ подключения выбирать')