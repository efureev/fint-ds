<script setup lang="ts">
withDefaults(
  defineProps<{
    inset?: boolean
  }>(),
  {
    inset: false,
  },
)
</script>

<template>
  <div
    role="separator"
    class="border-t border-[var(--border)]"
    :class="inset ? 'mx-2' : ''"
  />
</template>