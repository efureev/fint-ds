<script setup lang="ts">
import { computed } from 'vue'

export type DsBadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'slate' | 'azure'
export type DsBadgeSize = 'sm' | 'md' | 'lg'
export type DsBadgeRadius = 'square' | 'semi' | 'round'

const SIZE_CLASS: Record<DsBadgeSize, string> = {
  sm: 'px-2 py-0.4 text-[11px]',
  md: 'px-2.5 py-0.5 text-[12px]',
  lg: 'px-3 py-1 text-[13px]',
}

const SEMI_RADIUS_BY_SIZE: Record<DsBadgeSize, string> = {
  sm: 'rounded-[3px]',
  md: 'rounded-[3px]',
  lg: 'rounded-[5px]',
}

const LIGHT_TONES: Record<DsBadgeTone, string> = {
  neutral: 'bg-[var(--muted)] text-[var(--foreground)] border-[var(--border)]',
  primary:
    'bg-[var(--accent)] text-[var(--accent-foreground)] border-[color-mix(in_srgb,var(--primary)_30%,var(--accent))]',
  success: 'bg-[var(--ds-success-light)] text-[var(--ds-success)] border-[color-mix(in_srgb,var(--ds-success)_30%,var(--ds-success-light))]',
  warning: 'bg-[var(--ds-warning-light)] text-[var(--ds-warning)] border-[color-mix(in_srgb,var(--ds-warning)_30%,var(--ds-warning-light))]',
  danger: 'bg-[var(--ds-danger-light)] text-[var(--ds-danger)] border-[color-mix(in_srgb,var(--ds-danger)_30%,var(--ds-danger-light))]',
  info: 'bg-[var(--ds-info-light)] text-[var(--ds-info)] border-[color-mix(in_srgb,var(--ds-info)_30%,var(--ds-info-light))]',
  slate: 'bg-[var(--ds-slate-light)] text-[var(--ds-slate-text)] border-[color-mix(in_srgb,var(--ds-slate)_30%,var(--ds-slate-light))]',
  azure: 'bg-[var(--ds-azure-light)] text-[var(--ds-azure-text)] border-[color-mix(in_srgb,var(--ds-azure)_30%,var(--ds-azure-light))]',
}

const DARK_TONES: Record<DsBadgeTone, string> = {
  neutral: 'bg-[var(--foreground)] text-[var(--background)] border-[color-mix(in_srgb,var(--foreground)_35%,var(--border))]',
  primary: 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]',
  success: 'bg-[var(--ds-success)] text-white border-[var(--ds-success)]',
  warning: 'bg-[var(--ds-warning)] text-white border-[var(--ds-warning)]',
  danger: 'bg-[var(--ds-danger)] text-white border-[var(--ds-danger)]',
  info: 'bg-[var(--ds-info)] text-white border-[var(--ds-info)]',
  slate: 'bg-[var(--ds-slate)] text-[var(--ds-slate-foreground)] border-[var(--ds-slate)]',
  azure: 'bg-[var(--ds-azure)] text-[var(--ds-azure-foreground)] border-[var(--ds-azure)]',
}

const props = withDefaults(
  defineProps<{
    tone?: DsBadgeTone
    dark?: boolean
    size?: DsBadgeSize
    radius?: DsBadgeRadius
  }>(),
  {
    tone: 'neutral',
    dark: false,
    size: 'md',
    radius: 'round',
  },
)

const className = computed(() => {
  const base = 'inline-flex items-center border whitespace-nowrap leading-none'

  const radiusClass = (() => {
    if (props.radius === 'square')
      return 'rounded-[var(--ds-radius-none)]'

    if (props.radius === 'semi')
      return SEMI_RADIUS_BY_SIZE[props.size]

    return 'rounded-full'
  })()

  const sizeClass = SIZE_CLASS[props.size]
  const toneClass = props.dark ? DARK_TONES[props.tone] : LIGHT_TONES[props.tone]

  return [base, radiusClass, sizeClass, toneClass].join(' ')
})
</script>

<template>
  <span :class="className">
    <slot />
  </span>
</template>