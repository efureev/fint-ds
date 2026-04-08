<script setup lang="ts">
import { Comment, computed, Fragment, nextTick, ref, Text, useSlots, type VNode } from 'vue'

import IconArrowUp from '~icons/lucide/arrow-up'

import type { FileValidator, FileValidatorSource } from '@/utils/fileValidators/types'

import { FileValidationError } from '@/utils/fileValidators/FileValidationError'
import { runFileValidators } from '@/utils/fileValidators/runFileValidators'

export type DsFileUploadExtraDataValue = string | Blob

export type DsFileUploadExtraData = Record<string, DsFileUploadExtraDataValue | DsFileUploadExtraDataValue[]>

export type DsFileUploadRequestCtx = {
  signal: AbortSignal
  extraData?: DsFileUploadExtraData
}

export type DsFileUploadRequest = (files: File[], ctx: DsFileUploadRequestCtx) => Promise<any>

const props = withDefaults(
  defineProps<{
    action?: string
    request?: DsFileUploadRequest
    name?: string
    multiple?: boolean
    limit?: number
    onExceed?: (files: File[], limit: number) => void
    beforeUpload?: (file: File) => boolean | Promise<unknown>
    validators?: FileValidator[]
    disabled?: boolean
    headers?: Record<string, string>
    withCredentials?: boolean
    showFileList?: boolean
    uploadExtraData?: (files: File[]) => DsFileUploadExtraData | undefined
  }>(),
  {
    action: undefined,
    request: undefined,
    name: 'file',
    multiple: false,
    limit: undefined,
    onExceed: undefined,
    beforeUpload: undefined,
    validators: undefined,
    disabled: false,
    headers: undefined,
    withCredentials: false,
    showFileList: false,
    uploadExtraData: undefined,
  },
)

const emit = defineEmits<{
  (e: 'success', payload: any): void
  (e: 'error', error: unknown): void
  (e: 'progress', percent: number): void
  (e: 'change', files: File[]): void
}>()

const slots = useSlots()

function flattenSlotNodes(nodes: VNode[]): VNode[] {
  const out: VNode[] = []

  for (const n of nodes) {
    if (n.type === Fragment && Array.isArray(n.children)) {
      out.push(...flattenSlotNodes(n.children as any))
      continue
    }

    out.push(n)
  }

  return out
}

function isWhitespaceTextNode(n: VNode): boolean {
  if (n.type !== Text) return false
  return typeof n.children === 'string' && n.children.trim().length === 0
}

function slotIsTextOnly(nodes: VNode[]): boolean {
  const flat = flattenSlotNodes(nodes)
  const meaningful = flat.filter((n) => n.type !== Comment && !isWhitespaceTextNode(n))

  if (meaningful.length === 0) return true

  for (const n of meaningful) {
    if (n.type !== Text) return false
  }

  return true
}

const defaultSlotNodes = computed(() => {
  // Always call slot with an object to avoid runtime errors when consumer uses scoped slots
  // (e.g. `#default="{ openDialog }"`).
  return slots.default ? flattenSlotNodes(slots.default({} as any)) : []
})

/**
 * If default slot is not text-only, treat it as a full UI override.
 * Text-only default slot is treated as a legacy title customization.
 */
const hasCustomUi = computed(() => {
  return !!slots.default && !slotIsTextOnly(defaultSlotNodes.value)
})

const inputRef = ref<HTMLInputElement | null>(null)
const isOver = ref(false)
let overCounter = 0

const lastFiles = ref<File[]>([])

let activeController: AbortController | null = null

const tabIndex = computed(() => (props.disabled ? -1 : 0))

// Do not rely on UnoCSS utilities (like `sr-only`) here: consumers may not scan DS output.
// Inline styles guarantee the native input stays visually hidden in all environments.
const hiddenInputStyle = {
  position: 'fixed',
  top: '-9999px',
  left: '-9999px',
  width: '1px',
  height: '1px',
  opacity: '0',
  overflow: 'hidden',
  pointerEvents: 'none',
} as const satisfies Record<string, string>

