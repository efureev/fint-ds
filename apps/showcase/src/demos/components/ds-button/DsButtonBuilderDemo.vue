<script setup lang="ts">
import {computed, ref} from 'vue'

import {
  DsButton,
  DsFormField,
  DsInput,
  DsRadioGroup,
  DsSelect,
  DsSwitch,
  type DsButtonSize,
  type DsButtonVariant,
} from '@feugene/granularity'
import IconSparkles from '~icons/lucide/sparkles'

import CodeBlock from '../../../components/doc/CodeBlock.vue'

type DsButtonType = 'button' | 'submit' | 'reset'

const variant = ref<DsButtonVariant>('primary')
const size = ref<DsButtonSize>('md')
const type = ref<DsButtonType>('button')
const label = ref('Create workspace')
const ariaLabel = ref('Create workspace')
const loading = ref(false)
const disabled = ref(false)
const square = ref(false)

const variantOptions = [
  {value: 'primary', label: 'Primary'},
  {value: 'secondary', label: 'Secondary'},
  {value: 'outline', label: 'Outline'},
  {value: 'ghost', label: 'Ghost'},
  {value: 'ghost-border', label: 'Ghost border'},
  {value: 'destructive', label: 'Destructive'},
] satisfies Array<{ value: DsButtonVariant, label: string }>

const sizeOptions = [
  {value: 'xs', label: 'XS'},
  {value: 'sm', label: 'SM'},
  {value: 'md', label: 'MD'},
  {value: 'lg', label: 'LG'},
] satisfies Array<{ value: DsButtonSize, label: string }>

const typeOptions = [
  {value: 'button', label: 'button'},
  {value: 'submit', label: 'submit'},
  {value: 'reset', label: 'reset'},
] satisfies Array<{ value: DsButtonType, label: string }>

const buttonText = computed(() => {
  if (loading.value && !square.value)
    return 'Saving…'

  return label.value.trim() || 'Create workspace'
})

const effectiveAriaLabel = computed(() => {
  return ariaLabel.value.trim() || buttonText.value
})

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}

const previewCode = computed(() => {
  const attributes = [
    `variant="${variant.value}"`,
    `size="${size.value}"`,
    `type="${type.value}"`,
  ]

  if (loading.value)
    attributes.push('loading')

  if (disabled.value)
    attributes.push('disabled')

  if (square.value)
    attributes.push('square')

  if (square.value || effectiveAriaLabel.value !== buttonText.value)
    attributes.push(`aria-label="${escapeAttribute(effectiveAriaLabel.value)}"`)

  const content = square.value && !loading.value
      ? '  <IconSparkles class="h-4 w-4" aria-hidden="true" />'
      : `  ${buttonText.value}`

  return ['<DsButton', ...attributes.map(attribute => `  ${attribute}`), '>', content, '</DsButton>'].join('\n')
})
</script>

<template>
  <div class="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_320px]">

    <div class="grid gap-4">
      <div
          class="grid min-h-[280px] place-items-center rounded-[24px] border border-dashed border-[color:color-mix(in_srgb,var(--primary)_16%,var(--border)_84%)] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--background)_68%,var(--primary)_6%)_0%,color-mix(in_srgb,var(--muted)_62%,var(--background)_38%)_100%)] p-6">
        <div class="flex flex-col items-center gap-4 text-center">
          <div class="showcase-demo-caption text-xs">
            Preview
          </div>

          <DsButton
              :variant="variant"
              :size="size"
              :type="type"
              :loading="loading"
              :disabled="disabled"
              :square="square"
              :aria-label="effectiveAriaLabel"
          >
            <IconSparkles v-if="square && !loading" class="h-4 w-4" aria-hidden="true"/>
            <template v-else>
              {{ buttonText }}
            </template>
          </DsButton>

          <div class="showcase-demo-text max-w-[40ch] text-sm">
            <template v-if="square">
              В square-режиме кнопка показывает только иконку, поэтому `aria-label` становится обязательным для screen
              reader.
            </template>
            <template v-else-if="loading">
              Loading делает кнопку недоступной автоматически — это полезно для защиты от повторного submit.
            </template>
            <template v-else>
              Используйте конструктор, чтобы быстро выбрать правильную комбинацию варианта, размера и типа действия.
            </template>
          </div>
        </div>
      </div>

      <CodeBlock :code="previewCode" language="vue" title="Rendered snippet"/>
    </div>

    <div class="showcase-demo-panel grid gap-4 rounded-[28px] border p-4 lg:p-5">
      <div class="showcase-demo-title text-sm font-semibold">
        Свойства кнопки
      </div>

      <div class="grid gap-4">
        <DsFormField label="Variant">
          <DsSelect v-model="variant" :options="variantOptions" aria-label="Button variant"/>
        </DsFormField>

        <DsFormField label="Size">
          <DsRadioGroup v-model="size" :options="sizeOptions" variant="button" size="sm"/>
        </DsFormField>

        <DsFormField label="Type">
          <DsRadioGroup v-model="type" :options="typeOptions" variant="button" size="sm"/>
        </DsFormField>

        <DsFormField :label="square ? 'Aria label (required for icon-only)' : 'Button label'">
          <DsInput
              v-if="square"
              v-model="ariaLabel"
              placeholder="Open quick actions"
              aria-label="Button aria label"
          />
          <DsInput
              v-else
              v-model="label"
              placeholder="Create workspace"
              aria-label="Button label"
          />
        </DsFormField>

        <DsFormField label="Accessibility label">
          <DsInput
              v-model="ariaLabel"
              placeholder="Used by screen readers and icon-only state"
              aria-label="Accessibility label"
          />
        </DsFormField>
      </div>

      <div class="grid gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
        <DsSwitch v-model="loading" size="sm">
          Loading
        </DsSwitch>
        <DsSwitch v-model="disabled" size="sm">
          Disabled
        </DsSwitch>
        <DsSwitch v-model="square" size="sm">
          Square / icon-only
        </DsSwitch>
      </div>
    </div>
  </div>
</template>