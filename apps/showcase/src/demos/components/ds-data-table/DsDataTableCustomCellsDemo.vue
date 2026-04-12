<script setup lang="ts">
import { ref } from 'vue'

import { DsBadge, DsButton, DsDataTable } from '@feugene/granularity'

const lastAction = ref('No actions yet')

const rows = [
  { id: 1, service: 'Gateway', status: 'ok', owner: 'Core' },
  { id: 2, service: 'Importer', status: 'warning', owner: 'Ops' },
  { id: 3, service: 'Notifier', status: 'danger', owner: 'Growth' },
]

const columns = [
  { key: 'service', label: 'Service', sortable: true },
  { key: 'owner', label: 'Owner' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions', align: 'right' },
]

function statusVariant(status: unknown): 'success' | 'warning' | 'danger' {
  if (status === 'ok')
    return 'success'

  if (status === 'warning')
    return 'warning'

  return 'danger'
}
</script>

<template>
  <div class="grid gap-3">
    <DsDataTable :rows="rows" :columns="columns" row-key="id">
      <template #cell-status="{ row }">
        <DsBadge :variant="statusVariant(row.status)">
          {{ row.status }}
        </DsBadge>
      </template>

      <template #cell-actions="{ row }">
        <div class="flex justify-end gap-2">
          <DsButton size="sm" variant="ghost" @click="lastAction = 'Viewed ' + row.service">
            View
          </DsButton>
          <DsButton size="sm" variant="outline" @click="lastAction = 'Escalated ' + row.service">
            Escalate
          </DsButton>
        </div>
      </template>
    </DsDataTable>

    <div class="text-sm text-slate-500 dark:text-slate-400">
      {{ lastAction }}
    </div>
  </div>
</template>