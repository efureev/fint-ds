<script setup lang="ts">
import { ref } from 'vue'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

const v1 = ref(false)
const v2 = ref(true)
const v3 = ref(true)
const disabled = ref(false)

const checkboxPropsInfo = [
  {
    name: 'v-model / modelValue',
    type: 'boolean',
    default: 'false',
    description: 'Булево значение чекбокса. При клике эмитит update:modelValue с новым значением.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Отключает переключение и добавляет визуальное состояние disabled.',
  },
  {
    name: 'name',
    type: 'string | undefined',
    description: 'Атрибут name для участия в отправке формы (native checkbox).',
  },
  {
    name: 'value',
    type: 'string',
    default: "'on'",
    description: 'Атрибут value для отправки формы (native checkbox).',
  },
  {
    name: 'required',
    type: 'boolean',
    default: 'false',
    description: 'Атрибут required (валидность формы).',
  },
  {
    name: 'form',
    type: 'string | undefined',
    description: 'Атрибут form (id формы), если контрол находится вне <form>.',
  },
] as const

const checkboxSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Контент-лейбл чекбокса (текст/любая разметка).',
  },
] as const

const checkboxEventsInfo = [
  {
    name: '@update:modelValue',
    type: '(value: boolean) => void',
    description: 'Эмитится при переключении чекбокса.',
  },
] as const

const usageCode = `<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</scr${'ipt'}>

<template>
  <DsCheckbox v-model="checked">Label</DsCheckbox>
</template>
`
</script>

<template>
  <PlaygroundPage title="DsCheckbox" description="Проверка отображения (должен быть один квадрат, без дублирования).">
    <template #ui>
      <DsCard class="p-5 grid gap-4">
        <div class="flex gap-6 flex-wrap items-center">
          <DsCheckbox v-model="v1" :disabled="disabled">Unchecked</DsCheckbox>
          <DsCheckbox v-model="v2" :disabled="disabled">Checked</DsCheckbox>
          <DsCheckbox v-model="v3" disabled>Disabled checked</DsCheckbox>
        </div>

        <div class="flex items-center gap-3">
          <DsSwitch v-model="disabled" size="sm" />
          <span class="text-sm ds-muted">disabled</span>
        </div>

        <div class="text-sm ds-muted">model: {{ { v1, v2, v3 } }}</div>
      </DsCard>
    </template>

    <template #usage>
      <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsCheckbox — Props" :items="checkboxPropsInfo" />
      <PlaygroundProps title="DsCheckbox — Slots" :items="checkboxSlotsInfo" />
      <PlaygroundProps title="DsCheckbox — Events" :items="checkboxEventsInfo" />
    </template>
  </PlaygroundPage>
</template>
