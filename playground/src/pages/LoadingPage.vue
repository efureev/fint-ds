<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useFintI18n } from '@feugene/fint-i18n'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

import IconRefresh from '~icons/lucide/refresh-cw'

const { t } = useFintI18n()

const visible = ref(true)
const animated = ref(true)
const defaultText = computed(() => t('fintDs.loading.defaultText', 'Loading...'))
const text = ref(defaultText.value)

const loadingPropsInfo = [
  {
    name: 'text',
    type: 'string | undefined',
    description:
      'Текст рядом со спиннером. Если не задан — берётся локализованный дефолт. Чтобы скрыть текст, передайте пустую строку.',
  },
  {
    name: 'spinner',
    type: 'Component | undefined',
    description: 'Иконка-спиннер (Vue-компонент). Если не задана — используется встроенная.',
  },
  {
    name: 'spinnerClass',
    type: 'string | undefined',
    description: 'Дополнительные классы для спиннера.',
  },
  {
    name: 'animated',
    type: 'boolean',
    default: 'true',
    description: 'Включает/выключает анимацию вращения спиннера.',
  },
  {
    name: 'background',
    type: 'string | undefined',
    description: 'Фон оверлея (CSS-цвет/rgba). Если не задан — используется полупрозрачный чёрный.',
  },
  {
    name: 'fullscreen',
    type: 'boolean',
    default: 'false',
    description: 'Если true — оверлей на весь экран (fixed). По умолчанию — внутри контейнера (absolute).',
  },
  {
    name: 'zIndex',
    type: 'number | undefined',
    description: 'Переопределяет z-index оверлея (inline style).',
  },
  {
    name: 'customClass',
    type: 'string | undefined',
    description: 'Дополнительные классы для корневого контейнера оверлея.',
  },
] as const

const usageCode = `<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(true)
</scr${'ipt'}>

<template>
  <div class="relative">
    <DsLoading v-if="visible" text="Loading..." />
  </div>
</template>
`

// When user didn't customize the text, keep it in sync with current locale.
watch(defaultText, (next, prev) => {
  if (text.value === prev) text.value = next
})
</script>

<template>
  <PlaygroundPage
    :title="t('playground.loading.title', 'Loading')"
    :description="
      t(
        'playground.loading.description',
        '`DsLoading` is a component that renders a spinner + optional text. Directives are documented on the Directives page.',
      )
    "
  >
    <template #ui>
      <div class="max-w-[900px]">
        <div class="flex items-center gap-3 flex-wrap">
          <DsSwitch v-model="visible" size="sm" />
          <span class="text-sm ds-muted">visible</span>

          <DsInput
            v-model="text"
            class="w-[260px]"
            :placeholder="t('playground.loading.controls.textPlaceholder', 'Loading text')"
          />

          <DsSwitch v-model="animated" size="sm" />
          <span class="text-sm ds-muted">animated</span>
        </div>

        <div
          class="mt-4 relative border border-[var(--border)] rounded-[var(--ds-radius-xl)] bg-[var(--card)] p-6 overflow-hidden h-[180px]"
        >
          <div class="text-sm">
            {{
              t(
                'playground.loading.container.description',
                'Container content. Toggle visibility to mount/unmount DsLoading overlay inside this container.',
              )
            }}
          </div>

          <DsLoading
            v-if="visible"
            :text="text"
            :animated="animated"
            :spinner="IconRefresh"
            background="rgba(255, 255, 255, 0.8)"
          />
        </div>
      </div>
    </template>

    <template #usage>
      <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsLoading — Props" :items="loadingPropsInfo" />
    </template>
  </PlaygroundPage>
</template>
