<script setup lang="ts">
import { ref } from 'vue'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

const closeOnContentClick = ref(true)
const align = ref<'left' | 'right' | 'center'>('right')
const width = ref<'auto' | '20' | '48' | '60' | '64' | '80'>('48')

const alignOptions = [
  { value: 'left', label: 'left' },
  { value: 'center', label: 'center' },
  { value: 'right', label: 'right' },
] as const

const widthOptions = [
  { value: 'auto', label: 'auto' },
  { value: '20', label: '20' },
  { value: '48', label: '48' },
  { value: '60', label: '60' },
  { value: '64', label: '64' },
  { value: '80', label: '80' },
] as const

const dropdownPropsInfo = [
  {
    name: 'align',
    type: "'left' | 'right' | 'center'",
    default: "'right'",
    description: 'Выравнивание контента относительно триггера.',
  },
  {
    name: 'width',
    type: "'auto' | '20' | '48' | '60' | '64' | '80'",
    default: "'48'",
    description: 'Ширина контента (Tailwind w-*).',
  },
  {
    name: 'closeOnContentClick',
    type: 'boolean',
    default: 'true',
    description: 'Закрывать dropdown при клике по контенту (внутри).',
  },
  {
    name: 'contentClass',
    type: 'string',
    default: "''",
    description: 'Дополнительные классы для контейнера контента.',
  },
] as const

const dropdownSlotsInfo = [
  {
    name: 'slot (trigger)',
    type: 'slot',
    description: 'Триггер. Slot-props: `open`, `toggle()`, `close()`.',
  },
  {
    name: 'slot (content)',
    type: 'slot',
    description: 'Контент dropdown. Slot-props: `close()`.',
  },
] as const

const usageCode = `<template>
  <DsDropdown align="right" width="48">
    <template #trigger="{ open }">
      <DsButton variant="outline" :aria-expanded="open">Menu</DsButton>
    </template>

    <template #content>
      <button type="button" class="w-full text-left px-3 py-2 rounded-[10px] hover:bg-[var(--muted)]">Profile</button>
      <button type="button" class="w-full text-left px-3 py-2 rounded-[10px] hover:bg-[var(--muted)]">Settings</button>
      <button type="button" class="w-full text-left px-3 py-2 rounded-[10px] hover:bg-[var(--muted)]">Logout</button>
    </template>
  </DsDropdown>
</template>
`
</script>

<template>
  <PlaygroundPage title="Dropdown" description="Небольшой popover-меню блок: клик по триггеру, закрытие по клику вне и по ESC.">
    <template #ui>
      <DsCard class="p-5 grid gap-6">
        <div class="grid gap-3">
          <div class="text-sm font-600">Controls</div>
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex items-center gap-2">
              <span class="text-sm ds-muted">align:</span>
              <DsSelect v-model="align" view="link" :options="alignOptions" aria-label="Align" />
            </div>

            <div class="flex items-center gap-2">
              <span class="text-sm ds-muted">width:</span>
              <DsSelect v-model="width" view="link" :options="widthOptions" aria-label="Width" />
            </div>

            <div class="flex items-center gap-3">
              <DsSwitch v-model="closeOnContentClick" size="sm" />
              <span class="text-sm ds-muted">closeOnContentClick</span>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <DsDropdown :align="align" :width="width" :close-on-content-click="closeOnContentClick">
            <template #trigger="{ open }">
              <DsButton variant="outline" :aria-expanded="open" aria-haspopup="menu">Open dropdown</DsButton>
            </template>

            <template #content="{ close }">
              <div class="grid">
                <button
                  type="button"
                  class="w-full text-left px-3 py-2 rounded-[10px] hover:bg-[var(--muted)]"
                >
                  Profile
                </button>
                <button
                  type="button"
                  class="w-full text-left px-3 py-2 rounded-[10px] hover:bg-[var(--muted)]"
                >
                  Settings
                </button>
                <button
                  type="button"
                  class="w-full text-left px-3 py-2 rounded-[10px] hover:bg-[var(--muted)]"
                  @click="close"
                >
                  Close (manual)
                </button>
              </div>
            </template>
          </DsDropdown>

          <span class="text-sm ds-muted">Попробуйте: клик вне / ESC</span>
        </div>
      </DsCard>
    </template>

    <template #usage>
      <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsDropdown — Props" :items="dropdownPropsInfo" />
      <PlaygroundProps title="DsDropdown — Slots" :items="dropdownSlotsInfo" />
    </template>
  </PlaygroundPage>
</template>
