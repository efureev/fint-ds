<script setup lang="ts">
import {ref, type CSSProperties} from 'vue'

import {DsButton} from '@feugene/granularity/components/DsButton'

const ready = ref(false)

const buttonVariants = ['primary', 'secondary', 'outline', 'ghost', 'ghost-border'] as const
const buttonTones = ['primary', 'neutral', 'success', 'warning', 'danger', 'info'] as const
const buttonStates = [
  {key: 'rest', label: 'Обычное'},
  {key: 'hover', label: 'Hover'},
  {key: 'focus', label: 'Focus'},
  {key: 'active', label: 'Active'},
] as const

type ButtonVariant = (typeof buttonVariants)[number]
type ButtonTone = (typeof buttonTones)[number]
type ButtonState = (typeof buttonStates)[number]['key']

type ButtonToneTokens = {
  solidBackground: string
  solidBackgroundHover: string
  solidBackgroundActive: string
  solidForeground: string
  accentText: string
  softBackground: string
  softBackgroundHover: string
  softBackgroundActive: string
  softForeground: string
  border: string
  borderHover: string
  borderActive: string
}

const buttonToneTokens: Record<ButtonTone, ButtonToneTokens> = {
  primary: {
    solidBackground: 'var(--ds-button-primary-background,var(--primary))',
    solidBackgroundHover: 'var(--ds-button-primary-background-hover,var(--primary-hover))',
    solidBackgroundActive: 'var(--ds-button-primary-background-active,var(--primary-active))',
    solidForeground: 'var(--ds-button-primary-foreground,var(--primary-foreground))',
    accentText: 'var(--accent-foreground)',
    softBackground: 'var(--ds-button-primary-soft-background)',
    softBackgroundHover: 'var(--ds-button-primary-soft-background-hover)',
    softBackgroundActive: 'var(--ds-button-primary-soft-background-active)',
    softForeground: 'var(--accent-foreground)',
    border: 'var(--primary)',
    borderHover: 'var(--primary-hover)',
    borderActive: 'var(--primary-active)',
  },
  neutral: {
    solidBackground: 'var(--secondary)',
    solidBackgroundHover: 'var(--secondary-hover)',
    solidBackgroundActive: 'var(--secondary-active)',
    solidForeground: 'var(--secondary-foreground)',
    accentText: 'var(--foreground)',
    softBackground: 'var(--secondary)',
    softBackgroundHover: 'var(--secondary-hover)',
    softBackgroundActive: 'var(--secondary-active)',
    softForeground: 'var(--secondary-foreground)',
    border: 'var(--border)',
    borderHover: 'var(--border-hover,var(--border))',
    borderActive: 'var(--border-active,var(--border))',
  },
  success: {
    solidBackground: 'var(--ds-button-success-background,var(--ds-success))',
    solidBackgroundHover: 'var(--ds-button-success-background-hover,var(--ds-success-hover))',
    solidBackgroundActive: 'var(--ds-button-success-background-active,var(--ds-success-active))',
    solidForeground: 'var(--ds-button-success-foreground,var(--ds-success-foreground,var(--foreground)))',
    accentText: 'var(--ds-success-text,var(--ds-success))',
    softBackground: 'var(--ds-button-success-soft-background)',
    softBackgroundHover: 'var(--ds-button-success-soft-background-hover)',
    softBackgroundActive: 'var(--ds-button-success-soft-background-active)',
    softForeground: 'var(--ds-success-text,var(--ds-success))',
    border: 'var(--ds-success)',
    borderHover: 'var(--ds-success-hover)',
    borderActive: 'var(--ds-success-active)',
  },
  warning: {
    solidBackground: 'var(--ds-button-warning-background,var(--ds-warning))',
    solidBackgroundHover: 'var(--ds-button-warning-background-hover,var(--ds-warning-hover))',
    solidBackgroundActive: 'var(--ds-button-warning-background-active,var(--ds-warning-active))',
    solidForeground: 'var(--ds-button-warning-foreground,var(--ds-warning-foreground,var(--foreground)))',
    accentText: 'var(--ds-warning-text,var(--ds-warning))',
    softBackground: 'var(--ds-button-warning-soft-background)',
    softBackgroundHover: 'var(--ds-button-warning-soft-background-hover)',
    softBackgroundActive: 'var(--ds-button-warning-soft-background-active)',
    softForeground: 'var(--ds-warning-text,var(--ds-warning))',
    border: 'var(--ds-warning)',
    borderHover: 'var(--ds-warning-hover)',
    borderActive: 'var(--ds-warning-active)',
  },
  danger: {
    solidBackground: 'var(--ds-button-danger-background,var(--ds-danger))',
    solidBackgroundHover: 'var(--ds-button-danger-background-hover,var(--ds-danger-hover))',
    solidBackgroundActive: 'var(--ds-button-danger-background-active,var(--ds-danger-active))',
    solidForeground: 'var(--ds-button-danger-foreground,var(--ds-danger-foreground,var(--foreground)))',
    accentText: 'var(--ds-danger-text,var(--ds-danger))',
    softBackground: 'var(--ds-button-danger-soft-background)',
    softBackgroundHover: 'var(--ds-button-danger-soft-background-hover)',
    softBackgroundActive: 'var(--ds-button-danger-soft-background-active)',
    softForeground: 'var(--ds-danger-text,var(--ds-danger))',
    border: 'var(--ds-danger)',
    borderHover: 'var(--ds-danger-hover)',
    borderActive: 'var(--ds-danger-active)',
  },
  info: {
    solidBackground: 'var(--ds-button-info-background,var(--ds-info))',
    solidBackgroundHover: 'var(--ds-button-info-background-hover,var(--ds-info-hover))',
    solidBackgroundActive: 'var(--ds-button-info-background-active,var(--ds-info-active))',
    solidForeground: 'var(--ds-button-info-foreground,var(--ds-info-foreground,var(--foreground)))',
    accentText: 'var(--ds-info-text,var(--ds-info))',
    softBackground: 'var(--ds-button-info-soft-background)',
    softBackgroundHover: 'var(--ds-button-info-soft-background-hover)',
    softBackgroundActive: 'var(--ds-button-info-soft-background-active)',
    softForeground: 'var(--ds-info-text,var(--ds-info))',
    border: 'var(--ds-info)',
    borderHover: 'var(--ds-info-hover)',
    borderActive: 'var(--ds-info-active)',
  },
}

