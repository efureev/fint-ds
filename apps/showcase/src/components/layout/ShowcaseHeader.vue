<script setup lang="ts">
import { computed } from 'vue'
import {
  RouterLink,
  useRoute,
} from 'vue-router'

import { DsButton } from '@feugene/granularity'

import { showcaseNavigationItems } from '../../app/showcase'
import type { ShowcaseNavigationItem } from '../../app/showcase'
import ThemeSwitcher from '../ThemeSwitcher.vue'
import ShowcaseQuickSearch from './ShowcaseQuickSearch.vue'
import IconLayers from '~icons/lucide/layers'

const emit = defineEmits<{
  (event: 'open-mobile-navigation'): void
}>()

const route = useRoute()

const topNavigationItems = computed(() => showcaseNavigationItems.filter(item => item.name !== 'overview'))

function isActiveNavigationItem(item: ShowcaseNavigationItem) {
  if (item.path === '/')
    return route.path === item.path

  return route.path === item.path || route.path.startsWith(`${item.path}/`)
}

function getTopNavigationItemClass(item: ShowcaseNavigationItem) {
  if (isActiveNavigationItem(item)) {
    return 'border-primary/25 bg-primary text-white shadow-[0_12px_24px_rgba(59,130,246,0.22)]'
  }

  return 'border-transparent bg-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900 dark:hover:text-slate-50'
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-slate-200/80 bg-white/92 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/92">
    <div class="mx-auto max-w-7xl px-4 py-4 lg:px-8">
      <div class="flex items-center gap-3">
        <DsButton
          class="lg:hidden"
          variant="ghost"
          size="sm"
          square
          aria-label="Открыть навигацию"
          @click="emit('open-mobile-navigation')"
        >
          <span class="text-base leading-none" aria-hidden="true">☰</span>
        </DsButton>

        <RouterLink
          to="/"
          class="flex min-w-0 items-center gap-3"
        >
          <div
              class="h-9 w-9 rounded-[12px] border border-[var(--border)] bg-[var(--card)] flex items-center justify-center shadow-[var(--ds-shadow-1)]"
              aria-hidden="true"
          >
            <IconLayers class="h-4 w-4 text-[var(--muted-foreground)]" />
          </div>
          <div class="min-w-0">
            <p class="truncate text-base font-semibold text-slate-950 dark:text-slate-50">
              Granularity
            </p>
            <p class="truncate text-xs text-slate-500 dark:text-slate-400">
              Витрина пакета компонентов
            </p>
          </div>
        </RouterLink>

        <nav class="ml-6 hidden min-w-0 flex-1 items-center gap-2 lg:flex">
          <RouterLink
            v-for="item in topNavigationItems"
            :key="item.name"
            :to="item.path"
            class="rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
            :class="getTopNavigationItemClass(item)"
          >
            {{ item.shortTitle }}
          </RouterLink>
        </nav>

        <div class="ml-auto flex items-center gap-1 sm:gap-2">
          <div class="hidden items-center rounded-full border border-slate-200 bg-slate-100/90 p-1 text-xs font-semibold text-slate-500 sm:flex dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            <span class="rounded-full bg-white px-3 py-1.5 text-slate-950 shadow-sm dark:bg-slate-950 dark:text-slate-50">
              RU
            </span>
            <span class="px-3 py-1.5 opacity-60">EN</span>
          </div>
          <ShowcaseQuickSearch />
          <ThemeSwitcher />
        </div>
      </div>

      <nav class="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
        <RouterLink
          v-for="item in topNavigationItems"
          :key="item.name"
          :to="item.path"
          class="shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
          :class="getTopNavigationItemClass(item)"
        >
          {{ item.shortTitle }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>