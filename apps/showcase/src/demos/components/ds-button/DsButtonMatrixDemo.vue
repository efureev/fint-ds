<script setup lang="ts">
import { type CSSProperties } from 'vue'

import { DsButton, type DsButtonTone, type DsButtonVariant } from '@feugene/granularity'

const buttonVariants = ['primary', 'secondary', 'outline', 'ghost', 'ghost-border'] as const satisfies readonly DsButtonVariant[]
const buttonTones = ['primary', 'neutral', 'success', 'warning', 'danger', 'info', 'slate', 'azure'] as const satisfies readonly DsButtonTone[]
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
  slate: {
    solidBackground: 'var(--ds-button-slate-background,var(--ds-slate))',
    solidBackgroundHover: 'var(--ds-button-slate-background-hover,var(--ds-slate-hover))',
    solidBackgroundActive: 'var(--ds-button-slate-background-active,var(--ds-slate-active))',
    solidForeground: 'var(--ds-button-slate-foreground,var(--ds-slate-foreground,var(--foreground)))',
    accentText: 'var(--ds-slate-text,var(--ds-slate))',
    softBackground: 'var(--ds-button-slate-soft-background)',
    softBackgroundHover: 'var(--ds-button-slate-soft-background-hover)',
    softBackgroundActive: 'var(--ds-button-slate-soft-background-active)',
    softForeground: 'var(--ds-slate-text,var(--ds-slate))',
    border: 'var(--ds-slate)',
    borderHover: 'var(--ds-slate-hover)',
    borderActive: 'var(--ds-slate-active)',
  },
  azure: {
    solidBackground: 'var(--ds-button-azure-background,var(--ds-azure))',
    solidBackgroundHover: 'var(--ds-button-azure-background-hover,var(--ds-azure-hover))',
    solidBackgroundActive: 'var(--ds-button-azure-background-active,var(--ds-azure-active))',
    solidForeground: 'var(--ds-button-azure-foreground,var(--ds-azure-foreground,var(--foreground)))',
    accentText: 'var(--ds-azure-text,var(--ds-azure))',
    softBackground: 'var(--ds-button-azure-soft-background)',
    softBackgroundHover: 'var(--ds-button-azure-soft-background-hover)',
    softBackgroundActive: 'var(--ds-button-azure-soft-background-active)',
    softForeground: 'var(--ds-azure-text,var(--ds-azure))',
    border: 'var(--ds-azure)',
    borderHover: 'var(--ds-azure-hover)',
    borderActive: 'var(--ds-azure-active)',
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
  <div class="grid gap-4">
    <div class="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-sm text-[var(--muted-foreground)]">
      Та же матрица, что была в `playground-5`: для каждого `tone` видно live-кнопки и принудительно
      отрисованные состояния `hover`, `focus`, `active` по всем `variant`.
    </div>

    <div class="grid gap-4">
      <article
        v-for="tone in buttonTones"
        :key="tone"
        class="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4"
      >
        <div class="mb-3 flex items-center justify-between gap-3">
          <h3 class="showcase-demo-title text-sm font-semibold uppercase tracking-[0.12em]">
            tone: {{ tone }}
          </h3>
          <span class="showcase-demo-text text-xs">
            Live + 4 состояния × {{ buttonVariants.length }} вариантов
          </span>
        </div>

        <table class="min-w-full border-separate border-spacing-3">
          <thead>
            <tr>
              <th class="w-28 px-2 py-1 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                state \ variant
              </th>
              <th
                v-for="variant in buttonVariants"
                :key="`${tone}-variant-${variant}`"
                class="px-2 py-1 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]"
              >
                {{ variant }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th class="px-2 py-1 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
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
              <th class="px-2 py-1 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
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
</template>