<script setup lang="ts">
import type { ShowcaseRelatedLink } from './entityPageHelpers'

defineProps<{
  title: string
  items?: string[]
  links?: ShowcaseRelatedLink[]
}>()
</script>

<template>
  <div class="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
    <h3 class="text-lg font-semibold">
      {{ title }}
    </h3>

    <ul v-if="items?.length" class="mt-4 grid gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
      <li v-for="item in items" :key="item">
        {{ item }}
      </li>
    </ul>

    <ul v-else-if="links?.length" class="mt-4 grid gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
      <li v-for="link in links" :key="`${link.label}-${link.href}`">
        <a :href="link.href" class="font-medium text-primary hover:underline" target="_blank" rel="noreferrer">
          {{ link.label }}
        </a>
      </li>
    </ul>
  </div>
</template>