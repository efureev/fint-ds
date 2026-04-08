<script setup lang="ts">
import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

import { useFintI18n } from '@feugene/fint-i18n'

const { t } = useFintI18n()

const skeletonPropsInfo = [
  {
    name: 'height',
    type: 'string',
    default: "'12px'",
    description: 'Высота skeleton-блока.',
  },
  {
    name: 'width',
    type: 'string',
    default: "'100%'",
    description: 'Ширина skeleton-блока.',
  },
  {
    name: 'rounded',
    type: 'string',
    default: "'9999px'",
    description: 'Скругление (border-radius) skeleton-блока.',
  },
] as const

const emptyStatePropsInfo = [
  {
    name: 'title',
    type: 'string',
    description: 'Заголовок состояния «пусто».',
  },
  {
    name: 'description',
    type: 'string | undefined',
    description: 'Описание/подсказка (опционально).',
  },
] as const

const emptyStateSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Действия (кнопки/ссылки). Если слот не задан — блок действий не рендерится.',
  },
] as const

const usageCode = `<template>
  <DsSkeleton height="12px" width="260px" />

  <DsEmptyState title="No data" description="Try changing filters.">
    <DsButton size="sm">Add item</DsButton>
  </DsEmptyState>
</template>
`
</script>

<template>
  <PlaygroundPage
    :title="t('playground.empty.title', 'Empty state & Skeleton')"
    :description="t('playground.empty.lead', 'Loading placeholders and empty-state patterns.')"
  >
    <template #ui>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DsCard class="p-5">
          <div class="text-sm font-600">DsSkeleton</div>
          <div class="mt-4 grid gap-2">
            <DsSkeleton height="12px" width="260px" />
            <DsSkeleton height="12px" width="220px" />
            <DsSkeleton height="12px" width="300px" />
            <div class="mt-2 flex items-center gap-3">
              <DsSkeleton height="40px" width="40px" rounded="12px" />
              <div class="grid gap-2">
                <DsSkeleton height="10px" width="160px" />
                <DsSkeleton height="10px" width="220px" />
              </div>
            </div>
          </div>
        </DsCard>

        <div class="grid gap-4">
          <div class="text-sm font-600">DsEmptyState</div>
          <DsEmptyState
            :title="t('playground.empty.noDataTitle', 'No data')"
            :description="t('playground.empty.noDataDesc', 'Try changing filters or add a new item.')"
          >
            <DsButton size="sm">{{ t('playground.empty.action', 'Add item') }}</DsButton>
          </DsEmptyState>
        </div>
      </div>
    </template>

    <template #usage>
      <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsSkeleton — Props" :items="skeletonPropsInfo" />
      <PlaygroundProps title="DsEmptyState — Props" :items="emptyStatePropsInfo" />
      <PlaygroundProps title="DsEmptyState — Slots" :items="emptyStateSlotsInfo" />
    </template>
  </PlaygroundPage>
</template>
