<script setup lang="ts">
import { computed, ref } from 'vue'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

import { useFintI18n } from '@feugene/fint-i18n'
import type {
  DsTreeAllowDropType,
  DsTreeBranchLineColor,
  DsTreeInstance,
  DsTreeNode,
  DsTreeNodeDropType,
} from '@ds/components/tree/dsTreeTypes'

type Item = {
  id: number
  label: string
  archived?: boolean
  children?: Item[]
}

type MethodsCurrentNodeSnapshot = {
  key: string | number
  label: string
  level: number
  parentKey?: string | number
  parentLabel?: string
  childCount: number
  data: Item
}

const { t } = useFintI18n()

function createTreeData(): Item[] {
  return [
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
      ],
    },
    {
      id: 2,
      label: 'Expenses',
      children: [
        { id: 21, label: 'Food' },
        { id: 22, label: 'Transport' },
        { id: 23, label: 'Subscriptions', archived: true },
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
  ]
}

const data = ref<Item[]>(createTreeData())
const methodsData = ref<Item[]>(createTreeData())

const propsMap = {
  children: 'children',
} as const

const lastAction = ref<string>('—')
const methodsAction = ref<string>('—')
const methodsCurrentNode = ref<MethodsCurrentNodeSnapshot>()

const expandedBasic = ref<(string | number)[]>([1, 2])
const expandedIcons = ref<(string | number)[]>([1])
const expandedFormatted = ref<(string | number)[]>([1, 2])
const expandedMethods = ref<(string | number)[]>([1, 2])
const expandedBranchLineDefault = ref<(string | number)[]>([1, 2])
const expandedBranchLineCustom = ref<(string | number)[]>([1, 2, 12])
const expandedDndDefault = ref<(string | number)[]>([1, 2])
const expandedDndCustom = ref<(string | number)[]>([1, 2])

const treeRef = ref<DsTreeInstance<Item>>()
const methodsTreeRef = ref<DsTreeInstance<Item>>()
const nextMethodsId = ref(1000)

const methodsCurrentNodeJson = computed(() => {
  return methodsCurrentNode.value
    ? JSON.stringify(methodsCurrentNode.value.data, null, 2)
    : 'null'
})

function addExpandedKey(model: typeof expandedBasic, key: string | number) {
  if (model.value.includes(key))
    return
  model.value = [...model.value, key]
}

function removeExpandedKey(model: typeof expandedBasic, key: string | number) {
  model.value = model.value.filter(k => k !== key)
}

function onNodeExpand(model: typeof expandedBasic, _: Item, node: DsTreeNode<Item>) {
  addExpandedKey(model, node.key)
}

function onNodeCollapse(model: typeof expandedBasic, _: Item, node: DsTreeNode<Item>) {
  removeExpandedKey(model, node.key)
}

function onBasicExpand(data: Item, node: DsTreeNode<Item>) {
  onNodeExpand(expandedBasic, data, node)
}

function onBasicCollapse(data: Item, node: DsTreeNode<Item>) {
  onNodeCollapse(expandedBasic, data, node)
}

function onIconsExpand(data: Item, node: DsTreeNode<Item>) {
  onNodeExpand(expandedIcons, data, node)
}

function onIconsCollapse(data: Item, node: DsTreeNode<Item>) {
  onNodeCollapse(expandedIcons, data, node)
}

function onFormattedExpand(data: Item, node: DsTreeNode<Item>) {
  onNodeExpand(expandedFormatted, data, node)
}

function onFormattedCollapse(data: Item, node: DsTreeNode<Item>) {
  onNodeCollapse(expandedFormatted, data, node)
}

function onMethodsExpand(data: Item, node: DsTreeNode<Item>) {
  onNodeExpand(expandedMethods, data, node)
}

function onMethodsCollapse(data: Item, node: DsTreeNode<Item>) {
  onNodeCollapse(expandedMethods, data, node)
}

function onBranchLineDefaultExpand(data: Item, node: DsTreeNode<Item>) {
  onNodeExpand(expandedBranchLineDefault, data, node)
}

