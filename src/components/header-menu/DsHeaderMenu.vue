<script setup lang="ts">
import DsDropdown from '@/components/DsDropdown.vue'

export type DsHeaderMenuAlign = 'left' | 'right' | 'center'
export type DsHeaderMenuWidth = 'auto' | '20' | '48' | '60' | '64' | '80'

const props = withDefaults(
  defineProps<{
    align?: DsHeaderMenuAlign
    width?: DsHeaderMenuWidth
    closeOnContentClick?: boolean
    contentClass?: string
  }>(),
  {
    align: 'right',
    width: '48',
    closeOnContentClick: true,
    // В `DsDropdown` есть `p-1`, поэтому здесь по умолчанию обнуляем padding,
    // чтобы пункты меню могли растягиваться до границ.
    contentClass: 'p-0',
  },
)
</script>

<template>
  <DsDropdown
    :align="props.align"
    :width="props.width"
    :close-on-content-click="props.closeOnContentClick"
    :content-class="props.contentClass"
  >
    <template #trigger="slotProps">
      <slot name="trigger" v-bind="slotProps" />
    </template>

    <template #content="slotProps">
      <slot v-bind="slotProps" />
    </template>
  </DsDropdown>
</template>
