<script setup lang="ts">
import { ref } from 'vue'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'
import IconBookmark from '~icons/lucide/bookmark'
import IconBookmarkCheck from '~icons/lucide/bookmark-check'
import IconCopy from '~icons/lucide/copy'
import IconExternalLink from '~icons/lucide/external-link'
import IconPalette from '~icons/lucide/palette'

const galleryImages = [
  'https://picsum.photos/id/1018/1600/1000',
  'https://picsum.photos/id/1015/1600/1000',
  'https://picsum.photos/id/1016/1600/1000',
  'https://picsum.photos/id/1025/1600/1000',
] as const

const docsImages = [
  'https://picsum.photos/id/1047/1500/1000',
  'https://picsum.photos/id/1050/1500/1000',
  'https://picsum.photos/id/1060/1500/1000',
] as const

const mapImages = [
  'https://picsum.photos/id/1039/1500/1000',
  'https://picsum.photos/id/1043/1500/1000',
  'https://picsum.photos/id/1084/1500/1000',
] as const

const basicOpen = ref(false)
const basicInitialIndex = ref(0)

const progressOpen = ref(false)
const progressInitialIndex = ref(1)

const zoomValueOpen = ref(false)
const zoomValueHiddenOpen = ref(false)

const strictCloseOpen = ref(false)

const customToolbarOpen = ref(false)
const customInitialIndex = ref(0)
const customLastSwitch = ref<number | null>(null)
const customLastRotate = ref<number | null>(null)

const richToolbarOpen = ref(false)
const richInitialIndex = ref(0)
const richSavedIndexes = ref<number[]>([])
const richCopiedIndex = ref<number | null>(null)
const richOpenedIndex = ref<number | null>(null)

function openBasic(index: number): void {
  basicInitialIndex.value = index
  basicOpen.value = true
}

function openProgress(index: number): void {
  progressInitialIndex.value = index
  progressOpen.value = true
}

function openCustom(index = 0): void {
  customInitialIndex.value = index
  customLastSwitch.value = null
  customLastRotate.value = null
  customToolbarOpen.value = true
}

function openRichToolbar(index = 0): void {
  richInitialIndex.value = index
  richCopiedIndex.value = null
  richOpenedIndex.value = null
  richToolbarOpen.value = true
}

function isSaved(index: number): boolean {
  return richSavedIndexes.value.includes(index)
}

function toggleSaved(index: number): void {
  if (richSavedIndexes.value.includes(index)) {
    richSavedIndexes.value = richSavedIndexes.value.filter(savedIndex => savedIndex !== index)
    return
  }

  richSavedIndexes.value = [...richSavedIndexes.value, index]
}

function copyImageUrl(index: number): void {
  richCopiedIndex.value = index

  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    return
  }

  const url = galleryImages[index] ?? ''
  void navigator.clipboard.writeText(url)
}

function openImageInNewTab(index: number): void {
  richOpenedIndex.value = index

  if (typeof window === 'undefined') {
    return
  }

  const url = galleryImages[index]

  if (!url) {
    return
  }

  window.open(url, '_blank', 'noopener,noreferrer')
}

const imageViewerPropsInfo = [
  {
    name: 'v-model / modelValue',
    type: 'boolean',
    description: 'Открытие/закрытие fullscreen viewer.',
  },
  {
    name: 'urlList',
    type: 'string[]',
    description: 'Список изображений.',
  },
  {
    name: 'initialIndex',
    type: 'number',
    default: '0',
    description: 'Индекс изображения, с которого открыть viewer.',
  },
  {
    name: 'showProgress',
    type: 'boolean',
    default: 'false',
    description: 'Показывает счетчик вида X / N.',
  },
  {
    name: 'showZoomValue',
    type: 'boolean',
    default: 'true',
    description: 'Показывает текущее значение zoom в дефолтном toolbar.',
  },
  {
    name: 'hideOnClickModal',
    type: 'boolean',
    default: 'false',
    description: 'Закрывает viewer по клику на backdrop.',
  },
  {
    name: 'closeOnPressEscape',
    type: 'boolean',
    default: 'true',
    description: 'Разрешает закрытие по клавише Escape.',
  },
] as const

const imageViewerSlotsInfo = [
  {
    name: 'slot (toolbar)',
    type: 'slot',
    description: 'Полный override toolbar, получает { index, displayIndex, total, scale, rotation, actions }.',
  },
  {
    name: 'slot (toolbar-actions)',
    type: 'slot',
    description: 'Встраивает свои кнопки в дефолтный toolbar между разделителями, получает { index, displayIndex, total, scale, rotation, actions }.',
  },
] as const

