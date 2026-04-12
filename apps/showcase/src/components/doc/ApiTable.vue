<script setup lang="ts">
import type { ShowcaseApiItemMeta } from '../../content/model'

defineProps<{
  title: string
  items: ShowcaseApiItemMeta[]
  emptyLabel: string
}>()
</script>

<template>
  <div class="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
    <div class="border-b border-slate-200/80 px-5 py-4 dark:border-slate-800">
      <h3 class="text-lg font-semibold">
        {{ title }}
      </h3>
    </div>

    <div v-if="items.length === 0" class="px-5 py-6 text-sm leading-6 text-slate-500 dark:text-slate-400">
      {{ emptyLabel }}
    </div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full border-collapse text-left text-sm">
        <thead class="bg-slate-50 text-slate-500 dark:bg-slate-950/60 dark:text-slate-400">
          <tr>
            <th class="px-5 py-3 font-semibold">Name</th>
            <th class="px-5 py-3 font-semibold">Type</th>
            <th class="px-5 py-3 font-semibold">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item.name"
            class="border-t border-slate-200/80 align-top dark:border-slate-800"
          >
            <td class="px-5 py-4 font-semibold text-slate-950 dark:text-slate-50">
              {{ item.name }}
            </td>
            <td class="px-5 py-4 text-slate-600 dark:text-slate-300">
              {{ item.type || item.signature || '—' }}
            </td>
            <td class="px-5 py-4 text-slate-600 dark:text-slate-300">
              <div class="space-y-1">
                <p v-if="item.description">
                  {{ item.description }}
                </p>
                <p v-if="typeof item.required === 'boolean'" class="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  {{ item.required ? 'required' : 'optional' }}
                </p>
                <p v-if="item.default" class="text-xs text-slate-500 dark:text-slate-400">
                  default: {{ item.default }}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>