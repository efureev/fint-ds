<script setup lang="ts">
import { DsBadge, DsProgressBar } from '@feugene/granularity'

const stages = [
  { label: 'Validation', value: 100, variant: 'success' as const },
  { label: 'Fraud screening', value: 72, variant: 'warning' as const },
  { label: 'Settlement', value: 41, variant: 'neutral' as const },
]
</script>

<template>
  <div class="grid gap-3">
    <div
      v-for="stage in stages"
      :key="stage.label"
      class="grid gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3"
    >
      <div class="flex items-center justify-between gap-3 text-sm">
        <span>{{ stage.label }}</span>
        <DsBadge size="sm" :variant="stage.variant">{{ stage.value }}%</DsBadge>
      </div>

      <DsProgressBar :value="stage.value" :aria-label="stage.label" />
    </div>
  </div>
</template>