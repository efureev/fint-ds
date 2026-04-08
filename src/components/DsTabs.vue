<script setup lang="ts">
import { computed } from 'vue'

export type DsTab = {
  value: string
  label: string
  badge?: string
}

const props = defineProps<{
  modelValue: string
  tabs: DsTab[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const activeIndex = computed(() => props.tabs.findIndex((t) => t.value === props.modelValue))

function select(value: string): void {
  emit('update:modelValue', value)
}

function onKeydown(e: KeyboardEvent): void {
  if (props.tabs.length === 0) return
  const idx = activeIndex.value < 0 ? 0 : activeIndex.value

  if (e.key === 'ArrowRight') {
    e.preventDefault()
    const next = props.tabs[(idx + 1) % props.tabs.length]
    if (next) select(next.value)
  }
  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    const next = props.tabs[(idx - 1 + props.tabs.length) % props.tabs.length]
    if (next) select(next.value)
  }
}
</script>

<template>
  <div
    role="tablist"
    class="inline-flex flex-wrap gap-1 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-1"
    @keydown="onKeydown"
  >
    <button
      v-for="t in props.tabs"
      :key="t.value"
      type="button"
      role="tab"
      :aria-selected="t.value === props.modelValue ? 'true' : 'false'"
      class="h-9 px-3 rounded-[10px] text-sm font-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
      :class="t.value === props.modelValue
        ? 'bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)]'
        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[color-mix(in_srgb,var(--card)_70%,transparent)]'"
      @click="select(t.value)"
    >
      <span class="inline-flex items-center gap-2">
        <span>{{ t.label }}</span>
        <span
          v-if="t.badge"
          class="text-[11px] px-1.5 py-0.5 rounded-full bg-[var(--secondary)] text-[var(--secondary-foreground)]"
        >
          {{ t.badge }}
        </span>
      </span>
    </button>
  </div>
</template>
