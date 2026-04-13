<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import IconArrowRight from '~icons/lucide/arrow-right'

import { DsBadge, DsCard } from '@feugene/granularity'

import type { ShowcaseEntityKind, ShowcaseEntityRegistryItem } from '../../content/model'
import type { ShowcasePage } from '../../app/showcase'

const props = defineProps<{
  kind: ShowcaseEntityKind
  page: ShowcasePage
  entities: ShowcaseEntityRegistryItem[]
}>()

const groupLabels: Record<string, string> = {
  overlays: 'Overlays',
  feedback: 'Feedback',
  runtime: 'Runtime',
  validation: 'Validation',
  ungrouped: 'General',
}

const searchQuery = ref('')

const filteredEntities = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query)
    return props.entities

  return props.entities.filter((entity) => {
    return [entity.name, entity.summary, entity.group, entity.tags.join(' ')]
      .join(' ')
      .toLowerCase()
      .includes(query)
  })
})

const groupedEntities = computed(() => {
  const buckets = new Map<string, ShowcaseEntityRegistryItem[]>()

  for (const entity of filteredEntities.value) {
    const group = entity.group || 'ungrouped'
    const current = buckets.get(group) ?? []
    current.push(entity)
    buckets.set(group, current)
  }

  return [...buckets.entries()]
    .sort(([left], [right]) => (groupLabels[left] ?? left).localeCompare(groupLabels[right] ?? right))
    .map(([group, entities]) => ({
      group,
      label: groupLabels[group] ?? group,
      entities: [...entities].sort((left, right) => left.title.localeCompare(right.title)),
    }))
})

const featuredEntities = computed(() => props.entities.filter(entity => entity.tags.includes('featured')))

const manualApiCoverage = computed(() => props.entities.filter((entity) => {
  return entity.apiSections.some(section => section.origin !== 'pending' && section.items.length > 0)
}).length)

const kindLabel = computed(() => {
  if (props.kind === 'directive')
    return 'directive'
  if (props.kind === 'composable')
    return 'composable'
  if (props.kind === 'utility')
    return 'utility'

  return 'entity'
})
</script>

<template>
  <div class="space-y-8">
    <DsCard class="showcase-panel rounded-3xl border p-8">
      <div class="flex flex-wrap items-center gap-3">
        <DsBadge>{{ page.status }}</DsBadge>
        <span class="showcase-kicker text-xs font-semibold tracking-[0.18em]">
          {{ page.eyebrow }}
        </span>
      </div>

      <div class="mt-5 space-y-4">
        <h1 class="max-w-4xl text-4xl font-semibold leading-tight lg:text-5xl">
          {{ page.title }} catalog
        </h1>
        <p class="showcase-text-muted max-w-3xl text-base leading-7">
          {{ page.description }} Каталог группирует public API по сущностям, ведёт на detail pages
          и показывает, где уже есть runnable coverage, а где пока остаётся metadata fallback.
        </p>
      </div>
    </DsCard>

    <section id="catalog" class="scroll-mt-28 space-y-5">
      <div class="grid gap-4 md:grid-cols-3">
        <DsCard class="showcase-panel rounded-3xl border p-5">
          <p class="showcase-kicker text-xs font-semibold tracking-[0.18em]">
            Public {{ page.shortTitle.toLowerCase() }}
          </p>
          <p class="mt-3 text-3xl font-semibold">
            {{ entities.length }}
          </p>
          <p class="showcase-text-muted mt-2 text-sm leading-6">
            Список собирается напрямую из публичных exports пакета и hand-authored metadata слоя.
          </p>
        </DsCard>

        <DsCard class="showcase-panel rounded-3xl border p-5">
          <p class="showcase-kicker text-xs font-semibold tracking-[0.18em]">
            Featured focus
          </p>
          <p class="mt-3 text-3xl font-semibold">
            {{ featuredEntities.length }}
          </p>
          <p class="showcase-text-muted mt-2 text-sm leading-6">
            Именно на них в первую очередь появляются runnable demos и более глубокие integration notes.
          </p>
        </DsCard>

        <DsCard class="showcase-panel rounded-3xl border p-5">
          <p class="showcase-kicker text-xs font-semibold tracking-[0.18em]">
            API docs ready
          </p>
          <p class="mt-3 text-3xl font-semibold">
            {{ manualApiCoverage }}
          </p>
          <p class="showcase-text-muted mt-2 text-sm leading-6">
            Detail pages уже используют ручные API-таблицы там, где автогенерации для package-level API недостаточно.
          </p>
        </DsCard>
      </div>

      <div class="showcase-panel rounded-3xl border p-4">
        <label class="grid gap-2 text-sm font-medium">
          Search {{ page.shortTitle.toLowerCase() }}
          <input
            v-model="searchQuery"
            type="search"
            :placeholder="`Filter ${page.shortTitle.toLowerCase()} by name, tags or summary`"
            class="showcase-input w-full rounded-2xl border px-4 py-3 text-sm outline-none transition"
          >
        </label>
      </div>

      <div class="space-y-6">
        <section
          v-for="bucket in groupedEntities"
          :key="bucket.group"
          class="space-y-4"
        >
          <div class="flex items-center justify-between gap-3">
            <div>
              <h2 class="text-2xl font-semibold">
                {{ bucket.label }}
              </h2>
              <p class="showcase-text-subtle text-sm">
                {{ bucket.entities.length }} {{ kindLabel }}<span v-if="bucket.entities.length !== 1">s</span>
              </p>
            </div>
          </div>

          <div class="grid gap-4 xl:grid-cols-2">
            <RouterLink
              v-for="entity in bucket.entities"
              :key="entity.id"
              :to="entity.path"
              class="block"
            >
              <DsCard class="showcase-card-link h-full rounded-3xl border p-6 shadow-sm transition-transform hover:-translate-y-0.5">
                <div class="flex flex-wrap items-center gap-2">
                  <DsBadge>{{ entity.kind }}</DsBadge>
                  <DsBadge v-for="tag in entity.tags.slice(0, 3)" :key="tag">
                    {{ tag }}
                  </DsBadge>
                </div>

                <h3 class="showcase-card-link-title mt-4 text-xl font-semibold">
                  {{ entity.title }}
                </h3>
                <p class="showcase-text-muted mt-3 text-sm leading-6">
                  {{ entity.summary }}
                </p>

                <div class="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  <span>Open detail page</span>
                  <IconArrowRight class="h-4 w-4 shrink-0" />
                </div>
              </DsCard>
            </RouterLink>
          </div>
        </section>

        <DsCard
          v-if="groupedEntities.length === 0"
          class="showcase-empty-state rounded-3xl border border-dashed p-8 text-sm leading-6 shadow-sm"
        >
          Nothing matched the current query. Try searching by export name, tag or group.
        </DsCard>
      </div>
    </section>
  </div>
</template>