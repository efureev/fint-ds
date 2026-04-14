import type { ShowcaseComponentExampleDoc } from '../types'

export const dsButtonExamples: ShowcaseComponentExampleDoc[] = [
  {
    id: 'button-builder',
    title: 'Interactive button constructor',
    description: 'Живой playground для всех пропсов `DsButton`: меняйте visual `variant`, semantic `tone`, size, type и состояния без переключения между отдельными demo-картами.',
    status: 'ready',
    previewKey: 'ds-button-builder',
    code: '',
    note: 'Лучший формат для дизайн-ревью и QA: один сценарий сразу покрывает все пропсы компонента и помогает быстро проверить доступность icon-only режима.',
  },
  {
    id: 'button-variants',
    title: 'Variants and sizes',
    description: 'Показываем отдельно визуальные `variant`-паттерны и semantic `tone`, чтобы быстрее выбрать правильную форму CTA и нужный цветовой интент.',
    status: 'ready',
    previewKey: 'ds-button-variants',
    code: `<script setup lang="ts">
import { DsButton, type DsButtonTone, type DsButtonVariant } from '@feugene/granularity'

const variantRows = [
  { value: 'primary', label: 'Primary', note: 'Главный filled CTA.' },
  { value: 'secondary', label: 'Secondary', note: 'Мягкая tinted-поверхность.' },
  { value: 'outline', label: 'Outline', note: 'Контурный акцент.' },
  { value: 'ghost', label: 'Ghost', note: 'Минимальный action-weight.' },
  { value: 'ghost-border', label: 'Ghost border', note: 'Ghost с проявляющейся границей.' },
] satisfies Array<{ value: DsButtonVariant, label: string, note: string }>

const toneRows = [
  { value: 'primary', label: 'Primary', note: 'Брендовый базовый тон.' },
  { value: 'success', label: 'Success', note: 'Подтверждения и позитивные действия.' },
  { value: 'warning', label: 'Warning', note: 'Осторожные действия и review-flow.' },
  { value: 'danger', label: 'Danger', note: 'Рискованные и необратимые действия.' },
  { value: 'info', label: 'Info', note: 'Информационные CTA.' },
  { value: 'neutral', label: 'Neutral', note: 'Нейтральные secondary и toolbar actions.' },
] satisfies Array<{ value: DsButtonTone, label: string, note: string }>

const sizeOptions = ['xs', 'sm', 'md', 'lg']
</script>

<template>
  <div class="grid gap-4">
    <div class="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-sm text-[var(--muted-foreground)]">
      Visual variant отвечает за способ окраски, а semantic tone — за цветовую роль, которую variant применяет к кнопке.
    </div>

    <div
      v-for="item in variantRows"
      :key="item.value"
      class="grid gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 lg:grid-cols-[minmax(0,180px)_minmax(0,1fr)] lg:items-center"
    >
      <div class="grid gap-1">
        <div class="text-sm font-semibold">{{ item.label }}</div>
        <div class="text-sm text-[var(--muted-foreground)]">{{ item.note }}</div>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <DsButton
          v-for="size in sizeOptions"
          :key="item.value + '-' + size"
          :variant="item.value"
          tone="primary"
          :size="size"
        >
          {{ size.toUpperCase() }}
        </DsButton>
      </div>
    </div>

    <div
      v-for="item in toneRows"
      :key="item.value"
      class="grid gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 lg:grid-cols-[minmax(0,180px)_minmax(0,1fr)] lg:items-center"
    >
      <div class="grid gap-1">
        <div class="text-sm font-semibold">{{ item.label }}</div>
        <div class="text-sm text-[var(--muted-foreground)]">{{ item.note }}</div>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <DsButton variant="primary" :tone="item.value" size="sm">Filled</DsButton>
        <DsButton variant="secondary" :tone="item.value" size="sm">Soft</DsButton>
        <DsButton variant="outline" :tone="item.value" size="sm">Outline</DsButton>
        <DsButton variant="ghost" :tone="item.value" size="sm">Ghost</DsButton>
      </div>
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
