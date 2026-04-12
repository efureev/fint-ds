<script setup lang="ts">
import { computed } from 'vue'

export type { DsIconSize } from './dsIconStyles'

import { dsIconClass, resolveDsIconSizePx, type DsIconSize } from './dsIconStyles'

const props = defineProps<{
  size?: DsIconSize | number
}>()

const resolvedSize = computed(() => props.size ?? 'md')

const iconStyle = computed(() => {
  return {
    '--ds-icon-size': `${resolveDsIconSizePx(resolvedSize.value)}px`,
  } as Record<string, string>
})
</script>

<template>
  <span
    data-ds-icon
    :class="dsIconClass"
    :style="iconStyle"
    v-bind="$attrs"
  >
    <slot />
  </span>
</template>