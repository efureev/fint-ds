<script setup lang="ts">
import { ref } from 'vue'

import { DsButton, DsLoading } from '@feugene/granularity'

const loading = ref(false)
</script>

<template>
  <div class="grid gap-3">
    <DsButton variant="outline" class="justify-self-start" @click="loading = !loading">
      Toggle custom overlay
    </DsButton>

    <div class="relative min-h-[180px] rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
      <div class="grid gap-2 text-sm text-[var(--muted-foreground)]">
        <div class="font-medium text-[var(--foreground)]">Brand migration</div>
        <div>Custom background, z-index and static spinner help adapt the overlay to dense dashboards.</div>
      </div>

      <DsLoading
        v-if="loading"
        text="Preparing migration plan..."
        background="rgba(15, 23, 42, 0.78)"
        spinner-class="text-white h-8 w-8"
        custom-class="rounded-xl"
        :animated="false"
        :z-index="20"
      />
    </div>
  </div>
</template>