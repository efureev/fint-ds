<script setup lang="ts">
import { computed, ref } from 'vue'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

import { useFintI18n } from '@feugene/fint-i18n'

import IconEye from '~icons/lucide/eye'
import IconPencil from '~icons/lucide/pencil'
import IconTrash2 from '~icons/lucide/trash-2'

const { t } = useFintI18n()

const total = ref(137)
const page = ref(1)
const pageSize = ref(10)

const lastAction = ref<string>('')

const pageCount = computed(() => {
  return Math.max(1, Math.ceil(total.value / pageSize.value))
})

function setTotal(next: number): void {
  total.value = next
  page.value = Math.min(page.value, pageCount.value)
}

function onRowAction(action: string, row: Record<string, unknown>): void {
  const id = String(row.id ?? '')
  const name = String(row.name ?? '')
  lastAction.value = `${action}:${id}${name ? `:${name}` : ''}`
}

const tableSlotsInfo = [
  {
    name: 'slot (head)',
    type: 'slot',
    description: 'Шапка таблицы (обычно <tr><th>...).',
  },
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Строки таблицы (обычно <tr><td>...).',
  },
] as const

const dataTablePropsInfo = [
  {
    name: 'rows',
    type: 'Array<Record<string, unknown>>',
    description: 'Строки таблицы.',
  },
  {
    name: 'columns',
    type: "Array<{ key: string; label: string; sortable?: boolean; align?: 'left' | 'right' }>",
    description: 'Описание колонок. sortable включает кликабельный заголовок и сортировку по этой колонке.',
  },
  {
    name: 'rowKey',
    type: 'string',
    default: "'id'",
    description: 'Ключ в объекте row, используемый как :key (стабильность списка).',
  },
  {
    name: 'initialSortKey',
    type: 'string | undefined',
    description: 'Ключ колонки, по которому нужно отсортировать таблицу при первом рендере.',
  },
  {
    name: 'initialSortDir',
    type: "'asc' | 'desc'",
    default: "'asc'",
    description: 'Направление сортировки при первом рендере.',
  },
] as const

const dataTableSlotsInfo = [
  {
    name: 'slot (cell-<key>)',
    type: 'slot',
    description: 'Кастомный рендер ячейки для колонки: например `#cell-price="{ row }"`.',
  },
] as const

const paginationPropsInfo = [
  {
    name: 'v-model:page',
    type: 'number',
    description: 'Текущая страница. Компонент эмитит update:page при кликах Prev/Next/номер.',
  },
  {
    name: 'v-model:pageSize',
    type: 'number',
    description: 'Размер страницы. Меняется через select; эмитит update:pageSize.',
  },
  {
    name: 'total',
    type: 'number',
    description: 'Общее количество элементов. Используется для расчёта количества страниц.',
  },
  {
    name: 'pageSizes',
    type: 'number[]',
    default: '[10, 20, 50]',
    description: 'Список доступных размеров страницы.',
  },
] as const

const paginationEventsInfo = [
  {
    name: '@update:page',
    type: '(value: number) => void',
    description: 'Эмитится при смене страницы.',
  },
  {
    name: '@update:pageSize',
    type: '(value: number) => void',
    description: 'Эмитится при смене размера страницы.',
  },
] as const

const rows = [
  { id: 1, name: 'Apple', price: 1.2, status: 'ok' },
  { id: 2, name: 'Orange', price: 0.95, status: 'pending' },
  { id: 3, name: 'Banana', price: 0.8, status: 'fail' },
]

const columns = computed(() => {
  return [
    { key: 'name', label: t('playground.tables.table.name', 'Name'), sortable: true },
    { key: 'price', label: t('playground.tables.table.price', 'Price'), sortable: true, align: 'right' as const },
    { key: 'status', label: t('playground.tables.table.status', 'Status'), sortable: true },
    { key: 'actions', label: t('playground.tables.table.actions', 'Actions'), align: 'right' as const },
  ]
})

