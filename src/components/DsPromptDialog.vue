<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useFintDsTranslations } from '@/internal/fintI18n'

import DsButton from '@/components/DsButton.vue'
import DsDialog from '@/components/DsDialog.vue'
import DsFormField from '@/components/DsFormField.vue'
import DsInput from '@/components/DsInput.vue'
import type { DsButtonSize, DsButtonVariant } from '@/components/dsButtonStyles'
import type { DsDialogSectionConfig, DsDialogSize } from '@/components/dialog/dialogShared'

const { t } = useFintDsTranslations()

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    value: string
    title?: string
    description?: string
    label?: string
    placeholder?: string
    closeOnBackdrop?: boolean
    size?: DsDialogSize
    headerConfig?: DsDialogSectionConfig
    footerConfig?: DsDialogSectionConfig
    buttonSize?: DsButtonSize
    confirmText?: string
    cancelText?: string
    confirmVariant?: DsButtonVariant
    required?: boolean
  }>(),
  {
    description: undefined,
    label: undefined,
    placeholder: undefined,
    closeOnBackdrop: true,
    size: 'md',
    headerConfig: undefined,
    footerConfig: undefined,
    buttonSize: undefined,
    confirmText: undefined,
    cancelText: undefined,
    confirmVariant: 'primary',
    required: true,
  },
)

const titleText = computed(() => props.title ?? t('fintDs.dialog.prompt.title', 'Prompt'))
const labelText = computed(() => props.label ?? t('fintDs.dialog.prompt.label', 'Value'))
const confirmText = computed(() => props.confirmText ?? t('fintDs.common.confirm', 'Confirm'))
const cancelText = computed(() => props.cancelText ?? t('fintDs.common.cancel', 'Cancel'))

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'update:value', value: string): void
  (e: 'confirm', value: string): void
  (e: 'cancel'): void
}>()

const open = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
})

const valueModel = computed({
  get: () => props.value,
  set: (v: string) => emit('update:value', v),
})

const touched = ref(false)
const inputRef = ref<InstanceType<typeof DsInput> | null>(null)

watch(
  () => props.modelValue,
  (v) => {
    if (v) {
      touched.value = false
    }
  },
)

const canConfirm = computed(() => {
  if (!props.required) return true
  return valueModel.value.trim().length > 0
})

const error = computed(() => {
  if (!props.required) return undefined
  if (!touched.value) return undefined
  return valueModel.value.trim().length > 0
    ? undefined
    : t('fintDs.dialog.prompt.required', 'Enter a value.')
})

function onCancel(): void {
  emit('cancel')
  emit('update:modelValue', false)
}

function onConfirm(): void {
  if (!canConfirm.value) {
    touched.value = true
    inputRef.value?.focus()
    return
  }

  emit('confirm', valueModel.value)
  emit('update:modelValue', false)
}
</script>

<template>
  <DsDialog
    v-model="open"
    :title="titleText"
    :size="props.size"
    :close-on-backdrop="props.closeOnBackdrop"
    :header-config="props.headerConfig"
    :footer-config="props.footerConfig"
  >
    <div class="grid gap-4">
      <slot>
        <div v-if="props.description" class="text-[14px] text-[var(--muted-foreground)]">
          {{ props.description }}
        </div>
      </slot>

      <DsFormField :label="labelText" :error="error" for-id="ds-prompt-input">
        <DsInput
          id="ds-prompt-input"
          ref="inputRef"
          v-model="valueModel"
          data-testid="ds-prompt-input"
          :placeholder="props.placeholder"
          :invalid="!!error"
          @blur="touched = true"
        />
      </DsFormField>
    </div>

    <template #footer>
      <slot name="footer">
        <div class="flex items-center justify-end gap-3">
          <DsButton data-testid="ds-prompt-cancel" variant="outline" :size="props.buttonSize" @click="onCancel">
            {{ cancelText }}
          </DsButton>
          <DsButton
            data-testid="ds-prompt-confirm"
            :variant="props.confirmVariant"
            :size="props.buttonSize"
            :disabled="props.required && touched && !canConfirm"
            @click="onConfirm"
          >
            {{ confirmText }}
          </DsButton>
        </div>
      </slot>
    </template>
  </DsDialog>
</template>
