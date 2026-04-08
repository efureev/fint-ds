<script setup lang="ts">
import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

const sidebarPropsInfo = [
  {
    name: 'title',
    type: 'string',
    description: 'Заголовок сайдбара.',
  },
  {
    name: 'subtitle',
    type: 'string | undefined',
    description: 'Подзаголовок (опционально).',
  },
] as const

const sidebarSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Контент навигации/сайдбара.',
  },
] as const

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
    description: 'Правая часть строки (например, кнопка/бейдж/ссылка).',
  },
] as const

const usageCode = `<template>
  <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 items-start">
    <DsSidebar title="Sidebar" subtitle="Demo">
      <DsLink href="https://example.com" underline="none">Dashboard</DsLink>
    </DsSidebar>

    <DsCard class="p-5">Content</DsCard>
  </div>
</template>
`
</script>

<template>
  <PlaygroundPage title="Layout" description="DsCard / DsList / DsSidebar.">
    <template #ui>
      <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 items-start">
        <DsSidebar title="Sidebar" subtitle="Demo">
          <div class="grid gap-1">
            <DsLink href="https://example.com" variant="default" underline="none">Dashboard</DsLink>
            <DsLink href="https://example.com" variant="muted" underline="none">Transactions</DsLink>
            <DsLink href="https://example.com" variant="muted" underline="none">Settings</DsLink>
          </div>
        </DsSidebar>

        <div class="grid gap-4">
          <DsCard class="p-5">
            <div class="text-sm font-700">DsCard</div>
            <div class="text-sm ds-muted mt-1">Карточка — базовая поверхность для секций/панелей.</div>

            <div class="mt-4 flex flex-wrap gap-2">
              <DsButton>Primary action</DsButton>
              <DsButton variant="outline">Secondary</DsButton>
            </div>
          </DsCard>

          <div class="grid gap-2">
            <div class="text-sm font-700">DsList</div>
            <div class="text-sm ds-muted">
              List + ListItem (title/description + слот справа). `DsList` сам является карточкой.
            </div>

            <DsList>
              <DsListItem title="Item A" description="Some description">
                <DsBadge>New</DsBadge>
              </DsListItem>
              <DsListItem title="Item B" description="Another description">
                <DsButton variant="ghost" size="sm">Edit</DsButton>
              </DsListItem>
              <DsListItem title="Item C">
                <DsLink href="https://example.com" variant="primary" underline="auto">Open</DsLink>
              </DsListItem>
            </DsList>
          </div>
        </div>
      </div>
    </template>

    <template #usage>
      <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsSidebar — Props" :items="sidebarPropsInfo" />
      <PlaygroundProps title="DsSidebar — Slots" :items="sidebarSlotsInfo" />
      <PlaygroundProps title="DsCard — Slots" :items="cardSlotsInfo" />
      <PlaygroundProps title="DsList — Props" :items="listPropsInfo" />
      <PlaygroundProps title="DsList — Slots" :items="listSlotsInfo" />
      <PlaygroundProps title="DsListItem — Props" :items="listItemPropsInfo" />
      <PlaygroundProps title="DsListItem — Slots" :items="listItemSlotsInfo" />
    </template>
  </PlaygroundPage>
</template>
