<script setup lang="ts">
import { ref } from 'vue'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

const disabled = ref(false)

const size = ref<'sm' | 'md' | 'lg'>('md')
const sizeOptions = [
  { value: 'sm', label: 'sm' },
  { value: 'md', label: 'md' },
  { value: 'lg', label: 'lg' },
]

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
]

const vRadiobox = ref('a')
const vButton = ref('b')
const vSlot = ref('a')

const radioGroupPropsInfo = [
  {
    name: 'v-model / modelValue',
    type: 'string',
    description: 'Текущее выбранное значение (строка).',
  },
  {
    name: 'options',
    type: "Array<{ value: string; label: string }> | undefined",
    description: 'options-режим: группа сама рендерит элементы по массиву. Если передан slot — он имеет приоритет.',
  },
  {
    name: 'name',
    type: 'string | undefined',
    description: 'Имя группы (полезно для форм/семантики).',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Отключает выбор внутри группы.',
  },
  {
    name: 'variant',
    type: "'radiobox' | 'button'",
    default: "'radiobox'",
    description: 'radiobox — классический кружок с точкой; button — варианты как кнопки внутри button-group.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Размер для button-варианта (sm/md/lg). В radiobox не используется.',
  },
] as const

const radioGroupSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Slot-режим: вы вручную вставляете `DsRadio` (имеет приоритет над props `options`).',
  },
] as const

const radioGroupEventsInfo = [
  {
    name: '@update:modelValue',
    type: '(value: string) => void',
    description: 'Эмитится при выборе нового значения.',
  },
] as const

const radioPropsInfo = [
  {
    name: 'value',
    type: 'string',
    description: 'Значение конкретного радиоварианта (сравнивается с modelValue группы).',
  },
  {
    name: 'modelValue',
    type: 'string | undefined',
    description: 'Опционально: контролируемый режим для одиночного `DsRadio` без группы.',
  },
  {
    name: 'disabled',
    type: 'boolean | undefined',
    description: 'Отключает конкретный radio. Если не задан — берётся из группы.',
  },
  {
    name: 'name',
    type: 'string | undefined',
    description: 'Имя для native <input type="radio">. Если не задано — берётся из группы.',
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
  {
    name: 'variant',
    type: "'radiobox' | 'button'",
    default: "'radiobox'",
    description: 'Вариант отображения конкретного `DsRadio`.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg' | undefined",
    description: 'Размер для button-варианта. Если не задан — берётся из группы.',
  },
  {
    name: 'buttonVariant',
    type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'",
    default: "'outline'",
    description: 'Variant кнопки для невыбранного состояния (когда variant="button").',
  },
  {
    name: 'selectedButtonVariant',
    type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'",
    default: "'primary'",
    description: 'Variant кнопки для выбранного состояния (когда variant="button").',
  },
  {
    name: 'ariaLabel',
    type: 'string | undefined',
    description: 'aria-label для доступности (если нет видимого текста/лейбла).',
  },
] as const

const radioSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Контент радиокнопки/кнопки (лейбл).',
  },
] as const

const radioEventsInfo = [
  {
    name: '@update:modelValue',
    type: '(value: string) => void',
    description: 'Эмитится в контролируемом режиме (если передан prop modelValue у `DsRadio`).',
  },
] as const

const usageCode = `<script setup lang="ts">
import { ref } from 'vue'

const value = ref('a')
const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
]
</scr${'ipt'}>

<template>
  <DsRadioGroup v-model="value" :options="options" />

  <DsRadioGroup v-model="value" variant="button">
    <DsRadio variant="button" value="a">A</DsRadio>
    <DsRadio variant="button" value="b">B</DsRadio>
  </DsRadioGroup>
</template>
`
</script>

<template>
  <PlaygroundPage title="DsRadio / DsRadioGroup" description="Варианты: radiobox и button. Режимы: options и slot.">
    <template #ui>
      <DsCard class="p-5 grid gap-6">
        <div class="grid gap-3">
          <div class="text-sm font-600">Controls</div>
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex items-center gap-3">
              <DsSwitch v-model="disabled" size="sm" />
              <span class="text-sm ds-muted">disabled</span>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-sm ds-muted">size:</span>
              <DsSelect v-model="size" view="link" :options="sizeOptions" aria-label="Size" />
            </div>
          </div>
        </div>

        <div class="grid gap-3">
          <div class="text-sm font-600">Radiobox (options)</div>
          <DsRadioGroup v-model="vRadiobox" :options="options" :disabled="disabled" />
          <div class="text-sm ds-muted">value: {{ vRadiobox }}</div>
        </div>

        <div class="grid gap-3">
          <div class="text-sm font-600">Button (options)</div>
          <DsRadioGroup v-model="vButton" variant="button" :size="size" :options="options" :disabled="disabled" />
          <div class="text-sm ds-muted">value: {{ vButton }}</div>
        </div>

        <div class="grid gap-3">
          <div class="text-sm font-600">Button (slot)</div>
          <DsRadioGroup v-model="vSlot" variant="button" name="radio-slot" :size="size" :disabled="disabled">
            <DsRadio variant="button" value="a">A</DsRadio>
            <DsRadio variant="button" value="b">B</DsRadio>
            <DsRadio variant="button" value="c" :disabled="true">C (disabled)</DsRadio>
          </DsRadioGroup>
          <div class="text-sm ds-muted">value: {{ vSlot }}</div>
        </div>
      </DsCard>
    </template>

    <template #usage>
      <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsRadioGroup — Props" :items="radioGroupPropsInfo" />
      <PlaygroundProps title="DsRadioGroup — Slots" :items="radioGroupSlotsInfo" />
      <PlaygroundProps title="DsRadioGroup — Events" :items="radioGroupEventsInfo" />
      <PlaygroundProps title="DsRadio — Props" :items="radioPropsInfo" />
      <PlaygroundProps title="DsRadio — Slots" :items="radioSlotsInfo" />
      <PlaygroundProps title="DsRadio — Events" :items="radioEventsInfo" />
    </template>
  </PlaygroundPage>
</template>
