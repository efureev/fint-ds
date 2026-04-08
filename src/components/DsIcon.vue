<script setup lang="ts">
import { computed } from 'vue'

export type DsIconSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    size?: DsIconSize | number
  }>(),
  {
    size: 'md',
  },
)

const sizePx = computed(() => {
  if (typeof props.size === 'number') return props.size

  const map: Record<DsIconSize, number> = {
    sm: 16,
    md: 18,
    lg: 20,
  }

  return map[props.size]
})

// Use CSS variable to avoid re-layout if consumer overrides icon sizing via CSS.
const iconStyle = computed(() => {
  return {
    '--ds-icon-size': `${sizePx.value}px`,
  } as Record<string, string>
})
</script>

<template>
  <span
    data-ds-icon
    class="ds-icon inline-flex items-center justify-center align-middle"
    :style="iconStyle"
    v-bind="$attrs"
  >
    <slot />
  </span>
</template>
