<script setup lang="ts">
import { ref } from 'vue'

import { DsButton } from '@feugene/granularity'

import type { ShowcaseRelatedLink } from './entityPageHelpers'

const props = defineProps<{
  importCode: string
  usageCode?: string
  links?: ShowcaseRelatedLink[]
}>()

const copyStatus = ref('')

async function copyText(value: string, label: string) {
  try {
    await navigator.clipboard.writeText(value)
    copyStatus.value = `${label} copied.`
  }
  catch {
    copyStatus.value = `Не удалось скопировать ${label.toLowerCase()}.`
  }

  window.setTimeout(() => {
    if (copyStatus.value === `${label} copied.` || copyStatus.value === `Не удалось скопировать ${label.toLowerCase()}.`)
      copyStatus.value = ''
  }, 1800)
}
</script>

<template>
  <div class="showcase-inline-surface mt-6 rounded-3xl border p-4">
    <div class="flex flex-wrap items-center gap-3">
      <DsButton variant="outline" @click="copyText(props.importCode, 'Import snippet')">
        Copy import
      </DsButton>
      <DsButton v-if="props.usageCode" variant="ghost" @click="copyText(props.usageCode, 'Usage snippet')">
        Copy usage
      </DsButton>

      <a
        v-for="link in props.links"
        :key="`${link.label}-${link.href}`"
        :href="link.href"
        class="showcase-link-chip inline-flex rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors"
        target="_blank"
        rel="noreferrer"
      >
        {{ link.label }}
      </a>
    </div>

    <p class="showcase-text-subtle mt-3 text-xs leading-5">
      {{ copyStatus || 'Быстрые действия: скопируйте canonical import/usage или перейдите к исходникам и metadata.' }}
    </p>
  </div>
</template>