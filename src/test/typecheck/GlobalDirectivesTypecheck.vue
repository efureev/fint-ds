<script setup lang="ts">
const onOutside = () => {}
const onFiles = async (_files: File[]) => {}
const onEscape = (_event: KeyboardEvent) => {}
</script>

<template>
  <div
    v-autofocus="{ selector: 'input', preventScroll: true }"
    v-click-outside="{ handler: onOutside, events: ['click', 'pointerdown'] }"
    v-dropzone="{ onFiles, overClass: 'is-over' }"
    v-hotkey="{ Escape: onEscape }"
    v-loading="{ loading: true, text: 'Loading' }"
  >
    <textarea v-autosize="true" />
  </div>
</template>