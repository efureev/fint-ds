<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { createLoading } from '@ds/directives/loading'
import { useFintI18n } from '@feugene/fint-i18n'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

import IconRefresh from '~icons/lucide/refresh-cw'

const { t } = useFintI18n()

// v-autofocus
const autofocusValue = ref('')
const autofocusKey = ref(0)

// v-autosize
const note = ref('Line 1\nLine 2')

// v-click-outside
const open = ref(false)
function close() {
  open.value = false
}

// v-hotkey
const searchOpen = ref(false)
function openSearch() {
  searchOpen.value = true
}
function closeSearch() {
  searchOpen.value = false
}

// v-loading
const loading = ref(false)
const animated = ref(true)
const defaultText = computed(() => 'Loading...')
const loadingText = ref(defaultText.value)

watch(defaultText, (next, prev) => {
  if (loadingText.value === prev) loadingText.value = next
})

function showFullscreenFor(ms: number) {
  const ctrl = createLoading({
    fullscreen: true,
    text: t('playground.directives.loading.fullscreen', 'Loading data...'),
    background: 'rgba(0, 0, 0, 0.35)',
  })

  window.setTimeout(() => ctrl.close(), ms)
}

function showFullscreenRefreshFor(ms: number) {
  const ctrl = createLoading({
    fullscreen: true,
    text: t('playground.directives.loading.fullscreenRefresh', 'Refreshing...'),
    background: 'rgba(0, 0, 0, 0.35)',
    spinner: IconRefresh,
    spinnerClass: 'text-white',
  })

  window.setTimeout(() => ctrl.close(), ms)
}

const apiInfo = [
  {
    name: 'v-autofocus',
    description: 'Фокусирует элемент при маунте.',
  },
  {
    name: 'v-autosize',
    description: 'Автоматически подстраивает высоту textarea под контент.',
  },
  {
    name: 'v-click-outside',
    description: 'Вызывает handler при клике вне элемента (поддерживает exclude).',
  },
  {
    name: 'v-hotkey',
    description: 'Глобальные/локальные хоткеи: объект вида { "Ctrl+K": handler, Escape: handler }.',
  },
  {
    name: 'v-loading',
    description: 'Оверлей-лоадер внутри контейнера. Значение — объект параметров состояния/вида (`loading`, `text`, `background`, `animated` и т.д.).',
  },
  {
    name: 'createLoading(options)',
    description: 'TS API для fullscreen-лоадера (возвращает controller с close()).',
  },
] as const

const usageCode = `<script setup lang="ts">
import { ref } from 'vue'
import { createLoading } from '@ds/directives/loading'

const loading = ref(false)
const loadingText = ref('Loading data...')

function showFullscreen() {
  const ctrl = createLoading({ fullscreen: true, text: 'Loading...' })
  window.setTimeout(() => ctrl.close(), 1200)
}
</scr${'ipt'}>

<template>
  <DsInput v-autofocus placeholder="Focused on mount" />

  <textarea v-autosize rows="1" />

  <div v-loading="{ loading, text: loadingText }" class="relative">
    Container
  </div>

  <DsButton size="sm" variant="secondary" type="button" @click="showFullscreen">Fullscreen</DsButton>
</template>
`
</script>

