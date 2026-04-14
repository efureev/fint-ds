<script setup lang="ts">
import { DsButton, type DsButtonTone, type DsButtonVariant } from '@feugene/granularity'

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
] satisfies Array<{ value: DsButtonVariant, label: string, note: string }>

const toneRows = [
  {
    value: 'primary',
    label: 'Primary',
    note: 'Основной брендовый тон из `--primary`.',
  },
  {
    value: 'success',
    label: 'Success',
    note: 'Подтверждения и позитивные действия.',
  },
  {
    value: 'warning',
    label: 'Warning',
    note: 'Осторожные действия и этапы ревью.',
  },
  {
    value: 'danger',
    label: 'Danger',
    note: 'Рискованные и необратимые действия.',
  },
  {
    value: 'info',
    label: 'Info',
    note: 'Информационные акценты и soft CTA.',
  },
  {
    value: 'neutral',
    label: 'Neutral',
    note: 'Нейтральные toolbar- и secondary-действия.',
  },
  {
    value: 'slate',
    label: 'Slate',
    note: 'Сдержанный tone для utilitarian actions и B2B-поверхностей.',
  },
  {
    value: 'azure',
    label: 'Azure',
    note: 'Холодный informational tone, отделённый от brand-primary.',
  },
] satisfies Array<{ value: DsButtonTone, label: string, note: string }>

const sizeOptions = ['xs', 'sm', 'md', 'lg'] as const
</script>

<template>
  <div class="grid gap-4">
    <div class="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-sm text-[var(--muted-foreground)]">
      `variant` определяет, как тон применяется к кнопке, а `tone` — каким цветом variant окрашивает фон, текст и
      границу.
    </div>

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
            tone="primary"
            :size="size"
          >
            {{ size.toUpperCase() }}
          </DsButton>
        </div>
      </div>
    </div>

    <div class="grid gap-3">
      <div
        v-for="item in toneRows"
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
          <DsButton variant="primary" :tone="item.value" size="sm">
            Filled
          </DsButton>
          <DsButton variant="secondary" :tone="item.value" size="sm">
            Soft
          </DsButton>
          <DsButton variant="outline" :tone="item.value" size="sm">
            Outline
          </DsButton>
          <DsButton variant="ghost" :tone="item.value" size="sm">
            Ghost
          </DsButton>
        </div>
      </div>
    </div>
  </div>
</template>