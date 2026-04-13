<script setup lang="ts">
import { ref } from 'vue'

import { DsButton } from '@feugene/granularity'
import IconPlus from '~icons/lucide/plus'
import IconSettings from '~icons/lucide/settings'

const isLoading = ref(false)
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <DsButton :loading="isLoading" @click="isLoading = !isLoading">
      {{ isLoading ? 'Saving…' : 'Toggle loading' }}
    </DsButton>

    <DsButton variant="outline" disabled>
      Disabled
    </DsButton>

    <DsButton square aria-label="Open settings">
      <IconSettings class="h-4 w-4" aria-hidden="true" />
    </DsButton>

    <DsButton variant="ghost-border" square aria-label="Create item">
      <IconPlus class="h-4 w-4" aria-hidden="true" />
    </DsButton>
  </div>
</template>