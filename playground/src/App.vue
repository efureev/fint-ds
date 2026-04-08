<script setup lang="ts">
import { computed, defineAsyncComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { useFintI18n } from '@feugene/fint-i18n'

import IconGlobe from '~icons/lucide/globe'
import IconLayers from '~icons/lucide/layers'

type PageId =
  | 'checkbox'
  | 'switch'
  | 'radio'
  | 'buttons'
  | 'inputs'
  | 'inputTag'
  | 'fileUpload'
  | 'filesDocs'
  | 'icons'
  | 'directives'
  | 'select'
  | 'dropdown'
  | 'dropdownMenu'
  | 'links'
  | 'layout'
  | 'progress'
  | 'pagination'
  | 'tokens'
  | 'dialogs'
  | 'drawer'
  | 'imageViewer'
  | 'tabs'
  | 'collapse'
  | 'alerts'
  | 'badges'
  | 'cards'
  | 'empty'
  | 'navigation'
  | 'loading'
  | 'tree'
  | 'treeSelect'
  | 'avatar'
  | 'bottomNav'
  | 'tooltip'

const defaultPage: PageId = 'buttons'

const pageIds: PageId[] = [
  'checkbox',
  'switch',
  'radio',
  'buttons',
  'inputs',
  'inputTag',
  'fileUpload',
  'filesDocs',
  'icons',
  'directives',
  'select',
  'dropdown',
  'dropdownMenu',
  'links',
  'layout',
  'progress',
  'pagination',
  'tokens',
  'dialogs',
  'drawer',
  'imageViewer',
  'tabs',
  'collapse',
  'alerts',
  'badges',
  'cards',
  'empty',
  'navigation',
  'loading',
  'tree',
  'treeSelect',
  'avatar',
  'bottomNav',
  'tooltip',
]

const pageComponents = {
  checkbox: defineAsyncComponent(() => import('./pages/CheckboxPage.vue')),
  switch: defineAsyncComponent(() => import('./pages/SwitchPage.vue')),
  radio: defineAsyncComponent(() => import('./pages/RadioPage.vue')),
  buttons: defineAsyncComponent(() => import('./pages/ButtonsPage.vue')),
  inputs: defineAsyncComponent(() => import('./pages/InputsPage.vue')),
  inputTag: defineAsyncComponent(() => import('./pages/InputTagPage.vue')),
  fileUpload: defineAsyncComponent(() => import('./pages/FileUploadPage.vue')),
  filesDocs: defineAsyncComponent(() => import('./pages/FilesDocsPage.vue')),
  icons: defineAsyncComponent(() => import('./pages/IconsPage.vue')),
  directives: defineAsyncComponent(() => import('./pages/DirectivesPage.vue')),
  select: defineAsyncComponent(() => import('./pages/SelectPage.vue')),
  dropdown: defineAsyncComponent(() => import('./pages/DropdownPage.vue')),
  dropdownMenu: defineAsyncComponent(() => import('./pages/DropdownMenuPage.vue')),
  links: defineAsyncComponent(() => import('./pages/LinksPage.vue')),
  layout: defineAsyncComponent(() => import('./pages/LayoutPage.vue')),
  progress: defineAsyncComponent(() => import('./pages/ProgressPage.vue')),
  pagination: defineAsyncComponent(() => import('./pages/PaginationPage.vue')),
  tokens: defineAsyncComponent(() => import('./pages/TokensPage.vue')),
  dialogs: defineAsyncComponent(() => import('./pages/DialogsPage.vue')),
  drawer: defineAsyncComponent(() => import('./pages/DrawerPage.vue')),
  imageViewer: defineAsyncComponent(() => import('./pages/ImageViewerPage.vue')),
  tabs: defineAsyncComponent(() => import('./pages/TabsPage.vue')),
  collapse: defineAsyncComponent(() => import('./pages/CollapsePage.vue')),
  alerts: defineAsyncComponent(() => import('./pages/AlertsPage.vue')),
  badges: defineAsyncComponent(() => import('./pages/BadgesPage.vue')),
  cards: defineAsyncComponent(() => import('./pages/CardsPage.vue')),
  empty: defineAsyncComponent(() => import('./pages/EmptyStateSkeletonPage.vue')),
  navigation: defineAsyncComponent(() => import('./pages/NavigationPage.vue')),
  loading: defineAsyncComponent(() => import('./pages/LoadingPage.vue')),
  tree: defineAsyncComponent(() => import('./pages/TreePage.vue')),
  treeSelect: defineAsyncComponent(() => import('./pages/TreeSelectPage.vue')),
  avatar: defineAsyncComponent(() => import('./pages/AvatarPage.vue')),
  bottomNav: defineAsyncComponent(() => import('./pages/BottomNavPage.vue')),
  tooltip: defineAsyncComponent(() => import('./pages/TooltipPage.vue')),
} satisfies Record<PageId, ReturnType<typeof defineAsyncComponent>>

function isPageId(value: string): value is PageId {
  return pageIds.includes(value as PageId)
}

function readPageFromHash(): PageId {
  if (typeof window === 'undefined') {
    return defaultPage
  }

  const next = window.location.hash.replace(/^#/, '').trim()

  return isPageId(next) ? next : defaultPage
}

const page = ref<PageId>(readPageFromHash())

function writePageToHash(next: PageId): void {
  if (typeof window === 'undefined') {
    return
  }

  const nextHash = `#${next}`

  if (window.location.hash === nextHash) {
    return
  }

  window.location.hash = nextHash
}

function syncPageFromHash(): void {
  const next = readPageFromHash()

  if (page.value !== next) {
    page.value = next
  }
}

watch(page, (next) => {
  writePageToHash(next)
}, { immediate: true })

onMounted(() => {
  window.addEventListener('hashchange', syncPageFromHash)
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', syncPageFromHash)
})

function navItemClass(id: PageId): string {
  const base =
    'w-full text-left flex items-center gap-2 px-3 py-2 rounded-[10px] text-[13px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sidebar-ring)]'

  if (id === current.value) {
    return `${base} bg-[color-mix(in_srgb,var(--sidebar-primary)_12%,transparent)] text-[var(--sidebar-foreground)]`
  }

  return `${base} text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]`
}

const pages = computed(() => {
  return [
    { id: 'checkbox', label: t('playground.nav.checkbox', 'Checkbox') },
    { id: 'switch', label: t('playground.nav.switch', 'Switch') },
    { id: 'radio', label: t('playground.nav.radio', 'Radio') },
    { id: 'buttons', label: t('playground.nav.buttons', 'Buttons') },
    { id: 'inputs', label: t('playground.nav.inputs', 'Inputs') },
    { id: 'inputTag', label: t('playground.nav.inputTag', 'InputTag') },
    { id: 'fileUpload', label: t('playground.nav.fileUpload', 'FileUpload') },
    { id: 'filesDocs', label: t('playground.nav.filesDocs', 'Files (docs)') },
    { id: 'icons', label: t('playground.nav.icons', 'Icons') },
    { id: 'directives', label: t('playground.nav.directives', 'Directives') },
    { id: 'select', label: t('playground.nav.select', 'Select') },
    { id: 'links', label: t('playground.nav.links', 'Links') },
    { id: 'dropdown', label: t('playground.nav.dropdown', 'Dropdown') },
    { id: 'dropdownMenu', label: t('playground.nav.dropdownMenu', 'Dropdown menu') },
    { id: 'layout', label: t('playground.nav.layout', 'Layout') },
    { id: 'progress', label: t('playground.nav.progress', 'Progress') },
    { id: 'loading', label: t('playground.nav.loading', 'Loading') },
    { id: 'alerts', label: t('playground.nav.alerts', 'Alerts') },
    { id: 'badges', label: t('playground.nav.badges', 'Badges') },
    { id: 'cards', label: t('playground.nav.cards', 'Cards') },
    { id: 'empty', label: t('playground.nav.empty', 'Empty / Skeleton') },
    { id: 'pagination', label: t('playground.nav.tablesPagination', 'Tables & Pagination') },
    { id: 'navigation', label: t('playground.nav.navigation', 'Navbar & Breadcrumbs') },
    { id: 'tokens', label: t('playground.nav.tokens', 'Tokens') },
    { id: 'dialogs', label: t('playground.nav.dialogs', 'Dialogs') },
    { id: 'drawer', label: t('playground.nav.drawer', 'Drawer') },
    { id: 'imageViewer', label: t('playground.nav.imageViewer', 'Image viewer') },
    { id: 'tabs', label: t('playground.nav.tabs', 'Tabs') },
    { id: 'collapse', label: t('playground.nav.collapse', 'Collapse') },
    { id: 'tree', label: t('playground.nav.tree', 'Tree') },
    { id: 'treeSelect', label: t('playground.nav.treeSelect', 'TreeSelect') },
    { id: 'avatar', label: t('playground.nav.avatar', 'Avatar') },
    { id: 'bottomNav', label: t('playground.nav.bottomNav', 'Bottom navigation') },
    { id: 'tooltip', label: t('playground.nav.tooltip', 'Tooltip') },
  ] as const
})

type NavGroup = {
  id: string
  label: string
  items: (typeof pages.value)[number][]
}

const navGroups = computed<NavGroup[]>(() => {
  const byId = new Map(pages.value.map((p) => [p.id, p]))
  const pick = (ids: PageId[]) => ids.map((id) => byId.get(id)!).filter(Boolean)

  return [
    {
      id: 'actions',
      label: t('playground.nav.group.actions', 'Actions'),
      items: pick(['buttons', 'links']),
    },
    {
      id: 'form',
      label: t('playground.nav.group.form', 'Form elements'),
      items: pick(['inputs', 'inputTag', 'fileUpload', 'filesDocs', 'checkbox', 'switch', 'radio', 'select', 'treeSelect']),
    },
    {
      id: 'feedback',
      label: t('playground.nav.group.feedback', 'Feedback'),
      items: pick(['alerts', 'tooltip', 'dialogs', 'drawer', 'imageViewer', 'loading', 'progress']),
    },
    {
      id: 'navigation',
      label: t('playground.nav.group.navigation', 'Navigation'),
      items: pick(['navigation', 'bottomNav', 'dropdown', 'dropdownMenu', 'tabs', 'collapse', 'tree']),
    },
    {
      id: 'display',
      label: t('playground.nav.group.display', 'Data display'),
      items: pick(['pagination', 'avatar', 'badges', 'cards', 'empty']),
    },
    {
      id: 'layout',
      label: t('playground.nav.group.layout', 'Layout'),
      items: pick(['layout']),
    },
    {
      id: 'utils',
      label: t('playground.nav.group.utils', 'Utils'),
      items: pick(['icons', 'directives', 'tokens']),
    },
  ]
})

const current = computed(() => page.value)
const currentPageComponent = computed(() => pageComponents[current.value])

const { locale, setLocale, t } = useFintI18n()

const localeOptions = [
  { value: 'en', label: 'EN' },
  { value: 'ru', label: 'RU' },
  { value: 'es', label: 'ES' },
]

const localeModel = computed({
  get: () => locale.value,
  set: (v: string) => setLocale(v),
})

const localeAriaLabel = computed(() => {
  return t('playground.app.selectLanguage', 'Select language')
})
</script>

<template>
  <div class="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
    <header
      class="sticky top-0 z-20 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_90%,transparent)] backdrop-blur-md"
    >
      <div class="mx-auto max-w-[1400px] px-6 py-3">
        <div class="flex items-center justify-between gap-4 flex-wrap">
          <div class="flex items-center gap-3 min-w-0">
            <div
              class="h-9 w-9 rounded-[12px] border border-[var(--border)] bg-[var(--card)] flex items-center justify-center shadow-[var(--ds-shadow-1)]"
              aria-hidden="true"
            >
              <IconLayers class="h-4 w-4 text-[var(--muted-foreground)]" />
            </div>

            <div class="leading-tight min-w-0">
              <div class="text-[14px] font-800 truncate">fint-ds</div>
              <div class="text-[12px] ds-muted truncate">playground</div>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <div
              class="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 shadow-[var(--ds-shadow-1)]"
            >
              <IconGlobe class="h-4 w-4 text-[var(--muted-foreground)]" aria-hidden="true" />
              <DsSelect
                v-model="localeModel"
                view="link"
                variant="muted"
                underline="none"
                class="uppercase text-xs"
                :aria-label="localeAriaLabel"
                :options="localeOptions"
              />
            </div>

            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>

    <div class="mx-auto max-w-[1400px] px-6 py-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
      <aside
        class="h-fit lg:sticky lg:top-[72px] max-h-[calc(100vh-72px-24px)] overflow-auto rounded-[var(--ds-radius-xl)] border border-[var(--sidebar-border)] bg-[var(--sidebar)] text-[var(--sidebar-foreground)] shadow-[var(--ds-shadow-1)]"
      >
        <nav class="p-3 flex flex-col gap-2">
          <details v-for="g in navGroups" :key="g.id" open class="rounded-[12px]">
            <summary
              class="list-none cursor-pointer flex items-center justify-between px-3 py-2 rounded-[10px] text-[13px] text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sidebar-ring)]"
            >
              <span class="font-700">{{ g.label }}</span>
              <span class="text-[12px] text-[var(--muted-foreground)]">▾</span>
            </summary>

            <div class="mt-1 pl-2 flex flex-col gap-1">
              <button
                v-for="it in g.items"
                :key="it.id"
                type="button"
                :class="navItemClass(it.id)"
                :aria-current="it.id === current ? 'page' : undefined"
                @click="page = it.id"
              >
                {{ it.label }}
              </button>
            </div>
          </details>
        </nav>
      </aside>

      <main>
        <component :is="currentPageComponent" />
      </main>
    </div>
  </div>
</template>
