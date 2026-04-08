<script setup lang="ts">
import { computed, ref } from 'vue'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

const navItems = [
  { label: 'Home', value: 'home' },
  { label: 'Accounts', value: 'accounts' },
  { label: 'Budget', value: 'budget' },
  { label: 'Profile', value: 'profile' },
] as const

const activeItem = ref<(typeof navItems)[number]['value']>('home')

const activeLabel = computed(() => {
  return navItems.find(item => item.value === activeItem.value)?.label ?? activeItem.value
})

const bottomNavPropsInfo = [
  {
    name: 'v-model / modelValue',
    type: 'string',
    description: 'Текущее значение активного пункта.',
  },
  {
    name: 'items',
    type: 'Array<{ label: string; value: string }>',
    description: 'Список пунктов нижней навигации.',
  },
] as const

const bottomNavEventsInfo = [
  {
    name: '@update:modelValue',
    type: '(value: string) => void',
    description: 'Эмитится при выборе пункта навигации.',
  },
] as const

const usageCode = computed(() => `<script setup lang="ts">
import { ref } from 'vue'

const current = ref('${activeItem.value}')

const items = [
  { label: 'Home', value: 'home' },
  { label: 'Accounts', value: 'accounts' },
  { label: 'Budget', value: 'budget' },
  { label: 'Profile', value: 'profile' },
]
</scr${'ipt'}>

<template>
  <DsBottomNav v-model="current" :items="items" />
</template>`)
</script>

<template>
  <PlaygroundPage
    title="DsBottomNav"
    description="Нижняя навигация для переключения между основными разделами мобильного приложения. Компонент рассчитан на mobile и управляет активным пунктом через `v-model`."
  >
    <template #ui>
      <div class="grid gap-4">
        <DsCard class="grid gap-4 p-5">
          <div class="flex flex-wrap items-center gap-2">
            <span class="inline-flex items-center rounded-full bg-[var(--primary)]/10 px-2.5 py-1 text-xs font-700 text-[var(--primary)]">
              Mobile only
            </span>
            <span class="text-sm ds-muted">
              Используйте `DsBottomNav` как основную навигацию между ключевыми разделами приложения на мобильных экранах.
            </span>
          </div>

          <div class="text-sm ds-muted">
            Компонент по умолчанию фиксируется у нижнего края экрана и отображается только ниже брейкпоинта `sm`, то есть на ширине меньше `640px`. На `640px` и выше он скрывается. В playground ниже он показан в статичном режиме для удобства просмотра.
          </div>

          <div class="mx-auto w-full max-w-[380px] overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--card)] shadow-[var(--ds-shadow-1)]">
            <div class="grid min-h-[280px] gap-3 p-5 pb-6">
              <div class="text-xs uppercase tracking-[0.12em] ds-muted">Mobile preview</div>
              <div>
                <div class="text-lg font-700">{{ activeLabel }}</div>
                <div class="mt-1 text-sm ds-muted">Активный раздел: {{ activeItem }}</div>
              </div>
              <div class="grid gap-2 rounded-[20px] bg-[var(--muted)]/50 p-4 text-sm ds-muted">
                <span>Сюда можно поместить основное содержимое мобильного экрана.</span>
                <span>Ниже — нижняя навигация, привязанная к `v-model`.</span>
              </div>
            </div>

            <DsBottomNav
              v-model="activeItem"
              :items="navItems"
              class="!static left-auto right-auto top-auto bottom-auto sm:!block"
            />
          </div>
        </DsCard>

        <DsCard class="grid gap-3 p-5 md:grid-cols-[220px_1fr] md:items-center">
          <span class="text-sm ds-muted">active item</span>
          <DsSelect v-model="activeItem" :options="navItems" />

          <span class="text-sm ds-muted">modelValue</span>
          <div class="text-sm font-600">{{ activeItem }}</div>
        </DsCard>
      </div>
    </template>

    <template #usage>
      <pre class="m-0 overflow-auto rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsBottomNav — Props" :items="bottomNavPropsInfo" />
      <PlaygroundProps title="DsBottomNav — Events" :items="bottomNavEventsInfo" />
    </template>
  </PlaygroundPage>
</template>