<script setup lang="ts">
import { ref } from 'vue'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

const basic = ref(false)
const withLabel = ref(true)
const disabled = ref(false)
const size = ref<'sm' | 'md' | 'lg'>('md')
const activeBackgroundColor = ref('#22c55e')
const inactiveBackgroundColor = ref('#e5e7eb')

const switchPropsInfo = [
  {
    name: 'v-model / modelValue',
    type: 'boolean',
    default: 'false',
    description: 'Текущее состояние переключателя. При клике эмитит update:modelValue с новым значением.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Блокирует переключение и добавляет disabled-состояние.',
  },
  {
    name: 'ariaLabel',
    type: 'string | undefined',
    description: 'Текст для aria-label, если у переключателя нет видимой подписи.',
  },
  {
    name: 'size',
    type: '\'sm\' | \'md\' | \'lg\'',
    default: '\'md\'',
    description: 'Размер трека и бегунка переключателя.',
  },
  {
    name: 'activeBackgroundColor',
    type: 'string | undefined',
    description: 'Переопределяет цвет фона активного состояния. Если не задан, используется текущий `var(--primary)`.',
  },
  {
    name: 'inactiveBackgroundColor',
    type: 'string | undefined',
    description: 'Переопределяет цвет фона неактивного состояния. Если не задан, используется текущий `var(--muted)`.',
  },
] as const

const switchSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Подпись справа от переключателя.',
  },
] as const

const switchEventsInfo = [
  {
    name: '@update:modelValue',
    type: '(value: boolean) => void',
    description: 'Эмитится при переключении состояния.',
  },
] as const

const sizeOptions = [
  { label: 'sm', value: 'sm' },
  { label: 'md', value: 'md' },
  { label: 'lg', value: 'lg' },
] as const

const usageCode = `<script setup lang="ts">
import { ref } from 'vue'

const enabled = ref(true)
</scr${'ipt'}>

<template>
  <DsSwitch
    v-model="enabled"
    active-background-color="#22c55e"
    inactive-background-color="#e5e7eb"
  >
    Notifications
  </DsSwitch>
</template>
`
</script>

<template>
  <PlaygroundPage title="DsSwitch"
                  description="Переключатель для булевых состояний с поддержкой размеров и disabled-состояния.">
    <template #ui>

      <DsCard class="p-5 grid gap-4">
        <div class="flex flex-wrap items-center gap-5">
          <DsSwitch v-model="basic" :size="size" aria-label="Basic switch" />
          <DsSwitch v-model="withLabel" :size="size" :disabled="disabled">Email notifications</DsSwitch>
          <DsSwitch :model-value="true" :size="size" disabled>Always on</DsSwitch>
          <DsSwitch
            v-model="basic"
            :size="size"
            :active-background-color="activeBackgroundColor"
            :inactive-background-color="inactiveBackgroundColor"
          >
            Custom colors
          </DsSwitch>
        </div>

        <div class="grid gap-3 md:grid-cols-[220px_1fr] md:items-center">
          <span class="text-sm ds-muted">size</span>
          <DsSelect v-model="size" :options="sizeOptions" />

          <span class="text-sm ds-muted">disabled labeled switch</span>
          <div class="flex items-center gap-3">
            <DsSwitch v-model="disabled" size="sm" />
            <span class="text-sm ds-muted">{{ disabled ? 'on' : 'off' }}</span>
          </div>

          <span class="text-sm ds-muted">activeBackgroundColor</span>
          <DsInput v-model="activeBackgroundColor" placeholder="#22c55e / var(--primary)" />

          <span class="text-sm ds-muted">inactiveBackgroundColor</span>
          <DsInput v-model="inactiveBackgroundColor" placeholder="#e5e7eb / var(--muted)" />
        </div>

        <div class="text-sm ds-muted">model: {{ { basic, withLabel, disabled, size, activeBackgroundColor, inactiveBackgroundColor } }}</div>
      </DsCard>
    </template>

    <template #usage>
      <pre
          class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code
          class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsSwitch — Props" :items="switchPropsInfo" />
      <PlaygroundProps title="DsSwitch — Slots" :items="switchSlotsInfo" />
      <PlaygroundProps title="DsSwitch — Events" :items="switchEventsInfo" />
    </template>
  </PlaygroundPage>
</template>