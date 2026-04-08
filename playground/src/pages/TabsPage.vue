<script setup lang="ts">
import { ref } from 'vue'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

const tab = ref('a')
const tabs = [
  { value: 'a', label: 'Tab A' },
  { value: 'b', label: 'Tab B' },
  { value: 'c', label: 'Tab C' },
]

const tabsPropsInfo = [
  {
    name: 'v-model / modelValue',
    type: 'string',
    description: 'Активная вкладка (значение из массива tabs).',
  },
  {
    name: 'tabs',
    type: 'Array<{ value: string; label: string; badge?: string }>',
    description: 'Список вкладок. value используется как ключ/идентификатор. badge — опциональная метка.',
  },
] as const

const tabsEventsInfo = [
  {
    name: '@update:modelValue',
    type: '(value: string) => void',
    description: 'Эмитится при смене активной вкладки (клик/стрелки).',
  },
] as const

const usageCode = `<script setup lang="ts">
import { ref } from 'vue'

const tab = ref('a')
const tabs = [
  { value: 'a', label: 'Tab A' },
  { value: 'b', label: 'Tab B' },
]
</scr${'ipt'}>

<template>
  <DsTabs v-model="tab" :tabs="tabs" />
</template>
`
</script>

<template>
  <PlaygroundPage title="DsTabs">
    <template #ui>
      <DsCard class="p-5 grid gap-4">
        <DsTabs v-model="tab" :tabs="tabs" />
        <div class="text-sm ds-muted">active: {{ tab }}</div>
      </DsCard>
    </template>

    <template #usage>
      <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsTabs — Props" :items="tabsPropsInfo" />
      <PlaygroundProps title="DsTabs — Events" :items="tabsEventsInfo" />
    </template>
  </PlaygroundPage>
</template>
