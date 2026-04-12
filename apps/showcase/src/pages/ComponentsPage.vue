<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { DsBadge, DsCard } from '@feugene/granularity'

import { showcaseComponentEntities, showcasePageRecord } from '../app/showcase'

const page = showcasePageRecord.components

const groupLabels: Record<string, string> = {
  actions: 'Actions',
  feedback: 'Feedback',
  navigation: 'Navigation',
  overlays: 'Overlays',
  forms: 'Forms',
  data: 'Data display',
  misc: 'Misc',
}

const searchQuery = ref('')

const filteredComponents = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query)
    return showcaseComponentEntities

  return showcaseComponentEntities.filter((entity) => {
    return [entity.name, entity.summary, entity.group, entity.tags.join(' ')]
      .join(' ')
      .toLowerCase()
      .includes(query)
  })
})

const groupedComponents = computed(() => {
  const buckets = new Map<string, typeof showcaseComponentEntities>()

  for (const entity of filteredComponents.value) {
    const group = entity.group || 'misc'
    const currentGroup = buckets.get(group) ?? []
    currentGroup.push(entity)
    buckets.set(group, currentGroup)
  }

  return [...buckets.entries()]
    .sort(([left], [right]) => (groupLabels[left] ?? left).localeCompare(groupLabels[right] ?? right))
    .map(([group, entities]) => ({
      group,
      label: groupLabels[group] ?? group,
      entities: [...entities].sort((left, right) => left.title.localeCompare(right.title)),
    }))
})

const featuredComponents = computed(() => showcaseComponentEntities.filter(entity => entity.tags.includes('featured')))
</script>

<template>
  <div class="space-y-8">
    <DsCard class="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
      <div class="flex flex-wrap items-center gap-3">
        <span class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          {{ page.eyebrow }}
        </span>
      </div>

      <div class="mt-5 space-y-4">
        <h1 class="max-w-4xl text-4xl font-semibold leading-tight lg:text-5xl">
          Каталог компонентов
        </h1>
        <p class="max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
          Здесь удобно искать компоненты по названию и группе, а затем переходить к detail pages без технического шума и служебных метрик.
        </p>
      </div>
    </DsCard>

    <section id="catalog" class="scroll-mt-28 space-y-5">
      <div class="grid gap-4 md:grid-cols-2">
        <DsCard class="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Public components
          </p>
          <p class="mt-3 text-3xl font-semibold">
            {{ showcaseComponentEntities.length }}
          </p>
          <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Каталог собирается напрямую из registry пакета и не требует ручного списка страниц.
          </p>
        </DsCard>

        <DsCard class="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Featured focus
          </p>
          <p class="mt-3 text-3xl font-semibold">
            {{ featuredComponents.length }}
          </p>
          <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            На этих компонентах в первую очередь собираем живые сценарии и showcase-grade detail pages.
          </p>
        </DsCard>

      </div>

      <DsCard class="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-2">
            <h2 class="text-2xl font-semibold">
              Component catalog
            </h2>
            <p class="max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              Поиск работает по имени, summary, группе и tags. Это уже достаточно, чтобы быстро прыгать к нужной странице компонента.
            </p>
          </div>

          <label class="block w-full max-w-md">
            <span class="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Search components
            </span>
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Например: button, form, overlay"
              class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus:border-primary dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-50 dark:placeholder:text-slate-500"
            >
          </label>
        </div>

        <div class="mt-6 space-y-8">
          <div
            v-for="group in groupedComponents"
            :key="group.group"
            class="space-y-4"
          >
            <div class="flex items-center gap-3">
              <h3 class="text-xl font-semibold">
                {{ group.label }}
              </h3>
              <DsBadge>{{ group.entities.length }}</DsBadge>
            </div>

            <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <RouterLink
                v-for="component in group.entities"
                :key="component.id"
                :to="component.path"
                class="group block rounded-3xl border border-slate-200/80 bg-slate-50 p-5 transition-colors hover:border-primary/40 hover:bg-white dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-primary/40 dark:hover:bg-slate-900"
              >
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-lg font-semibold text-slate-950 transition-colors group-hover:text-primary dark:text-slate-50">
                      {{ component.title }}
                    </p>
                    <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {{ component.summary }}
                    </p>
                  </div>

                  <DsBadge v-if="component.tags.includes('featured')">
                    featured
                  </DsBadge>
                </div>

                <div class="mt-4 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span class="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">
                    {{ component.group }}
                  </span>
                  <span class="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">
                    props: {{ component.apiSections.find(section => section.key === 'props')?.items.length ?? 0 }}
                  </span>
                  <span class="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">
                    examples: {{ component.examples.length }}
                  </span>
                </div>
              </RouterLink>
            </div>
          </div>

          <div
            v-if="groupedComponents.length === 0"
            class="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300"
          >
            По текущему запросу компоненты не найдены. Попробуй искать по имени (`DsButton`) или группе (`forms`, `overlays`).
          </div>
        </div>
      </DsCard>
    </section>

    <section id="live-demos" class="scroll-mt-28 grid gap-4 lg:grid-cols-2">
      <DsCard class="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
        <h2 class="text-2xl font-semibold">
          С чего начать
        </h2>
        <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          Если нужен быстрый вход, начните с самых востребованных компонентов — для них уже проще всего оценить API и сценарии использования.
        </p>
        <div class="mt-5 flex flex-wrap gap-2">
          <DsBadge
            v-for="component in featuredComponents.slice(0, 6)"
            :key="component.id"
          >
            {{ component.title }}
          </DsBadge>
        </div>
      </DsCard>

      <DsCard class="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
        <h2 class="text-2xl font-semibold">
          Как пользоваться каталогом
        </h2>
        <ul class="mt-4 grid gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          <li class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/60">
            Ищите по названию, summary или категории — фильтр сразу сокращает список до релевантных элементов.
          </li>
          <li class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/60">
            На карточке компонента сразу видно категорию и объём примеров, поэтому проще выбрать нужную detail page.
          </li>
        </ul>
      </DsCard>
    </section>
  </div>
</template>