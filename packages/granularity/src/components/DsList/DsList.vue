<script setup lang="ts">
import DsCard from '../DsCard'

withDefaults(
  defineProps<{
    divided?: boolean
  }>(),
  {
    divided: true,
  },
)
</script>

<template>
  <DsCard>
    <div :class="divided ? 'divide-y divide-[var(--border)]' : ''">
      <slot />
    </div>
  </DsCard>
</template>