function onBranchLineDefaultCollapse(data: Item, node: DsTreeNode<Item>) {
  onNodeCollapse(expandedBranchLineDefault, data, node)
}

function onBranchLineCustomExpand(data: Item, node: DsTreeNode<Item>) {
  onNodeExpand(expandedBranchLineCustom, data, node)
}

function onBranchLineCustomCollapse(data: Item, node: DsTreeNode<Item>) {
  onNodeCollapse(expandedBranchLineCustom, data, node)
}

function onDndDefaultExpand(data: Item, node: DsTreeNode<Item>) {
  onNodeExpand(expandedDndDefault, data, node)
}

function onDndDefaultCollapse(data: Item, node: DsTreeNode<Item>) {
  onNodeCollapse(expandedDndDefault, data, node)
}

function onDndCustomExpand(data: Item, node: DsTreeNode<Item>) {
  onNodeExpand(expandedDndCustom, data, node)
}

function onDndCustomCollapse(data: Item, node: DsTreeNode<Item>) {
  onNodeCollapse(expandedDndCustom, data, node)
}

function allowDrag(node: DsTreeNode<Item>) {
  return !node.data.archived
}

function allowDrop(draggingNode: DsTreeNode<Item>, dropNode: DsTreeNode<Item>, type: DsTreeAllowDropType) {
  if (draggingNode.key === dropNode.key)
    return false

  // Archived nodes are demo-only and can't accept children.
  if (type === 'inner' && dropNode.data.archived)
    return false

  return true
}

function onDrop(draggingNode: DsTreeNode<Item>, dropNode: DsTreeNode<Item>, dropType: DsTreeNodeDropType) {
  lastAction.value = `drop: ${String(draggingNode.key)} -> ${String(dropNode.key)} (${dropType})`
}

function createMethodsNode(kind: 'child' | 'before' | 'after', referenceNode: DsTreeNode<Item>): Item {
  const id = nextMethodsId.value
  nextMethodsId.value += 1

  const suffix = String(id).slice(-2)
  const label = kind === 'child'
    ? `${referenceNode.label} / child ${suffix}`
    : kind === 'before'
      ? `Before ${referenceNode.label} ${suffix}`
      : `After ${referenceNode.label} ${suffix}`

  return { id, label }
}

function createMethodsNodeSnapshot(node?: DsTreeNode<Item>): MethodsCurrentNodeSnapshot | undefined {
  if (!node)
    return undefined

  return {
    key: node.key,
    label: node.label,
    level: node.level,
    parentKey: node.parent?.key,
    parentLabel: node.parent?.label,
    childCount: node.childNodes.length,
    data: node.data,
  }
}

function syncMethodsCurrentNodePanel(action?: string) {
  methodsCurrentNode.value = createMethodsNodeSnapshot(methodsTreeRef.value?.getCurrentNode())

  if (action)
    methodsAction.value = action
}

function resolveMethodsNode(node: DsTreeNode<Item>) {
  return methodsTreeRef.value?.getNode(node.key) ?? node
}

function appendMethodsChild(node: DsTreeNode<Item>) {
  const target = resolveMethodsNode(node)
  const appended = methodsTreeRef.value?.appendNode(createMethodsNode('child', target), target)

  if (!appended) {
    syncMethodsCurrentNodePanel(`appendNode(${String(target.key)}) -> failed`)
    return
  }

  addExpandedKey(expandedMethods, target.key)
  methodsTreeRef.value?.setCurrentNode(appended)
  syncMethodsCurrentNodePanel(`appendNode(${String(target.key)}) -> ${appended.label} (#${String(appended.key)})`)
}

function insertMethodsNodeBefore(node: DsTreeNode<Item>) {
  const target = resolveMethodsNode(node)
  const inserted = methodsTreeRef.value?.insertNodeBefore(createMethodsNode('before', target), target)

  if (inserted)
    methodsTreeRef.value?.setCurrentNode(inserted)

  syncMethodsCurrentNodePanel(
    inserted
      ? `insertNodeBefore(${String(target.key)}) -> ${inserted.label} (#${String(inserted.key)})`
      : `insertNodeBefore(${String(target.key)}) -> failed`
  )
}