function setOver(next: boolean) {
  if (isOver.value === next) return
  isOver.value = next
}

function openDialog() {
  if (props.disabled) return
  inputRef.value?.click()
}

function abort() {
  activeController?.abort()
  activeController = null
}

function normalizeLimit(limit: number | undefined): number | undefined {
  if (typeof limit !== 'number') return undefined
  if (!Number.isFinite(limit)) return undefined
  if (limit <= 0) return undefined
  return Math.floor(limit)
}

function appendExtraFormData(body: FormData, extraData: DsFileUploadExtraData | undefined) {
  if (!extraData) return

  for (const [key, value] of Object.entries(extraData)) {
    if (Array.isArray(value)) {
      for (const v of value) body.append(key, v)
      continue
    }

    body.append(key, value)
  }
}

async function uploadViaAction(files: File[], signal: AbortSignal, extraData: DsFileUploadExtraData | undefined) {
  if (!props.action) throw new Error('DsFileUpload: either `action` or `request` must be provided')

  const body = new FormData()
  for (const file of files) {
    body.append(props.name, file)
  }

  appendExtraFormData(body, extraData)

  const response = await fetch(props.action, {
    method: 'POST',
    headers: props.headers,
    body,
    signal,
    credentials: props.withCredentials ? 'include' : 'same-origin',
  })

  const contentType = response.headers.get('content-type')
  const payload = contentType?.includes('application/json') ? await response.json() : await response.text()

  if (!response.ok) {
    const err = new Error(`Upload failed with status ${response.status}`)
    ;(err as any).payload = payload
    ;(err as any).status = response.status
    throw err
  }

  return payload
}

async function runBeforeUpload(files: File[]): Promise<'ok' | { aborted: true; reason: unknown }> {
  if (!props.beforeUpload) return 'ok'

  for (const file of files) {
    try {
      const res = props.beforeUpload(file)

      if (res === false) {
        return { aborted: true, reason: new Error('Upload aborted by beforeUpload') }
      }

      if (res && typeof (res as any).then === 'function') {
        await res
      }
    } catch (error) {
      return { aborted: true, reason: error }
    }
  }

  return 'ok'
}

async function handleFiles(files: File[], source: FileValidatorSource = 'input') {
  if (props.disabled) return
  if (!files.length) return

  const normalizedLimit = normalizeLimit(props.limit)
  if (props.multiple && normalizedLimit && files.length > normalizedLimit) {
    props.onExceed?.(files, normalizedLimit)
    emit('error', new Error(`Too many files selected, limit=${normalizedLimit}`))
    return
  }

  const validators = props.validators ?? []

  const { files: valid, issues } = await runFileValidators(files, validators, {
    source,
    multiple: props.multiple,
  })

  if (issues.length > 0) {
    emit('error', new FileValidationError(issues, valid))
    return
  }

  if (!valid.length) return

  lastFiles.value = valid

  const before = await runBeforeUpload(valid)
  if (before !== 'ok') {
    emit('error', before.reason)
    return
  }

  let extraData: DsFileUploadExtraData | undefined
  try {
    extraData = props.uploadExtraData?.(valid)
  } catch (error) {
    emit('error', error)
    return
  }

  // If a previous upload is active, abort it.
  abort()

  const controller = new AbortController()
  activeController = controller

  emit('progress', 0)

  try {
    const payload = props.request
      ? await props.request(valid, { signal: controller.signal, extraData })
      : await uploadViaAction(valid, controller.signal, extraData)

    // Emit success first, then change.
    emit('success', payload)
    emit('change', valid)
    emit('progress', 100)
  } catch (error) {
    emit('error', error)
  } finally {
    if (activeController === controller) activeController = null
  }
}

function onDragEnter(event: DragEvent) {
  if (hasCustomUi.value) return
  if (props.disabled) return
  event.preventDefault()
  overCounter += 1
  setOver(true)
}

