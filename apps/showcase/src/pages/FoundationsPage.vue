<script setup lang="ts">
import { DsCard } from '@feugene/granularity'

import InlineRichText from '../components/content/InlineRichText.vue'
import CodeBlock from '../components/doc/CodeBlock.vue'
import {
  showcaseFoundationGuides,
  showcaseInstallationNarrative,
  showcaseQuickStartCards,
} from '../content/foundations'
</script>

<template>
  <div class="space-y-8">
    <DsCard class="showcase-panel rounded-3xl border p-8">
      <div class="space-y-4">
        <h1 class="max-w-4xl text-2xl font-semibold leading-tight lg:text-3xl">
          Foundations собирает установку, темы и базовые настройки в одном понятном разделе.
        </h1>
        <p class="showcase-text-muted max-w-3xl text-base leading-7">
          Здесь собраны только полезные шаги для старта: установка, подключение стилей и ключевые рекомендации по интеграции.
        </p>
      </div>
    </DsCard>

    <section id="installation" class="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.85fr)] scroll-mt-28">
      <DsCard class="showcase-panel rounded-3xl border p-6">
        <div class="space-y-4">
          <div class="space-y-2">
            <h2 class="text-2xl font-semibold">Quick-start map</h2>
            <p class="showcase-text-muted text-sm leading-6">
              <InlineRichText text="Выберите подходящий сценарий подключения: от простого импорта до `UnoCSS` preset." />
            </p>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <DsCard
              v-for="card in showcaseQuickStartCards"
              :key="card.id"
              class="showcase-panel-soft rounded-3xl border p-5"
            >
              <div class="space-y-3">
                <h3 class="text-lg font-semibold">
                  <InlineRichText :text="card.title" />
                </h3>
                <p class="showcase-text-muted text-sm leading-6">
                  <InlineRichText :text="card.description" />
                </p>
                <CodeBlock :code="card.code" :language="card.language" :title="card.title" />
                <p class="showcase-text-subtle text-sm leading-6">
                  <InlineRichText :text="card.note" />
                </p>
              </div>
            </DsCard>
          </div>
        </div>
      </DsCard>

      <div class="space-y-4">
        <DsCard class="showcase-panel rounded-3xl border p-6">
          <div class="space-y-3">
            <h2 class="text-2xl font-semibold">Установка</h2>
            <CodeBlock code="yarn add @feugene/granularity vue" language="bash" title="Install package" />
            <CodeBlock :code="showcaseInstallationNarrative" language="md" title="Source doc excerpt" />
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
      <DsCard class="showcase-panel rounded-3xl border p-6">
        <div class="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div class="space-y-5">
            <div class="space-y-3">
              <div class="flex flex-wrap items-center gap-3">
                <h2 class="text-2xl font-semibold">
                  {{ guide.title }}
                </h2>
                <a
                  :href="`#${guide.id}`"
                  class="showcase-link-chip inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] transition-colors"
                >
                  link
                </a>
              </div>
              <p class="showcase-text-muted text-base leading-7">
                <InlineRichText :text="guide.summary" />
              </p>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <div class="space-y-3">
                <h3 class="text-lg font-semibold">Что важно понять</h3>
                <ul class="grid gap-3">
                  <li
                    v-for="item in guide.keyPoints"
                    :key="item"
                    class="showcase-inline-surface rounded-2xl border px-4 py-3 text-sm leading-6"
                  >
                    <InlineRichText :text="item" />
                  </li>
                </ul>
              </div>

              <div class="space-y-3">
                <h3 class="text-lg font-semibold">Практические рекомендации</h3>
                <ul class="grid gap-3">
                  <li
                    v-for="item in guide.recommendations"
                    :key="item"
                    class="showcase-panel-emphasis rounded-2xl border px-4 py-3 text-sm leading-6"
                  >
                    <InlineRichText :text="item" />
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="space-y-4">
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