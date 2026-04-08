<script setup lang="ts">
import { computed, ref } from 'vue'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

import { useFintI18n } from '@feugene/fint-i18n'

const { t } = useFintI18n()

const tags = ref<string[]>(['Vue', 'TypeScript'])
const tags2 = ref<string[]>([])
const disabled = ref(false)

const maxModel = ref<string>('5')
const max = computed<number | undefined>(() => {
  if (maxModel.value === '') return undefined
  const n = Number(maxModel.value)
  return Number.isFinite(n) ? n : undefined
})

const modelText = computed(() => JSON.stringify(tags.value))

const propsInfo = [
  {
    name: 'v-model / modelValue',
    type: 'string[]',
    description: 'Список тегов (двусторонняя связь).',
  },
  {
    name: 'placeholder',
    type: 'string | undefined',
    description: 'Плейсхолдер (показывается, когда нет тегов).',
  },
  {
    name: 'separators',
    type: 'string[]',
    default: "[',']",
    description: 'Клавиши/символы, которые подтверждают ввод тега (Enter поддерживается всегда).',
  },
  {
    name: 'max',
    type: 'number | undefined',
    description: 'Максимум тегов. При достижении новые игнорируются.',
  },
  {
    name: 'allowDuplicates',
    type: 'boolean',
    default: 'false',
    description: 'Разрешить дубликаты (по умолчанию дубликаты игнорируются).',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Отключает ввод и удаление.',
  },
  {
    name: 'readonly',
    type: 'boolean',
    default: 'false',
    description: 'Запрещает изменения (ввод/удаление).',
  },
  {
    name: 'invalid',
    type: 'boolean',
    default: 'false',
    description: 'Форсирует состояние ошибки (aria-invalid + danger border).',
  },
  {
    name: 'state',
    type: "'default' | 'success' | 'warning' | 'danger'",
    default: "'default'",
    description: 'Семантическое состояние (цвет рамки/фокуса), если invalid=false.',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Размер.',
  },
  {
    name: 'tagVariant / tagDark / tagSize / tagRadius',
    type: 'see DsBadge',
    description: 'Настройки визуала тегов (использует DsBadge).',
  },
] as const

const eventsInfo = [
  {
    name: '@update:modelValue',
    type: '(value: string[]) => void',
    description: 'Эмитится при добавлении/удалении тегов.',
  },
  {
    name: '@add',
    type: '(tag: string) => void',
    description: 'Эмитится при успешном добавлении тега.',
  },
  {
    name: '@remove',
    type: '(tag: string, index: number) => void',
    description: 'Эмитится при удалении тега.',
  },
] as const

const slotsInfo = [
  {
    name: 'tag',
    type: 'slot',
    description: 'Кастомный рендер тега. Slot props: { tag, index, remove }.',
  },
] as const

const usageCode = `<script setup lang="ts">
import { ref } from 'vue'

const tags = ref<string[]>(['Vue', 'TypeScript'])
</scr${'ipt'}>

<template>
  <DsInputTag
    v-model="tags"
    placeholder="Add tag…"
    :separators="[',', ';']"
    :max="10"
  />
</template>
`
</script>

<template>
  <PlaygroundPage
    :title="t('playground.inputTag.title', 'InputTag')"
    :description="t('playground.inputTag.lead', 'Tag input based on DsBadge.')"
  >
    <template #ui>
      <DsCard class="p-5 grid gap-6">
        <div class="grid gap-2">
          <div class="text-sm font-600">Basic</div>
          <DsInputTag
            v-model="tags"
            placeholder="Add tag…"
            :separators="[',', ';']"
            :max="max"
            :disabled="disabled"
          />
          <div class="text-[12px] ds-muted">modelValue: {{ modelText }}</div>
        </div>

        <div class="grid gap-2">
          <div class="text-sm font-600">Custom tags</div>
          <DsInputTag v-model="tags2" placeholder="Try slot…" tag-variant="info" tag-dark :separators="[',']">
            <template #tag="{ tag }">
              <span class="font-700">#{{ tag }}</span>
            </template>
          </DsInputTag>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <label class="flex items-center gap-2 text-sm">
            <DsSwitch v-model="disabled" size="sm" />
            <span class="ds-muted">disabled</span>
          </label>

          <label class="flex items-center gap-2 text-sm">
            <span class="ds-muted">max</span>
            <DsSelect
              v-model="maxModel"
              size="sm"
              :options="[
                { label: '—', value: '' },
                { label: '3', value: '3' },
                { label: '5', value: '5' },
                { label: '10', value: '10' },
              ]"
            />
          </label>

          <DsButton size="sm" variant="outline" @click="tags = []">Clear</DsButton>
        </div>
      </DsCard>
    </template>

    <template #usage>
      <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsInputTag — Props" :items="propsInfo" />
      <PlaygroundProps title="DsInputTag — Events" :items="eventsInfo" />
      <PlaygroundProps title="DsInputTag — Slots" :items="slotsInfo" />
    </template>
  </PlaygroundPage>
</template>