function insertMethodsNodeAfter(node: DsTreeNode<Item>) {
  const target = resolveMethodsNode(node)
  const inserted = methodsTreeRef.value?.insertNodeAfter(createMethodsNode('after', target), target)

  if (inserted)
    methodsTreeRef.value?.setCurrentNode(inserted)

  syncMethodsCurrentNodePanel(
    inserted
      ? `insertNodeAfter(${String(target.key)}) -> ${inserted.label} (#${String(inserted.key)})`
      : `insertNodeAfter(${String(target.key)}) -> failed`
  )
}

function removeMethodsNode(node: DsTreeNode<Item>) {
  const target = resolveMethodsNode(node)
  const removed = methodsTreeRef.value?.removeNode(target)

  syncMethodsCurrentNodePanel(`removeNode(${String(target.key)}) -> ${removed ? 'removed' : 'failed'}`)
}

function onMethodsNodeClick(_: Item, node: DsTreeNode<Item>) {
  const changed = methodsTreeRef.value?.setCurrentNode(node)

  syncMethodsCurrentNodePanel(
    changed
      ? `setCurrentNode(${String(node.key)}) -> ${node.label}`
      : `setCurrentNode(${String(node.key)}) -> failed`
  )
}

function refreshMethodsCurrentNode() {
  const node = methodsTreeRef.value?.getCurrentNode()

  syncMethodsCurrentNodePanel(
    node
      ? `getCurrentNode() -> ${node.label} (#${String(node.key)})`
      : 'getCurrentNode() -> undefined'
  )
}

function resetMethodsDemo() {
  methodsData.value = createTreeData()
  expandedMethods.value = [1, 2]
  nextMethodsId.value = 1000
  methodsCurrentNode.value = undefined
  methodsAction.value = 'demo reset'
}

const branchLineColorByKey: Record<string, string> = {
  '1': '#cbd5f5',
  '2': '#fed7aa',
  '3': '#bbf7d0',
  '12': '#ddd6fe',
}

const branchLineActiveColorByKey: Record<string, string> = {
  '1': '#4f46e5',
  '2': '#ea580c',
  '3': '#16a34a',
  '12': '#7c3aed',
}

const branchLineColor: DsTreeBranchLineColor<Item> = node => branchLineColorByKey[String(node.key)] ?? '#e2e8f0'
const branchLineActiveColor: DsTreeBranchLineColor<Item> = node => branchLineActiveColorByKey[String(node.key)] ?? '#475569'

const dsTreePropsInfo = [
  { name: 'data', type: 'T[]', description: 'Массив корневых узлов.' },
  { name: 'nodeKey', type: 'keyof T', default: 'id', description: 'Поле уникального ключа.' },
  { name: 'props', type: '{ children?: string; label?: string }', description: 'Маппинг полей данных.' },
  { name: 'defaultExpandedKeys', type: '(string | number)[]', description: 'Раскрытые ключи (контролируется извне).' },
  { name: 'highlightCurrent', type: 'boolean', default: 'true', description: 'Подсветка текущего узла.' },
  { name: 'indent', type: 'number', default: '14', description: 'Отступ на уровень.' },
  {
    name: 'branchLine',
    type: 'boolean',
    default: 'false',
    description: 'Показывает вертикальную полосу у раскрытых веток.'
  },
  {
    name: 'branchLineColor',
    type: 'string | ((node) => string | undefined | null)',
    description: 'Цвет полосы у раскрытой папки; можно вычислять отдельно для каждой ветки.'
  },
  {
    name: 'branchLineActiveColor',
    type: 'string | ((node) => string | undefined | null)',
    description: 'Цвет полосы для активной папки: когда выбрана сама нода или её прямой ребёнок.'
  },
  {
    name: 'expandIcon',
    type: 'string',
    default: 'i-lucide-chevron-right',
    description: 'Иконка «раскрыть» (UnoCSS icon class).'
  },
  {
    name: 'collapseIcon',
    type: 'string',
    default: 'i-lucide-chevron-right',
    description: 'Иконка «свернуть» (UnoCSS icon class).'
  },
  {
    name: 'toggleIconRotate',
    type: 'boolean',
    default: 'true',
    description: 'Поворачивать иконку toggle при раскрытии (полезно когда иконки одинаковые).'
  },
  { name: 'filterNodeMethod', type: '(value, data, node?) => boolean', description: 'Кастомная логика фильтрации.' },
  { name: 'draggable', type: 'boolean', default: 'false', description: 'Включает drag & drop.' },
  {
    name: 'dragHandleIcon',
    type: 'string',
    default: 'i-lucide-grip-vertical',
    description: 'Иконка drag-handle (по умолчанию задаётся компонентом).'
  },
  { name: 'allowDrag', type: '(node) => boolean', description: 'Можно ли тащить узел.' },
  {
    name: 'allowDrop',
    type: '(draggingNode, dropNode, type) => boolean',
    description: 'Можно ли дропать по типу `prev|inner|next`.'
  },
] as const

