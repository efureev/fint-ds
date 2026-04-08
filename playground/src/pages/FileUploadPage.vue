<script setup lang="ts">
import { ref } from 'vue'

import { acceptValidator, maxSizeMbValidator, type DropzoneBindingValue } from '@ds'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

type UploadResult = {
  ok: true
  files: Array<{ name: string; size: number; type: string }>
  extraData?: any
}

const lastSuccess = ref<UploadResult | null>(null)
const lastError = ref<string | null>(null)
const lastProgress = ref<number | null>(null)
const lastFiles = ref<File[]>([])

async function request(files: File[], ctx: { signal: AbortSignal; extraData?: any }): Promise<UploadResult> {
  // Simulate async upload.
  await new Promise<void>((resolve, reject) => {
    const id = window.setTimeout(resolve, 250)

    ctx.signal.addEventListener(
      'abort',
      () => {
        window.clearTimeout(id)
        reject(new DOMException('Aborted', 'AbortError'))
      },
      { once: true },
    )
  })

  return {
    ok: true,
    files: files.map((f) => ({ name: f.name, size: f.size, type: f.type })),
    extraData: ctx.extraData,
  }
}

function beforeUpload(file: File) {
  // Demo: block .exe files
  if (file.name.toLowerCase().endsWith('.exe')) return false
  return true
}

function onExceed(files: File[], limit: number) {
  lastError.value = `Too many files selected: ${files.length}, limit=${limit}`
}

function uploadExtraData(files: File[]) {
  return {
    source: 'fint-ds-playground',
    filesCount: String(files.length),
  }
}

function onSuccess(payload: any) {
  lastSuccess.value = payload
  lastError.value = null
}

function onError(error: unknown) {
  lastError.value = error instanceof Error ? error.message : String(error)
}

function onProgress(percent: number) {
  lastProgress.value = percent
}

function onChange(files: File[]) {
  lastFiles.value = files
}

type DsFileUploadExposed = {
  uploadFiles: (files: File[]) => void | Promise<void>
}

const uploaderRef = ref<DsFileUploadExposed | null>(null)
const zoneOver = ref(false)

const imageAndPdfValidators = [acceptValidator('image/*,.pdf'), maxSizeMbValidator(1)]
const imageOnlyValidators = [acceptValidator('image/*')]

const dropzoneBinding: DropzoneBindingValue = {
  multiple: true,
  validators: imageOnlyValidators,
  onStateChange: (s) => {
    zoneOver.value = s.isOver
  },
  onFiles: (files) => {
    void uploaderRef.value?.uploadFiles(files)
  },
}

