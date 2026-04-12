<template>
  <div class="space-y-4">
    <div class="flex flex-wrap gap-3">
      <DsButton variant="primary">
        Primary
      </DsButton>
      <DsButton variant="secondary">
        Secondary
      </DsButton>
      <DsButton variant="outline">
        Outline
      </DsButton>
      <DsButton variant="ghost">
        Ghost
      </DsButton>
    </div>

    <div class="flex flex-wrap gap-3">
      <DsButton size="xs">
        XS
      </DsButton>
      <DsButton size="sm">
        SM
      </DsButton>
      <DsButton size="md">
        MD
      </DsButton>
      <DsButton size="lg">
        LG
      </DsButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DsButton } from '@feugene/granularity'
</script>