<template>
  <div
    v-hotkey="{
      Escape: () => {
        if (searchOpen) closeSearch()
        if (open) close()
      },
      'Ctrl+K': openSearch,
    }"
  >
    <PlaygroundPage title="Directives" :description="t('playground.directives.lead', 'Examples for all fint-ds directives.')">
      <template #ui>
        <div class="grid gap-4">
          <DsCard class="p-5 grid gap-4">
            <div class="font-800">v-autofocus</div>
            <div class="text-sm ds-muted">
              {{ t('playground.directives.autofocus.desc', 'The field receives focus on mount. Remount to see it again.') }}
            </div>

            <div class="grid gap-3">
              <DsFormField label="Autofocus">
                <DsInput
                  :key="autofocusKey"
                  v-autofocus
                  v-model="autofocusValue"
                  placeholder="I should be focused on mount"
                />
              </DsFormField>

              <div class="flex items-center gap-3">
                <DsButton size="sm" variant="secondary" type="button" @click="autofocusKey++">Remount field</DsButton>
                <span class="text-sm ds-muted">Esc also closes demos below.</span>
              </div>
            </div>
          </DsCard>

          <DsCard class="p-5 grid gap-4">
            <div class="font-800">v-autosize</div>
            <div class="text-sm ds-muted">
              {{ t('playground.directives.autosize.desc', 'Textarea grows/shrinks with content.') }}
            </div>

            <textarea
              v-autosize
              v-model="note"
              rows="1"
              class="w-full rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--ring)]"
              placeholder="Type multiple lines..."
            />
          </DsCard>

          <DsCard class="p-5 grid gap-4">
            <div class="font-800">v-click-outside</div>
            <div class="text-sm ds-muted">
              {{
                t(
                  'playground.directives.clickOutside.desc',
                  'Click outside the popover to close it. The toggle button is excluded.',
                )
              }}
            </div>

            <div class="flex items-start gap-3">
              <DsButton id="toggle-popover" size="sm" variant="secondary" type="button" @click="open = !open">
                Toggle popover
              </DsButton>

              <div class="relative">
                <div
                  v-if="open"
                  v-click-outside="{ handler: close, exclude: ['#toggle-popover'] }"
                  class="absolute top-0 left-0 w-[260px] rounded-[var(--ds-radius-xl)] border border-[var(--border)] bg-[var(--card)] shadow-[var(--ds-shadow-2)] p-3"
                >
                  <div class="text-sm font-700">Popover</div>
                  <div class="text-sm ds-muted mt-1">Click outside (or press Escape) to close.</div>
                  <div class="mt-3">
                    <DsButton size="sm" variant="primary" type="button" @click="close">Close</DsButton>
                  </div>
                </div>
              </div>
            </div>
          </DsCard>

          <DsCard class="p-5 grid gap-4">
            <div class="font-800">v-hotkey</div>
            <div class="text-sm ds-muted">
              {{
                t(
                  'playground.directives.hotkey.desc',
                  'Press Ctrl+K to open the search state. Press Escape to close it (works even when focus is inside inputs).',
                )
              }}
            </div>

            <div class="flex items-center gap-3 flex-wrap">
              <DsBadge :variant="searchOpen ? 'success' : 'neutral'">{{ searchOpen ? 'Search: open' : 'Search: closed' }}</DsBadge>
              <DsButton size="sm" variant="secondary" type="button" @click="openSearch">Open</DsButton>
              <DsButton size="sm" variant="secondary" type="button" @click="closeSearch">Close</DsButton>
            </div>
          </DsCard>

          <DsCard class="p-5 grid gap-4">
            <div class="font-800">v-loading (+ createLoading)</div>
            <div class="text-sm ds-muted">
              {{
                t(
                  'playground.directives.loading.desc',
                  '`v-loading` renders an overlay into the container. `createLoading()` is a TS API for fullscreen use-cases.',
                )
              }}
            </div>

            <div class="flex items-center gap-3 flex-wrap">
              <DsSwitch v-model="loading" size="sm" />
              <span class="text-sm ds-muted">loading</span>

              <DsInput v-model="loadingText" class="w-[260px]" placeholder="Loading text" />

              <DsSwitch v-model="animated" size="sm" />
              <span class="text-sm ds-muted">animated</span>

              <DsButton size="sm" variant="secondary" type="button" @click="showFullscreenFor(1200)">Fullscreen (1.2s)</DsButton>
              <DsButton size="sm" variant="secondary" type="button" @click="showFullscreenRefreshFor(1200)">
                Fullscreen (refresh)
              </DsButton>
            </div>

            <div
              class="relative border border-[var(--border)] rounded-[var(--ds-radius-xl)] bg-[var(--card)] p-6 overflow-hidden"
              v-loading="{ loading, text: loadingText, background: 'rgba(255, 255, 255, 0.8)', animated }"
            >
              <div class="text-sm">
                {{
                  t(
                    'playground.directives.loading.container',
                    'Container content. The loader blocks interaction and sets aria-busy.',
                  )
                }}
              </div>
            </div>
          </DsCard>
        </div>
      </template>

      <template #usage>
        <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
      </template>

      <template #api>
        <PlaygroundProps title="API" :items="apiInfo" />
      </template>
    </PlaygroundPage>
  </div>
</template>
