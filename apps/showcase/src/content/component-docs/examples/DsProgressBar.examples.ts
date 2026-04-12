import type { ShowcaseComponentExampleDoc } from '../types'

export const dsProgressBarExamples: ShowcaseComponentExampleDoc[] = [
  {
    id: 'progress-bar-basic-flow',
    title: 'Interactive determinate progress',
    description: 'Базовый сценарий: меняем `value` кнопками и рядом выводим фактический процент выполнения.',
    status: 'ready',
    previewKey: 'ds-progress-bar-basic-flow',
    code: `<script setup lang="ts">
import { ref } from 'vue'

import { DsButton, DsProgressBar } from '@feugene/granularity'

const progress = ref(32)
</script>

<template>
  <div class="grid gap-2">
    <DsProgressBar :value="progress" aria-label="Verification progress" />
  </div>
</template>`,
  },
  {
    id: 'progress-bar-clamped-values',
    title: 'Out-of-range inputs are clamped',
    description: 'Документируем важный edge-case: отрицательные и слишком большие значения безопасно ограничиваются диапазоном 0–100.',
    status: 'ready',
    previewKey: 'ds-progress-bar-clamped-values',
    code: `<script setup lang="ts">
import { DsBadge, DsProgressBar } from '@feugene/granularity'

const rows = [
  { label: 'Imported from legacy job', raw: -18 },
  { label: 'Actual processed records', raw: 58 },
  { label: 'Overreported upstream value', raw: 146 },
]
</script>

<template>
  <div class="grid gap-3">
    <div v-for="row in rows" :key="row.label" class="grid gap-2">
      <DsBadge size="sm" variant="secondary">input: {{ row.raw }}%</DsBadge>
      <DsProgressBar :value="row.raw" :aria-label="row.label" />
    </div>
  </div>
</template>`,
  },
  {
    id: 'progress-bar-pipeline-stages',
    title: 'Stack of workflow stages',
    description: 'Data-display сценарий для pipelines/checklists: несколько progress bars в списке статусов одного workflow.',
    status: 'ready',
    previewKey: 'ds-progress-bar-pipeline-stages',
    code: `<script setup lang="ts">
import { DsBadge, DsProgressBar } from '@feugene/granularity'

const stages = [
  { label: 'Validation', value: 100, variant: 'success' },
  { label: 'Fraud screening', value: 72, variant: 'warning' },
  { label: 'Settlement', value: 41, variant: 'secondary' },
]
</script>

<template>
  <div class="grid gap-3">
    <div v-for="stage in stages" :key="stage.label" class="grid gap-2">
      <DsBadge size="sm" :variant="stage.variant">{{ stage.value }}%</DsBadge>
      <DsProgressBar :value="stage.value" :aria-label="stage.label" />
    </div>
  </div>
</template>`,
  },
]
