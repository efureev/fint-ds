<script setup lang="ts">
import { ref } from 'vue'

import { DsButton, DsModal } from '@feugene/granularity'

const open = ref(false)
</script>

<template>
  <div class="grid gap-3">
    <div class="text-sm text-slate-500 dark:text-slate-400">
      Попробуйте кликнуть по backdrop: модалка останется открытой, пока пользователь не выберет явное действие.
    </div>

    <DsButton variant="outline" class="justify-self-start" @click="open = true">
      Open guarded modal
    </DsButton>

    <DsModal v-model="open" :close-on-backdrop="false" size="md">
      <div class="grid gap-4">
        <div class="grid gap-1">
          <div class="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Draft protection
          </div>
          <div class="text-sm text-slate-500 dark:text-slate-400">
            Используйте этот режим для wizard/confirm flow, где нельзя случайно потерять черновик.
          </div>
        </div>

        <div class="rounded-2xl border border-slate-200/70 bg-slate-50 p-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
          Unsaved changes: pricing rules, SLA exceptions, recipients.
        </div>

        <div class="flex flex-wrap gap-3">
          <DsButton variant="outline" @click="open = false">
            Cancel
          </DsButton>
          <DsButton @click="open = false">
            Save draft
          </DsButton>
        </div>
      </div>
    </DsModal>
  </div>
</template>