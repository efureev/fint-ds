<script setup lang="ts">
import { DsButton, DsButtonGroup } from '@feugene/granularity'
</script>

<template>
  <div class="space-y-3">
    <DsButtonGroup aria-label="View switcher">
      <DsButton variant="outline">
        Back
      </DsButton>
      <DsButton>
        Apply
      </DsButton>
      <DsButton variant="ghost-border">
        More
      </DsButton>
    </DsButtonGroup>

    <p class="text-sm leading-6 text-[var(--muted-foreground)]">
      `DsButtonGroup` показывает реальный composition-case для базовой кнопки и помогает проверить совместимость размеров и variant-контракта.
    </p>
  </div>
</template>