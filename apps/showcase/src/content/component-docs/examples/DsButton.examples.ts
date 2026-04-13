import type { ShowcaseComponentExampleDoc } from '../types'

export const dsButtonExamples: ShowcaseComponentExampleDoc[] = [
  {
    id: 'button-builder',
    title: 'Interactive button constructor',
    description: 'Живой playground для всех пропсов `DsButton`: меняйте visual variant, size, type и состояния без переключения между отдельными demo-картами.',
    status: 'ready',
    previewKey: 'ds-button-builder',
    code: '',
    note: 'Лучший формат для дизайн-ревью и QA: один сценарий сразу покрывает все пропсы компонента и помогает быстро проверить доступность icon-only режима.',
  },
  {
    id: 'button-variants',
    title: 'Variants and sizes',
    description: 'Собираем полный visual matrix по всем вариантам и размерам `DsButton`, чтобы быстро выбрать правильный action-weight для интерфейса.',
    status: 'ready',
    previewKey: 'ds-button-variants',
    code: `<script setup lang="ts">
import { DsButton } from '@feugene/granularity'

const variantRows = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'outline', label: 'Outline' },
  { value: 'ghost', label: 'Ghost' },
  { value: 'ghost-border', label: 'Ghost border' },
  { value: 'destructive', label: 'Destructive' },
]

const sizeOptions = ['xs', 'sm', 'md', 'lg']
</script>

<template>
  <div class="grid gap-3">
    <div
      v-for="item in variantRows"
      :key="item.value"
      class="flex flex-wrap items-center gap-3"
    >
      <span class="w-28 text-sm text-[var(--muted-foreground)]">{{ item.label }}</span>
      <DsButton
        v-for="size in sizeOptions"
        :key="item.value + '-' + size"
        :variant="item.value"
        :size="size"
      >
        {{ size.toUpperCase() }}
      </DsButton>
    </div>
  </div>
</template>`,
  },
  {
    id: 'button-group-composition',
    title: 'Composition with button group',
    description: 'Показываем, как `DsButton` выглядит внутри более сложной композиции и где появляется дополнительная зависимость по registry.',
    status: 'ready',
    previewKey: 'ds-button-group',
    code: `<script setup lang="ts">
import { DsButton, DsButtonGroup } from '@feugene/granularity'
</script>

<template>
  <DsButtonGroup aria-label="View switcher">
    <DsButton variant="outline">Back</DsButton>
    <DsButton>Apply</DsButton>
    <DsButton variant="ghost-border">More</DsButton>
  </DsButtonGroup>
</template>`,
  },
]
