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
    <DsCard class="rounded-[32px] border border-slate-200/80 bg-white/92 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900/90">
      <div class="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.85fr)]">
        <div class="space-y-5">
          <div class="space-y-3">
            <span class="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
              Пакет компонентов
            </span>
            <h1 class="max-w-4xl text-4xl font-semibold leading-tight lg:text-5xl">
              Витрина `Granularity` помогает быстро понять пакет, выбрать нужный раздел и перейти к конкретным компонентам.
            </h1>
            <p class="max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
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

        <div id="mission" class="rounded-[28px] border border-slate-200/80 bg-slate-50/90 p-6 dark:border-slate-800 dark:bg-slate-950/60">
          <div class="space-y-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
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
                class="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                {{ item }}
              </li>
            </ul>

            <div class="grid gap-3 sm:grid-cols-3">
              <div
                v-for="stat in showcaseFoundationStats"
                :key="stat.id"
                class="rounded-2xl border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900"
              >
                <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
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
          <p class="text-sm leading-6 text-slate-600 dark:text-slate-300">
            Показываем три понятных сценария подключения: базовый импорт, выборочные импорты и путь через `UnoCSS`.
          </p>
        </div>

        <div class="grid gap-6">
          <DsCard
            v-for="card in showcaseQuickStartCards"
            :id="card.id"
            :key="card.id"
            class="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90"
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
              <p class="text-sm leading-6 text-slate-600 dark:text-slate-300">
                {{ card.description }}
              </p>
              <CodeBlock :code="card.code" :language="card.language" :title="card.title" />
              <p class="text-sm leading-6 text-slate-600 dark:text-slate-300">
                {{ card.note }}
              </p>
            </div>
          </DsCard>
        </div>
      </div>

      <div id="delivery-checklist" class="space-y-4">
        <DsCard class="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div class="space-y-3">
            <h2 class="text-2xl font-semibold">Что уже есть в витрине</h2>
            <ul class="grid gap-3">
              <li
                v-for="item in showcaseOverviewChecklist"
                :key="item"
                class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </DsCard>

        <DsCard class="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div class="space-y-3">
            <h2 class="text-2xl font-semibold">Установка</h2>
            <p class="text-sm leading-6 text-slate-600 dark:text-slate-300">
              Один блок для быстрого старта: сначала команда установки, затем краткая выдержка из package docs.
            </p>
            <CodeBlock code="yarn add @feugene/granularity vue" language="bash" title="Install" />
            <CodeBlock :code="showcaseInstallationNarrative" language="md" title="Installation guide excerpt" />
          </div>
        </DsCard>
      </div>
    </section>

    <section id="roadmap" class="grid gap-6 lg:grid-cols-5 scroll-mt-28">
      <RouterLink to="/foundations" class="group rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm transition-colors hover:border-primary/30 hover:bg-white dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-primary/30 dark:hover:bg-slate-900">
        <h2 class="text-lg font-semibold group-hover:text-primary">Foundations</h2>
        <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Установка, темы, токены и базовые принципы подключения пакета.</p>
      </RouterLink>
      <RouterLink to="/components" class="group rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm transition-colors hover:border-primary/30 hover:bg-white dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-primary/30 dark:hover:bg-slate-900">
        <h2 class="text-lg font-semibold group-hover:text-primary">Components</h2>
        <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Каталог компонентов с быстрым переходом к detail pages.</p>
      </RouterLink>
      <RouterLink to="/directives" class="group rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm transition-colors hover:border-primary/30 hover:bg-white dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-primary/30 dark:hover:bg-slate-900">
        <h2 class="text-lg font-semibold group-hover:text-primary">Directives</h2>
        <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Точечные директивы и их сценарии использования.</p>
      </RouterLink>
      <RouterLink to="/composables" class="group rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm transition-colors hover:border-primary/30 hover:bg-white dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-primary/30 dark:hover:bg-slate-900">
        <h2 class="text-lg font-semibold group-hover:text-primary">Composables</h2>
        <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Переиспользуемые runtime-сценарии и integration notes.</p>
      </RouterLink>
      <RouterLink to="/utilities" class="group rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm transition-colors hover:border-primary/30 hover:bg-white dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-primary/30 dark:hover:bg-slate-900">
        <h2 class="text-lg font-semibold group-hover:text-primary">Utilities</h2>
        <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Вспомогательные функции для прикладной логики пакета.</p>
      </RouterLink>
    </section>
  </div>
</template>