<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { useFintI18n } from '@feugene/fint-i18n'

import IconGlobe from '~icons/lucide/globe'
import IconLayers from '~icons/lucide/layers'

import CheckboxPage from './pages/CheckboxPage.vue'
import SwitchPage from './pages/SwitchPage.vue'
import ButtonsPage from './pages/ButtonsPage.vue'
import InputsPage from './pages/InputsPage.vue'
import InputTagPage from './pages/InputTagPage.vue'
import FileUploadPage from './pages/FileUploadPage.vue'
import FilesDocsPage from './pages/FilesDocsPage.vue'
import DirectivesPage from './pages/DirectivesPage.vue'
import DialogsPage from './pages/DialogsPage.vue'
import SelectPage from './pages/SelectPage.vue'
import TabsPage from './pages/TabsPage.vue'
import CollapsePage from './pages/CollapsePage.vue'
import RadioPage from './pages/RadioPage.vue'
import LinksPage from './pages/LinksPage.vue'
import LayoutPage from './pages/LayoutPage.vue'
import ProgressPage from './pages/ProgressPage.vue'
import PaginationPage from './pages/PaginationPage.vue'
import TokensPage from './pages/TokensPage.vue'
import AlertsPage from './pages/AlertsPage.vue'
import BadgesPage from './pages/BadgesPage.vue'
import CardsPage from './pages/CardsPage.vue'
import EmptyStateSkeletonPage from './pages/EmptyStateSkeletonPage.vue'
import NavigationPage from './pages/NavigationPage.vue'
import LoadingPage from './pages/LoadingPage.vue'
import DropdownPage from './pages/DropdownPage.vue'
import DropdownMenuPage from './pages/DropdownMenuPage.vue'
import DrawerPage from './pages/DrawerPage.vue'
import ImageViewerPage from './pages/ImageViewerPage.vue'
import TreePage from './pages/TreePage.vue'
import TreeSelectPage from './pages/TreeSelectPage.vue'
import IconsPage from './pages/IconsPage.vue'
import AvatarPage from './pages/AvatarPage.vue'
import BottomNavPage from './pages/BottomNavPage.vue'
import TooltipPage from './pages/TooltipPage.vue'

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
        <CheckboxPage v-if="current === 'checkbox'" />
        <SwitchPage v-else-if="current === 'switch'" />
        <RadioPage v-else-if="current === 'radio'" />
        <ButtonsPage v-else-if="current === 'buttons'" />
        <InputsPage v-else-if="current === 'inputs'" />
        <InputTagPage v-else-if="current === 'inputTag'" />
        <FileUploadPage v-else-if="current === 'fileUpload'" />
        <FilesDocsPage v-else-if="current === 'filesDocs'" />
        <IconsPage v-else-if="current === 'icons'" />
        <DirectivesPage v-else-if="current === 'directives'" />
        <SelectPage v-else-if="current === 'select'" />
        <DropdownPage v-else-if="current === 'dropdown'" />
        <DropdownMenuPage v-else-if="current === 'dropdownMenu'" />
        <LinksPage v-else-if="current === 'links'" />
        <LayoutPage v-else-if="current === 'layout'" />
        <ProgressPage v-else-if="current === 'progress'" />
        <LoadingPage v-else-if="current === 'loading'" />
        <PaginationPage v-else-if="current === 'pagination'" />
        <AvatarPage v-else-if="current === 'avatar'" />
        <AlertsPage v-else-if="current === 'alerts'" />
        <BadgesPage v-else-if="current === 'badges'" />
        <CardsPage v-else-if="current === 'cards'" />
        <EmptyStateSkeletonPage v-else-if="current === 'empty'" />
        <NavigationPage v-else-if="current === 'navigation'" />
        <BottomNavPage v-else-if="current === 'bottomNav'" />
        <TokensPage v-else-if="current === 'tokens'" />
        <DialogsPage v-else-if="current === 'dialogs'" />
        <DrawerPage v-else-if="current === 'drawer'" />
        <ImageViewerPage v-else-if="current === 'imageViewer'" />
        <TabsPage v-else-if="current === 'tabs'" />
        <CollapsePage v-else-if="current === 'collapse'" />
        <TreePage v-else-if="current === 'tree'" />
        <TreeSelectPage v-else-if="current === 'treeSelect'" />
        <TooltipPage v-else-if="current === 'tooltip'" />
      </main>
    </div>
  </div>
</template>
