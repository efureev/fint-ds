<script setup lang="ts">
import {
  DsButton,
  DsCard,
} from '@feugene/granularity'

import CodeBlock from '../components/doc/CodeBlock.vue'
import {
  showcaseFoundationStats,
  showcaseInstallationNarrative,
  showcaseOverviewChecklist,
  showcaseQuickStartCards,
} from '../content/foundations'
</script>

<template>
  <div class="space-y-8">
    <DsCard class="showcase-panel rounded-[32px] border p-8">
      <div class="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.85fr)]">
        <div class="space-y-5">
          <div class="space-y-3">
            <span class="showcase-pill inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
              Пакет компонентов
            </span>
            <h1 class="max-w-4xl text-4xl font-semibold leading-tight lg:text-5xl">
              Витрина `Granularity` помогает быстро понять пакет, выбрать нужный раздел и перейти к конкретным компонентам.
            </h1>
            <p class="showcase-text-muted max-w-3xl text-base leading-7">
              Это спокойная стартовая страница без лишнего шума: отсюда удобно перейти к foundations, посмотреть каталог компонентов и открыть нужные directives, composables или utilities.
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <RouterLink to="/foundations" custom v-slot="{ navigate, href }">
              <DsButton :href="href" @click="navigate">
                Открыть foundations
              </DsButton>
            </RouterLink>
            <RouterLink to="/components" custom v-slot="{ navigate, href }">
              <DsButton variant="ghost-border" :href="href" @click="navigate">
                Каталог компонентов
              </DsButton>
            </RouterLink>
          </div>
        </div>

        <div id="mission" class="showcase-panel-soft rounded-[28px] border p-6">
          <div class="space-y-4">
            <div>
              <p class="showcase-kicker text-xs font-semibold">
                Что внутри
              </p>
              <h2 class="mt-2 text-2xl font-semibold">
                Основные направления витрины
              </h2>
            </div>

            <ul class="grid gap-3">
              <li
                v-for="item in showcaseOverviewChecklist.slice(0, 3)"
                :key="item"
                class="showcase-panel rounded-2xl border px-4 py-3 text-sm leading-6"
              >
                {{ item }}
              </li>
            </ul>

            <div class="grid gap-3 sm:grid-cols-3">
              <div
                v-for="stat in showcaseFoundationStats"
                :key="stat.id"
                class="showcase-panel rounded-2xl border px-4 py-4"
              >
                <p class="showcase-kicker text-xs font-semibold">
                  {{ stat.label }}
                </p>
                <p class="mt-2 text-2xl font-semibold">
                  {{ stat.value }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DsCard>

    <section id="quick-start" class="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)] scroll-mt-28">
      <div class="space-y-4">
        <div class="space-y-2">
          <h2 class="text-2xl font-semibold">Быстрый старт</h2>
          <p class="showcase-text-muted text-sm leading-6">
            Показываем три понятных сценария подключения: базовый импорт, выборочные импорты и путь через `UnoCSS`.
          </p>
        </div>

        <div class="grid gap-6">
          <DsCard
            v-for="card in showcaseQuickStartCards"
            :id="card.id"
            :key="card.id"
            class="showcase-panel rounded-3xl border p-6"
          >
            <div class="space-y-3">
              <div class="flex items-center justify-between gap-3">
                <h3 class="text-xl font-semibold">
                  {{ card.title }}
                </h3>
                <RouterLink to="/foundations" class="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  Foundations
                </RouterLink>
              </div>
              <p class="showcase-text-muted text-sm leading-6">
                {{ card.description }}
              </p>
              <CodeBlock :code="card.code" :language="card.language" :title="card.title" />
              <p class="showcase-text-muted text-sm leading-6">
                {{ card.note }}
              </p>
            </div>
          </DsCard>
        </div>
      </div>

      <div id="delivery-checklist" class="space-y-4">
        <DsCard class="showcase-panel rounded-3xl border p-6">
          <div class="space-y-3">
            <h2 class="text-2xl font-semibold">Что уже есть в витрине</h2>
            <ul class="grid gap-3">
              <li
                v-for="item in showcaseOverviewChecklist"
                :key="item"
                class="showcase-inline-surface rounded-2xl border px-4 py-3 text-sm leading-6"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </DsCard>

        <DsCard class="showcase-panel rounded-3xl border p-6">
          <div class="space-y-3">
            <h2 class="text-2xl font-semibold">Установка</h2>
            <p class="showcase-text-muted text-sm leading-6">
              Один блок для быстрого старта: сначала команда установки, затем краткая выдержка из package docs.
            </p>
            <CodeBlock code="yarn add @feugene/granularity vue" language="bash" title="Install" />
            <CodeBlock :code="showcaseInstallationNarrative" language="md" title="Installation guide excerpt" />
          </div>
        </DsCard>
      </div>
    </section>

    <section id="roadmap" class="grid gap-6 lg:grid-cols-5 scroll-mt-28">
      <RouterLink to="/foundations" class="showcase-card-link group rounded-3xl border p-5 shadow-sm transition-colors">
        <h2 class="showcase-card-link-title text-lg font-semibold">Foundations</h2>
        <p class="showcase-text-muted mt-2 text-sm leading-6">Установка, темы, токены и базовые принципы подключения пакета.</p>
      </RouterLink>
      <RouterLink to="/components" class="showcase-card-link group rounded-3xl border p-5 shadow-sm transition-colors">
        <h2 class="showcase-card-link-title text-lg font-semibold">Components</h2>
        <p class="showcase-text-muted mt-2 text-sm leading-6">Каталог компонентов с быстрым переходом к detail pages.</p>
      </RouterLink>
      <RouterLink to="/directives" class="showcase-card-link group rounded-3xl border p-5 shadow-sm transition-colors">
        <h2 class="showcase-card-link-title text-lg font-semibold">Directives</h2>
        <p class="showcase-text-muted mt-2 text-sm leading-6">Точечные директивы и их сценарии использования.</p>
      </RouterLink>
      <RouterLink to="/composables" class="showcase-card-link group rounded-3xl border p-5 shadow-sm transition-colors">
        <h2 class="showcase-card-link-title text-lg font-semibold">Composables</h2>
        <p class="showcase-text-muted mt-2 text-sm leading-6">Переиспользуемые runtime-сценарии и integration notes.</p>
      </RouterLink>
      <RouterLink to="/utilities" class="showcase-card-link group rounded-3xl border p-5 shadow-sm transition-colors">
        <h2 class="showcase-card-link-title text-lg font-semibold">Utilities</h2>
        <p class="showcase-text-muted mt-2 text-sm leading-6">Вспомогательные функции для прикладной логики пакета.</p>
      </RouterLink>
    </section>
  </div>
</template>