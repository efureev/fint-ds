<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

import { useFintI18n } from '@feugene/fint-i18n'
import type { DsTreeFilterNodeMethod, DsTreeKey, DsTreeNode } from '@ds/components/tree/dsTreeTypes'
import type { DsTreeSelectModelValue } from '@ds/components/dsTreeSelectTypes'

type Item = {
  id: number
  label: string
  archived?: boolean
  children?: Item[]
}

const { t } = useFintI18n()

const data = ref<Item[]>([
  {
    id: 1,
    label: 'Assets',
    children: [
      { id: 11, label: 'Cash' },
      {
        id: 12,
        label: 'Bank accounts',
        children: [
          { id: 121, label: 'Main account' },
          { id: 122, label: 'Savings' },
        ],
      },
      { id: 13, label: 'Investments' },
    ],
  },
  {
    id: 2,
    label: 'Expenses',
    children: [
      { id: 21, label: 'Food' },
      { id: 22, label: 'Transport' },
      { id: 23, label: 'Subscriptions', archived: true },
      { id: 24, label: 'Health' },
    ],
  },
  {
    id: 3,
    label: 'Income',
    children: [
      { id: 31, label: 'Salary' },
      { id: 32, label: 'Investments' },
    ],
  },
])

const multiple = ref(false)
const clearable = ref(true)
const filterable = ref(true)
const disabled = ref(false)
const invalid = ref(false)
const size = ref<'xs' | 'sm' | 'md' | 'lg'>('md')
const state = ref<'default' | 'success' | 'warning' | 'danger'>('default')
const closeOnSelect = ref(true)
const dropdownMaxHeight = ref('320')

const valueDisplay = ref<'label' | 'path'>('label')

const modelValue = ref<DsTreeSelectModelValue>(null)
const modelValuePath = ref<DsTreeSelectModelValue>(122)

watch(
  multiple,
  (isMultiple) => {
    const v = modelValue.value
    if (isMultiple) {
      if (!Array.isArray(v))
        modelValue.value = v == null ? [] : [v]
      return
    }

    if (Array.isArray(v))
      modelValue.value = v[0] ?? null
  },
  { immediate: true },
)

const dropdownMaxHeightNumber = computed(() => {
  const v = Number(dropdownMaxHeight.value)
  if (!Number.isFinite(v))
    return 320
  return Math.max(160, Math.min(640, Math.round(v)))
})

const lastAction = ref<string>('—')

function onVisibleChange(visible: boolean) {
  lastAction.value = `visibleChange: ${visible}`
}

function onClear() {
  lastAction.value = 'clear'
}

function onChange(value: DsTreeSelectModelValue) {
  lastAction.value = `change: ${Array.isArray(value) ? `[${value.map(String).join(', ')}]` : String(value)}`
}

function onNodeClick(_: Item, node: DsTreeNode<Item>) {
  lastAction.value = `nodeClick: ${String(node.key)} (${node.label})`
}

const filterNodeMethod = computed<DsTreeFilterNodeMethod<Item> | undefined>(() => {
  if (!filterable.value)
    return undefined

  const fn: DsTreeFilterNodeMethod<Item> = (value, row) => {
    const q = value.trim().toLowerCase()
    if (!q)
      return true

    // Demo: allow searching by `#id` as well.
    if (q.startsWith('#'))
      return String(row.id).includes(q.slice(1))

    return row.label.toLowerCase().includes(q)
  }

  return fn
})

const sizeOptions = [
  { value: 'xs', label: 'xs' },
  { value: 'sm', label: 'sm' },
  { value: 'md', label: 'md' },
  { value: 'lg', label: 'lg' },
] as const

const stateOptions = [
  { value: 'default', label: 'default' },
  { value: 'success', label: 'success' },
  { value: 'warning', label: 'warning' },
  { value: 'danger', label: 'danger' },
] as const

const valueDisplayOptions = computed(() => {
  return [
    { value: 'label', label: t('playground.treeSelect.controls.valueDisplayLabel', 'Label') },
    { value: 'path', label: t('playground.treeSelect.controls.valueDisplayPath', 'Path (root → node)') },
  ] as const
})

function reset() {
  modelValue.value = multiple.value ? [] : null
  modelValuePath.value = 122
  lastAction.value = 'reset'
}

