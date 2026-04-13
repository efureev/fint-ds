<script setup lang="ts">
import {DsBadge, DsCard, DsLink} from '@feugene/granularity'

import InlineRichText from '../components/content/InlineRichText.vue'
import CodeBlock from '../components/doc/CodeBlock.vue'
import {
  showcaseFoundationGuides,
  showcaseQuickStartCards,
} from '../content/foundations'
import IconHash from '~icons/lucide/hash'

const preferredQuickStartCardId = 'quick-start-uno-node'
const guidesWithoutNarrativeDocs = new Set([
  'styling',
  'themes',
  'tokens',
  'unocss',
  'localization',
])

function getVisibleCodeSamples(guide: (typeof showcaseFoundationGuides)[number]) {
  return guide.codeSamples.filter(codeSample => codeSample.language !== 'md')
}
</script>

<template>
  <div class="space-y-8">
    <DsCard class="showcase-panel rounded-3xl border p-8">
      <div class="space-y-4">
        <h1 class="max-w-4xl text-1xl font-semibold leading-tight lg:text-2xl">
          Foundations собирает установку, темы и базовые настройки в одном понятном разделе.
        </h1>
        <p class="showcase-text-muted max-w-3xl text-base leading-7">
          Здесь собраны только полезные шаги для старта: установка, подключение стилей и ключевые рекомендации по
          интеграции.
        </p>
      </div>
    </DsCard>

    <section id="installation" class="space-y-6 scroll-mt-28">
      <DsCard class="showcase-panel rounded-3xl border p-6">
        <div class="space-y-3">
          <h2 class="text-2xl font-semibold">Установка</h2>
          <CodeBlock code="yarn add @feugene/granularity vue" language="bash" title="Install package"/>
        </div>
      </DsCard>

      <DsCard class="showcase-panel rounded-3xl border p-6">
        <div class="space-y-4">
          <div class="space-y-2">
            <h2 class="text-2xl font-semibold">Quick-start map</h2>
            <p class="showcase-text-muted text-sm leading-6">
              <InlineRichText text="Выберите подходящий сценарий подключения: от простого импорта до `UnoCSS` preset."/>
            </p>
          </div>

          <div class="grid gap-4">
            <DsCard
                v-for="card in showcaseQuickStartCards"
                :key="card.id"
                class="showcase-panel-soft rounded-3xl border p-5"
            >
              <div class="space-y-3">
                <div class="flex flex-wrap items-center gap-3">
                  <h3 class="text-lg font-semibold">
                    <InlineRichText :text="card.title"/>
                  </h3>
                  <DsBadge variant="primary" dark v-if="card.id === preferredQuickStartCardId">
                    Предпочтительный способ
                  </DsBadge>
                </div>
                <p class="showcase-text-muted text-sm leading-6">
                  <InlineRichText :text="card.description"/>
                </p>
                <CodeBlock :code="card.code" :language="card.language" :title="card.title"/>
                <p class="showcase-text-subtle text-sm leading-6">
                  <InlineRichText :text="card.note"/>
                </p>
              </div>
            </DsCard>
          </div>
        </div>
      </DsCard>
    </section>

    <section
        v-for="guide in showcaseFoundationGuides"
        :id="guide.id"
        :key="guide.id"
        class="scroll-mt-28"
    >
      <DsCard class="showcase-panel rounded-3xl border p-6">
        <div class="space-y-5">
          <div class="space-y-3">
            <div class="flex flex-wrap items-center gap-3">
              <h2 class="text-2xl font-semibold">
                {{ guide.title }}
              </h2>
              <DsLink
                  :href="`#${guide.id}`"
                  variant="muted"
                  class="px-1 text-xs">
                <IconHash/>
              </DsLink>
            </div>
            <p class="showcase-text-muted text-base leading-7">
              <InlineRichText :text="guide.summary"/>
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
                  <InlineRichText :text="item"/>
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
                  <InlineRichText :text="item"/>
                </li>
              </ul>
            </div>
          </div>

          <div v-if="!guidesWithoutNarrativeDocs.has(guide.id) && guide.narrativeSource" class="space-y-4">
            <CodeBlock :code="guide.narrativeSource" language="md" title="Connected doc excerpt"/>
          </div>
        </div>

        <div class="mt-6 grid gap-4">
          <CodeBlock
              v-for="sample in getVisibleCodeSamples(guide)"
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