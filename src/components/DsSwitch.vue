<script setup lang="ts">
import { computed } from 'vue'

export type DsSwitchSize = 'sm' | 'md' | 'lg'

const getCustomColor = (value?: string) => value?.trim() || undefined

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    disabled?: boolean
    ariaLabel?: string
    size?: DsSwitchSize
    activeBackgroundColor?: string
    inactiveBackgroundColor?: string
  }>(),
  {
    disabled: false,
    ariaLabel: undefined,
    size: 'md',
    activeBackgroundColor: undefined,
    inactiveBackgroundColor: undefined,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const trackSizeClass = computed(() => {
  const map: Record<DsSwitchSize, string> = {
    sm: 'h-5 w-9',
    md: 'h-6 w-11',
    lg: 'h-7 w-14',
  }

  return map[props.size]
})

const trackStyle = computed(() => {
  const isChecked = props.modelValue
  const defaultBackgroundColor = isChecked ? 'var(--primary)' : 'var(--muted)'
  const customBackgroundColor = getCustomColor(
    isChecked ? props.activeBackgroundColor : props.inactiveBackgroundColor,
  )
  const backgroundColor = customBackgroundColor ?? defaultBackgroundColor

  return {
    '--ds-switch-track-bg': backgroundColor,
    '--ds-switch-track-border': customBackgroundColor
      ? backgroundColor
      : isChecked
        ? 'var(--primary)'
        : 'var(--border)',
    backgroundColor: 'var(--ds-switch-track-bg)',
  }
})

const thumbSizeClass = computed(() => {
  const map: Record<DsSwitchSize, string> = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  return map[props.size]
})

const thumbTranslateClass = computed(() => {
  if (props.size === 'sm') {
    return props.modelValue ? 'translate-x-[17px]' : 'translate-x-[2px]'
  }

  if (props.size === 'lg') {
    return props.modelValue ? 'translate-x-[28px]' : 'translate-x-[3px]'
  }

  return props.modelValue ? 'translate-x-5' : 'translate-x-[2px]'
})

const labelSizeClass = computed(() => {
  return props.size === 'lg' ? 'text-base' : 'text-sm'
})

function toggle(): void {
  if (props.disabled) {
    return
  }

  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <button
      type="button"
      role="switch"
      :aria-checked="props.modelValue ? 'true' : 'false'"
      :aria-label="props.ariaLabel"
      :disabled="props.disabled"
      class="inline-flex items-center gap-2 select-none disabled:opacity-50 disabled:cursor-not-allowed"
      @click="toggle"
  >
    <span
        data-testid="ds-switch-track"
        class="relative inline-flex items-center rounded-full border border-[var(--ds-switch-track-border)] transition-colors duration-150"
        :class="trackSizeClass"
        :style="trackStyle"
    >
      <span
          data-testid="ds-switch-thumb"
          class="inline-block rounded-full bg-[var(--card)] shadow-[var(--ds-shadow-1)] transition-transform duration-150"
          :class="[thumbSizeClass, thumbTranslateClass].join(' ')"
          aria-hidden="true"
      />
    </span>
    <span
        v-if="$slots.default"
        class="text-[var(--muted-foreground)]"
        :class="labelSizeClass"
    >
      <slot />
    </span>
  </button>
</template>
