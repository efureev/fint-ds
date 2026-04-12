<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { DsBadge, DsButton } from '@feugene/granularity'

import {
  searchShowcaseEntries,
  showcaseSuggestedSearchEntries,
} from '../../app/showcaseDiscoverability'
import SearchIcon from '~icons/lucide/search'
const route = useRoute()

const isOpen = ref(false)
const query = ref('')

const results = computed(() => {
  const normalizedQuery = query.value.trim()

  if (!normalizedQuery)
    return showcaseSuggestedSearchEntries

  return searchShowcaseEntries(normalizedQuery, 8)
})

const hasNoResults = computed(() => query.value.trim().length > 0 && results.value.length === 0)

watch(() => route.fullPath, () => {
  isOpen.value = false
  query.value = ''
})

function toggleSearch() {
  isOpen.value = !isOpen.value

  if (!isOpen.value)
    query.value = ''
}

function closeSearch() {
  isOpen.value = false
  query.value = ''
}
</script>

<template>
  <div class="relative">
    <DsButton
      variant="ghost"
      size="sm"
      square
      aria-label="Открыть поиск"
      @click="toggleSearch()"
    >
      <SearchIcon />
    </DsButton>

    <div
      v-if="isOpen"
      class="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[min(92vw,30rem)] rounded-[28px] border border-slate-200/80 bg-white p-4 shadow-[0_24px_80px_rgba(15,23,42,0.18)] dark:border-slate-800 dark:bg-slate-900"
    >
      <div class="space-y-3">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Quick search
            </p>
            <p class="text-sm leading-6 text-slate-600 dark:text-slate-300">
              Ищите страницы, сущности и section anchors по названию, alias и контексту использования.
            </p>
          </div>

          <DsBadge>
            {{ results.length }}
          </DsBadge>
        </div>

        <input
          v-model="query"
          type="search"
          placeholder="Например: DsButton, file validation, useTheme"
          class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus:border-primary dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-50 dark:placeholder:text-slate-500"
        >

        <div v-if="hasNoResults" class="space-y-3 rounded-2xl border border-dashed border-slate-200 px-4 py-4 dark:border-slate-700">
          <p class="text-sm leading-6 text-slate-600 dark:text-slate-300">
            Ничего не найдено. Попробуйте имя сущности, export name, тип (`component`, `utility`) или section-title.
          </p>
          <div class="flex flex-wrap gap-2">
            <RouterLink
              to="/components"
              class="inline-flex rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-950 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:text-slate-100"
              @click="closeSearch()"
            >
              Открыть components
            </RouterLink>
            <RouterLink
              to="/utilities"
              class="inline-flex rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-950 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:text-slate-100"
              @click="closeSearch()"
            >
              Открыть utilities
            </RouterLink>
          </div>
        </div>

        <div v-else class="grid gap-2">
          <RouterLink
            v-for="result in results"
            :key="result.id"
            :to="result.href"
            class="rounded-2xl border border-transparent px-4 py-3 transition-colors hover:border-slate-200 hover:bg-slate-50 dark:hover:border-slate-800 dark:hover:bg-slate-950/60"
            @click="closeSearch()"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <p class="truncate text-sm font-semibold text-slate-950 dark:text-slate-50">
                  {{ result.title }}
                </p>
                <p class="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {{ result.description }}
                </p>
                <p class="mt-2 text-[11px] uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
                  {{ result.context }}
                </p>
              </div>

              <DsBadge>
                {{ result.kindLabel }}
              </DsBadge>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>