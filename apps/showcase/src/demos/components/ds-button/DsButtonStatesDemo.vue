<script setup lang="ts">
import { ref } from 'vue'

import { DsButton } from '@feugene/granularity'

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
      ⚙
    </DsButton>

    <DsButton variant="ghost-border" square aria-label="Create item">
      ＋
    </DsButton>
  </div>
</template>