<script setup lang="ts">
import DsCard from '@/components/DsCard.vue'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    height?: string
  }>(),
  {
    description: undefined,
    height: '220px',
  },
)
</script>

<template>
  <DsCard class="p-5">
    <div class="flex items-start justify-between gap-4">
      <div>
        <div class="text-[14px] font-700">
{{ props.title }}
</div>
        <div v-if="props.description" class="text-[13px] ds-muted mt-1">
{{ props.description }}
</div>
      </div>
      <slot name="actions" />
    </div>

    <div class="mt-4 rounded-[12px] border border-[var(--border)] bg-[var(--muted)]" :style="{ height: props.height }">
      <div class="h-full w-full flex items-center justify-center text-[13px] text-[var(--muted-foreground)]">
        <slot>
          Chart placeholder
        </slot>
      </div>
    </div>
  </DsCard>
</template>
