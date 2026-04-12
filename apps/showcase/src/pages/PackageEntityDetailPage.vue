<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { DsBadge, DsCard } from '@feugene/granularity'

import {
  getShowcaseEntityByPath,
  getShowcasePageByPath,
  showcasePageRecord,
} from '../app/showcase'
import CodeBlock from '../components/doc/CodeBlock.vue'
import ApiTable from '../components/doc/ApiTable.vue'
import EntityActionBar from '../components/doc/EntityActionBar.vue'
import ExampleCard from '../components/doc/ExampleCard.vue'
import InfoSectionCard from '../components/doc/InfoSectionCard.vue'
import {
  createDependencyItems,
  createImportSnippet,
  createRelatedLinks,
  createUsageSnippet,
} from '../components/doc/entityPageHelpers'
import PackagePreviewDemo from '../demos/package/PackagePreviewDemo.vue'
import { getShowcasePackageDoc } from '../content/packageDocs'

const route = useRoute()

const entity = computed(() => {
  const resolved = getShowcaseEntityByPath(route.path)
  if (!resolved || resolved.kind === 'component')
    return undefined

  return resolved
})

const page = computed(() => getShowcasePageByPath(route.path))
const entityDoc = computed(() => entity.value ? getShowcasePackageDoc(entity.value) : undefined)
const importSnippet = computed(() => createImportSnippet(entity.value))
const usageSnippet = computed(() => createUsageSnippet(entity.value))
const dependencyItems = computed(() => createDependencyItems(entity.value))
const relatedLinks = computed(() => createRelatedLinks(entity.value))

const pageEyebrow = computed(() => page.value?.eyebrow ?? showcasePageRecord.overview.eyebrow)
</script>

<template>
  <div v-if="entity && entityDoc && page" class="space-y-8">
    <div class="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
      <RouterLink :to="page.path" class="font-medium transition-colors hover:text-slate-950 dark:hover:text-slate-100">
        ← Back to {{ page.shortTitle.toLowerCase() }}
      </RouterLink>
      <span>/</span>
      <span>{{ entity.title }}</span>
    </div>

    <DsCard class="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
      <div class="flex flex-wrap items-center gap-3">
        <span class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          {{ pageEyebrow }} / {{ entity.group }}
        </span>
      </div>

      <div class="mt-5 space-y-4">
        <h1 class="max-w-4xl text-4xl font-semibold leading-tight lg:text-5xl">
          {{ entity.title }}
        </h1>
        <p class="max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
          {{ entity.summary }}
        </p>
      </div>

      <div class="mt-5 flex flex-wrap gap-2">
        <DsBadge v-for="tag in entity.tags" :key="tag">
          {{ tag }}
        </DsBadge>
      </div>

      <EntityActionBar
        :import-code="importSnippet"
        :usage-code="usageSnippet"
        :links="relatedLinks"
      />
    </DsCard>

    <section id="overview" class="scroll-mt-28">
      <DsCard class="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
        <h2 class="text-2xl font-semibold">
          Package overview
        </h2>
        <ul class="mt-6 grid gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          <li v-for="item in entityDoc.overview" :key="item">
            {{ item }}
          </li>
        </ul>
      </DsCard>
    </section>

    <section id="examples" class="scroll-mt-28 space-y-4">
      <div>
        <h2 class="text-2xl font-semibold">
          Live examples
        </h2>
        <p class="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          Каждая demo-карта показывает отдельный integration pattern, а snippet рядом остаётся canonical starting point.
        </p>
      </div>

      <div class="grid gap-6 xl:grid-cols-2">
        <ExampleCard
          v-for="example in entityDoc.examples"
          :key="example.id"
          :title="example.title"
          :description="example.description"
          :code="example.code"
          :note="example.note"
        >
          <template #preview>
            <PackagePreviewDemo
              v-if="example.previewKey"
              :preview-key="example.previewKey"
            />
            <div v-else class="text-sm text-slate-500 dark:text-slate-400">
              Preview area reserved for the next iteration.
            </div>
          </template>
        </ExampleCard>
      </div>
    </section>

    <section id="api" class="scroll-mt-28 space-y-4">
      <div>
        <h2 class="text-2xl font-semibold">
          API
        </h2>
        <p class="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          Package-level APIs документируются вручную, потому что для directives, composables и utilities важнее shape binding/return contract, чем component props.
        </p>
      </div>

      <div class="grid gap-4 xl:grid-cols-2">
        <ApiTable
          v-for="section in entityDoc.apiSections"
          :key="section.key"
          :title="section.title"
          :items="section.items"
          empty-label="API details for this section are not connected yet."
        />
      </div>
    </section>

    <section id="usage" class="scroll-mt-28 space-y-4">
      <CodeBlock
        :code="usageSnippet"
        language="ts"
        title="Canonical usage"
      />

      <div class="grid gap-4 xl:grid-cols-2">
        <InfoSectionCard title="Usage" :items="entityDoc.usage" />
        <InfoSectionCard title="Caveats" :items="entityDoc.caveats" />
      </div>
    </section>

    <section id="integration" class="scroll-mt-28">
      <div class="grid gap-4 xl:grid-cols-3">
        <InfoSectionCard title="Integration notes" :items="entityDoc.integrationNotes" />
        <InfoSectionCard title="Dependencies" :items="dependencyItems" />
        <InfoSectionCard title="Related links" :links="relatedLinks" />
      </div>
    </section>
  </div>

  <DsCard
    v-else
    class="rounded-3xl border border-dashed border-slate-300/80 bg-white/70 p-8 text-sm leading-6 text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-400"
  >
    <h1 class="text-3xl font-semibold text-slate-950 dark:text-slate-50">
      Package entity not found
    </h1>
    <p class="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
      Похоже, detail route не совпал с текущим registry пакета. Вернитесь в один из package-level разделов и выберите существующую сущность.
    </p>
    <div class="mt-6 flex flex-wrap gap-2">
      <RouterLink to="/directives" class="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-950 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-slate-50">
        Перейти в directives
      </RouterLink>
      <RouterLink to="/composables" class="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-950 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-slate-50">
        Перейти в composables
      </RouterLink>
      <RouterLink to="/utilities" class="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-950 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-slate-50">
        Перейти в utilities
      </RouterLink>
    </div>
  </DsCard>
</template>