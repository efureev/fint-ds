<script setup lang="ts">
import { ref } from 'vue'

import { DsBadge, DsTree } from '@feugene/granularity'

type TreeItem = {
  id: number
  label: string
  status: 'healthy' | 'warning' | 'critical'
  children?: TreeItem[]
}

const treeData = ref<TreeItem[]>([
  {
    id: 1,
    label: 'Payments',
    status: 'critical',
    children: [
      { id: 11, label: 'Retries', status: 'warning' },
      { id: 12, label: 'Settlement', status: 'healthy' },
    ],
  },
  {
    id: 2,
    label: 'Identity',
    status: 'warning',
    children: [
      { id: 21, label: 'Sessions', status: 'healthy' },
      { id: 22, label: 'Recovery', status: 'warning' },
    ],
  },
])

const lastDrop = ref('Drag a row handle to reorder or nest nodes')

function resolveTone(status: TreeItem['status']) {
  if (status === 'critical')
    return 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-200'

  if (status === 'warning')
    return 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200'

  return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200'
}
</script>

<template>
  <div class="grid gap-4">
    <DsTree
      :data="treeData"
      :default-expanded-keys="[1, 2]"
      draggable
      branch-line
      @node-drop="(draggingNode, dropNode, dropType) => lastDrop = `${draggingNode.label} → ${dropNode.label} (${dropType})`"
    >
      <template #default="{ data }">
        <div class="flex flex-wrap items-center gap-2">
          <span>{{ data.label }}</span>
          <span class="rounded-full px-2 py-1 text-xs font-600" :class="resolveTone(data.status)">
            {{ data.status }}
          </span>
        </div>
      </template>
    </DsTree>

    <DsBadge>
      {{ lastDrop }}
    </DsBadge>
  </div>
</template>