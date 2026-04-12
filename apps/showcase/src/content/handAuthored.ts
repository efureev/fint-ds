import type {
  ShowcaseEntityMetadataOverride,
  ShowcaseEntityRegistryItem,
} from './model.ts'

const componentGroups = {
  actions: ['DsButton', 'DsButtonGroup', 'DsLink'],
  feedback: ['DsAlert', 'DsBadge', 'DsBadgeWrap', 'DsEmptyState', 'DsLoading', 'DsProgressBar', 'DsSkeleton', 'DsToaster'],
  navigation: ['DsBottomNav', 'DsNavbar', 'DsPagination', 'DsSidebar', 'DsTabs', 'DsTooltip'],
  overlays: ['DsCollapse', 'DsConfirmDialog', 'DsDialog', 'DsDrawer', 'DsDropdown', 'DsDropdownMenu', 'DsImageViewer', 'DsModal', 'DsPromptDialog'],
  forms: ['DsCheckbox', 'DsFileUpload', 'DsFormFile', 'DsFormField', 'DsFormSection', 'DsInput', 'DsNumberInput', 'DsInputTag', 'DsRadio', 'DsRadioGroup', 'DsSelect', 'DsSwitch', 'DsTextarea', 'DsTreeSelect'],
  data: ['DsAvatar', 'DsCard', 'DsDataTable', 'DsIcon', 'DsList', 'DsTable', 'DsTree'],
} as const satisfies Record<string, readonly string[]>

export function resolveHandAuthoredComponentGroup(componentName: string): string {
  for (const [group, componentNames] of Object.entries(componentGroups)) {
    if (componentNames.includes(componentName))
      return group
  }

  return 'misc'
}

export const showcaseEntityMetadataOverrides: Record<string, ShowcaseEntityMetadataOverride> = {
  'component:DsButton': {
    summary: 'Базовый action-компонент, с которого удобно начинать live demo coverage showcase.',
    group: 'actions',
    tags: ['featured', 'starter'],
    examples: [
      {
        id: 'button-variants',
        title: 'Variants and sizes',
        description: 'Покажем базовые состояния, размеры и визуальные варианты кнопки.',
        status: 'planned',
      },
      {
        id: 'button-loading',
        title: 'Loading and icon-only',
        description: 'Отдельный сценарий для loading-state и icon-only кнопок.',
        status: 'planned',
      },
    ],
  },
  'component:DsFileUpload': {
    summary: 'Ключевой компонент для утилит file validation и drag-and-drop сценариев.',
    group: 'forms',
    tags: ['featured', 'integration'],
    examples: [
      {
        id: 'file-upload-validation',
        title: 'Validation bridge',
        description: 'Покажем связку `DsFileUpload` с validator utilities и реальными error states.',
        status: 'planned',
      },
    ],
  },
  'component:DsSelect': {
    summary: 'Один из самых важных complex-form компонентов для showcase сценариев.',
    group: 'forms',
    tags: ['featured', 'complex'],
    examples: [
      {
        id: 'select-modes',
        title: 'Single, multiple and clearable',
        description: 'Планируем разнести основные режимы `DsSelect` по отдельным demo-картам.',
        status: 'planned',
      },
    ],
  },
  'directive:vLoading': {
    summary: 'Ключевая директива для overlay/loading-сценариев и companion API `createLoading`.',
    group: 'overlays',
    tags: ['featured'],
    examples: [
      {
        id: 'directive-loading-overlay',
        title: 'Element loading overlay',
        description: 'Покажем loading-overlay на реальных элементах и контейнерах.',
        status: 'planned',
      },
    ],
  },
  'directive:createLoading': {
    summary: 'Helper-API рядом с `vLoading`, который требует отдельной демонстрации imperative сценариев.',
    group: 'overlays',
    tags: ['featured'],
  },
  'composable:useTheme': {
    summary: 'Composables showcase уже использует `useTheme()` в app shell, поэтому он станет первым runnable recipe.',
    group: 'runtime',
    tags: ['featured', 'shell'],
    examples: [
      {
        id: 'use-theme-runtime',
        title: 'Runtime theme switch',
        description: 'Продемонстрируем раннюю инициализацию темы и runtime-переключение интерфейса.',
        status: 'planned',
      },
    ],
  },
  'composable:useToast': {
    summary: 'Toast orchestration composable для будущих feedback/demo сценариев.',
    group: 'feedback',
    tags: ['featured'],
    examples: [
      {
        id: 'use-toast-push-dismiss',
        title: 'Push, dismiss and clear',
        description: 'Запланированы сценарии жизненного цикла toast-уведомлений.',
        status: 'planned',
      },
    ],
  },
  'utility:runFileValidators': {
    summary: 'Главная orchestration utility для пайплайна file validation.',
    group: 'validation',
    tags: ['featured', 'integration'],
    examples: [
      {
        id: 'run-file-validators-pipeline',
        title: 'Validation pipeline',
        description: 'Покажем chained-проверки файла и агрегирование ошибок.',
        status: 'planned',
      },
    ],
  },
  'utility:acceptValidator': {
    summary: 'Базовый validator для `accept`-ограничений при выборе файлов.',
    group: 'validation',
    tags: ['featured'],
  },
}

export function applyHandAuthoredEntityMetadata(
  entity: ShowcaseEntityRegistryItem,
): ShowcaseEntityRegistryItem {
  const override = showcaseEntityMetadataOverrides[entity.id]
  const defaultGroup = entity.kind === 'component'
    ? resolveHandAuthoredComponentGroup(entity.name)
    : entity.group

  return {
    ...entity,
    group: override?.group ?? defaultGroup,
    summary: override?.summary ?? entity.summary,
    tags: [...new Set([...(entity.tags ?? []), ...(override?.tags ?? [])])],
    examples: override?.examples?.length
      ? override.examples
      : entity.examples.length
        ? entity.examples
        : [
            {
              id: `${entity.name}-planned-primary`,
              title: 'Planned demo coverage',
              description: `Для ${entity.name} будет добавлен отдельный showcase-сценарий на следующих этапах.`,
              status: 'planned',
            },
          ],
  }
}