const dsTreeSelectPropsInfo = [
  { name: 'v-model', type: 'DsTreeSelectModelValue', description: 'Значение: `key | null` или `key[]` (в `multiple`).' },
  { name: 'data', type: 'T[]', description: 'Массив корневых узлов.' },
  { name: 'nodeKey', type: 'keyof T', default: 'id', description: 'Поле уникального ключа.' },
  { name: 'props', type: '{ children?: string; label?: string }', description: 'Маппинг полей данных.' },
  { name: 'defaultExpandedKeys', type: 'DsTreeKey[]', default: '[]', description: 'Ключи раскрытых веток при старте.' },
  { name: 'placeholder', type: 'string', description: 'Плейсхолдер для инпута.' },
  { name: 'size', type: 'xs | sm | md | lg', default: 'md', description: 'Размер инпута.' },
  { name: 'state', type: 'default | success | warning | danger', default: 'default', description: 'Семантическое состояние инпута.' },
  { name: 'invalid', type: 'boolean', default: 'false', description: 'Форсирует `danger` для бордера/ринга.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Отключает интерактивность.' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Мультивыбор (toggle по клику на узел).' },
  { name: 'clearable', type: 'boolean', default: 'false', description: 'Кнопка очистки (если есть выбранное значение).' },
  { name: 'valueDisplay', type: 'label | path', default: 'label', description: 'Single only: показывать `label` или полный путь `root / … / node`.' },
  { name: 'filterable', type: 'boolean', default: 'false', description: 'Поле поиска внутри выпадающей панели.' },
  { name: 'filterNodeMethod', type: '(value, data, node?) => boolean', description: 'Кастомная логика фильтрации.' },
  { name: 'closeOnSelect', type: 'boolean', default: '(!multiple)', description: 'Закрывать дропдаун после выбора.' },
  { name: 'dropdownMaxHeight', type: 'number', default: '320', description: 'Максимальная высота панели со скроллом.' },
] as const

const dsTreeSelectEventsInfo = [
  { name: '@change', type: '(value) => void', description: 'Срабатывает при изменении значения (вместе с `update:modelValue`).' },
  { name: '@visible-change', type: '(visible) => void', description: 'Открытие/закрытие панели.' },
  { name: '@clear', type: '() => void', description: 'Пользователь нажал очистку.' },
  { name: '@node-click', type: '(data, node) => void', description: 'Клик по узлу дерева.' },
] as const

const usageCode = computed(() => {
  return `<script setup lang="ts">
import { ref } from 'vue'
import type { DsTreeSelectModelValue } from '@feugene/fint-ds'

type Item = { id: number; label: string; children?: Item[] }

const value = ref<DsTreeSelectModelValue>(null)
const data: Item[] = [
  { id: 1, label: 'Assets', children: [{ id: 11, label: 'Cash' }] },
]
<\/scr${'ipt'}>

<template>
  <DsTreeSelect
    v-model="value"
    :data="data"
    node-key="id"
    value-display="path"
    clearable
    filterable
    placeholder="Select…"
  />
</template>`
})

const selectedLabelsHint = computed(() => {
  const v = modelValue.value
  if (Array.isArray(v)) {
    if (v.length === 0)
      return '—'
    return v.map(String).join(', ')
  }
  return v == null ? '—' : String(v)
})

function isArchivedKey(key: DsTreeKey): boolean {
  // demo only: our keys are numeric IDs
  const id = typeof key === 'number' ? key : Number(key)
  return id === 23
}
</script>

<template>
  <PlaygroundPage
    :title="t('playground.treeSelect.title', 'TreeSelect')"
    :description="t('playground.treeSelect.lead', 'Tree dropdown that opens from an input. Supports filterable / multiple / clearable.')"
  >
    <template #ui>
      <div class="grid gap-4">
        <DsCard class="p-5 grid gap-2">
          <div class="text-sm font-800">
            {{ t('playground.treeSelect.notes.title', 'Notes') }}
          </div>
          <div class="text-sm ds-muted grid gap-2 max-w-[980px]">
            <div>
              {{ t('playground.treeSelect.notes.select', 'Some demo controls use DsSelect. DsSelect is intentionally built on a native \u003Cselect\u003E (accessibility + simplicity) and only adds DS styling/props.') }}
            </div>
            <div>
              {{ t('playground.treeSelect.notes.treeSelect', 'DsTreeSelect itself is not a native select: it needs a popover with a tree, filtering, multi-select, slots and keyboard/outside-click handling — these features are not available in native \u003Cselect\u003E.') }}
            </div>
          </div>
        </DsCard>

        <DsCard class="p-5 grid gap-4">
          <div class="flex items-center justify-between gap-3 flex-wrap">
            <div class="text-sm font-800">{{ t('playground.treeSelect.demo.title', 'Demo / controls') }}</div>
            <div class="text-xs ds-muted">{{ t('playground.treeSelect.lastAction', 'Last action') }}: {{ lastAction }}</div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4">
            <div class="grid gap-3">
              <div class="grid grid-cols-2 gap-3">
                <DsFormField :label="t('playground.treeSelect.controls.size', 'Size')">
                  <DsSelect v-model="size" :options="sizeOptions as any" aria-label="Size" />
                </DsFormField>
                <DsFormField :label="t('playground.treeSelect.controls.state', 'State')">
                  <DsSelect v-model="state" :options="stateOptions as any" aria-label="State" />
                </DsFormField>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <DsFormField :label="t('playground.treeSelect.controls.dropdownMaxHeight', 'Dropdown max height')">
                  <DsInput v-model="dropdownMaxHeight" type="number" inputmode="numeric" />
                </DsFormField>
                <DsFormField :label="t('playground.treeSelect.controls.modelValue', 'Selected')">
                  <DsInput :model-value="selectedLabelsHint" disabled />
                </DsFormField>
              </div>

              <DsFormField :label="t('playground.treeSelect.controls.valueDisplay', 'Value display')">
                <DsSelect
                  v-model="valueDisplay"
                  :options="valueDisplayOptions as any"
                  :disabled="multiple"
                  aria-label="Value display"
                />
              </DsFormField>

              <div class="grid grid-cols-2 gap-3">
                <DsSwitch v-model="multiple">{{ t('playground.treeSelect.controls.multiple', 'Multiple') }}</DsSwitch>
                <DsSwitch v-model="clearable">{{ t('playground.treeSelect.controls.clearable', 'Clearable') }}</DsSwitch>
                <DsSwitch v-model="filterable">{{ t('playground.treeSelect.controls.filterable', 'Filterable') }}</DsSwitch>
                <DsSwitch v-model="closeOnSelect">{{ t('playground.treeSelect.controls.closeOnSelect', 'Close on select') }}</DsSwitch>
                <DsSwitch v-model="disabled">{{ t('playground.treeSelect.controls.disabled', 'Disabled') }}</DsSwitch>
                <DsSwitch v-model="invalid">{{ t('playground.treeSelect.controls.invalid', 'Invalid') }}</DsSwitch>
              </div>

              <div class="flex gap-3">
                <DsButton variant="outline" @click="reset">
                  {{ t('playground.treeSelect.controls.reset', 'Reset') }}
                </DsButton>
              </div>
            </div>

            <div class="grid gap-4">
              <div class="grid gap-2">
                <div class="text-xs ds-muted">{{ t('playground.treeSelect.examples.basic', 'Basic') }}</div>
                <DsTreeSelect
                  v-model="modelValue"
                  :data="data"
                  node-key="id"
                  :multiple="multiple"
                  :clearable="clearable"
                  :value-display="valueDisplay"
                  :filterable="filterable"
                  :disabled="disabled"
                  :invalid="invalid"
                  :state="state"
                  :size="size"
                  :close-on-select="closeOnSelect"
                  :dropdown-max-height="dropdownMaxHeightNumber"
                  :filter-node-method="filterNodeMethod"
                  placeholder="Select category…"
                  @visible-change="onVisibleChange"
                  @clear="onClear"
                  @change="onChange"
                  @node-click="onNodeClick"
                />
              </div>

              <div class="grid gap-2">
                <div class="text-xs ds-muted">
                  {{ t('playground.treeSelect.examples.path', 'Path mode (single)') }}
                </div>
                <DsTreeSelect
                  v-model="modelValuePath"
                  :data="data"
                  node-key="id"
                  clearable
                  filterable
                  value-display="path"
                  :dropdown-max-height="280"
                  :filter-node-method="filterNodeMethod"
                  placeholder="Select category…"
                />
              </div>

              <div class="grid gap-2">
                <div class="text-xs ds-muted">{{ t('playground.treeSelect.examples.valueSlot', 'Value slot + custom node') }}</div>
                <DsTreeSelect
                  v-model="modelValue"
                  :data="data"
                  node-key="id"
                  :multiple="multiple"
                  clearable
                  filterable
                  :dropdown-max-height="280"
                  :filter-node-method="filterNodeMethod"
                >
                  <template #value="{ labels }">
                    <div class="truncate text-[13px]">
                      <span class="ds-muted">{{ t('playground.treeSelect.selectedPrefix', 'Selected') }}:</span>
                      <span class="ml-1">{{ labels.length ? labels.join(', ') : '—' }}</span>
                    </div>
                  </template>

                  <template #node="{ node, data: row, selected }">
                    <div class="flex items-center gap-2 min-w-0">
                      <span
                        class="h-4 w-4 shrink-0"
                        :class="selected ? 'i-lucide-check text-[var(--primary)]' : ''"
                        aria-hidden="true"
                      />
                      <span class="truncate">{{ node.label }}</span>
                      <DsBadge v-if="row.archived || isArchivedKey(node.key)" size="sm" variant="info">Archived</DsBadge>
                      <span class="ml-auto shrink-0 font-mono text-[11px] ds-muted">#{{ row.id }}</span>
                    </div>
                  </template>
                </DsTreeSelect>
              </div>
            </div>
          </div>
        </DsCard>
      </div>
    </template>

    <template #usage>
      <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsTreeSelect — Props" :items="dsTreeSelectPropsInfo as any" />
      <PlaygroundProps title="DsTreeSelect — Events" :items="dsTreeSelectEventsInfo as any" />
    </template>
  </PlaygroundPage>
</template>
