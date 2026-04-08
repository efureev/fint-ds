<script setup lang="ts">
import { computed, ref } from 'vue'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

const avatarSvg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="none">
    <rect width="96" height="96" rx="24" fill="#dbeafe" />
    <circle cx="48" cy="38" r="18" fill="#2563eb" opacity="0.2" />
    <path d="M20 82c5-16 18-24 28-24s23 8 28 24" fill="#2563eb" opacity="0.28" />
    <circle cx="48" cy="38" r="14" fill="#2563eb" />
  </svg>
`)

const avatarImageSrc = `data:image/svg+xml;charset=UTF-8,${avatarSvg}`

const previewSize = ref<'32' | '40' | '56' | '72'>('56')
const previewShape = ref<'circle' | 'square'>('circle')
const useImage = ref(true)
const alt = ref('Alex Doe')
const fallback = ref('AD')

const previewSrc = computed(() => {
  return useImage.value ? avatarImageSrc : undefined
})

const avatarPropsInfo = [
  {
    name: 'size',
    type: 'number',
    default: '40',
    description: 'Размер аватара в пикселях по ширине и высоте.',
  },
  {
    name: 'src',
    type: 'string | undefined',
    description: 'URL изображения. Если не передан, рендерится содержимое default slot.',
  },
  {
    name: 'alt',
    type: 'string',
    default: "''",
    description: 'Alt-текст для изображения.',
  },
  {
    name: 'shape',
    type: "'circle' | 'square'",
    default: "'circle'",
    description: 'Форма аватара: круглая или квадратная со скруглением.',
  },
] as const

const avatarSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Fallback-содержимое, например инициалы или иконка, когда `src` не передан.',
  },
] as const

const sizeOptions = [
  { label: '32', value: '32' },
  { label: '40', value: '40' },
  { label: '56', value: '56' },
  { label: '72', value: '72' },
] as const

const shapeOptions = [
  { label: 'circle', value: 'circle' },
  { label: 'square', value: 'square' },
] as const

const usageCode = computed(() => {
  if (useImage.value) {
    return `<template>
  <DsAvatar
    :size="${previewSize.value}"
    shape="${previewShape.value}"
    src="${avatarImageSrc}"
    alt="${alt.value}"
  />
</template>`
  }

  return `<template>
  <DsAvatar :size="${previewSize.value}" shape="${previewShape.value}">
    ${fallback.value}
  </DsAvatar>
</template>`
})
</script>

<template>
  <PlaygroundPage
    title="DsAvatar"
    description="Аватар для профиля с поддержкой изображения, fallback-содержимого, размеров и формы."
  >
    <template #ui>
      <div class="grid gap-4">
        <DsCard class="grid gap-4 p-5">
          <div class="grid gap-3">
            <div class="text-sm font-600">Размеры и fallback</div>
            <div class="flex flex-wrap items-center gap-4">
              <DsAvatar :size="32">AD</DsAvatar>
              <DsAvatar :size="40">AD</DsAvatar>
              <DsAvatar :size="56">AD</DsAvatar>
              <DsAvatar :size="72">AD</DsAvatar>
              <DsAvatar :size="56" shape="square">AD</DsAvatar>
            </div>
          </div>

          <div class="grid gap-3">
            <div class="text-sm font-600">Изображение</div>
            <div class="flex flex-wrap items-center gap-4">
              <DsAvatar :size="40" :src="avatarImageSrc" alt="Alex Doe" />
              <DsAvatar :size="56" :src="avatarImageSrc" alt="Alex Doe" />
              <DsAvatar :size="72" shape="square" :src="avatarImageSrc" alt="Alex Doe" />
            </div>
          </div>
        </DsCard>

        <DsCard class="grid gap-4 p-5 lg:grid-cols-[220px_1fr] lg:items-start">
          <div class="grid gap-3">
            <span class="text-sm ds-muted">Предпросмотр</span>
            <div class="flex h-[176px] items-center justify-center rounded-[24px] border border-dashed border-[var(--border)] bg-[var(--muted)]/40">
              <DsAvatar
                :size="Number(previewSize)"
                :shape="previewShape"
                :src="previewSrc"
                :alt="alt"
              >
                {{ fallback }}
              </DsAvatar>
            </div>
          </div>

          <div class="grid gap-3 md:grid-cols-[180px_1fr] md:items-center">
            <span class="text-sm ds-muted">size</span>
            <DsSelect v-model="previewSize" :options="sizeOptions" />

            <span class="text-sm ds-muted">shape</span>
            <DsSelect v-model="previewShape" :options="shapeOptions" />

            <span class="text-sm ds-muted">use image</span>
            <div class="flex items-center gap-3">
              <DsSwitch v-model="useImage" size="sm" />
              <span class="text-sm ds-muted">{{ useImage ? 'on' : 'off' }}</span>
            </div>

            <span class="text-sm ds-muted">alt</span>
            <DsInput v-model="alt" placeholder="Alex Doe" :disabled="!useImage" />

            <span class="text-sm ds-muted">fallback</span>
            <DsInput v-model="fallback" maxlength="3" placeholder="AD" :disabled="useImage" />
          </div>
        </DsCard>
      </div>
    </template>

    <template #usage>
      <pre class="m-0 overflow-auto rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsAvatar — Props" :items="avatarPropsInfo" />
      <PlaygroundProps title="DsAvatar — Slots" :items="avatarSlotsInfo" />
    </template>
  </PlaygroundPage>
</template>