const propsInfo = [
  { name: 'action', type: 'string | undefined', description: 'URL для POST (fetch + FormData).' },
  {
    name: 'request',
    type: '(files: File[], ctx: { signal: AbortSignal }) => Promise<any> | undefined',
    description: 'Кастомная функция загрузки (имеет приоритет над action).',
  },
  { name: 'name', type: 'string', default: "'file'", description: 'Имя поля в FormData.' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Разрешить выбор нескольких файлов.' },
  { name: 'limit', type: 'number | undefined', description: 'Лимит количества файлов (имеет смысл при multiple).' },
  {
    name: 'onExceed',
    type: '(files: File[], limit: number) => void | undefined',
    description: 'Хук, вызывается при превышении limit (загрузка не стартует).',
  },
  {
    name: 'beforeUpload',
    type: '(file: File) => boolean | Promise<unknown> | undefined',
    description: 'Хук перед началом загрузки (false/reject → загрузка отменяется).',
  },
  { name: 'validators', type: 'FileValidator[] | undefined', description: 'Список валидаторов файлов.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Отключает drop/click.' },
  { name: 'headers', type: 'Record<string, string> | undefined', description: 'Заголовки для fetch (action).' },
  { name: 'withCredentials', type: 'boolean', default: 'false', description: 'credentials=include для fetch (action).' },
  { name: 'showFileList', type: 'boolean', default: 'false', description: 'Показывать список выбранных файлов.' },
  {
    name: 'uploadExtraData',
    type: '(files: File[]) => Record<string, string | Blob | Array<string | Blob>> | undefined',
    description: 'Доп. данные для запроса (FormData поля + прокидываются в ctx для request-режима).',
  },
] as const

const eventsInfo = [
  { name: '@success', type: '(payload: any) => void', description: 'Успешный ответ загрузки.' },
  { name: '@error', type: '(error: unknown) => void', description: 'Ошибка валидации или загрузки.' },
  { name: '@progress', type: '(percent: number) => void', description: 'Прогресс (best-effort; сейчас 0/100).' },
  { name: '@change', type: '(files: File[]) => void', description: 'Эмитится после успеха вместе со списком файлов.' },
] as const

const slotsInfo = [
  {
    name: 'label',
    type: 'slot',
    description: 'Заголовок внутри дефолтного dropzone UI (рекомендуемый способ кастомизации текста).',
  },
  {
    name: 'default',
    type: 'slot',
    description:
      'Полный UI-оверрайд компонента. Если slot содержит не только текст — дефолтная “морда” скрывается,'
      + ' а DnD/клик по контейнеру отключаются (можно сделать “только кнопку”). Slot props: { openDialog, abort, disabled, files, isOver }.',
  },
  { name: 'tip', type: 'slot', description: 'Подсказка под заголовком (в дефолтном UI).' },
] as const

const usageCode = `<script setup lang="ts">
import { ref } from 'vue'
import { DsFileUpload, acceptValidator, maxSizeMbValidator } from '@feugene/fint-ds'

async function request(files, ctx) {
  // your upload logic...
  // ctx.extraData contains extra fields (if provided)
}

function beforeUpload(file) {
  // return false to abort
}

function onExceed(files, limit) {
  // called when files.length > limit
}

function uploadExtraData(files) {
  return { folder: 'inbox' }
}
</scr${'ipt'}>

<template>
  <DsFileUpload
    :request="request"
    :validators="[acceptValidator('image/*'), maxSizeMbValidator(10)]"
    multiple
    :limit="3"
    :on-exceed="onExceed"
    :before-upload="beforeUpload"
    :upload-extra-data="uploadExtraData"
    show-file-list
    @success="(payload) => console.log(payload)"
    @error="(e) => console.error(e)"
    @change="(files) => console.log(files)"
  >
    <template #label>
      Загрузите файлы (drag & drop или клик)
    </template>
    <template #tip>
      accept: <span class="font-600">image/*</span> · max: <span class="font-600">10 Mb</span>
    </template>
  </DsFileUpload>

  <!-- Custom UI (button-only, without dropzone UI) -->
  <DsFileUpload :request="request" :validators="[acceptValidator('image/*')]">
    <template #default="{ openDialog }">
      <DsButton type="button" @click="openDialog">Выбрать файл</DsButton>
    </template>
  </DsFileUpload>

  <!-- Action mode (fetch + FormData) -->
  <DsFileUpload action="/api/upload" name="file" />

  <!-- Directive example: forward files into component -->
  <div v-dropzone="{ validators: [acceptValidator('image/*')], onFiles: (files) => uploader?.uploadFiles(files) }">Drop here</div>
</template>
`
</script>

<template>
  <PlaygroundPage title="FileUpload">
    <template #ui>
      <div class="grid gap-4">
        <DsCard class="p-5 grid gap-4">
          <div class="text-sm font-700">DsFileUpload</div>

          <DsFileUpload
            :request="request"
            :validators="imageAndPdfValidators"
            multiple
            :limit="2"
            :on-exceed="onExceed"
            :before-upload="beforeUpload"
            :upload-extra-data="uploadExtraData"
            show-file-list
            @success="onSuccess"
            @error="onError"
            @progress="onProgress"
            @change="onChange"
          >
            <template #label>
              Загрузите файлы (drag & drop или клик)
            </template>
            <template #tip>
              accept: <span class="font-600">image/*,.pdf</span> · max: <span class="font-600">1 Mb</span>
            </template>
          </DsFileUpload>

          <div class="grid gap-2 text-[13px]">
            <div class="ds-muted">progress: <span class="font-600">{{ lastProgress ?? '—' }}</span></div>
            <div class="ds-muted">
              files: <span class="font-600">{{ lastFiles.map(f => f.name).join(', ') || '—' }}</span>
            </div>
            <div class="ds-muted">success: <span class="font-600">{{ lastSuccess ? 'yes' : '—' }}</span></div>
            <div class="ds-muted">
              extra: <span class="font-600">{{ (lastSuccess as any)?.extraData ? 'yes' : '—' }}</span>
            </div>
            <div v-if="lastError" class="text-[var(--destructive)]">error: {{ lastError }}</div>
          </div>
        </DsCard>

        <DsCard class="p-5 grid gap-3">
          <div class="text-sm font-700">Custom UI (button-only)</div>
          <div class="text-[13px] ds-muted">В этом режиме дефолтная dropzone-разметка скрыта, а DnD отключён.</div>

          <DsFileUpload :request="request" :validators="imageOnlyValidators" @success="onSuccess" @error="onError" @change="onChange">
            <template #default="{ openDialog }">
              <DsButton @click="openDialog">Выбрать файл</DsButton>
              <span class="ml-5">{{ lastFiles.map(f => f.name).join(', ') || '—' }}</span>
            </template>
          </DsFileUpload>
        </DsCard>

        <DsCard class="p-5 grid gap-3">
          <div class="text-sm font-700">Disabled</div>
          <DsFileUpload disabled :request="request" />
        </DsCard>

        <DsCard class="p-5 grid gap-3">
          <div class="text-sm font-700">v-dropzone (forward files → DsFileUpload)</div>

          <div
            v-dropzone="dropzoneBinding"
            class="rounded-[var(--ds-radius-lg)] border border-dashed border-[var(--border)] bg-[var(--card)] px-5 py-4 transition"
            :class="zoneOver ? 'border-[var(--ring)] bg-[var(--muted)]' : 'hover:bg-[var(--muted)]'"
          >
            Перетащите изображения сюда (это отдельный DOM-элемент, не DsFileUpload)
            <div class="mt-1 text-[13px] ds-muted">Файлы будут прокинуты в DsFileUpload ниже через expose.uploadFiles()</div>
          </div>

          <DsFileUpload ref="uploaderRef" :request="request" :validators="imageOnlyValidators" multiple show-file-list />
        </DsCard>
      </div>
    </template>

    <template #usage>
      <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsFileUpload — Props" :items="propsInfo" />
      <PlaygroundProps title="DsFileUpload — Events" :items="eventsInfo" />
      <PlaygroundProps title="DsFileUpload — Slots" :items="slotsInfo" />
    </template>
  </PlaygroundPage>
</template>
