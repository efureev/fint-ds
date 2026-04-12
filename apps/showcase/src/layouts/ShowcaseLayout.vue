<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import {
  RouterLink,
  RouterView,
  useRoute,
} from 'vue-router'

import { DsButton, useTheme } from '@feugene/granularity'

import {
  getShowcaseBreadcrumbs,
  getShowcaseEntityByPath,
  getShowcasePageByName,
  getShowcasePageByPath,
  getShowcaseSectionsForPath,
  showcaseComposableEntities,
  showcaseComponentEntities,
  showcaseDirectiveEntities,
  showcaseNavigationItems,
  showcasePageRecord,
  showcaseUtilityEntities,
} from '../app/showcase'
import type { ShowcaseNavigationItem, ShowcasePageName } from '../app/showcase'
import type { ShowcaseEntityRegistryItem } from '../content/model'
import ThemeSwitcher from '../components/ThemeSwitcher.vue'
import ShowcaseHeader from '../components/layout/ShowcaseHeader.vue'
import ShowcaseQuickSearch from '../components/layout/ShowcaseQuickSearch.vue'

const route = useRoute()
const isMobileNavigationOpen = ref(false)

const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})

watch(() => route.fullPath, () => {
  isMobileNavigationOpen.value = false
})

const currentPage = computed(() => {
  return getShowcasePageByName(route.name)
    ?? getShowcasePageByPath(route.path)
    ?? showcasePageRecord.overview
})
const currentEntity = computed(() => getShowcaseEntityByPath(route.path))

const breadcrumbs = computed(() => getShowcaseBreadcrumbs(route.path))
const currentSections = computed(() => getShowcaseSectionsForPath(route.path))
const currentTitle = computed(() => currentEntity.value?.title ?? currentPage.value.title)
const topNavigationItems = computed(() => showcaseNavigationItems.filter(item => item.name !== 'overview'))

const componentGroupLabels: Record<string, string> = {
  actions: 'Actions',
  feedback: 'Feedback',
  navigation: 'Navigation',
  overlays: 'Overlays',
  forms: 'Forms',
  data: 'Data display',
  misc: 'Miscellaneous',
}

type SidebarNavigationItem = {
  id: string
  label: string
  description?: string
  to?: string
  href?: string
}

type SidebarNavigationGroup = {
  id: string
  title: string
  items: SidebarNavigationItem[]
}

function normalizeLabel(value: string) {
  return value
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
}

function getEntityCollection(pageName: ShowcasePageName): ShowcaseEntityRegistryItem[] {
  switch (pageName) {
    case 'components':
      return showcaseComponentEntities
    case 'directives':
      return showcaseDirectiveEntities
    case 'composables':
      return showcaseComposableEntities
    case 'utilities':
      return showcaseUtilityEntities
    default:
      return []
  }
}

function getEntityGroupLabel(pageName: ShowcasePageName, group: string) {
  if (pageName === 'components')
    return componentGroupLabels[group] ?? normalizeLabel(group)

  return normalizeLabel(group)
}

const contextNavigationGroups = computed<SidebarNavigationGroup[]>(() => {
  const pageName = currentPage.value.name

  if (pageName === 'overview' || pageName === 'foundations') {
    return [
      {
        id: `${pageName}-sections`,
        title: 'Навигация по странице',
        items: currentSections.value.map(section => ({
          id: section.id,
          label: section.title,
          description: section.description,
          href: `#${section.id}`,
        })),
      },
    ]
  }

  const entities = getEntityCollection(pageName)
  const groups = new Map<string, ShowcaseEntityRegistryItem[]>()

  for (const entity of entities) {
    const groupKey = entity.group || 'misc'
    const currentGroup = groups.get(groupKey) ?? []

    currentGroup.push(entity)
    groups.set(groupKey, currentGroup)
  }

  return [...groups.entries()]
    .sort(([left], [right]) => {
      return getEntityGroupLabel(pageName, left).localeCompare(getEntityGroupLabel(pageName, right))
    })
    .map(([group, entities]) => ({
      id: `${pageName}-${group}`,
      title: getEntityGroupLabel(pageName, group),
      items: [...entities]
        .sort((left, right) => left.title.localeCompare(right.title))
        .map(entity => ({
          id: entity.id,
          label: entity.title,
          description: entity.summary,
          to: entity.path,
        })),
    }))
})

