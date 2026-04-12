<script setup lang="ts">
import { ref } from 'vue'

import { DsButton } from '@feugene/granularity'

const props = withDefaults(defineProps<{
  code: string
  language?: string
  title?: string
}>(), {
  language: 'ts',
  title: undefined,
})

const isCopied = ref(false)

async function copyCode() {
  if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText)
    return

  await navigator.clipboard.writeText(props.code)
  isCopied.value = true

  window.setTimeout(() => {
    isCopied.value = false
  }, 1200)
}
</script>

<template>
  <div class="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 text-slate-50 dark:border-slate-800">
    <div class="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
      <div class="min-w-0">
        <p
          v-if="title"
          class="truncate text-sm font-semibold"
        >
          {{ title }}
        </p>
        <p class="text-xs uppercase tracking-[0.16em] text-slate-400">
          {{ language }}
        </p>
      </div>

      <DsButton
        variant="ghost-border"
        size="sm"
        @click="copyCode"
      >
        {{ isCopied ? 'Скопировано' : 'Скопировать' }}
      </DsButton>
    </div>

    <pre class="overflow-x-auto px-4 py-4 text-sm leading-6"><code>{{ code }}</code></pre>
  </div>
</template>