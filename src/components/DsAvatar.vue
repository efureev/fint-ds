<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: number
    src?: string
    alt?: string
    shape?: 'circle' | 'square'
  }>(),
  {
    size: 40,
    src: undefined,
    alt: '',
    shape: 'circle',
  },
)

const style = computed(() => {
  const px = `${props.size}px`
  return {
    width: px,
    height: px,
  }
})

const className = computed(() => {
  return [
    'inline-flex items-center justify-center overflow-hidden border border-[var(--border)] bg-[var(--muted)] text-[var(--muted-foreground)] font-700',
    props.shape === 'square' ? 'rounded-[10px]' : 'rounded-full',
  ].join(' ')
})
</script>

<template>
  <span :style="style" :class="className">
    <img v-if="props.src" :src="props.src" :alt="props.alt" class="h-full w-full object-cover">
    <slot v-else />
  </span>
</template>