function isActiveNavigationItem(item: ShowcaseNavigationItem) {
  if (item.path === '/')
    return currentPage.value.path === item.path

  return currentPage.value.path === item.path || route.path.startsWith(`${item.path}/`)
}

function isActiveSidebarItem(item: SidebarNavigationItem) {
  if (!item.to)
    return false

  if (item.to === '/')
    return route.path === item.to

  return route.path === item.to || route.path.startsWith(`${item.to}/`)
}

function getTopNavigationItemClass(item: ShowcaseNavigationItem) {
  if (isActiveNavigationItem(item)) {
    return 'border-primary/25 bg-primary text-white shadow-[0_12px_24px_rgba(59,130,246,0.22)]'
  }

  return 'border-transparent bg-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900 dark:hover:text-slate-50'
}

function getSidebarItemClass(item: SidebarNavigationItem) {
  if (isActiveSidebarItem(item)) {
    return 'border-primary/20 bg-primary/10 text-slate-950 dark:text-slate-50'
  }

  return 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-300 dark:hover:border-slate-800 dark:hover:bg-slate-950 dark:hover:text-slate-50'
}
</script>

<template>
  <div class="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_36%),linear-gradient(180deg,#f8fafc_0%,#f8fafc_56%,#f1f5f9_100%)] text-slate-950 transition-colors dark:bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.14),_transparent_30%),linear-gradient(180deg,#020617_0%,#020617_58%,#0f172a_100%)] dark:text-slate-50">
    <ShowcaseHeader @open-mobile-navigation="isMobileNavigationOpen = true" />

    <div class="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[290px_minmax(0,1fr)] lg:px-8">
      <aside class="sticky top-28 hidden h-[calc(100vh-8rem)] overflow-y-auto lg:block">
        <div class="space-y-6 rounded-[28px] border border-slate-200/80 bg-white/92 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900/86">
          <div class="space-y-2">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              {{ currentPage.shortTitle }}
            </p>
            <h2 class="text-lg font-semibold text-slate-950 dark:text-slate-50">
              {{ currentTitle }}
            </h2>
            <p class="text-sm leading-6 text-slate-600 dark:text-slate-300">
              {{ currentPage.description }}
            </p>
          </div>

          <div class="space-y-5">
            <section
              v-for="group in contextNavigationGroups"
              :key="group.id"
              class="space-y-2"
            >
              <p class="px-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
                {{ group.title }}
              </p>
              <div class="grid gap-1.5">
                <template v-for="item in group.items" :key="item.id">
                  <RouterLink
                    v-if="item.to"
                    :to="item.to"
                    class="rounded-2xl border px-4 py-3 transition-colors"
                    :class="getSidebarItemClass(item)"
                  >
                    <span class="block text-sm font-semibold">{{ item.label }}</span>
                    <span v-if="item.description" class="mt-1 line-clamp-2 block text-xs leading-5 text-current/80">
                      {{ item.description }}
                    </span>
                  </RouterLink>
                  <a
                    v-else-if="item.href"
                    :href="item.href"
                    class="rounded-2xl border border-transparent px-4 py-3 text-sm text-slate-600 transition-colors hover:border-slate-200 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-300 dark:hover:border-slate-800 dark:hover:bg-slate-950 dark:hover:text-slate-50"
                  >
                    <span class="block font-semibold">{{ item.label }}</span>
                    <span v-if="item.description" class="mt-1 block text-xs leading-5 text-current/80">
                      {{ item.description }}
                    </span>
                  </a>
                </template>
              </div>
            </section>
          </div>
        </div>
      </aside>

      <main class="min-w-0 space-y-6">
        <div class="flex flex-wrap items-center gap-2 rounded-[24px] border border-slate-200/80 bg-white/88 px-4 py-3 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/86">
          <template
            v-for="(crumb, index) in breadcrumbs"
            :key="`${crumb.to}-${index}`"
          >
            <RouterLink
              :to="crumb.to"
              class="font-medium text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-100"
            >
              {{ crumb.label }}
            </RouterLink>
            <span
              v-if="index < breadcrumbs.length - 1"
              class="text-slate-400 dark:text-slate-500"
            >/</span>
          </template>
        </div>

        <RouterView />
      </main>
    </div>

    <div
      v-if="isMobileNavigationOpen"
      class="fixed inset-0 z-50 flex lg:hidden"
    >
      <button
        class="flex-1 bg-slate-950/50 backdrop-blur-sm"
        aria-label="Закрыть навигацию"
        @click="isMobileNavigationOpen = false"
      />

      <aside class="flex h-full w-[min(88vw,380px)] flex-col gap-5 border-r border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Навигация
            </p>
            <h2 class="text-lg font-semibold">
              {{ currentTitle }}
            </h2>
          </div>

          <DsButton
            variant="ghost"
            size="sm"
            square
            aria-label="Закрыть навигацию"
            @click="isMobileNavigationOpen = false"
          >
            <span class="text-base leading-none" aria-hidden="true">✕</span>
          </DsButton>
        </div>

        <nav class="grid gap-2">
          <RouterLink
            v-for="item in topNavigationItems"
            :key="item.name"
            :to="item.path"
            class="rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors"
            :class="getTopNavigationItemClass(item)"
            @click="isMobileNavigationOpen = false"
          >
            {{ item.shortTitle }}
          </RouterLink>
        </nav>

        <div class="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900">
          <div class="flex items-center rounded-full border border-slate-200 bg-white p-1 text-xs font-semibold text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
            <span class="rounded-full bg-slate-950 px-3 py-1.5 text-white dark:bg-white dark:text-slate-950">RU</span>
            <span class="px-3 py-1.5 opacity-60">EN</span>
          </div>
          <div class="ml-auto flex items-center gap-1">
            <ShowcaseQuickSearch />
            <ThemeSwitcher />
          </div>
        </div>

        <div class="space-y-4 overflow-y-auto rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Контекстная навигация
          </p>
          <section
            v-for="group in contextNavigationGroups"
            :key="group.id"
            class="space-y-2"
          >
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
              {{ group.title }}
            </p>
            <div class="grid gap-2">
              <template v-for="item in group.items" :key="item.id">
                <RouterLink
                  v-if="item.to"
                  :to="item.to"
                  class="rounded-2xl border px-3 py-3 text-sm transition-colors"
                  :class="getSidebarItemClass(item)"
                  @click="isMobileNavigationOpen = false"
                >
                  <span class="block font-semibold">{{ item.label }}</span>
                  <span v-if="item.description" class="mt-1 line-clamp-2 block text-xs leading-5 text-current/80">
                    {{ item.description }}
                  </span>
                </RouterLink>
                <a
                  v-else-if="item.href"
                  :href="item.href"
                  class="rounded-2xl border border-transparent px-3 py-3 text-sm text-slate-600 transition-colors hover:bg-white hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-950 dark:hover:text-slate-50"
                  @click="isMobileNavigationOpen = false"
                >
                  <span class="block font-semibold">{{ item.label }}</span>
                  <span v-if="item.description" class="mt-1 block text-xs leading-5 text-current/80">
                    {{ item.description }}
                  </span>
                </a>
              </template>
            </div>
          </section>
        </div>
      </aside>
    </div>
  </div>
</template>