function onDragOver(event: DragEvent) {
  if (hasCustomUi.value) return
  if (props.disabled) return
  event.preventDefault()
  if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy'
}

function onDragLeave(event: DragEvent) {
  if (hasCustomUi.value) return
  if (props.disabled) return
  event.preventDefault()
  overCounter = Math.max(0, overCounter - 1)
  if (overCounter === 0) setOver(false)
}

function onDrop(event: DragEvent) {
  if (hasCustomUi.value) return
  if (props.disabled) return
  event.preventDefault()
  overCounter = 0
  setOver(false)

  const files = event.dataTransfer?.files ? Array.prototype.slice.call(event.dataTransfer.files) as File[] : []
  void handleFiles(files, 'drop')
}

async function onInputChange(event: Event) {
  if (props.disabled) return

  const target = event.target as HTMLInputElement | null
  const files = target?.files ? Array.prototype.slice.call(target.files) as File[] : []

  // Reset value so selecting the same file twice triggers change.
  if (target) target.value = ''

  // Wait next tick to make sure value reset doesn't fight with browser.
  await nextTick()
  await handleFiles(files, 'input')
}

function onKeydown(event: KeyboardEvent) {
  if (hasCustomUi.value) return
  if (props.disabled) return

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    openDialog()
  }
}

function onRootClick() {
  if (hasCustomUi.value) return
  openDialog()
}

function onRootKeydown(event: KeyboardEvent) {
  if (hasCustomUi.value) return
  onKeydown(event)
}

defineExpose({
  uploadFiles: handleFiles,
  abort,
  openDialog,
})
</script>

<template>
  <div
    data-ds-file-upload
    :role="hasCustomUi ? undefined : 'button'"
    :tabindex="hasCustomUi ? undefined : tabIndex"
    :aria-disabled="hasCustomUi ? undefined : props.disabled ? 'true' : 'false'"
    :class="
      hasCustomUi
        ? 'inline-block'
        : [
            'relative w-full rounded-[var(--ds-radius-lg)] border border-dashed border-[var(--border)] bg-[var(--card)] px-5 py-6 outline-none transition',
            props.disabled
              ? 'opacity-60 cursor-not-allowed'
              : 'cursor-pointer hover:bg-[var(--muted)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
            isOver && !props.disabled ? 'border-[var(--ring)] bg-[var(--muted)]' : '',
          ]
    "
    @click="onRootClick"
    @keydown="onRootKeydown"
    @dragenter="onDragEnter"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <input
      ref="inputRef"
      data-ds-file-upload-input
      :style="hiddenInputStyle"
      type="file"
      tabindex="-1"
      aria-hidden="true"
      :name="props.name"
      :multiple="props.multiple"
      :disabled="props.disabled"
      @change="onInputChange"
    >

    <slot
      v-if="hasCustomUi"
      :open-dialog="openDialog"
      :abort="abort"
      :disabled="props.disabled"
      :files="lastFiles"
      :is-over="isOver"
    />

    <div v-else class="flex items-start gap-4">
      <div
        class="h-12 w-12 shrink-0 rounded-[12px] bg-[var(--muted)] border border-[var(--border)] flex items-center justify-center"
        aria-hidden="true"
      >
        <IconArrowUp class="h-6 w-6 text-[var(--muted-foreground)]" />
      </div>

      <div class="min-w-0">
        <div class="text-[14px] font-700">
          <slot name="label">
            <slot>
              Перетащите файлы сюда или нажмите для выбора
            </slot>
          </slot>
        </div>

        <div v-if="$slots.tip" class="mt-1 text-[13px] ds-muted">
          <slot name="tip" />
        </div>
        <div v-else class="mt-1 text-[13px] ds-muted" />

        <ul v-if="props.showFileList && lastFiles.length" class="mt-3 space-y-1">
          <li v-for="file in lastFiles" :key="file.name" class="text-[13px]">
            <span class="font-600">{{ file.name }}</span>
            <span class="ds-muted"> · {{ Math.ceil(file.size / 1024) }} KB</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
