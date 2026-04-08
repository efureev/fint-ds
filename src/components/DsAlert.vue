<script setup lang="ts">
import { computed } from 'vue'

import IconInfo from '~icons/lucide/info'
import IconCheck from '~icons/lucide/check-circle'
import IconWarning from '~icons/lucide/alert-triangle'
import IconError from '~icons/lucide/x-circle'
import IconClose from '~icons/lucide/x'

export type DsAlertVariant = 'info' | 'success' | 'warning' | 'warning-light' | 'danger'

type DsAlertResolvedStyles = {
  bg: string
  border: string
  icon: string
  title: string
  text: string
  close: string
  closeHover: string
  Icon: unknown
}

const DEFAULT_TEXT_COLORS = {
  title: 'var(--foreground)',
  text: 'var(--muted-foreground)',
  close: 'var(--muted-foreground)',
  closeHover: 'var(--foreground)',
} as const

const WARNING_LIGHT_TEXT_COLOR = '#92400e'

const emit = defineEmits<{
  (event: 'close'): void
}>()

const props = withDefaults(
  defineProps<{
    variant?: DsAlertVariant
    title?: string
    closable?: boolean
    backgroundColor?: string
    textColor?: string
    borderColor?: string
  }>(),
  {
    variant: 'info',
    title: undefined,
    closable: false,
    backgroundColor: undefined,
    textColor: undefined,
    borderColor: undefined,
  },
)

const getCustomColor = (value?: string) => value?.trim() || undefined

const styles = computed<DsAlertResolvedStyles>(() => {
  const map: Record<DsAlertVariant, DsAlertResolvedStyles> = {
    info: {
      bg: 'var(--ds-info-light)',
      border: 'color-mix(in srgb, var(--ds-info) 22%, var(--border))',
      icon: 'var(--ds-info)',
      ...DEFAULT_TEXT_COLORS,
      Icon: IconInfo,
    },
    success: {
      bg: 'var(--ds-success-light)',
      border: 'color-mix(in srgb, var(--ds-success) 22%, var(--border))',
      icon: 'var(--ds-success)',
      ...DEFAULT_TEXT_COLORS,
      Icon: IconCheck,
    },
    warning: {
      bg: 'var(--ds-warning-light)',
      border: 'color-mix(in srgb, var(--ds-warning) 22%, var(--border))',
      icon: 'var(--ds-warning)',
      ...DEFAULT_TEXT_COLORS,
      Icon: IconWarning,
    },
    'warning-light': {
      bg: '#fffbeb',
      border: '#fcd34d',
      icon: WARNING_LIGHT_TEXT_COLOR,
      title: WARNING_LIGHT_TEXT_COLOR,
      text: WARNING_LIGHT_TEXT_COLOR,
      close: WARNING_LIGHT_TEXT_COLOR,
      closeHover: WARNING_LIGHT_TEXT_COLOR,
      Icon: IconWarning,
    },
    danger: {
      bg: 'var(--ds-danger-light)',
      border: 'color-mix(in srgb, var(--ds-danger) 22%, var(--border))',
      icon: 'var(--ds-danger)',
      ...DEFAULT_TEXT_COLORS,
      Icon: IconError,
    },
  }

  const base = map[props.variant]
  const customTextColor = getCustomColor(props.textColor)

  return {
    ...base,
    bg: getCustomColor(props.backgroundColor) ?? base.bg,
    border: getCustomColor(props.borderColor) ?? base.border,
    icon: customTextColor ?? base.icon,
    title: customTextColor ?? base.title,
    text: customTextColor ?? base.text,
    close: customTextColor ?? base.close,
    closeHover: customTextColor ?? base.closeHover,
  }
})

const rootStyle = computed(() => ({
  '--ds-alert-bg': styles.value.bg,
  '--ds-alert-border': styles.value.border,
  '--ds-alert-icon-color': styles.value.icon,
  '--ds-alert-title-color': styles.value.title,
  '--ds-alert-text-color': styles.value.text,
  '--ds-alert-close-color': styles.value.close,
  '--ds-alert-close-hover-color': styles.value.closeHover,
  background: 'var(--ds-alert-bg)',
  borderColor: 'var(--ds-alert-border)',
}))
</script>

<template>
  <div
    role="alert"
    class="rounded-[var(--ds-radius-lg)] border px-4 py-3"
    :style="rootStyle"
  >
    <div class="flex items-start gap-3">
      <component :is="styles.Icon" class="mt-0.5 h-5 w-5 text-[var(--ds-alert-icon-color)]" aria-hidden="true" />
      <div class="min-w-0 flex-1">
        <div v-if="props.title" class="text-[14px] font-700 text-[var(--ds-alert-title-color)]">
          {{ props.title }}
        </div>
        <div class="mt-0.5 text-[13px] text-[var(--ds-alert-text-color)]">
          <slot />
        </div>
      </div>

      <button
        v-if="props.closable"
        type="button"
        class="-mr-1 -mt-1 rounded-[var(--ds-radius-md)] p-1 text-[var(--ds-alert-close-color)] transition-colors hover:text-[var(--ds-alert-close-hover-color)]"
        aria-label="Close"
        @click="emit('close')"
      >
        <IconClose class="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
