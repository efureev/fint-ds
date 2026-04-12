import type { ShowcaseComponentExampleDoc } from '../types'

export const dsBadgeExamples: ShowcaseComponentExampleDoc[] = [
  {
    id: 'badge-variant-scale',
    title: 'Light and dark semantic variants',
    description: 'Первый сценарий нужен как справочник по semantic palette: light и filled (`dark`) режимы удобно сравнить бок о бок.',
    status: 'ready',
    previewKey: 'ds-badge-variant-scale',
    code: `<script setup lang="ts">
import { DsBadge } from '@feugene/granularity'
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <DsBadge>Neutral</DsBadge>
    <DsBadge variant="primary">Primary</DsBadge>
    <DsBadge variant="info">Info</DsBadge>
    <DsBadge variant="success">Success</DsBadge>
    <DsBadge variant="warning">Warning</DsBadge>
    <DsBadge variant="danger">Danger</DsBadge>
  </div>
</template>`,
  },
  {
    id: 'badge-size-radius',
    title: 'Size and radius combinations',
    description: 'Отдельно выделяем `size` и `radius`, чтобы quickly show pill/semi/square badges для table cells, filters и inline labels.',
    status: 'ready',
    previewKey: 'ds-badge-size-radius',
    code: `<script setup lang="ts">
import { DsBadge } from '@feugene/granularity'
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <DsBadge size="sm" variant="success" radius="square">sm square</DsBadge>
    <DsBadge size="md" variant="warning" radius="semi">md semi</DsBadge>
    <DsBadge size="lg" variant="info" radius="round">lg round</DsBadge>
  </div>
</template>`,
  },
  {
    id: 'badge-toolbar-filters',
    title: 'Badges inside action toolbars',
    description: 'Компонент часто используется не сам по себе, а как secondary marker внутри toolbar/filter buttons. Этот сценарий показывает composition-паттерн.',
    status: 'ready',
    previewKey: 'ds-badge-toolbar-filters',
    code: `<script setup lang="ts">
import { DsBadge, DsButton, DsButtonGroup } from '@feugene/granularity'
</script>

<template>
  <DsButtonGroup aria-label="Filter pipelines">
    <DsButton variant="outline">
      Failed
      <DsBadge class="ml-2" size="sm" radius="semi" dark>3</DsBadge>
    </DsButton>
    <DsButton variant="outline">
      Needs review
      <DsBadge class="ml-2" size="sm" variant="warning" radius="semi">7</DsBadge>
    </DsButton>
  </DsButtonGroup>
</template>`,
  },
]
