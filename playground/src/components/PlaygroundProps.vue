<script setup lang="ts">
import { computed } from 'vue'

import { useFintI18n } from '@feugene/fint-i18n'

export type PlaygroundPropItem = {
  name: string
  type?: string
  default?: string
  description: string
}

function formatDefault(v: string | undefined): string {
  if (v == null) return '—'
  if (v === 'undefined') return '—'
  return v
}

const props = withDefaults(
  defineProps<{
    title?: string
    items: PlaygroundPropItem[]
  }>(),
  {
    title: undefined,
  },
)

const { t } = useFintI18n()

const localizedTitle = computed(() => {
  const title = props.title ?? t('playground.propsDemo.title', 'Demo props')
  const match = /^(.*)\s+—\s+(Props|Slots|Events)$/.exec(title)

  if (!match)
    return title

  const [, componentName, section] = match
  const sectionKey = ({ Props: 'props', Slots: 'slots', Events: 'events' } as const)[section as 'Props' | 'Slots' | 'Events']

  return `${componentName} — ${t(`playground.propsDemo.sections.${sectionKey}`, section)}`
})
</script>

<template>
  <DsCard class="p-5">
    <div class="text-sm font-700">
      {{ localizedTitle }}
    </div>
    <div class="mt-3 grid gap-2">
      <div
        class="hidden sm:grid grid-cols-[220px_180px_140px_1fr] gap-4 text-[11px] uppercase tracking-wide text-[var(--muted-foreground)]"
      >
        <div>{{ t('playground.propsDemo.columns.prop', 'Prop') }}</div>
        <div>{{ t('playground.propsDemo.columns.type', 'Type') }}</div>
        <div>{{ t('playground.propsDemo.columns.default', 'Default') }}</div>
        <div>{{ t('playground.propsDemo.columns.description', 'Description') }}</div>
      </div>

      <div
        v-for="it in items"
        :key="it.name"
        class="grid grid-cols-1 sm:grid-cols-[220px_180px_140px_1fr] gap-1 sm:gap-4 py-2 sm:py-0 border-b border-[var(--border)] sm:border-none"
      >
        <div class="font-mono text-[12px] text-[var(--muted-foreground)]">
          {{ it.name }}
        </div>
        <div class="font-mono text-[12px] text-[var(--muted-foreground)]">
          {{ it.type ?? '—' }}
        </div>
        <div class="font-mono text-[12px] text-[var(--muted-foreground)]">
          {{ formatDefault(it.default) }}
        </div>
        <div class="text-sm ds-muted">
          {{ it.description }}
        </div>
      </div>
    </div>
  </DsCard>
</template>
