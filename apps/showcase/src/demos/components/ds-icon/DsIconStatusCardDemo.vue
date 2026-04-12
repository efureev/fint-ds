<script setup lang="ts">
import { DsBadge, DsCard, DsIcon } from '@feugene/granularity'

const stats = [
  { label: 'Healthy integrations', value: '18', tone: 'text-emerald-500' },
  { label: 'Needs review', value: '4', tone: 'text-amber-500' },
  { label: 'Failed checks', value: '1', tone: 'text-rose-500' },
]
</script>

<template>
  <div class="grid gap-3 sm:grid-cols-3">
    <DsCard
      v-for="stat in stats"
      :key="stat.label"
      class="grid gap-3 p-4"
    >
      <div class="flex items-center justify-between gap-3">
        <DsIcon size="lg" :class="stat.tone">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-full w-full">
            <circle cx="12" cy="12" r="8" />
            <path d="m9.5 12 1.7 1.8 3.5-4.1" />
          </svg>
        </DsIcon>

        <DsBadge size="sm" variant="secondary">
          snapshot
        </DsBadge>
      </div>

      <div>
        <div class="text-2xl font-700 text-[var(--foreground)]">
          {{ stat.value }}
        </div>
        <div class="text-sm text-[var(--muted-foreground)]">
          {{ stat.label }}
        </div>
      </div>
    </DsCard>
  </div>
</template>