function getButtonPreviewStyle(variant: ButtonVariant, tone: ButtonTone, state: ButtonState): CSSProperties {
  const tokens = buttonToneTokens[tone]
  const isFocus = state === 'focus'

  if (variant === 'primary') {
    return {
      backgroundColor: state === 'hover'
        ? tokens.solidBackgroundHover
        : state === 'active'
          ? tokens.solidBackgroundActive
          : tokens.solidBackground,
      borderColor: state === 'hover'
        ? tokens.solidBackgroundHover
        : state === 'active'
          ? tokens.solidBackgroundActive
          : tokens.solidBackground,
      color: tokens.solidForeground,
      boxShadow: isFocus ? '0 0 0 2px var(--ring)' : undefined,
    }
  }

  if (variant === 'secondary') {
    return {
      backgroundColor: state === 'hover'
        ? tokens.softBackgroundHover
        : state === 'active'
          ? tokens.softBackgroundActive
          : tokens.softBackground,
      borderColor: state === 'hover'
        ? tokens.borderHover
        : state === 'active'
          ? tokens.borderActive
          : tokens.border,
      color: tokens.softForeground,
      boxShadow: isFocus ? '0 0 0 2px var(--ring)' : undefined,
    }
  }

  if (variant === 'outline') {
    return {
      backgroundColor: state === 'hover'
        ? tokens.softBackgroundHover
        : state === 'active'
          ? tokens.softBackgroundActive
          : 'transparent',
      borderColor: state === 'hover'
        ? tokens.borderHover
        : state === 'active'
          ? tokens.borderActive
          : tokens.border,
      color: tokens.accentText,
      boxShadow: isFocus ? '0 0 0 2px var(--ring)' : undefined,
    }
  }

  if (variant === 'ghost') {
    return {
      backgroundColor: state === 'hover'
        ? tokens.softBackgroundHover
        : state === 'active'
          ? tokens.softBackgroundActive
          : 'transparent',
      color: tokens.accentText,
      boxShadow: isFocus ? '0 0 0 2px var(--ring)' : undefined,
    }
  }

  return {
    backgroundColor: state === 'hover'
      ? tokens.softBackgroundHover
      : state === 'active'
        ? tokens.softBackgroundActive
        : 'transparent',
    borderColor: state === 'hover'
      ? tokens.borderHover
      : state === 'active'
        ? tokens.borderActive
        : 'transparent',
    color: tokens.accentText,
    boxShadow: isFocus ? '0 0 0 2px var(--ring)' : undefined,
  }
}
</script>

