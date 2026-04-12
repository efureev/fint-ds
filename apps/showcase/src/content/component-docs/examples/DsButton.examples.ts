import type { ShowcaseComponentExampleDoc } from '../types'

export const dsButtonExamples: ShowcaseComponentExampleDoc[] = [
  {
    id: 'button-variants',
    title: 'Variants and sizes',
    description: 'Сравниваем визуальные варианты и размеры `DsButton`, чтобы сразу увидеть диапазон базовых action-сценариев.',
    status: 'ready',
    previewKey: 'ds-button-variants',
    code: `<script setup lang="ts">
import { DsButton } from '@feugene/granularity'
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <DsButton variant="primary">Primary</DsButton>
    <DsButton variant="secondary">Secondary</DsButton>
    <DsButton variant="outline">Outline</DsButton>
    <DsButton variant="ghost">Ghost</DsButton>
  </div>

  <div class="mt-3 flex flex-wrap gap-3">
    <DsButton size="xs">XS</DsButton>
    <DsButton size="sm">SM</DsButton>
    <DsButton size="md">MD</DsButton>
    <DsButton size="lg">LG</DsButton>
  </div>
</template>`,
  },
  {
    id: 'button-loading',
    title: 'Loading, disabled and icon-only',
    description: 'Отдельно изолируем состояния, которые чаще всего ломают UX: loading, disabled и square/icon-only режимы.',
    status: 'ready',
    previewKey: 'ds-button-states',
    code: `<script setup lang="ts">
import { ref } from 'vue'

import { DsButton } from '@feugene/granularity'

const isLoading = ref(false)
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <DsButton :loading="isLoading" @click="isLoading = !isLoading">
      Toggle loading
    </DsButton>

    <DsButton variant="outline" disabled>
      Disabled
    </DsButton>

    <DsButton square aria-label="Open settings">
      ⚙
    </DsButton>
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
