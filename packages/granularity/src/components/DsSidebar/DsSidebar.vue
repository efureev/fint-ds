<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    subtitle?: string
  }>(),
  {
    subtitle: undefined,
  },
)
</script>

<template>
  <aside class="border-r border-[var(--sidebar-border)] bg-[var(--sidebar)] text-[var(--sidebar-foreground)]">
    <div class="border-b border-[var(--sidebar-border)] px-4 py-4">
      <div v-if="props.subtitle" class="text-[14px] ds-muted">
        {{ props.subtitle }}
      </div>
      <div class="text-[18px] font-700">
        {{ props.title }}
      </div>
    </div>
    <div class="p-3">
      <slot />
    </div>
  </aside>
</template>