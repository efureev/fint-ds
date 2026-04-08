<script setup lang="ts">
import { computed, ref } from 'vue'

import type { DropzoneBindingValue } from '@ds'
import {
  acceptValidator,
  FileValidationError,
  maxFileSizeBytesValidator,
  maxSizeMbValidator,
  maxTotalSizeBytesValidator,
  type FileValidationIssue,
  type FileValidator,
} from '@ds'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

type DsFormFileError = FileValidationIssue

const singleFile = ref<File | null>(null)
const singleErrors = ref<DsFormFileError[]>([])

const multiFiles = ref<File[]>([])
const multiErrors = ref<DsFormFileError[]>([])

const dropFiles = ref<File[]>([])
const isOver = ref(false)

const comboSingleFile = ref<File | null>(null)
const comboSingleError = ref<string | null>(null)
const comboSingleIsOver = ref(false)

const comboMultiFiles = ref<File[]>([])
const comboMultiError = ref<string | null>(null)
const comboMultiIsOver = ref(false)

function errorToMessage(error: unknown): string {
  if (error instanceof FileValidationError) {
    return error.issues
      .map(i => (i.fileName ? `${i.fileName}: ${i.message}` : i.message))
      .join('\n')
  }

  return 'Ошибка валидации файлов'
}

function maxFilesCountValidator(limit: number): FileValidator {
  return ({ files, context }) => {
    if (!context.multiple) return []
    if (files.length <= limit) return []

    return [
      {
        code: 'maxFiles',
        message: `Максимум файлов: ${limit}`,
        meta: {
          limit,
          count: files.length,
        },
      },
    ]
  }
}

const singleValidators: FileValidator[] = [
  maxFileSizeBytesValidator(10 * 1024 * 1024),
]

const multiValidators: FileValidator[] = [
  maxFileSizeBytesValidator(10 * 1024 * 1024),
  maxTotalSizeBytesValidator(25 * 1024 * 1024),
]

const dropzoneBinding = computed<DropzoneBindingValue>(() => {
  return {
    multiple: true,
    validators: [
      acceptValidator('image/*,.pdf'),
      maxSizeMbValidator(5),
    ],
    onStateChange: (s) => {
      isOver.value = s.isOver
    },
    onFiles: (files) => {
      dropFiles.value = files
    },
  }
})

const comboSingleValidators: FileValidator[] = [
  acceptValidator('image/*,.pdf'),
  maxSizeMbValidator(5),
]

const comboMultiValidators: FileValidator[] = [
  acceptValidator('image/*,.pdf'),
  maxSizeMbValidator(2),
  maxTotalSizeBytesValidator(5 * 1024 * 1024),
  maxFilesCountValidator(3),
]

const comboSingleDropzone = computed<DropzoneBindingValue>(() => {
  return {
    multiple: false,
    validators: comboSingleValidators,
    onStateChange: (s) => {
      comboSingleIsOver.value = s.isOver
    },
    onFiles: (files) => {
      comboSingleError.value = null
      comboSingleFile.value = files[0] ?? null
    },
    onError: (e) => {
      comboSingleError.value = errorToMessage(e)
    },
  }
})

const comboMultiDropzone = computed<DropzoneBindingValue>(() => {
  return {
    multiple: true,
    validators: comboMultiValidators,
    onStateChange: (s) => {
      comboMultiIsOver.value = s.isOver
    },
    onFiles: (files) => {
      comboMultiError.value = null
      comboMultiFiles.value = files
    },
    onError: (e) => {
      comboMultiError.value = errorToMessage(e)
    },
  }
})

const validatorsInfo = [
  {
    name: 'acceptValidator(accept?: string)',
    type: 'FileValidator',
    description: 'Валидация по W3C-строке accept (как у input[type=file]): MIME-тип/маски и/или расширения.',
  },
  {
    name: 'allowedMimeTypesValidator(allowed: string[], options?)',
    type: 'FileValidator',
    description:
      'Явный whitelist MIME-типов. Подходит, когда нужно жёстко ограничить набор типов и/или включить fallback по расширению.',
  },
  {
    name: 'allowedExtensionsValidator(exts: string[])',
    type: 'FileValidator',
    description: 'Whitelist расширений (с точкой или без). Расширения нормализуются внутри валидатора.',
  },
  {
    name: 'maxFileSizeBytesValidator(maxBytes?: number)',
    type: 'FileValidator',
    description: 'Ограничение на размер одного файла (в байтах).',
  },
  {
    name: 'maxSizeMbValidator(maxSizeMb?: number)',
    type: 'FileValidator',
    description: 'Ограничение на размер одного файла (в мегабайтах). Sugar поверх maxFileSizeBytes.',
  },
  {
    name: 'maxTotalSizeBytesValidator(maxBytes?: number)',
    type: 'FileValidator',
    description: 'Ограничение на суммарный размер всех файлов (актуально для multiple=true).',
  },
] as const

