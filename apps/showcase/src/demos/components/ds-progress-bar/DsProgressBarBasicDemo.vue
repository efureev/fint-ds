<script setup lang="ts">
import { ref } from 'vue'

import { DsButton, DsProgressBar } from '@feugene/granularity'

const progress = ref(32)
</script>

<template>
  <div class="grid gap-3">
    <div class="flex flex-wrap gap-2">
      <DsButton size="sm" variant="outline" @click="progress = Math.max(0, progress - 16)">
        -16%
      </DsButton>
      <DsButton size="sm" @click="progress = Math.min(100, progress + 16)">
        +16%
      </DsButton>
    </div>

    <div class="grid gap-2">
      <div class="flex items-center justify-between text-sm">
        <span>Verification progress</span>
        <span class="text-[var(--muted-foreground)]">{{ progress }}%</span>
      </div>
      <DsProgressBar :value="progress" aria-label="Verification progress" />
    </div>
  </div>
</template>