const dsTreeEventsInfo = [
  { name: '@node-click', type: '(data, node) => void', description: 'Клик по строке узла.' },
  { name: '@node-expand', type: '(data, node) => void', description: 'Пользователь раскрыл ветку.' },
  { name: '@node-collapse', type: '(data, node) => void', description: 'Пользователь свернул ветку.' },
  {
    name: '@node-drop',
    type: '(draggingNode, dropNode, dropType) => void',
    description: 'DnD drop с типом `prev|inner|next`.'
  },
] as const

const dsTreeMethodsInfo = [
  {
    name: 'appendNode(data, parent)',
    type: '(data: T, parent: DsTreeNodeTarget<T>) => DsTreeNode<T> | undefined',
    description: 'Добавляет дочерний узел к указанной ноде и возвращает созданную tree-ноду.'
  },
  {
    name: 'removeNode(node)',
    type: '(node: DsTreeNodeTarget<T>) => boolean',
    description: 'Удаляет узел по ключу/ноде. Работает только когда у компонента задан `node-key`.'
  },
  {
    name: 'insertNodeBefore(data, referenceNode)',
    type: '(data: T, referenceNode: DsTreeNodeTarget<T>) => DsTreeNode<T> | undefined',
    description: 'Вставляет новый узел перед указанной нодой на том же уровне.'
  },
  {
    name: 'insertNodeAfter(data, referenceNode)',
    type: '(data: T, referenceNode: DsTreeNodeTarget<T>) => DsTreeNode<T> | undefined',
    description: 'Вставляет новый узел после указанной ноды на том же уровне.'
  },
  {
    name: 'getCurrentNode()',
    type: '() => DsTreeNode<T> | undefined',
    description: 'Возвращает текущую выделенную tree-ноду вместе с meta (`key`, `level`, `parent`).'
  },
  {
    name: 'setCurrentNode(node)',
    type: '(node?: DsTreeNodeTarget<T>) => boolean',
    description: 'Устанавливает выделение по ключу, raw-data объекту или tree-ноде; `undefined` снимает выделение.'
  },
  {
    name: 'getNode(key)',
    type: '(key: string | number) => DsTreeNode<T> | undefined',
    description: 'Возвращает tree-ноду по ключу без обхода данных снаружи компонента.'
  },
] as const

