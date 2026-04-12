<script setup lang="ts">
import { ref } from 'vue'

import { DsSelect } from '@feugene/granularity'

const options = [
  { value: 'alpha', label: 'Alpha workspace' },
  { value: 'beta', label: 'Beta workspace' },
  { value: 'gamma', label: 'Gamma workspace' },
]

const nativeValue = ref('')
const clearableValue = ref('beta')
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="grid gap-2">
      <div class="text-sm font-semibold text-slate-900 dark:text-slate-100">
        Native single
      </div>
      <DsSelect
        v-model="nativeValue"
        :options="options"
        placeholder="Pick workspace"
        aria-label="Pick workspace"
      />
      <div class="text-sm text-slate-500 dark:text-slate-400">
        value: {{ nativeValue || '—' }}
      </div>
    </div>

    <div class="grid gap-2">
      <div class="text-sm font-semibold text-slate-900 dark:text-slate-100">
        Native clearable
      </div>
      <DsSelect
        v-model="clearableValue"
        clearable
        :options="options"
        placeholder="Pick owner"
        aria-label="Pick owner"
      />
      <div class="text-sm text-slate-500 dark:text-slate-400">
        value: {{ clearableValue || '—' }}
      </div>
    </div>
  </div>
</template>