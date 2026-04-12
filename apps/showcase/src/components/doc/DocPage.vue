<script setup lang="ts">
import { DsBadge, DsCard } from '@feugene/granularity'

import type { ShowcaseApiSectionMeta, ShowcaseExampleMeta } from '../../content/model'
import type { ShowcaseRelatedLink } from './entityPageHelpers'
import CodeBlock from './CodeBlock.vue'
import EventsTable from './EventsTable.vue'
import ExampleCard from './ExampleCard.vue'
import InfoSectionCard from './InfoSectionCard.vue'
import MethodsTable from './MethodsTable.vue'
import PropsTable from './PropsTable.vue'
import SlotsTable from './SlotsTable.vue'

defineProps<{
  eyebrow: string
  title: string
  description: string
  status: string
  sections: { id: string; title: string; description: string; bullets: string[] }[]
  examples?: ShowcaseExampleMeta[]
  usageCode?: string
  accessibilityItems?: string[]
  dependencyItems?: string[]
  relatedLinks?: ShowcaseRelatedLink[]
  apiSections?: ShowcaseApiSectionMeta[]
}>()
</script>

<template>
  <div class="space-y-8">
    <DsCard class="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
      <div class="flex flex-wrap items-center gap-3">
        <span class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          {{ eyebrow }}
        </span>
      </div>

      <div class="mt-5 space-y-4">
        <h1 class="max-w-4xl text-4xl font-semibold leading-tight lg:text-5xl">
          {{ title }}
        </h1>
        <p class="max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
          {{ description }}
        </p>
      </div>
    </DsCard>

    <section class="grid gap-6">
      <DsCard
        v-for="section in sections"
        :id="section.id"
        :key="section.id"
        class="scroll-mt-28 rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90"
      >
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <h2 class="text-2xl font-semibold leading-tight">
              {{ section.title }}
            </h2>
            <a :href="`#${section.id}`" class="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:text-slate-100">
              link
            </a>
          </div>

          <p class="max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            {{ section.description }}
          </p>
        </div>

        <ul class="mt-6 grid gap-3">
          <li v-for="bullet in section.bullets" :key="bullet" class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200">
            {{ bullet }}
          </li>
        </ul>
      </DsCard>
    </section>

    <section v-if="examples?.length" class="space-y-4">
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold">Live examples</h2>
        <p class="text-sm leading-6 text-slate-600 dark:text-slate-300">
          Блоки примеров уже собраны в reusable primitive-формате и готовы к подключению реальных live demo.
        </p>
      </div>

      <div class="grid gap-6">
        <ExampleCard
          v-for="example in examples"
          :key="example.id"
          :title="example.title"
          :description="example.description"
          :code="usageCode"
          note="На следующих этапах эта карточка получит живой preview и source snippet конкретного сценария."
        />
      </div>
    </section>

    <section class="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)]">
      <div class="space-y-6">
        <div class="space-y-4">
          <h2 class="text-2xl font-semibold">API</h2>
          <div class="grid gap-4">
            <PropsTable :items="apiSections?.find(section => section.key === 'props')?.items ?? []" />
            <SlotsTable :items="apiSections?.find(section => section.key === 'slots')?.items ?? []" />
            <EventsTable :items="apiSections?.find(section => section.key === 'events')?.items ?? apiSections?.find(section => section.key === 'parameters')?.items ?? []" />
            <MethodsTable :items="apiSections?.find(section => section.key === 'methods')?.items ?? apiSections?.find(section => section.key === 'returns')?.items ?? []" />
          </div>
        </div>

        <div v-if="usageCode" class="space-y-4">
          <h2 class="text-2xl font-semibold">Usage</h2>
          <CodeBlock :code="usageCode" language="ts" title="Usage snippet" />
        </div>
      </div>

      <div class="space-y-4">
        <InfoSectionCard title="Accessibility" :items="accessibilityItems" />
        <InfoSectionCard title="Dependencies" :items="dependencyItems" />
        <InfoSectionCard title="Related links" :links="relatedLinks" />
      </div>
    </section>
  </div>
</template>