<template>
  <main class="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-10 text-slate-900">
    <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p class="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-500">
        playground-5 / способ 5
      </p>
      <h1 class="text-3xl font-semibold leading-tight">
        `UnoCSS` + `presetGranularityNode`
      </h1>
      <p class="mt-3 text-sm leading-6 text-slate-600">
        Стили кнопки и foundation CSS добавляются автоматически через node-only preset пакета.
      </p>
    </section>

    <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="flex flex-wrap items-center gap-3">
        <DsButton variant="primary" tone="success" @click="ready = !ready">
          {{ ready ? 'Готово' : 'Проверить preset' }}
        </DsButton>
        <span class="text-sm text-slate-500">
          Состояние: {{ ready ? 'uno-node подключён' : 'ожидает клика' }}
        </span>
      </div>
    </section>

    <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-500">
            Матрица DsButton
          </p>
          <h2 class="text-xl font-semibold text-slate-950">
            Таблицы по тонам и состояниям
          </h2>
          <p class="text-sm leading-6 text-slate-600">
            Каждый блок показывает один `tone`: варианты идут по столбцам, состояния — по строкам.
          </p>
        </div>

        <div class="grid gap-4">
          <article
            v-for="tone in buttonTones"
            :key="tone"
            class="overflow-x-auto rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4"
          >
            <div class="mb-3 flex items-center justify-between gap-3">
              <h3 class="text-sm font-semibold uppercase tracking-[0.12em] text-slate-700">
                tone: {{ tone }}
              </h3>
              <span class="text-xs text-slate-500">
                Интерактивная строка + 4 состояния × {{ buttonVariants.length }} вариантов
              </span>
            </div>

            <table class="min-w-full border-separate border-spacing-3">
              <thead>
                <tr>
                  <th class="w-28 px-2 py-1 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    state \ variant
                  </th>
                  <th
                    v-for="variant in buttonVariants"
                    :key="`${tone}-variant-${variant}`"
                    class="px-2 py-1 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-400"
                  >
                    {{ variant }}
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th class="px-2 py-1 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Live
                  </th>
                  <td
                    v-for="variant in buttonVariants"
                    :key="`${tone}-live-${variant}`"
                    class="px-2 py-1 align-middle"
                  >
                    <DsButton
                      :variant="variant"
                      :tone="tone"
                      class="w-full justify-center"
                    >
                      {{ variant }}
                    </DsButton>
                  </td>
                </tr>

                <tr v-for="state in buttonStates" :key="`${tone}-${state.key}`">
                  <th class="px-2 py-1 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    {{ state.label }}
                  </th>
                  <td
                    v-for="variant in buttonVariants"
                    :key="`${tone}-${state.key}-${variant}`"
                    class="px-2 py-1 align-middle"
                  >
                    <DsButton
                      :variant="variant"
                      :tone="tone"
                      class="w-full justify-center"
                      :style="getButtonPreviewStyle(variant, tone, state.key)"
                    >
                      {{ variant }}
                    </DsButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </article>
        </div>
      </div>
    </section>

    <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="flex flex-col gap-2">
        <p class="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-500">
          Примерный размер bundle
        </p>
        <h2 class="text-xl font-semibold text-slate-950">
          Размеры основных чанков
        </h2>
        <p class="text-sm leading-6 text-slate-600">
          Ориентир после production build: JS и CSS разложены по отдельным группам `vue`, `granularity`,
          `reset` и `app`.
        </p>
      </div>

      <div class="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <article class="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4" data-bundle-group="vue">
          <p class="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-500">
            vue
          </p>
          <div class="mt-3 flex flex-col gap-3">
            <div class="flex flex-col gap-1">
              <span class="text-[11px] uppercase tracking-[0.12em] text-slate-400">JS</span>
              <p class="text-sm font-semibold text-slate-900">raw ~59.5 kB</p>
              <p class="text-xs text-slate-500">gzip ~23.6 kB</p>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-[11px] uppercase tracking-[0.12em] text-slate-400">CSS</span>
              <p class="text-sm font-semibold text-slate-900">raw ~0 kB</p>
              <p class="text-xs text-slate-500">gzip ~0 kB</p>
            </div>
          </div>
        </article>

        <article class="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4" data-bundle-group="granularity">
          <p class="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-500">
            granularity
          </p>
          <div class="mt-3 flex flex-col gap-3">
            <div class="flex flex-col gap-1">
              <span class="text-[11px] uppercase tracking-[0.12em] text-slate-400">JS</span>
              <p class="text-sm font-semibold text-slate-900">raw ~3.0 kB</p>
              <p class="text-xs text-slate-500">gzip ~1.3 kB</p>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-[11px] uppercase tracking-[0.12em] text-slate-400">CSS</span>
              <p class="text-sm font-semibold text-slate-900">raw ~5.1 kB</p>
              <p class="text-xs text-slate-500">gzip ~1.6 kB</p>
            </div>
          </div>
        </article>

        <article class="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4" data-bundle-group="reset">
          <p class="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-500">
            reset
          </p>
          <div class="mt-3 flex flex-col gap-3">
            <div class="flex flex-col gap-1">
              <span class="text-[11px] uppercase tracking-[0.12em] text-slate-400">JS</span>
              <p class="text-sm font-semibold text-slate-900">raw ~0 kB</p>
              <p class="text-xs text-slate-500">gzip ~0 kB</p>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-[11px] uppercase tracking-[0.12em] text-slate-400">CSS</span>
              <p class="text-sm font-semibold text-slate-900">raw ~2.3 kB</p>
              <p class="text-xs text-slate-500">gzip ~1.0 kB</p>
            </div>
          </div>
        </article>

        <article class="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4" data-bundle-group="app">
          <p class="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-500">
            app
          </p>
          <div class="mt-3 flex flex-col gap-3">
            <div class="flex flex-col gap-1">
              <span class="text-[11px] uppercase tracking-[0.12em] text-slate-400">JS</span>
              <p class="text-sm font-semibold text-slate-900">raw ~6.9 kB</p>
              <p class="text-xs text-slate-500">gzip ~2.3 kB</p>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-[11px] uppercase tracking-[0.12em] text-slate-400">CSS</span>
              <p class="text-sm font-semibold text-slate-900">raw ~5.5 kB</p>
              <p class="text-xs text-slate-500">gzip ~1.6 kB</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>