const imageViewerEventsInfo = [
  {
    name: '@update:modelValue',
    type: '(value: boolean) => void',
    description: 'Эмитится при изменении состояния открытия.',
  },
  {
    name: '@close',
    type: '() => void',
    description: 'Вызывается при закрытии viewer.',
  },
  {
    name: '@switch',
    type: '(newIndex: number) => void',
    description: 'Эмитится при переключении текущего изображения.',
  },
  {
    name: '@rotate',
    type: '(deg: number) => void',
    description: 'Эмитится при повороте изображения.',
  },
] as const

const usageCode = `<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const images = [
  '/img/doc-1.jpg',
  '/img/doc-2.jpg',
  '/img/doc-3.jpg',
]
</scr${'ipt'}>

<template>
  <DsButton @click="open = true">Open viewer</DsButton>

  <DsImageViewer
    v-model="open"
    :url-list="images"
    :initial-index="0"
    show-progress
    hide-on-click-modal
  >
    <template #toolbar-actions="{ index, actions }">
      <button type="button" @click="actions.reset()">Reset</button>
      <button type="button" @click="console.log('Save', index)">Save</button>
    </template>
  </DsImageViewer>
</template>
`
</script>

<template>
  <PlaygroundPage
    title="Image viewer"
    description="Fullscreen просмотрщик изображений: prev/next, zoom, rotate, keyboard shortcuts и кастомный toolbar."
  >
    <template #ui>
      <div class="grid gap-4">
        <DsCard class="p-5 grid gap-4">
          <div class="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <div class="text-sm font-700">Базовый сценарий</div>
              <div class="text-sm ds-muted">Открытие по клику на превью, закрытие через ESC/крестик.</div>
            </div>
          </div>

          <div class="flex flex-wrap gap-3">
            <button
              v-for="(src, idx) in galleryImages"
              :key="`basic-${src}`"
              type="button"
              class="group overflow-hidden rounded-[var(--ds-radius-lg)] border border-[var(--border)] h-16 w-24"
              @click="openBasic(idx)"
            >
              <img
                :src="src"
                alt=""
                class="h-full w-full object-cover transition-transform duration-150 group-hover:scale-105"
              >
            </button>
          </div>

          <DsImageViewer v-model="basicOpen" :url-list="[...galleryImages]" :initial-index="basicInitialIndex" />
        </DsCard>

        <DsCard class="p-5 grid gap-4">
          <div class="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <div class="text-sm font-700">С прогрессом и стартовым индексом</div>
              <div class="text-sm ds-muted">Показывает X / N и открывается с выбранного слайда.</div>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <DsButton
              v-for="(src, idx) in docsImages"
              :key="`progress-${src}`"
              variant="outline"
              @click="openProgress(idx)"
            >
              Open from #{{ idx + 1 }}
            </DsButton>
          </div>

          <DsImageViewer
            v-model="progressOpen"
            :url-list="[...docsImages]"
            :initial-index="progressInitialIndex"
            show-progress
          />
        </DsCard>

        <DsCard class="p-5 grid gap-4">
          <div class="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <div class="text-sm font-700">Текущее значение zoom в toolbar</div>
              <div class="text-sm ds-muted">По умолчанию zoom-процент отображается, его можно отключить через showZoomValue.</div>
            </div>

            <div class="flex items-center gap-2 flex-wrap">
              <DsButton @click="zoomValueOpen = true">Open with zoom value</DsButton>
              <DsButton variant="outline" @click="zoomValueHiddenOpen = true">Open without zoom value</DsButton>
            </div>
          </div>

          <DsImageViewer v-model="zoomValueOpen" :url-list="[...galleryImages]" show-progress />

          <DsImageViewer
            v-model="zoomValueHiddenOpen"
            :url-list="[...galleryImages]"
            :show-zoom-value="false"
            show-progress
          />
        </DsCard>

        <DsCard class="p-5 grid gap-4">
          <div class="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <div class="text-sm font-700">Закрытие только по backdrop/крестику</div>
              <div class="text-sm ds-muted">Escape отключен через closeOnPressEscape = false.</div>
            </div>

            <DsButton @click="strictCloseOpen = true">Open strict close mode</DsButton>
          </div>

          <DsImageViewer
            v-model="strictCloseOpen"
            :url-list="[...mapImages]"
            :close-on-press-escape="false"
            hide-on-click-modal
            show-progress
          />
        </DsCard>

        <DsCard class="p-5 grid gap-4">
          <div class="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <div class="text-sm font-700">Кастомный toolbar + события</div>
              <div class="text-sm ds-muted">Демонстрация slot #toolbar и событий switch/rotate.</div>
            </div>

            <div class="flex items-center gap-2">
              <DsBadge variant="info" size="sm">switch: {{ customLastSwitch ?? '—' }}</DsBadge>
              <DsBadge variant="warning" size="sm">rotate: {{ customLastRotate ?? '—' }}</DsBadge>
              <DsButton variant="outline" @click="openCustom(0)">Open custom toolbar</DsButton>
            </div>
          </div>

          <DsImageViewer
            v-model="customToolbarOpen"
            :url-list="[...galleryImages]"
            :initial-index="customInitialIndex"
            show-progress
            @switch="customLastSwitch = $event"
            @rotate="customLastRotate = $event"
          >
            <template #toolbar="{ index, total, scale, rotation }">
              <div class="rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs text-white backdrop-blur-sm">
                slide {{ index + 1 }} / {{ total }} · zoom {{ Math.round(scale * 100) }}% · rotate {{ rotation }}°
              </div>
            </template>
          </DsImageViewer>
        </DsCard>

        <DsCard class="p-5 grid gap-4">
          <div class="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <div class="text-sm font-700">toolbar-actions: добавление кастомных кнопок в дефолтный toolbar</div>
              <div class="text-sm ds-muted">Сохраняем штатные zoom/rotate и встраиваем свои действия между разделителями.</div>
            </div>

            <div class="flex items-center gap-2 flex-wrap">
              <DsBadge variant="success" size="sm">saved: {{ richSavedIndexes.length }}</DsBadge>
              <DsBadge variant="info" size="sm">copied: {{ richCopiedIndex === null ? '—' : richCopiedIndex + 1 }}</DsBadge>
              <DsBadge variant="warning" size="sm">opened: {{ richOpenedIndex === null ? '—' : richOpenedIndex + 1 }}</DsBadge>
              <DsButton variant="outline" @click="openRichToolbar(1)">
                <DsIcon size="sm"><IconPalette aria-hidden="true" /></DsIcon>
                Open toolbar-actions demo
              </DsButton>
            </div>
          </div>

          <DsImageViewer
            v-model="richToolbarOpen"
            :url-list="[...galleryImages]"
            :initial-index="richInitialIndex"
            hide-on-click-modal
            show-progress
          >
            <template #toolbar-actions="{ index, actions }">
              <button
                type="button"
                class="h-11 min-w-11 px-2 flex items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                :aria-label="isSaved(index) ? 'Remove bookmark' : 'Add bookmark'"
                @click="toggleSaved(index)"
              >
                <DsIcon size="sm">
                  <IconBookmarkCheck v-if="isSaved(index)" aria-hidden="true" />
                  <IconBookmark v-else aria-hidden="true" />
                </DsIcon>
              </button>

              <button
                type="button"
                class="h-11 min-w-11 px-2 flex items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                aria-label="Copy image url"
                @click="copyImageUrl(index)"
              >
                <DsIcon size="sm"><IconCopy aria-hidden="true" /></DsIcon>
              </button>

              <button
                type="button"
                class="h-11 min-w-11 px-2 flex items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                aria-label="Open image in new tab"
                @click="openImageInNewTab(index)"
              >
                <DsIcon size="sm"><IconExternalLink aria-hidden="true" /></DsIcon>
              </button>

              <button
                type="button"
                class="h-11 min-w-11 px-2 flex items-center justify-center rounded-full bg-[linear-gradient(120deg,rgba(232,121,249,0.45),rgba(99,102,241,0.45),rgba(34,211,238,0.45))] text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                aria-label="Reset transform"
                @click="actions.reset()"
              >
                <DsIcon size="sm"><IconPalette aria-hidden="true" /></DsIcon>
              </button>
            </template>
          </DsImageViewer>
        </DsCard>
      </div>
    </template>

    <template #usage>
      <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsImageViewer — Props" :items="imageViewerPropsInfo" />
      <PlaygroundProps title="DsImageViewer — Slots" :items="imageViewerSlotsInfo" />
      <PlaygroundProps title="DsImageViewer — Events" :items="imageViewerEventsInfo" />
    </template>
  </PlaygroundPage>
</template>