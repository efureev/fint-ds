<script setup lang="ts">
withDefaults(
  defineProps<{
    ariaLabel?: string
  }>(),
  {
    ariaLabel: undefined,
  },
)
</script>

<template>
  <div
    data-ds-button-group
    class="inline-flex items-stretch"
    role="group"
    :aria-label="ariaLabel"
  >
    <slot />
  </div>
</template>

<style scoped>
/*
 * DsButtonGroup is purely visual (spacing + radii + border seam handling).
 * It targets DS buttons via `data-ds-button` to avoid affecting unrelated <button> elements.
 */

:deep([data-ds-button]) {
  border-radius: 0 !important;
  position: relative;
}

:deep([data-ds-button] + [data-ds-button]) {
  margin-left: -1px;
}

:deep([data-ds-button]:hover),
:deep([data-ds-button]:focus-visible) {
  z-index: 1;
}

:deep([data-ds-button]:first-child) {
  border-top-left-radius: 0.375rem !important;
  border-bottom-left-radius: 0.375rem !important;
}

:deep([data-ds-button]:last-child) {
  border-top-right-radius: 0.375rem !important;
  border-bottom-right-radius: 0.375rem !important;
}
</style>