const usageCode = computed(() => {
  return `<script setup lang="ts">
import { ref } from 'vue'
import type { DsTreeInstance, DsTreeNode } from '@feugene/fint-ds'

type Item = { id: number; label: string; archived?: boolean; children?: Item[] }

const treeRef = ref<DsTreeInstance<Item>>()
const expandedKeys = ref<(string | number)[]>([1, 2])
const currentNodeInfo = ref('Ничего не выбрано')
const nextId = ref(100)

function syncCurrentNodeInfo() {
  const node = treeRef.value?.getCurrentNode()
  currentNodeInfo.value = node
    ? node.label + ' (#' + String(node.key) + ')'
    : 'Ничего не выбрано'
}

function selectNode(node: DsTreeNode<Item>) {
  treeRef.value?.setCurrentNode(node)
  syncCurrentNodeInfo()
}

function appendChild(node: DsTreeNode<Item>) {
  const created = treeRef.value?.appendNode({ id: nextId.value++, label: node.label + ' / child' }, node)

  if (!created)
    return

  treeRef.value?.setCurrentNode(created)
  syncCurrentNodeInfo()
}

function insertBefore(node: DsTreeNode<Item>) {
  const created = treeRef.value?.insertNodeBefore({ id: nextId.value++, label: 'Before ' + node.label }, node)

  if (!created)
    return

  treeRef.value?.setCurrentNode(created)
  syncCurrentNodeInfo()
}

function insertAfter(node: DsTreeNode<Item>) {
  const created = treeRef.value?.insertNodeAfter({ id: nextId.value++, label: 'After ' + node.label }, node)

  if (!created)
    return

  treeRef.value?.setCurrentNode(created)
  syncCurrentNodeInfo()
}

function removeBranch(node: DsTreeNode<Item>) {
  treeRef.value?.removeNode(node)
  syncCurrentNodeInfo()
}
<\/scr${'ipt'}>

<template>
  <div class="grid gap-4 md:grid-cols-[minmax(0,1fr)_280px] items-start">
    <DsTree
      ref="treeRef"
      :data="data"
      node-key="id"
      :default-expanded-keys="expandedKeys"
      highlight-current
      @node-click="(_, node) => selectNode(node)"
      @node-expand="(_, node) => expandedKeys.push(node.key)"
    >
      <template #default="{ node }">
        <div class="min-w-0 flex items-center justify-between gap-2">
          <span class="truncate">{{ node.label }}</span>

          <div class="shrink-0 flex flex-wrap justify-end gap-1">
            <DsButton size="xs" square variant="ghost" aria-label="Добавить дочернюю ноду" title="Добавить дочернюю ноду" @click.stop="appendChild(node)">
              <i class="i-lucide-folder-plus h-4 w-4" aria-hidden="true" />
            </DsButton>
            <DsButton size="xs" square variant="ghost" aria-label="Вставить ноду перед текущей" title="Вставить ноду перед текущей" @click.stop="insertBefore(node)">
              <i class="i-lucide-arrow-up-from-line h-4 w-4" aria-hidden="true" />
            </DsButton>
            <DsButton size="xs" square variant="ghost" aria-label="Вставить ноду после текущей" title="Вставить ноду после текущей" @click.stop="insertAfter(node)">
              <i class="i-lucide-arrow-down-from-line h-4 w-4" aria-hidden="true" />
            </DsButton>
            <DsButton
              size="xs"
              square
              variant="ghost"
              aria-label="Удалить ветку"
              title="Удалить ветку"
              :style="{ color: 'var(--destructive)' }"
              @click.stop="removeBranch(node)"
            >
              <i class="i-lucide-trash-2 h-4 w-4" aria-hidden="true" />
            </DsButton>
          </div>
        </div>
      </template>
    </DsTree>

    <DsCard class="p-4 grid gap-3">
      <div class="text-sm font-700">Текущая нода (getCurrentNode())</div>
      <div class="text-sm ds-muted">{{ currentNodeInfo }}</div>
    </DsCard>
  </div>
</template>`
})
</script>

