<script setup lang="ts">
import { DsCard } from '@feugene/granularity'

import CodeBlock from '../components/doc/CodeBlock.vue'
import {
  showcaseFoundationGuides,
  showcaseFoundationsChecklist,
  showcaseInstallationNarrative,
  showcaseQuickStartCards,
} from '../content/foundations'
</script>

<template>
  <div class="space-y-8">
    <DsCard class="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
      <div class="space-y-4">
        <span class="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
          Foundations
        </span>
        <h1 class="max-w-4xl text-4xl font-semibold leading-tight lg:text-5xl">
          Foundations собирает установку, темы, токены и локализацию в одной понятной onboarding-странице.
        </h1>
        <p class="max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
          Здесь нет лишних декоративных блоков: только ключевые guides, выдержки из документации и практические snippets для подключения пакета в приложение.
        </p>
      </div>
    </DsCard>

    <section id="installation" class="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.85fr)] scroll-mt-28">
      <DsCard class="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
        <div class="space-y-4">
          <div class="space-y-2">
            <h2 class="text-2xl font-semibold">Quick-start map</h2>
            <p class="text-sm leading-6 text-slate-600 dark:text-slate-300">
              Foundations сразу показывает выбор стратегии подключения: от простого root import до `UnoCSS` preset path.
            </p>
          </div>

          <div class="grid gap-4">
            <DsCard
              v-for="card in showcaseQuickStartCards"
              :key="card.id"
              class="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/60"
            >
              <div class="space-y-3">
                <h3 class="text-lg font-semibold">
                  {{ card.title }}
                </h3>
                <p class="text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {{ card.description }}
                </p>
                <CodeBlock :code="card.code" :language="card.language" :title="card.title" />
              </div>
            </DsCard>
          </div>
        </div>
      </DsCard>

      <div class="space-y-4">
        <DsCard class="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div class="space-y-3">
            <h2 class="text-2xl font-semibold">Installation narrative</h2>
            <CodeBlock code="yarn add @feugene/granularity vue" language="bash" title="Install package" />
            <CodeBlock :code="showcaseInstallationNarrative" language="md" title="Source doc excerpt" />
          </div>
        </DsCard>

        <DsCard class="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div class="space-y-3">
            <h2 class="text-2xl font-semibold">Что должен закрывать foundations-раздел</h2>
            <ul class="grid gap-3">
              <li
                v-for="item in showcaseFoundationsChecklist"
                :key="item"
                class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </DsCard>
      </div>
    </section>

    <section
      v-for="guide in showcaseFoundationGuides"
      :id="guide.id"
      :key="guide.id"
      class="scroll-mt-28"
    >
      <DsCard class="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
        <div class="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div class="space-y-5">
            <div class="space-y-3">
              <div class="flex flex-wrap items-center gap-3">
                <h2 class="text-2xl font-semibold">
                  {{ guide.title }}
                </h2>
                <a
                  :href="`#${guide.id}`"
                  class="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:text-slate-100"
                >
                  link
                </a>
              </div>
              <p class="text-base leading-7 text-slate-600 dark:text-slate-300">
                {{ guide.summary }}
              </p>
              <p class="text-sm leading-6 text-slate-600 dark:text-slate-300">
                {{ guide.description }}
              </p>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <div class="space-y-3">
                <h3 class="text-lg font-semibold">Что важно понять</h3>
                <ul class="grid gap-3">
                  <li
                    v-for="item in guide.keyPoints"
                    :key="item"
                    class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div class="space-y-3">
                <h3 class="text-lg font-semibold">Практические рекомендации</h3>
                <ul class="grid gap-3">
                  <li
                    v-for="item in guide.recommendations"
                    :key="item"
                    class="rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm leading-6 text-slate-700 dark:text-slate-200"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <DsCard class="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
              <div class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  Narrative source
                </p>
                <p class="text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {{ guide.sourcePath }}
                </p>
              </div>
            </DsCard>
            <CodeBlock :code="guide.narrativeSource" language="md" title="Connected doc excerpt" />
          </div>
        </div>

        <div class="mt-6 grid gap-4">
          <CodeBlock
            v-for="sample in guide.codeSamples"
            :key="`${guide.id}-${sample.title}`"
            :code="sample.code"
            :language="sample.language"
            :title="sample.title"
          />
        </div>
      </DsCard>
    </section>
  </div>
</template>