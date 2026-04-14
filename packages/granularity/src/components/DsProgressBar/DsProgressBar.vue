<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  value: number
  ariaLabel?: string
}>(), {
  ariaLabel: undefined,
})

const safe = computed(() => {
  if (Number.isNaN(props.value))
    return 0

  return Math.min(100, Math.max(0, props.value))
})
</script>

<template>
  <div
    role="progressbar"
    :aria-label="props.ariaLabel"
    :aria-valuenow="safe"
    aria-valuemin="0"
    aria-valuemax="100"
    class="h-2 w-full rounded-full bg-[var(--muted)] border border-[var(--brd)] overflow-hidden"
  >
    <div
      class="h-full bg-[var(--primary)]"
      :style="{ width: `${safe}%` }"
    />
  </div>
</template>