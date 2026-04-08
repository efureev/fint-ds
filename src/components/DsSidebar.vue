<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <aside class="border-r border-[var(--sidebar-border)] bg-[var(--sidebar)] text-[var(--sidebar-foreground)]">
    <div class="px-4 py-4 border-b border-[var(--sidebar-border)]">
      <div v-if="subtitle" class="text-[14px] ds-muted">
{{ subtitle }}
</div>
      <div class="text-[18px] font-700">
{{ title }}
</div>
    </div>
    <div class="p-3">
      <slot />
    </div>
  </aside>
</template>
