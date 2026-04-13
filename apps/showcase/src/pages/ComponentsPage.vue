<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { DsCard } from '@feugene/granularity'

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

const componentsWithExamples = computed(() => showcaseComponentEntities.filter(entity => entity.examples.length > 0))

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

</script>

<template>
  <div class="space-y-8">
    <DsCard class="showcase-panel rounded-3xl border p-8">
      <div class="space-y-4">
        <span class="showcase-kicker text-xs font-semibold tracking-[0.18em]">
          {{ page.eyebrow }}
        </span>
        <h1 class="max-w-4xl text-3xl font-semibold leading-tight lg:text-4xl">
          Каталог компонентов
        </h1>
        <p class="showcase-text-muted max-w-3xl text-base leading-7">
          Ищите компоненты по названию и группе, а затем переходите к detail page без лишних метрик и служебного шума.
        </p>
      </div>
    </DsCard>

    <section id="catalog" class="scroll-mt-28 space-y-5">
      <DsCard class="showcase-panel rounded-3xl border p-6">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-2">
            <h2 class="text-2xl font-semibold">
              Component catalog
            </h2>
            <p class="showcase-text-muted max-w-3xl text-sm leading-6">
              Поиск работает по имени, summary и группе. Сейчас в каталоге {{ componentsWithExamples.length }} компонентов уже сопровождаются примерами.
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
              <span class="showcase-text-subtle text-sm">
                {{ group.entities.length }}
              </span>
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
  </div>
</template>