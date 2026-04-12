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
  <div class="mt-6 rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/60">
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
        class="inline-flex rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-950 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:text-slate-100"
        target="_blank"
        rel="noreferrer"
      >
        {{ link.label }}
      </a>
    </div>

    <p class="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
      {{ copyStatus || 'Быстрые действия: скопируйте canonical import/usage или перейдите к исходникам и metadata.' }}
    </p>
  </div>
</template>