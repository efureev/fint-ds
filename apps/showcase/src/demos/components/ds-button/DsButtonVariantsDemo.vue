<script setup lang="ts">
import { DsButton } from '@feugene/granularity'

const variantRows = [
  {
    value: 'primary',
    label: 'Primary',
    note: 'Главный CTA для основного сценария.',
  },
  {
    value: 'secondary',
    label: 'Secondary',
    note: 'Поддерживающее действие на нейтральной поверхности.',
  },
  {
    value: 'outline',
    label: 'Outline',
    note: 'Акцент на контуре, когда нужен более лёгкий вес.',
  },
  {
    value: 'ghost',
    label: 'Ghost',
    note: 'Минимальное действие внутри плотных тулбаров и списков.',
  },
  {
    value: 'ghost-border',
    label: 'Ghost border',
    note: 'Показывает hover-границу без постоянного визуального шума.',
  },
  {
    value: 'destructive',
    label: 'Destructive',
    note: 'Для irreversible и рискованных действий.',
  },
] as const

const sizeOptions = ['xs', 'sm', 'md', 'lg'] as const
</script>

<template>
  <div class="grid gap-4">
    <div class="grid gap-3">
      <div
        v-for="item in variantRows"
        :key="item.value"
        class="grid gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 lg:grid-cols-[minmax(0,180px)_minmax(0,1fr)] lg:items-center"
      >
        <div class="grid gap-1">
          <div class="showcase-demo-title text-sm font-semibold">
            {{ item.label }}
          </div>
          <div class="showcase-demo-text text-sm">
            {{ item.note }}
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <DsButton
            v-for="size in sizeOptions"
            :key="`${item.value}-${size}`"
            :variant="item.value"
            :size="size"
          >
            {{ size.toUpperCase() }}
          </DsButton>
        </div>
      </div>
    </div>
  </div>
</template>