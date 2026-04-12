<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    dividers?: boolean
    borderTop?: boolean
    borderBottom?: boolean
  }>(),
  {
    dividers: false,
    borderTop: false,
    borderBottom: false,
  },
)

const className = computed(() => {
  return [
    'w-full',
    props.dividers ? 'divide-y divide-[var(--border)]' : '',
    props.borderTop ? 'border-t border-[var(--border)]' : '',
    props.borderBottom ? 'border-b border-[var(--border)]' : '',
  ].filter(Boolean).join(' ')
})
</script>

<template>
  <div :class="className">
    <slot />
  </div>
</template>