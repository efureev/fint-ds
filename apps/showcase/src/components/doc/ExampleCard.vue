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
  <DsCard class="showcase-panel min-w-0 rounded-3xl border p-6">
    <div class="space-y-2">
      <h3 class="text-xl font-semibold">
        {{ title }}
      </h3>
      <p class="showcase-text-muted text-sm leading-6">
        {{ description }}
      </p>
    </div>

    <div class="showcase-empty-state mt-5 rounded-2xl border border-dashed px-4 py-6 text-sm">
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
      class="showcase-text-subtle mt-4 text-sm leading-6"
    >
      {{ note }}
    </p>
  </DsCard>
</template>