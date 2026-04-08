<script setup lang="ts">
import { ref } from 'vue'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

const activeNames = ref<(string | number)[]>(['a'])
const activeAccordion = ref<string | number | undefined>('a')

const multipleExampleCode = `<script setup lang="ts">
import { ref } from 'vue'

const active = ref<(string | number)[]>(['a'])
</scr${'ipt'}>

<template>
  <DsCollapse v-model="active">
    <DsCollapseItem name="a" title="Панель A">Контент A</DsCollapseItem>
    <DsCollapseItem name="b" title="Панель B">Контент B</DsCollapseItem>
  </DsCollapse>
</template>
`

const accordionExampleCode = `<script setup lang="ts">
import { ref } from 'vue'

const active = ref<string | number | undefined>('a')
</scr${'ipt'}>

<template>
  <DsCollapse v-model="active" accordion>
    <DsCollapseItem name="a" title="Панель A">Контент A</DsCollapseItem>
    <DsCollapseItem name="b" title="Панель B">Контент B</DsCollapseItem>
  </DsCollapse>
</template>
`

const collapsePropsInfo = [
  {
    name: 'v-model / modelValue',
    type: 'string | number | Array<string | number> | undefined',
    description:
      'В режиме multiple — массив активных панелей. В режиме accordion — одно активное значение (или —).',
  },
  {
    name: 'accordion',
    type: 'boolean',
    default: 'false',
    description: 'Если true, одновременно может быть раскрыта только одна панель.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Отключает весь Collapse (все items).',
  },
  {
    name: 'divided',
    type: 'boolean',
    default: 'true',
    description: 'Если true, рисует разделители между панелями.',
  },
] as const

const collapseSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Набор `DsCollapseItem`.',
  },
] as const

const collapseEventsInfo = [
  {
    name: '@update:modelValue',
    type: '(value: string | number | Array<string | number> | undefined) => void',
    description: 'Эмитится при переключении панелей (контролируемый режим).',
  },
  {
    name: '@change',
    type: '(value: string | number | Array<string | number> | undefined) => void',
    description: 'Алиас-событие, вызывается вместе с update:modelValue.',
  },
] as const

const itemPropsInfo = [
  {
    name: 'name',
    type: 'string | number | undefined',
    description: 'Идентификатор панели. Если не задан — генерируется автоматически.',
  },
  {
    name: 'title',
    type: 'string | undefined',
    description: 'Заголовок панели (если не задан slot #title).',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Отключает конкретную панель.',
  },
] as const

const itemSlotsInfo = [
  {
    name: 'slot (title)',
    type: 'slot',
    description: 'Кастомный заголовок панели (любой markup).',
  },
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Содержимое панели (контент).',
  },
] as const
</script>

<template>
  <PlaygroundPage
    title="DsCollapse"
    description="Поддерживает навигацию стрелками ↑/↓ по заголовкам, Enter/Space — переключение."
  >
    <template #ui>
      <div class="grid gap-4">
        <DsCard class="p-5 grid gap-6">
          <div class="grid gap-3">
            <div class="text-base font-800">Multiple (default)</div>

            <DsCollapse v-model="activeNames">
              <DsCollapseItem name="a" title="Панель A">Контент панели A.</DsCollapseItem>
              <DsCollapseItem name="b" title="Панель B">Контент панели B.</DsCollapseItem>
              <DsCollapseItem name="c" title="Панель C">Контент панели C.</DsCollapseItem>
            </DsCollapse>

            <div class="text-sm ds-muted">active: {{ JSON.stringify(activeNames) }}</div>
          </div>

          <div class="grid gap-3">
            <div class="text-base font-800">Accordion</div>

            <DsCollapse v-model="activeAccordion" accordion>
              <DsCollapseItem name="a" title="Панель A">Контент панели A.</DsCollapseItem>
              <DsCollapseItem name="b" title="Панель B">Контент панели B.</DsCollapseItem>
            </DsCollapse>

            <div class="text-sm ds-muted">active: {{ activeAccordion === undefined ? 'undefined' : String(activeAccordion) }}</div>
          </div>
        </DsCard>

        <DsCard class="p-5 grid gap-4">
          <div class="text-base font-800">Slots / disabled</div>

          <DsCollapse v-model="activeNames">
            <DsCollapseItem name="slot">
              <template #title>
                <span class="inline-flex items-center gap-2">
                  <span class="text-sm font-600">Заголовок через slot</span>
                  <DsBadge variant="outline">new</DsBadge>
                </span>
              </template>
              Можно полностью кастомизировать заголовок через slot `#title`.
            </DsCollapseItem>

            <DsCollapseItem name="disabled" title="Disabled item" disabled>
              Этот контент не откроется, т.к. item disabled.
            </DsCollapseItem>
          </DsCollapse>
        </DsCard>
      </div>
    </template>

    <template #usage>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <div class="text-sm font-700">Multiple (по умолчанию)</div>
          <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ multipleExampleCode }}</code></pre>
        </div>

        <div class="grid gap-2">
          <div class="text-sm font-700">Accordion</div>
          <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ accordionExampleCode }}</code></pre>
        </div>
      </div>
    </template>

    <template #api>
      <PlaygroundProps title="DsCollapse — Props" :items="collapsePropsInfo" />
      <PlaygroundProps title="DsCollapse — Slots" :items="collapseSlotsInfo" />
      <PlaygroundProps title="DsCollapse — Events" :items="collapseEventsInfo" />
      <PlaygroundProps title="DsCollapseItem — Props" :items="itemPropsInfo" />
      <PlaygroundProps title="DsCollapseItem — Slots" :items="itemSlotsInfo" />
    </template>
  </PlaygroundPage>
</template>
