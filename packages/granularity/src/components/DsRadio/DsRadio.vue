<script setup lang="ts">
import { computed, inject } from 'vue'

import { dsButtonClass, type DsButtonSize, type DsButtonTone, type DsButtonVariant } from '../DsButton/dsButtonStyles'

import { DS_RADIO_GROUP_CONTEXT } from './dsRadioGroupContext'

export type DsRadioVariant = 'radiobox' | 'button'

const hiddenInputStyle = {
  position: 'absolute',
  opacity: '0',
  width: '0',
  height: '0',
  pointerEvents: 'none',
} as const

const props = withDefaults(
  defineProps<{
    value: string
    modelValue?: string
    disabled?: boolean
    name?: string
    required?: boolean
    form?: string
    size?: DsButtonSize
    variant?: DsRadioVariant
    buttonVariant?: DsButtonVariant
    buttonTone?: DsButtonTone
    selectedButtonVariant?: DsButtonVariant
    selectedButtonTone?: DsButtonTone
    ariaLabel?: string
  }>(),
  {
    modelValue: undefined,
    disabled: undefined,
    name: undefined,
    required: false,
    form: undefined,
    size: undefined,
    variant: 'radiobox',
    buttonVariant: 'outline',
    buttonTone: 'neutral',
    selectedButtonVariant: 'primary',
    selectedButtonTone: 'primary',
    ariaLabel: undefined,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const group = inject(DS_RADIO_GROUP_CONTEXT, null)

const resolvedModelValue = computed(() => {
  if (typeof props.modelValue === 'string')
    return props.modelValue

  return group?.modelValue.value ?? ''
})

const resolvedDisabled = computed(() => {
  if (typeof props.disabled === 'boolean')
    return props.disabled

  return group?.disabled.value ?? false
})

const resolvedName = computed(() => {
  if (props.name)
    return props.name

  return group?.name.value
})

const resolvedSize = computed<DsButtonSize>(() => {
  if (props.size)
    return props.size

  return group?.size.value ?? 'md'
})

const checked = computed(() => resolvedModelValue.value === props.value)

const buttonClassName = computed(() => {
  const variant = checked.value ? props.selectedButtonVariant : props.buttonVariant
  const tone = checked.value ? props.selectedButtonTone : props.buttonTone

  return dsButtonClass({
    variant,
    tone,
    size: resolvedSize.value,
    square: false,
  })
})

function setValue(next: string): void {
  if (resolvedDisabled.value)
    return

  if (typeof props.modelValue === 'string') {
    emit('update:modelValue', next)
    return
  }

  group?.setValue(next)
}

function onButtonClick(): void {
  setValue(props.value)
}
</script>

<template>
  <div
    v-if="props.variant === 'button'"
    data-ds-button
    data-ds-radio
    role="radio"
    :aria-checked="checked ? 'true' : 'false'"
    :aria-label="props.ariaLabel"
    :aria-disabled="resolvedDisabled ? 'true' : undefined"
    :tabindex="resolvedDisabled ? -1 : 0"
    :class="[buttonClassName, resolvedDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'].join(' ')"
    @click="onButtonClick"
    @keydown.space.prevent="onButtonClick"
    @keydown.enter.prevent="onButtonClick"
  >
    <input
      type="radio"
      :checked="checked"
      :disabled="resolvedDisabled"
      :name="resolvedName"
      :value="props.value"
      :required="props.required"
      :form="props.form"
      tabindex="-1"
      aria-hidden="true"
      :style="hiddenInputStyle"
    >

    <slot />
  </div>

  <div
    v-else
    data-ds-radio
    role="radio"
    :aria-checked="checked ? 'true' : 'false'"
    :aria-label="props.ariaLabel"
    :aria-disabled="resolvedDisabled ? 'true' : undefined"
    :tabindex="resolvedDisabled ? -1 : 0"
    class="inline-flex items-center gap-2 select-none focus-visible:outline-none focus-visible:rounded-[8px] focus-visible:shadow-[0_0_0_2px_var(--ring),0_0_0_4px_var(--background)]"
    :class="resolvedDisabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'"
    @click="onButtonClick"
    @keydown.space.prevent="onButtonClick"
    @keydown.enter.prevent="onButtonClick"
  >
    <input
      type="radio"
      :checked="checked"
      :disabled="resolvedDisabled"
      :name="resolvedName"
      :value="props.value"
      :required="props.required"
      :form="props.form"
      tabindex="-1"
      aria-hidden="true"
      :style="hiddenInputStyle"
    >

    <span
      aria-hidden="true"
      class="h-4 w-4 rounded-full border flex items-center justify-center transition-colors duration-150"
      :class="[
        checked
          ? 'border-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))]'
          : 'border-[var(--border)] bg-[var(--background)]',
      ].join(' ')"
    >
      <span
        data-ds-radio-dot
        class="h-[6px] w-[6px] rounded-full transition-[transform,opacity,background-color] duration-150"
        :class="checked
          ? 'bg-[var(--primary)] opacity-100 scale-100'
          : 'bg-transparent opacity-0 scale-75'"
      />
    </span>

    <span class="text-sm text-[var(--muted-foreground)]">
      <slot />
    </span>
  </div>
</template>