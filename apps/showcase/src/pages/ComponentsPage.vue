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
    return [entity.name, entity.summary, entity.group]
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

const componentsWithExamples = computed(() => showcaseComponentEntities.filter(entity => entity.examples.length > 0))
</script>

<template>
  <div class="space-y-8">
    <DsCard class="showcase-panel rounded-3xl border p-8">
      <div class="flex flex-wrap items-center gap-3">
        <span class="showcase-kicker text-xs font-semibold tracking-[0.18em]">
          {{ page.eyebrow }}
        </span>
      </div>

      <div class="mt-5 space-y-4">
        <h1 class="max-w-4xl text-4xl font-semibold leading-tight lg:text-5xl">
          Каталог компонентов
        </h1>
        <p class="showcase-text-muted max-w-3xl text-base leading-7">
          Здесь удобно искать компоненты по названию и группе, а затем переходить к detail pages без технического шума и служебных метрик.
        </p>
      </div>
    </DsCard>

    <section id="catalog" class="scroll-mt-28 space-y-5">
      <div class="grid gap-4 md:grid-cols-2">
        <DsCard class="showcase-panel rounded-3xl border p-5">
          <p class="showcase-kicker text-xs font-semibold tracking-[0.18em]">
            Public components
          </p>
          <p class="mt-3 text-3xl font-semibold">
            {{ showcaseComponentEntities.length }}
          </p>
          <p class="showcase-text-muted mt-2 text-sm leading-6">
            Каталог собирается напрямую из registry пакета и не требует ручного списка страниц.
          </p>
        </DsCard>

        <DsCard class="showcase-panel rounded-3xl border p-5">
          <p class="showcase-kicker text-xs font-semibold tracking-[0.18em]">
            With examples
          </p>
          <p class="mt-3 text-3xl font-semibold">
            {{ componentsWithExamples.length }}
          </p>
          <p class="showcase-text-muted mt-2 text-sm leading-6">
            Компоненты, для которых уже добавлены live examples и можно сразу посмотреть usage-сценарии.
          </p>
        </DsCard>

      </div>

      <DsCard class="showcase-panel rounded-3xl border p-6">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-2">
            <h2 class="text-2xl font-semibold">
              Component catalog
            </h2>
            <p class="showcase-text-muted max-w-3xl text-sm leading-6">
              Поиск работает по имени, summary и группе. Этого достаточно, чтобы быстро прыгать к нужной странице компонента.
            </p>
          </div>

          <label class="block w-full max-w-md">
            <span class="showcase-kicker mb-2 block text-xs font-semibold">
              Search components
            </span>
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Например: button, form, overlay"
              class="showcase-input w-full rounded-2xl border px-4 py-3 text-sm outline-none transition-colors"
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
                class="showcase-card-link group block rounded-3xl border p-5 transition-colors"
              >
                <div class="flex items-start gap-3">
                  <div>
                    <p class="showcase-card-link-title text-lg font-semibold transition-colors">
                      {{ component.title }}
                    </p>
                    <p class="showcase-text-muted mt-2 text-sm leading-6">
                      {{ component.summary }}
                    </p>
                  </div>
                </div>

                <div class="showcase-text-subtle mt-4 flex flex-wrap gap-2 text-xs">
                  <span class="showcase-link-chip rounded-full border px-3 py-1">
                    {{ component.group }}
                  </span>
                  <span class="showcase-link-chip rounded-full border px-3 py-1">
                    props: {{ component.apiSections.find(section => section.key === 'props')?.items.length ?? 0 }}
                  </span>
                  <span class="showcase-link-chip rounded-full border px-3 py-1">
                    examples: {{ component.examples.length }}
                  </span>
                </div>
              </RouterLink>
            </div>
          </div>

          <div
            v-if="groupedComponents.length === 0"
            class="showcase-empty-state rounded-3xl border border-dashed px-5 py-8 text-sm leading-6"
          >
            По текущему запросу компоненты не найдены. Попробуй искать по имени (`DsButton`) или группе (`forms`, `overlays`).
          </div>
        </div>
      </DsCard>
    </section>

    <section id="live-demos" class="scroll-mt-28 grid gap-4 lg:grid-cols-2">
      <DsCard class="showcase-panel rounded-3xl border p-6">
        <h2 class="text-2xl font-semibold">
          С чего начать
        </h2>
        <p class="showcase-text-muted mt-3 text-sm leading-6">
          Если нужен быстрый вход, начните с компонентов, для которых уже есть live examples — по ним проще всего оценить API и сценарии использования.
        </p>
        <div class="mt-5 flex flex-wrap gap-2">
          <DsBadge
            v-for="component in componentsWithExamples.slice(0, 6)"
            :key="component.id"
          >
            {{ component.title }}
          </DsBadge>
        </div>
      </DsCard>

      <DsCard class="showcase-panel rounded-3xl border p-6">
        <h2 class="text-2xl font-semibold">
          Как пользоваться каталогом
        </h2>
        <ul class="showcase-text-muted mt-4 grid gap-3 text-sm leading-6">
          <li class="showcase-inline-surface rounded-2xl border px-4 py-3">
            Ищите по названию, summary или категории — фильтр сразу сокращает список до релевантных элементов.
          </li>
          <li class="showcase-inline-surface rounded-2xl border px-4 py-3">
            На карточке компонента сразу видно категорию и объём примеров, поэтому проще выбрать нужную detail page.
          </li>
        </ul>
      </DsCard>
    </section>
  </div>
</template>