<script setup lang="ts">
import { DsCard } from '@feugene/granularity'

import CodeBlock from './CodeBlock.vue'

defineProps<{
  title: string
  description: string
  status?: string
  code?: string
  note?: string
}>()
</script>

<template>
  <DsCard class="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
    <div class="space-y-2">
      <h3 class="text-xl font-semibold">
        {{ title }}
      </h3>
      <p class="text-sm leading-6 text-slate-600 dark:text-slate-300">
        {{ description }}
      </p>
    </div>

    <div class="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
      <slot name="preview">
        Preview area зарезервирован под live demo следующего этапа.
      </slot>
    </div>

    <CodeBlock
      v-if="code"
      class="mt-5"
      :code="code"
      language="vue"
      title="Snippet"
    />

    <p
      v-if="note"
      class="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400"
    >
      {{ note }}
    </p>
  </DsCard>
</template>