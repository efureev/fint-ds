<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

export type DsLinkVariant = 'primary' | 'default' | 'muted' | 'danger'
export type DsLinkUnderline = 'auto' | 'always' | 'none'
export type DsLinkSize = 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
  href?: string
  external?: boolean
  target?: string
  rel?: string
  disabled?: boolean
  ariaLabel?: string
  variant?: DsLinkVariant
  underline?: DsLinkUnderline
  size?: DsLinkSize
}>(), {
  href: undefined,
  external: false,
  target: undefined,
  rel: undefined,
  disabled: false,
  ariaLabel: undefined,
  variant: 'primary',
  underline: 'auto',
  size: 'sm',
})

const attrs = useAttrs()

const isAnchor = computed(() => !!props.href && !props.disabled)

const resolvedTarget = computed(() => {
  if (props.target)
    return props.target

  if (props.external)
    return '_blank'

  return undefined
})

const resolvedRel = computed(() => {
  if (props.rel)
    return props.rel

  if (props.external)
    return 'noopener noreferrer'

  return undefined
})

const base =
  'inline-flex items-center gap-1 rounded-[6px] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]'

const sizeClass = computed(() => {
  const map: Record<DsLinkSize, string> = {
    sm: 'text-sm',
    md: 'text-[14px]',
    lg: 'text-base',
  }

  return map[props.size]
})

const underlineClass = computed(() => {
  if (props.disabled)
    return 'no-underline'

  if (props.underline === 'always')
    return 'underline underline-offset-4'

  if (props.underline === 'none')
    return 'no-underline'

  return 'no-underline hover:underline hover:underline-offset-4'
})

const variantClass = computed(() => {
  const map: Record<DsLinkVariant, string> = {
    primary:
      'text-[var(--primary)] visited:text-[var(--primary)] hover:text-[var(--primary-hover)] active:text-[var(--primary-active)]',
    default: 'text-[var(--foreground)] hover:text-[var(--primary)] active:text-[var(--primary-active)]',
    muted: 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] active:text-[var(--foreground)]',
    danger: 'text-[var(--ds-danger)] hover:text-[var(--ds-danger-hover)] active:text-[var(--ds-danger-active)]',
  }

  return map[props.variant]
})

const disabledClass = computed(() => {
  return props.disabled ? 'cursor-not-allowed opacity-60 text-[var(--muted-foreground)]' : ''
})

const className = computed(() => {
  return [base, sizeClass.value, underlineClass.value, variantClass.value, disabledClass.value]
    .filter(Boolean)
    .join(' ')
})
</script>

<template>
  <a
    v-if="isAnchor"
    v-bind="attrs"
    :href="props.href"
    :target="resolvedTarget"
    :rel="resolvedRel"
    :aria-label="props.ariaLabel"
    :class="className"
  >
    <slot />
  </a>

  <span
    v-else
    v-bind="attrs"
    :aria-label="props.ariaLabel"
    :aria-disabled="props.disabled ? 'true' : undefined"
    :class="className"
  >
    <slot />
  </span>
</template>