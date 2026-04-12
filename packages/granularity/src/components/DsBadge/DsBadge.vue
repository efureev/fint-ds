<script setup lang="ts">
import { computed } from 'vue'

export type DsBadgeVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
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

const LIGHT_VARIANTS: Record<DsBadgeVariant, string> = {
  neutral: 'bg-[var(--muted)] text-[var(--foreground)] border-[var(--border)]',
  primary:
    'bg-[var(--accent)] text-[var(--accent-foreground)] border-[color-mix(in_srgb,var(--primary)_30%,var(--accent))]',
  success: 'bg-[var(--ds-success-light)] text-[var(--ds-success)] border-[color-mix(in_srgb,var(--ds-success)_30%,var(--ds-success-light))]',
  warning: 'bg-[var(--ds-warning-light)] text-[var(--ds-warning)] border-[color-mix(in_srgb,var(--ds-warning)_30%,var(--ds-warning-light))]',
  danger: 'bg-[var(--ds-danger-light)] text-[var(--ds-danger)] border-[color-mix(in_srgb,var(--ds-danger)_30%,var(--ds-danger-light))]',
  info: 'bg-[var(--ds-info-light)] text-[var(--ds-info)] border-[color-mix(in_srgb,var(--ds-info)_30%,var(--ds-info-light))]',
}

const DARK_VARIANTS: Record<DsBadgeVariant, string> = {
  neutral: 'bg-[var(--foreground)] text-[var(--background)] border-[color-mix(in_srgb,var(--foreground)_35%,var(--border))]',
  primary: 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]',
  success: 'bg-[var(--ds-success)] text-white border-[var(--ds-success)]',
  warning: 'bg-[var(--ds-warning)] text-white border-[var(--ds-warning)]',
  danger: 'bg-[var(--ds-danger)] text-white border-[var(--ds-danger)]',
  info: 'bg-[var(--ds-info)] text-white border-[var(--ds-info)]',
}

const props = withDefaults(
  defineProps<{
    variant?: DsBadgeVariant
    dark?: boolean
    size?: DsBadgeSize
    radius?: DsBadgeRadius
  }>(),
  {
    variant: 'neutral',
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
  const variantClass = props.dark ? DARK_VARIANTS[props.variant] : LIGHT_VARIANTS[props.variant]

  return [base, radiusClass, sizeClass, variantClass].join(' ')
})
</script>

<template>
  <span :class="className">
    <slot />
  </span>
</template>