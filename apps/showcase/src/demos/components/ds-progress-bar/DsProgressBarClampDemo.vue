<script setup lang="ts">
import { DsBadge, DsProgressBar } from '@feugene/granularity'

const rows = [
  { label: 'Imported from legacy job', raw: -18 },
  { label: 'Actual processed records', raw: 58 },
  { label: 'Overreported upstream value', raw: 146 },
]
</script>

<template>
  <div class="grid gap-3">
    <div
      v-for="row in rows"
      :key="row.label"
      class="grid gap-2 rounded-xl border border-[var(--brd)] bg-[var(--card)] p-3"
    >
      <div class="flex items-center justify-between gap-3 text-sm">
        <span>{{ row.label }}</span>
        <DsBadge size="sm" tone="neutral">input: {{ row.raw }}%</DsBadge>
      </div>

      <DsProgressBar :value="row.raw" :aria-label="row.label" />
    </div>
  </div>
</template>