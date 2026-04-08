<script setup lang="ts">
import { computed, ref } from 'vue'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

import { useFintI18n } from '@feugene/fint-i18n'

const { t } = useFintI18n()

const menuClicks = ref(0)

const navbarPropsInfo = [
  {
    name: 'title',
    type: 'string',
    description: 'Заголовок navbar (если не переопределён slot #title).',
  },
  {
    name: 'showMenuButton',
    type: 'boolean',
    default: 'false',
    description: 'Показывает кнопку меню слева. При клике эмитит событие menu.',
  },
  {
    name: 'menuButtonClass',
    type: 'string',
    default: "''",
    description: 'Дополнительные классы для кнопки меню (например `sm:hidden`).',
  },
] as const

const navbarSlotsInfo = [
  {
    name: 'slot (title)',
    type: 'slot',
    description: 'Кастомный заголовок navbar (заменяет prop title).',
  },
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Правая часть navbar (actions: кнопки/селекты и т.п.).',
  },
] as const

const navbarEventsInfo = [
  {
    name: '@menu',
    type: '() => void',
    description: 'Срабатывает при клике по кнопке меню (если showMenuButton=true).',
  },
] as const

const breadcrumbsPropsInfo = [
  {
    name: 'items',
    type: 'Array<{ label: string; to?: string }>',
    description: 'Массив хлебных крошек. Если to не передан — рендерится span, иначе router-link.',
  },
] as const

const crumbs = computed(() => {
  return [
    { label: t('playground.navigation.crumbHome', 'Home'), to: '/' },
    { label: t('playground.navigation.crumbSection', 'Components'), to: '/components' },
    { label: t('playground.navigation.crumbCurrent', 'Navigation') },
  ]
})

const usageCode = `<script setup lang="ts">
import { computed } from 'vue'

const crumbs = computed(() => [
  { label: 'Home', to: '/' },
  { label: 'Components', to: '/components' },
  { label: 'Navigation' },
])
</scr${'ipt'}>

<template>
  <DsNavbar title="Page title" show-menu-button>
    <DsButton size="sm" variant="outline">Action</DsButton>
  </DsNavbar>

  <DsBreadcrumbs :items="crumbs" />
</template>
`
</script>

<template>
  <PlaygroundPage
    :title="t('playground.navigation.title', 'Navbar & Breadcrumbs')"
    :description="t('playground.navigation.lead', 'Navigation building blocks.')"
  >
    <template #ui>
      <div class="grid gap-4">
        <DsCard class="p-0 overflow-hidden">
          <DsNavbar :title="t('playground.navigation.navTitle', 'Page title')" show-menu-button @menu="menuClicks += 1">
            <DsButton size="sm" variant="outline">{{ t('playground.navigation.navAction', 'Action') }}</DsButton>
          </DsNavbar>
          <div class="p-5 grid gap-3">
            <DsBreadcrumbs :items="crumbs" />
            <div class="text-sm ds-muted">{{ t('playground.navigation.menuClicks', 'Menu clicks') }}: {{ menuClicks }}</div>
          </div>
        </DsCard>

        <DsCard class="p-5">
          <div class="text-sm font-600">DsBreadcrumbs</div>
          <div class="mt-3">
            <DsBreadcrumbs
              :items="[
                { label: t('playground.navigation.crumbHome', 'Home') },
                { label: t('playground.navigation.crumbSection', 'Components') },
                { label: t('playground.navigation.crumbCurrent', 'Navigation') },
              ]"
            />
          </div>
        </DsCard>
      </div>
    </template>

    <template #usage>
      <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsNavbar — Props" :items="navbarPropsInfo" />
      <PlaygroundProps title="DsNavbar — Slots" :items="navbarSlotsInfo" />
      <PlaygroundProps title="DsNavbar — Events" :items="navbarEventsInfo" />
      <PlaygroundProps title="DsBreadcrumbs — Props" :items="breadcrumbsPropsInfo" />
    </template>
  </PlaygroundPage>
</template>