const formFilePropsInfo = [
  { name: 'modelValue', type: 'File | File[] | null', description: 'Текущее значение (single/multiple).' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Режим множественного выбора.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Отключает выбор/дроп.' },
  {
    name: 'accept',
    type: 'string | undefined',
    description:
      'W3C accept для input[type=file]. Также является синтаксическим сахаром: добавляет `acceptValidator(accept)` в раннер.',
  },
  { name: 'validators', type: 'FileValidator[] | undefined', description: 'Список валидаторов файлов.' },
  {
    name: 'validate',
    type: '(files: File[]) => FileValidationIssue[] | Promise<FileValidationIssue[]> | undefined',
    description: 'Кастомная валидация (хук на стороне потребителя).',
  },
  { name: 'uploadText', type: 'string', default: "'Upload file'", description: 'Текст кнопки, когда файлов нет.' },
  { name: 'changeText', type: 'string', default: "'Change file'", description: 'Текст кнопки, когда файл уже выбран.' },
  { name: 'removeText', type: 'string', default: "'Remove'", description: 'Текст удаления (single/multiple).' },
  { name: 'clearAllText', type: 'string', default: "'Clear all'", description: 'Текст очистки списка (multiple).' },
  { name: 'placeholder', type: 'string', default: "'No files selected'", description: 'Плейсхолдер, когда файлов нет.' },
] as const

const formFileEventsInfo = [
  { name: '@update:modelValue', type: '(value: File | File[] | null) => void', description: 'v-model обновление.' },
  { name: '@change', type: '(value: File | File[] | null) => void', description: 'Дублирует update:modelValue (для удобства).' },
  { name: '@clear', type: '() => void', description: 'Эмитится при очистке выбора.' },
  {
    name: '@validation',
    type: '(issues: FileValidationIssue[]) => void',
    description: 'Эмитится при каждой валидации (включая успешную — пустой список).',
  },
  {
    name: '@update:errors',
    type: '(issues: FileValidationIssue[]) => void',
    description: 'Синоним @validation (исторически — для v-model-подобного паттерна ошибок).',
  },
] as const

const fileUploadPropsInfo = [
  { name: 'action', type: 'string | undefined', description: 'URL для POST (fetch + FormData).' },
  {
    name: 'request',
    type: '(files: File[], ctx: { signal: AbortSignal; extraData?: any }) => Promise<any> | undefined',
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

const fileUploadEventsInfo = [
  { name: '@success', type: '(payload: any) => void', description: 'Успешный ответ загрузки.' },
  { name: '@error', type: '(error: unknown) => void', description: 'Ошибка валидации или загрузки.' },
  { name: '@progress', type: '(percent: number) => void', description: 'Прогресс (best-effort).' },
  { name: '@change', type: '(files: File[]) => void', description: 'Эмитится после успеха вместе со списком файлов.' },
] as const

const fileUploadSlotsInfo = [
  {
    name: 'label',
    type: 'slot',
    description: 'Заголовок внутри дефолтного dropzone UI (рекомендуемый способ кастомизации текста).',
  },
  {
    name: 'default',
    type: 'slot',
    description:
      'Полный UI-оверрайд компонента. Если slot содержит не только текст — дефолтная “морда” скрывается, а DnD/клик по контейнеру отключаются. Slot props: { openDialog, abort, disabled, files, isOver }.',
  },
  { name: 'tip', type: 'slot', description: 'Подсказка под заголовком (в дефолтном UI).' },
] as const

const dropzoneBindingInfo = [
  {
    name: 'v-dropzone="(files, event) => ..."',
    type: 'DropzoneOnFiles',
    description: 'Короткая форма: функция — это `onFiles` с дефолтными опциями.',
  },
  {
    name: 'v-dropzone="{ validators, multiple, onFiles, onError, ... }"',
    type: 'DropzoneBindingValue',
    description: 'Расширенная форма: объект с опциями и валидаторами.',
  },
  { name: 'multiple', type: 'boolean', default: 'true', description: 'Нормализация файлов под single/multiple.' },
  { name: 'validators', type: 'FileValidator[] | undefined', description: 'Список валидаторов.' },
  { name: 'enabled', type: 'boolean', default: 'true', description: 'Можно выключить обработчики, не снимая директиву.' },
  {
    name: 'onFiles',
    type: '(files: File[], event: DragEvent) => void | Promise<void>',
    description: 'Вызывается, если валидация прошла (issues пустой).',
  },
  {
    name: 'onError',
    type: '(error: unknown) => void | undefined',
    description: 'Вызывается при ошибке валидации (например, `FileValidationError`).',
  },
  {
    name: 'onStateChange',
    type: '(state: { isOver: boolean }) => void | undefined',
    description: 'Состояние drag-over (можно подсвечивать зону).',
  },
  { name: 'overClass', type: 'string', default: "'ds-dropzone--over'", description: 'CSS-класс на drag-over.' },
  { name: 'preventDefault', type: 'boolean', default: 'true', description: 'Предотвращает дефолтное поведение при drop.' },
  { name: 'stopPropagation', type: 'boolean', default: 'false', description: 'Останавливает всплытие событий drag/drop.' },
] as const

const usageCode = `<script setup lang="ts">
import { ref } from 'vue'
import {
  DsFileUpload,
  DsFormFile,
  acceptValidator,
  maxFileSizeBytesValidator,
  maxTotalSizeBytesValidator,
} from '@feugene/fint-ds'

const doc = ref<File | null>(null)
const docs = ref<File[]>([])

const singleValidators = [maxFileSizeBytesValidator(10 * 1024 * 1024)]
const multiValidators = [
  maxFileSizeBytesValidator(10 * 1024 * 1024),
  maxTotalSizeBytesValidator(25 * 1024 * 1024),
]

async function request(files, ctx) {
  // your upload logic...
}
</scr${'ipt'}>

<template>
  <!-- DsFormFile: accept — W3C атрибут + sugar к acceptValidator -->
  <DsFormFile
    v-model="doc"
    accept="image/*,.pdf"
    :validators="singleValidators"
  />

  <!-- DsFormFile multiple -->
  <DsFormFile
    v-model="docs"
    multiple
    accept="image/*,.pdf"
    :validators="multiValidators"
  />

  <!-- DsFileUpload: валидаторы через validators -->
  <DsFileUpload
    :request="request"
    multiple
    :validators="[acceptValidator('image/*,.pdf'), maxFileSizeBytesValidator(10 * 1024 * 1024)]"
  />

  <!-- v-dropzone: валидаторы через validators -->
  <div v-dropzone="{ validators: [acceptValidator('image/*')], onFiles: (files) => console.log(files) }">
    Drop here
  </div>
</template>
`
</script>

<template>
  <PlaygroundPage title="Files: компоненты + dropzone + валидаторы">
    <template #ui>
      <div class="grid gap-4">
        <DsCard class="p-5 grid gap-3">
          <div class="text-sm font-700">DsFormFile (single)</div>
          <div class="text-[13px] ds-muted">
            `accept` пробрасывается в нативный input и одновременно добавляет валидацию через `acceptValidator(accept)`.
          </div>

          <DsFormFile
            v-model="singleFile"
            accept="image/*,.pdf"
            :validators="singleValidators"
            placeholder="No file"
            @update:errors="(e) => (singleErrors = e)"
          />

          <div class="text-[13px] ds-muted">
            value: <span class="font-600">{{ singleFile?.name ?? '—' }}</span>
            · errors: <span class="font-600">{{ singleErrors.length }}</span>
          </div>
        </DsCard>

        <DsCard class="p-5 grid gap-3">
          <div class="text-sm font-700">DsFormFile (multiple)</div>
          <DsFormFile
            v-model="multiFiles"
            multiple
            accept="image/*,.pdf"
            :validators="multiValidators"
            placeholder="No files"
            @update:errors="(e) => (multiErrors = e)"
          />

          <div class="text-[13px] ds-muted">
            files: <span class="font-600">{{ multiFiles.map(f => f.name).join(', ') || '—' }}</span>
            · errors: <span class="font-600">{{ multiErrors.length }}</span>
          </div>
        </DsCard>

        <DsCard class="p-5 grid gap-3">
          <div class="text-sm font-700">v-dropzone + DsFormFile (single)</div>
          <div
            v-dropzone="comboSingleDropzone"
            class="rounded-[var(--ds-radius-lg)] border border-dashed border-[var(--border)] bg-[var(--card)] px-5 py-4 transition"
            :class="comboSingleIsOver ? 'border-[var(--ring)] bg-[var(--muted)]' : 'hover:bg-[var(--muted)]'"
          >
            Перетащите сюда 1 файл — он попадёт в DsFormFile ниже
            <div class="mt-1 text-[13px] ds-muted">
              validators: <span class="font-600">accept=image/*,.pdf</span> · <span class="font-600">max=5 Mb</span>
            </div>
          </div>

          <DsFormFile
            v-model="comboSingleFile"
            :validators="comboSingleValidators"
            accept="image/*,.pdf"
            placeholder="No file"
          />

          <div v-if="comboSingleError" class="text-[13px] text-[var(--danger)] whitespace-pre-line">
            {{ comboSingleError }}
          </div>

          <div class="text-[13px] ds-muted">
            value: <span class="font-600">{{ comboSingleFile?.name ?? '—' }}</span>
          </div>
        </DsCard>

        <DsCard class="p-5 grid gap-3">
          <div class="text-sm font-700">v-dropzone + DsFormFile (multiple)</div>
          <div
            v-dropzone="comboMultiDropzone"
            class="rounded-[var(--ds-radius-lg)] border border-dashed border-[var(--border)] bg-[var(--card)] px-5 py-4 transition"
            :class="comboMultiIsOver ? 'border-[var(--ring)] bg-[var(--muted)]' : 'hover:bg-[var(--muted)]'"
          >
            Перетащите сюда файлы — они попадут в DsFormFile ниже
            <div class="mt-1 text-[13px] ds-muted">
              ограничения: <span class="font-600">max files=3</span> · <span class="font-600">max file=2 Mb</span> ·
              <span class="font-600">max total=5 Mb</span> · <span class="font-600">accept=image/*,.pdf</span>
            </div>
          </div>

          <DsFormFile
            v-model="comboMultiFiles"
            multiple
            :validators="comboMultiValidators"
            accept="image/*,.pdf"
            placeholder="No files"
          />

          <div v-if="comboMultiError" class="text-[13px] text-[var(--danger)] whitespace-pre-line">
            {{ comboMultiError }}
          </div>

          <div class="text-[13px] ds-muted">
            files: <span class="font-600">{{ comboMultiFiles.map(f => f.name).join(', ') || '—' }}</span>
          </div>
        </DsCard>

        <DsCard class="p-5 grid gap-3">
          <div class="text-sm font-700">v-dropzone (standalone)</div>
          <div
            v-dropzone="dropzoneBinding"
            class="rounded-[var(--ds-radius-lg)] border border-dashed border-[var(--border)] bg-[var(--card)] px-5 py-4 transition"
            :class="isOver ? 'border-[var(--ring)] bg-[var(--muted)]' : 'hover:bg-[var(--muted)]'"
          >
            Перетащите сюда файлы (валидаторы: accept=image/*,.pdf + max=5Mb)
            <div class="mt-1 text-[13px] ds-muted">
              files: <span class="font-600">{{ dropFiles.map(f => f.name).join(', ') || '—' }}</span>
            </div>
          </div>
        </DsCard>

        <DsCard class="p-5 grid gap-3">
          <div class="text-sm font-700">DsFileUpload</div>
          <DsFileUpload
            :request="async () => ({ ok: true })"
            multiple
            :validators="[acceptValidator('image/*,.pdf'), maxSizeMbValidator(5)]"
            show-file-list
            @error="() => void 0"
          >
            <template #tip>
              accept: <span class="font-600">image/*,.pdf</span> · max: <span class="font-600">5 Mb</span>
            </template>
          </DsFileUpload>
        </DsCard>
      </div>
    </template>

    <template #usage>
      <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <div class="grid gap-4">
        <PlaygroundProps title="Валидаторы файлов" :items="validatorsInfo as any" />
        <PlaygroundProps title="DsFormFile — Props" :items="formFilePropsInfo as any" />
        <PlaygroundProps title="DsFormFile — Events" :items="formFileEventsInfo as any" />
        <PlaygroundProps title="DsFileUpload — Props" :items="fileUploadPropsInfo as any" />
        <PlaygroundProps title="DsFileUpload — Events" :items="fileUploadEventsInfo as any" />
        <PlaygroundProps title="DsFileUpload — Slots" :items="fileUploadSlotsInfo as any" />
        <PlaygroundProps title="v-dropzone — API" :items="dropzoneBindingInfo as any" />
      </div>
    </template>
  </PlaygroundPage>
</template>
