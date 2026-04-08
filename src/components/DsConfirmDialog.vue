<script setup lang="ts">
import { computed } from 'vue'

import { useFintDsTranslations } from '@/internal/fintI18n'
import DsButton from '@/components/DsButton.vue'
import DsDialog from '@/components/DsDialog.vue'
import type { DsButtonSize, DsButtonVariant } from '@/components/dsButtonStyles'
import type { DsDialogSectionConfig, DsDialogSize } from '@/components/dialog/dialogShared'

const { t } = useFintDsTranslations()

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title?: string
    description?: string
    closeOnBackdrop?: boolean
    size?: DsDialogSize
    headerConfig?: DsDialogSectionConfig
    footerConfig?: DsDialogSectionConfig
    buttonSize?: DsButtonSize
    confirmText?: string
    cancelText?: string
    confirmVariant?: DsButtonVariant
  }>(),
  {
    description: undefined,
    closeOnBackdrop: true,
    size: 'md',
    headerConfig: undefined,
    footerConfig: undefined,
    buttonSize: undefined,
    confirmVariant: 'primary',
  },
)

const titleText = computed(() => props.title ?? t('fintDs.dialog.confirm.title', 'Confirm'))
const confirmText = computed(() => props.confirmText ?? t('fintDs.common.confirm', 'Confirm'))
const cancelText = computed(() => props.cancelText ?? t('fintDs.common.cancel', 'Cancel'))

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const open = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
})

function onCancel(): void {
  emit('cancel')
  emit('update:modelValue', false)
}

function onConfirm(): void {
  emit('confirm')
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
    <slot>
      <div v-if="props.description" class="text-[14px] text-[var(--muted-foreground)]">
        {{ props.description }}
      </div>
    </slot>

    <template #footer>
      <slot name="footer">
        <div class="flex items-center justify-end gap-3">
          <DsButton data-testid="ds-confirm-cancel" variant="outline" :size="props.buttonSize" @click="onCancel">
            {{ cancelText }}
          </DsButton>
          <DsButton
            data-testid="ds-confirm-confirm"
            :variant="props.confirmVariant"
            :size="props.buttonSize"
            @click="onConfirm"
          >
            {{ confirmText }}
          </DsButton>
        </div>
      </slot>
    </template>
  </DsDialog>
</template>