const dsTableUsageCode = `<template>
  <DsTable>
    <template #head>
      <tr>
        <th class="text-left font-700 text-xs px-4 py-3">Название</th>
        <th class="text-right font-700 text-xs px-4 py-3">Цена</th>
        <th class="text-left font-700 text-xs px-4 py-3">Статус</th>
        <th class="text-right font-700 text-xs px-4 py-3">Действия</th>
      </tr>
    </template>

    <tr v-for="row in rows" :key="row.id" class="border-t border-[var(--border)]">
      <td class="px-4 py-3">{{ row.name }}</td>
      <td class="px-4 py-3 text-right font-mono">{{ row.price.toFixed(2) }}</td>
      <td class="px-4 py-3">
        <DsBadge :variant="row.status === 'ok' ? 'success' : row.status === 'pending' ? 'warning' : 'danger'">
          {{ row.status }}
        </DsBadge>
      </td>
      <td class="px-4 py-3 text-right">
        <DsButton size="sm" variant="ghost">…</DsButton>
      </td>
    </tr>
  </DsTable>
</template>
`

const dsDataTableUsageCode = `<script setup>
import { computed } from 'vue'

const rows = computed(() => [
  { id: 1, name: 'Apple', price: 1.2, status: 'ok' },
  { id: 2, name: 'Orange', price: 0.95, status: 'pending' },
])

const columns = computed(() => [
  { key: 'name', label: 'Название', sortable: true },
  { key: 'price', label: 'Цена', sortable: true, align: 'right' },
  { key: 'status', label: 'Статус', sortable: true },
  { key: 'actions', label: 'Действия', align: 'right' },
])
</scr${'ipt'}>

<template>
  <DsDataTable :rows="rows" :columns="columns" row-key="id" initial-sort-key="name">
    <template v-slot:cell-price="{ row }">
      <span class="font-mono">{{ Number(row.price ?? 0).toFixed(2) }}</span>
    </template>

    <template v-slot:cell-actions="{ row }">
      <DsButton size="sm" variant="ghost" @click="console.log('row', row)">Открыть</DsButton>
    </template>
  </DsDataTable>
</template>
`

const dsPaginationUsageCode = `<script setup>
import { computed, ref } from 'vue'

const total = ref(137)
const page = ref(1)
const pageSize = ref(10)

const pageCount = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))

function clampPage() {
  page.value = Math.min(page.value, pageCount.value)
}
</scr${'ipt'}>

<template>
  <DsPagination
    v-model:page="page"
    v-model:pageSize="pageSize"
    :total="total"
    @update:pageSize="clampPage"
  />
</template>
`

const emptyStateUsageCode = `<template>
  <div v-if="rows.length === 0">
    <DsEmptyState title="Нет данных" description="Попробуйте изменить фильтры" />
  </div>

  <DsDataTable v-else :rows="rows" :columns="columns" />
</template>
`

const serverSidePaginationUsageCode = `<script setup>
import { ref, watch } from 'vue'

const page = ref(1)
const pageSize = ref(10)

// Здесь подразумевается запрос к API / Inertia / любому data-layer.
async function fetchRows() {
  // await api.get('/items', { params: { page: page.value, pageSize: pageSize.value } })
}

watch([page, pageSize], () => {
  void fetchRows()
}, { immediate: true })
</scr${'ipt'}>

<template>
  <DsDataTable :rows="rows" :columns="columns" />
  <div class="mt-3">
    <DsPagination v-model:page="page" v-model:pageSize="pageSize" :total="total" />
  </div>
</template>
`
</script>