<template>
  <PlaygroundPage
      :title="t('playground.tree.title', 'Tree')"
      :description="t('playground.tree.lead', 'Tree with nested DOM nodes, branch lines, filter() and drag & drop.')"
  >
    <template #ui>
      <div class="grid gap-4">
        <DsCard class="p-5 grid gap-4">
          <div class="text-sm font-800">{{ t('playground.tree.examples.basic', 'Basic tree (no filter)') }}</div>

          <div class="max-w-[520px]">
            <DsTree
                :data="data"
                :props="propsMap"
                node-key="id"
                :default-expanded-keys="expandedBasic"
                highlight-current
                @node-expand="onBasicExpand"
                @node-collapse="onBasicCollapse"
            />
          </div>
        </DsCard>

        <DsCard class="p-5 grid gap-4">
          <div class="text-sm font-800">{{ t('playground.tree.examples.icons', 'Custom fold / unfold icons') }}</div>
          <div class="text-sm ds-muted">
            {{
              t('playground.tree.examples.iconsHint', 'Use different icons for expand/collapse and disable rotation.')
            }}
          </div>

          <div class="max-w-[520px]">
            <DsTree
                :data="data"
                :props="propsMap"
                node-key="id"
                :default-expanded-keys="expandedIcons"
                expand-icon="i-lucide-square-plus"
                collapse-icon="i-lucide-square-minus"
                :toggle-icon-rotate="false"
                @node-expand="onIconsExpand"
                @node-collapse="onIconsCollapse"
            />
          </div>
        </DsCard>

        <DsCard class="p-5 grid gap-4">
          <div class="text-sm font-800">{{ t('playground.tree.examples.format', 'Formatted node text') }}</div>

          <div class="max-w-[520px]">
            <DsTree
                :data="data"
                :props="propsMap"
                node-key="id"
                :default-expanded-keys="expandedFormatted"
                highlight-current
                @node-expand="onFormattedExpand"
                @node-collapse="onFormattedCollapse"
            >
              <template #default="{ node, data: row }">
                <div class="min-w-0 flex items-center gap-2">
                  <span class="shrink-0 font-mono text-[11px] ds-muted">#{{ row.id }}</span>
                  <span class="truncate">{{ node.label }}</span>
                  <DsBadge v-if="row.archived" variant="info" size="sm">Archived</DsBadge>
                </div>
              </template>
            </DsTree>
          </div>
        </DsCard>

        <DsCard class="p-5 grid gap-4">
          <div class="flex items-center gap-3 flex-wrap">
            <div class="text-sm font-800">
              {{ t('playground.tree.examples.methods', 'Expose methods: append / insert / remove / current node') }}
            </div>
            <div class="text-sm ds-muted">
              {{ t('playground.tree.methodsAction', 'Last method call') }}: {{ methodsAction }}
            </div>
          </div>

          <div class="text-sm ds-muted max-w-[820px]">
            {{
              t(
                'playground.tree.examples.methodsHint',
                'Click a tree row to select it, inspect the result of `getCurrentNode()` in the side panel and mutate the exact branch through action buttons rendered inside each node.'
              )
            }}
          </div>

          <div class="flex items-center justify-between gap-3 flex-wrap rounded-xl border border-default p-3 bg-muted/20">
            <div class="text-sm ds-muted max-w-[720px]">
              {{ t('playground.tree.methodsPanelHint', 'Текущая панель обновляется через `getCurrentNode()`, а клик по строке дополнительно синхронизирует выбор через `setCurrentNode(node)`.') }}
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <DsButton size="sm" variant="outline" @click="refreshMethodsCurrentNode">Обновить getCurrentNode()</DsButton>
              <DsButton size="sm" variant="ghost" @click="resetMethodsDemo">Reset</DsButton>
            </div>
          </div>

          <div class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px] items-start">
            <DsTree
                ref="methodsTreeRef"
                :data="methodsData"
                :props="propsMap"
                node-key="id"
                :default-expanded-keys="expandedMethods"
                highlight-current
                @node-click="onMethodsNodeClick"
                @node-expand="onMethodsExpand"
                @node-collapse="onMethodsCollapse"
            >
              <template #default="{ node, data: row }">
                <div class="min-w-0 flex items-start justify-between gap-3">
                  <div class="min-w-0 flex items-center gap-2">
                    <span class="shrink-0 font-mono text-[11px] ds-muted">#{{ row.id }}</span>
                    <span class="truncate">{{ node.label }}</span>
                    <DsBadge v-if="row.archived" variant="info" size="sm">Archived</DsBadge>
                  </div>

                  <div class="shrink-0 flex flex-wrap justify-end gap-1">
                    <DsButton size="xs" square variant="ghost" aria-label="Добавить дочернюю ноду" title="Добавить дочернюю ноду" @click.stop="appendMethodsChild(node)">
                      <i class="i-lucide-folder-plus h-4 w-4" aria-hidden="true" />
                    </DsButton>
                    <DsButton size="xs" square variant="ghost" aria-label="Вставить ноду перед текущей" title="Вставить ноду перед текущей" @click.stop="insertMethodsNodeBefore(node)">
                      <i class="i-lucide-arrow-up-from-line h-4 w-4" aria-hidden="true" />
                    </DsButton>
                    <DsButton size="xs" square variant="ghost" aria-label="Вставить ноду после текущей" title="Вставить ноду после текущей" @click.stop="insertMethodsNodeAfter(node)">
                      <i class="i-lucide-arrow-down-from-line h-4 w-4" aria-hidden="true" />
                    </DsButton>
                    <DsButton
                      size="xs"
                      square
                      variant="ghost"
                      aria-label="Удалить ветку"
                      title="Удалить ветку"
                      :style="{ color: 'var(--destructive)' }"
                      @click.stop="removeMethodsNode(node)"
                    >
                      <i class="i-lucide-trash-2 h-4 w-4" aria-hidden="true" />
                    </DsButton>
                  </div>
                </div>
              </template>
            </DsTree>

            <DsCard class="p-4 grid gap-3">
              <div class="grid gap-1">
                <div class="text-sm font-800">{{ t('playground.tree.currentNodePanel', 'Текущая нода (`getCurrentNode()`)') }}</div>
                <div class="text-xs ds-muted">
                  {{ t('playground.tree.currentNodePanelHint', 'Панель показывает snapshot, полученный из expose-метода, а не из локального состояния слота.') }}
                </div>
              </div>

              <div class="rounded-xl border border-default bg-muted/20 p-3 text-sm ds-muted break-words">
                <div><span class="font-700 text-default">{{ t('playground.tree.methodsAction', 'Last method call') }}:</span> {{ methodsAction }}</div>
              </div>

              <template v-if="methodsCurrentNode">
                <div class="grid gap-2 text-sm">
                  <div><span class="font-700">Key:</span> {{ methodsCurrentNode.key }}</div>
                  <div><span class="font-700">Label:</span> {{ methodsCurrentNode.label }}</div>
                  <div><span class="font-700">Level:</span> {{ methodsCurrentNode.level }}</div>
                  <div><span class="font-700">Parent:</span> {{ methodsCurrentNode.parentLabel ?? '—' }}<template v-if="methodsCurrentNode.parentKey !== undefined"> (#{{ methodsCurrentNode.parentKey }})</template></div>
                  <div><span class="font-700">Children:</span> {{ methodsCurrentNode.childCount }}</div>
                </div>

                <div class="grid gap-1">
                  <div class="text-xs font-700 uppercase tracking-[0.08em] ds-muted">Raw data</div>
                  <pre class="max-h-[280px] overflow-auto rounded-xl border border-default bg-surface px-3 py-2 text-[11px] leading-5">{{ methodsCurrentNodeJson }}</pre>
                </div>
              </template>

              <div v-else class="rounded-xl border border-dashed border-default p-4 text-sm ds-muted">
                {{ t('playground.tree.currentNodeEmpty', 'Выберите ноду кликом по строке или создайте новую через action-кнопки, чтобы увидеть результат `getCurrentNode()`.') }}
              </div>
            </DsCard>
          </div>
        </DsCard>

        <DsCard class="p-5 grid gap-4">
          <div class="flex items-center gap-3 flex-wrap">
            <div class="text-sm font-800">
              {{ t('playground.tree.examples.branchLine', 'Branch line for expanded folders') }}
            </div>
            <div class="text-sm ds-muted">
              {{
                t('playground.tree.examples.branchLineHint', 'Click a folder or its direct child to see the active line color.')
              }}
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[980px]">
            <div class="grid gap-2">
              <div class="text-xs ds-muted">
                {{ t('playground.tree.examples.branchLineDefault', 'Enabled with the default gray color') }}
              </div>
              <DsTree
                  :data="data"
                  :props="propsMap"
                  node-key="id"
                  :default-expanded-keys="expandedBranchLineDefault"
                  branch-line
                  highlight-current
                  @node-expand="onBranchLineDefaultExpand"
                  @node-collapse="onBranchLineDefaultCollapse"
              />
            </div>

            <div class="grid gap-2">
              <div class="text-xs ds-muted">
                {{ t('playground.tree.examples.branchLineCustom', 'Custom per-folder line color + active color') }}
              </div>
              <DsTree
                  :data="data"
                  :props="propsMap"
                  node-key="id"
                  :default-expanded-keys="expandedBranchLineCustom"
                  branch-line
                  draggable
                  highlight-current
                  :branch-line-color="branchLineColor"
                  :branch-line-active-color="branchLineActiveColor"
                  @node-expand="onBranchLineCustomExpand"
                  @node-collapse="onBranchLineCustomCollapse"
                  @node-drop="onDrop"
              >
                <template #default="{ node, data: row }">
                  <div class="min-w-0 flex items-center gap-2">
                    <span class="truncate">{{ node.label }}</span>
                    <DsBadge v-if="row.archived" variant="info" size="sm">Archived</DsBadge>
                  </div>
                </template>
              </DsTree>
            </div>
          </div>
        </DsCard>

        <DsCard class="p-5 grid gap-4">
          <div class="flex items-center gap-3 flex-wrap">
            <div class="text-sm font-800">{{
                t('playground.tree.examples.dnd', 'Drag & drop (disabled by default)')
              }}
            </div>
            <div class="text-sm ds-muted">
              {{ t('playground.tree.lastAction', 'Last action') }}: {{ lastAction }}
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[980px]">
            <div class="grid gap-2">
              <div class="text-xs ds-muted">
                {{ t('playground.tree.examples.dndDefaultHandle', 'Default drag handle icon') }}
              </div>
              <DsTree
                  ref="treeRef"
                  :data="data"
                  :props="propsMap"
                  node-key="id"
                  :default-expanded-keys="expandedDndDefault"
                  highlight-current
                  draggable
                  :allow-drag="allowDrag"
                  :allow-drop="allowDrop"
                  @node-expand="onDndDefaultExpand"
                  @node-collapse="onDndDefaultCollapse"
                  @node-drop="onDrop"
              >
                <template #default="{ node, data: row }">
                  <div class="min-w-0 flex items-center gap-2">
                    <span class="truncate">{{ node.label }}</span>
                    <DsBadge v-if="row.archived" variant="info" size="sm">Archived</DsBadge>
                  </div>
                </template>
              </DsTree>
            </div>

            <div class="grid gap-2">
              <div class="text-xs ds-muted">
                {{ t('playground.tree.examples.dndCustomHandle', 'Custom drag handle icon') }}
              </div>
              <DsTree
                  :data="data"
                  :props="propsMap"
                  node-key="id"
                  :default-expanded-keys="expandedDndCustom"
                  highlight-current
                  draggable
                  drag-handle-icon="i-lucide-move"
                  :allow-drag="allowDrag"
                  :allow-drop="allowDrop"
                  @node-expand="onDndCustomExpand"
                  @node-collapse="onDndCustomCollapse"
                  @node-drop="onDrop"
              />
            </div>
          </div>
        </DsCard>
      </div>
    </template>

    <template #usage>
      <pre
          class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code
          class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsTree — Props" :items="dsTreePropsInfo" />
      <PlaygroundProps title="DsTree — Expose / Methods" :items="dsTreeMethodsInfo" />
      <PlaygroundProps title="DsTree — Events" :items="dsTreeEventsInfo" />
    </template>
  </PlaygroundPage>
</template>
