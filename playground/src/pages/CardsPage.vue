<script setup lang="ts">
import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

import { useFintI18n } from '@feugene/fint-i18n'

const { t } = useFintI18n()

const cardSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Содержимое карточки. Отступы обычно задаются через class (p-4/p-5).',
  },
] as const

const listPropsInfo = [
  {
    name: 'divided',
    type: 'boolean',
    default: 'true',
    description: 'Включает/выключает разделители между элементами.',
  },
] as const

const listSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Элементы списка (обычно `DsListItem`).',
  },
] as const

const listItemPropsInfo = [
  {
    name: 'title',
    type: 'string',
    description: 'Заголовок строки.',
  },
  {
    name: 'description',
    type: 'string | undefined',
    description: 'Описание строки (опционально).',
  },
] as const

const listItemSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Правая часть строки (кнопка/бейдж/ссылка и т.п.).',
  },
] as const

const chartContainerPropsInfo = [
  {
    name: 'title',
    type: 'string',
    description: 'Заголовок контейнера.',
  },
  {
    name: 'description',
    type: 'string | undefined',
    description: 'Описание (опционально).',
  },
  {
    name: 'height',
    type: 'string',
    default: "'220px'",
    description: 'Высота области контента/плейсхолдера.',
  },
] as const

const chartContainerSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Контент графика. Если слот не передан — показывается текстовый плейсхолдер.',
  },
  {
    name: 'slot (actions)',
    type: 'slot',
    description: 'Опциональные actions в заголовке (например, кнопка/селект).',
  },
] as const

const usageCode = `<template>
  <DsCard class="p-5">
    <div class="text-sm font-700">Title</div>
    <p class="text-sm ds-muted mt-1">Description</p>
  </DsCard>

  <DsChartContainer title="Chart" description="Placeholder">
    <div class="h-[140px]" />
  </DsChartContainer>

  <DsList>
    <DsListItem title="Item" description="Description">
      <DsBadge variant="info">Meta</DsBadge>
    </DsListItem>
  </DsList>
</template>
`
</script>

<template>
  <PlaygroundPage
    :title="t('playground.cards.title', 'Cards')"
    :description="t('playground.cards.lead', 'Card surfaces and card-based components.')"
  >
    <template #ui>
      <div class="grid gap-4">
        <DsCard class="p-5">
          <div class="text-[14px] font-700">{{ t('playground.cards.basicTitle', 'Basic card') }}</div>
          <p class="mt-1 text-[13px] ds-muted max-w-2xl">
            {{ t('playground.cards.basicText', 'Use cards to group content and keep background/spacing consistent.') }}
          </p>
          <div class="mt-4 flex flex-wrap gap-2">
            <DsButton size="sm">{{ t('playground.cards.primaryAction', 'Primary action') }}</DsButton>
            <DsButton size="sm" variant="outline">{{ t('playground.cards.secondaryAction', 'Secondary') }}</DsButton>
          </div>
        </DsCard>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DsChartContainer
            :title="t('playground.cards.chartTitle', 'Chart container')"
            :description="t('playground.cards.chartDesc', 'Placeholder area for charts.')"
          >
            <div
              class="h-[140px] rounded-[var(--ds-radius-md)] border border-dashed border-[var(--border)] bg-[var(--muted)]"
            />
          </DsChartContainer>

          <DsList>
            <DsListItem
              :title="t('playground.cards.listItem1Title', 'List item')"
              :description="t('playground.cards.listItem1Desc', 'Description text')"
            >
              <DsButton size="sm" variant="outline">{{ t('playground.cards.listAction', 'Action') }}</DsButton>
            </DsListItem>
            <DsListItem
              :title="t('playground.cards.listItem2Title', 'Another item')"
              :description="t('playground.cards.listItem2Desc', 'Secondary description')"
            >
              <DsBadge variant="info">{{ t('playground.cards.listMeta', 'Meta') }}</DsBadge>
            </DsListItem>
            <DsListItem
              :title="t('playground.cards.listItem3Title', 'Third item')"
              :description="t('playground.cards.listItem3Desc', 'With a number')"
            >
              <span class="text-sm font-mono">42</span>
            </DsListItem>
          </DsList>
        </div>
      </div>
    </template>

    <template #usage>
      <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsCard — Slots" :items="cardSlotsInfo" />
      <PlaygroundProps title="DsList — Props" :items="listPropsInfo" />
      <PlaygroundProps title="DsList — Slots" :items="listSlotsInfo" />
      <PlaygroundProps title="DsListItem — Props" :items="listItemPropsInfo" />
      <PlaygroundProps title="DsListItem — Slots" :items="listItemSlotsInfo" />
      <PlaygroundProps title="DsChartContainer — Props" :items="chartContainerPropsInfo" />
      <PlaygroundProps title="DsChartContainer — Slots" :items="chartContainerSlotsInfo" />
    </template>
  </PlaygroundPage>
</template>