<template>
  <PlaygroundPage
    :title="t('playground.tables.title', 'Tables & Pagination')"
    :description="t('playground.tables.lead', 'Tables, sorting and pagination controls.')"
  >
    <template #ui>
      <div class="grid gap-4">
        <DsCard class="p-5">
          <div class="text-sm font-600">DsTable</div>
          <div class="mt-4">
            <DsTable>
              <template #head>
                <tr>
                  <th class="text-left font-700 text-xs px-4 py-3">{{ t('playground.tables.table.name', 'Name') }}</th>
                  <th class="text-right font-700 text-xs px-4 py-3">{{ t('playground.tables.table.price', 'Price') }}</th>
                  <th class="text-left font-700 text-xs px-4 py-3">{{ t('playground.tables.table.status', 'Status') }}</th>
                  <th class="text-right font-700 text-xs px-4 py-3">{{ t('playground.tables.table.actions', 'Actions') }}</th>
                </tr>
              </template>
              <tr v-for="r in rows" :key="r.id" class="border-t border-[var(--border)]">
                <td class="px-4 py-3">{{ r.name }}</td>
                <td class="px-4 py-3 text-right font-mono">{{ r.price.toFixed(2) }}</td>
                <td class="px-4 py-3">
                  <DsBadge
                    :variant="r.status === 'ok' ? 'success' : r.status === 'pending' ? 'warning' : 'danger'"
                  >
                    {{ t(`playground.tables.status.${r.status}`, r.status) }}
                  </DsBadge>
                </td>
                <td class="px-4 py-3 text-right">
                  <div class="inline-flex items-center justify-end gap-2">
                    <DsButton
                      size="sm"
                      variant="ghost"
                      square
                      :aria-label="t('playground.tables.actions.view', 'View')"
                      @click="onRowAction('view', r as any)"
                    >
                      <IconEye class="h-4 w-4" aria-hidden="true" />
                    </DsButton>

                    <DsButton
                      size="sm"
                      variant="ghost"
                      square
                      :aria-label="t('playground.tables.actions.edit', 'Edit')"
                      @click="onRowAction('edit', r as any)"
                    >
                      <IconPencil class="h-4 w-4" aria-hidden="true" />
                    </DsButton>

                    <DsButton
                      size="sm"
                      variant="ghost"
                      square
                      :aria-label="t('playground.tables.actions.delete', 'Delete')"
                      @click="onRowAction('delete', r as any)"
                    >
                      <IconTrash2 class="h-4 w-4" aria-hidden="true" />
                    </DsButton>
                  </div>
                </td>
              </tr>
            </DsTable>

            <div class="mt-3 text-sm ds-muted">
              {{ t('playground.tables.lastAction', 'Last action') }}: {{ lastAction || '—' }}
            </div>
          </div>
        </DsCard>

        <DsCard class="p-5">
          <div class="text-sm font-600">DsDataTable</div>
          <div class="mt-4">
            <DsDataTable :rows="rows" :columns="columns as any" row-key="id" initial-sort-key="name">
              <template #cell-price="{ row }">
                <span class="font-mono">{{ Number(row.price ?? 0).toFixed(2) }}</span>
              </template>

              <template #cell-status="{ row }">
                <DsBadge
                  :variant="row.status === 'ok' ? 'success' : row.status === 'pending' ? 'warning' : 'danger'"
                >
                  {{ t(`playground.tables.status.${row.status}`, String(row.status)) }}
                </DsBadge>
              </template>

              <template #cell-actions="{ row }">
                <div class="inline-flex items-center justify-end gap-2">
                  <DsButton
                    size="sm"
                    variant="ghost"
                    square
                    :aria-label="t('playground.tables.actions.view', 'View')"
                    @click="onRowAction('view', row)"
                  >
                    <IconEye class="h-4 w-4" aria-hidden="true" />
                  </DsButton>

                  <DsButton
                    size="sm"
                    variant="ghost"
                    square
                    :aria-label="t('playground.tables.actions.edit', 'Edit')"
                    @click="onRowAction('edit', row)"
                  >
                    <IconPencil class="h-4 w-4" aria-hidden="true" />
                  </DsButton>

                  <DsButton
                    size="sm"
                    variant="ghost"
                    square
                    :aria-label="t('playground.tables.actions.delete', 'Delete')"
                    @click="onRowAction('delete', row)"
                  >
                    <IconTrash2 class="h-4 w-4" aria-hidden="true" />
                  </DsButton>
                </div>
              </template>
            </DsDataTable>

            <div class="mt-3 text-sm ds-muted">
              {{ t('playground.tables.lastAction', 'Last action') }}: {{ lastAction || '—' }}
            </div>
          </div>
        </DsCard>

        <DsCard class="p-5 grid gap-6">
          <div class="text-sm font-600">DsPagination</div>

          <div class="flex flex-wrap items-center gap-2">
            <DsButton size="sm" variant="outline" @click="setTotal(0)">total=0</DsButton>
            <DsButton size="sm" variant="outline" @click="setTotal(37)">total=37</DsButton>
            <DsButton size="sm" variant="outline" @click="setTotal(137)">total=137</DsButton>
          </div>

          <div class="text-sm ds-muted">state: {{ { page, pageSize, total, pageCount } }}</div>

          <DsPagination v-model:page="page" v-model:pageSize="pageSize" :total="total" />
        </DsCard>
      </div>
    </template>

    <template #usage>
      <div class="grid gap-6 text-sm leading-6">
        <div class="grid gap-2">
          <div class="text-base font-800">Что относится к таблицам в <code>fint-ds</code></div>
          <ul class="list-disc pl-5">
            <li>
              <span class="font-700"><code>DsTable</code></span> — базовая стилизованная обёртка над нативным <code>table</code>.
              Используйте, когда нужна полная свобода разметки (<code>colspan</code>/<code>rowspan</code>, сложные заголовки, группировка строк).
            </li>
            <li>
              <span class="font-700"><code>DsDataTable</code></span> — «данные → таблица»: вы описываете <code>rows</code> и <code>columns</code>,
              а компонент сам собирает шапку/строки, поддерживает сортировку и даёт слоты для кастомных ячеек.
              Тип колонки экспортируется как <code>DsDataColumn</code>.
            </li>
            <li>
              <span class="font-700"><code>DsPagination</code></span> — контрол пагинации (часто используется вместе с таблицами).
            </li>
          </ul>
        </div>

        <div class="grid gap-2">
          <div class="text-base font-800">1) <code>DsTable</code> — low-level таблица</div>
          <div class="ds-muted">
            <code>DsTable</code> не навязывает структуру строк/ячеек: вы сами рендерите <code>tr</code>/<code>td</code>/<code>th</code>, а компонент даёт
            базовые стили (рамка, фон, горизонтальный скролл) и слот `head` для `thead`.
          </div>

          <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto">
            <code class="text-[12px]">{{ dsTableUsageCode }}</code>
          </pre>

          <div class="ds-muted">
            Юзкейсы: сложные заголовки (несколько строк), <code>colspan</code>/<code>rowspan</code>, группировка строк, смешанные типы контента.
          </div>
        </div>

        <div class="grid gap-2">
          <div class="text-base font-800">2) <code>DsDataTable</code> — декларативная таблица + сортировка</div>
          <div class="ds-muted">
            Подходит для типовых CRUD-таблиц. Сортировка включается флагом `sortable` у колонки.
            Для чисел компонент пытается сравнивать как числа, иначе сравнивает как строки.
          </div>

          <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto">
            <code class="text-[12px]">{{ dsDataTableUsageCode }}</code>
          </pre>

          <div class="ds-muted">
            Юзкейсы: форматирование чисел/дат, бейджи статусов, колонка действий, выравнивание чисел вправо (<code>align: 'right'</code>).
          </div>
        </div>

        <div class="grid gap-2">
          <div class="text-base font-800">3) Пустое состояние (empty state)</div>
          <div class="ds-muted">
            Таблица сама по себе не рендерит «пусто». Обычно это решается условным рендером и `DsEmptyState`.
          </div>

          <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto">
            <code class="text-[12px]">{{ emptyStateUsageCode }}</code>
          </pre>
        </div>

        <div class="grid gap-2">
          <div class="text-base font-800">4) <code>DsPagination</code> — пагинация таблицы</div>
          <div class="ds-muted">
            Используйте <code>v-model:page</code> и <code>v-model:pageSize</code>. При изменении <code>pageSize</code> обычно нужно «зажать» <code>page</code>,
            чтобы она не выходила за пределы.
          </div>

          <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto">
            <code class="text-[12px]">{{ dsPaginationUsageCode }}</code>
          </pre>
        </div>

        <div class="grid gap-2">
          <div class="text-base font-800">5) Server-side пагинация (и сортировка)</div>
          <div class="ds-muted">
            Для больших наборов данных чаще делают серверную пагинацию. В таком случае таблица отображает текущую страницу,
            а `DsPagination` управляет параметрами запроса.
          </div>

          <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto">
            <code class="text-[12px]">{{ serverSidePaginationUsageCode }}</code>
          </pre>

          <div class="ds-muted">
            Совет: если сортировка тоже серверная — храните `sortKey/sortDir` в состоянии страницы и пересобирайте запрос.
          </div>
        </div>
      </div>
    </template>

    <template #api>
      <PlaygroundProps title="DsTable — Slots" :items="tableSlotsInfo" />
      <PlaygroundProps title="DsDataTable — Props" :items="dataTablePropsInfo" />
      <PlaygroundProps title="DsDataTable — Slots" :items="dataTableSlotsInfo" />
      <PlaygroundProps title="DsPagination — Props" :items="paginationPropsInfo" />
      <PlaygroundProps title="DsPagination — Events" :items="paginationEventsInfo" />
    </template>
  </PlaygroundPage>
</template>
