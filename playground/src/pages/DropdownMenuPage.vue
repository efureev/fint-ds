<script setup lang="ts">
import { ref } from 'vue'

import IconBell from '~icons/lucide/bell'
import IconHome from '~icons/lucide/home'
import IconLogout from '~icons/lucide/log-out'
import IconSearch from '~icons/lucide/search'
import IconSettings from '~icons/lucide/settings'
import IconUser from '~icons/lucide/user'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

const closeOnContentClick = ref(true)
const align = ref<'left' | 'right' | 'center'>('right')
const width = ref<'auto' | '20' | '48' | '60' | '64' | '80'>('48')

const dividers = ref(false)
const borderTop = ref(false)
const borderBottom = ref(false)

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

const dropdownMenuPropsInfo = [
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
    description: 'Закрывать меню при клике по контенту (внутри).',
  },
  {
    name: 'contentClass',
    type: 'string',
    default: "'p-0'",
    description: 'Классы контейнера контента (по умолчанию padding обнулён).',
  },
  {
    name: 'dividers',
    type: 'boolean',
    default: 'false',
    description: 'Добавить разделители между прямыми детьми (реализовано через обёртку-список).',
  },
  {
    name: 'borderTop',
    type: 'boolean',
    default: 'false',
    description: 'Добавить верхнюю границу у списка.',
  },
  {
    name: 'borderBottom',
    type: 'boolean',
    default: 'false',
    description: 'Добавить нижнюю границу у списка.',
  },
  {
    name: 'listClass',
    type: 'string',
    default: "''",
    description: 'Дополнительные классы для обёртки списка (`DsDropdownMenuList`).',
  },
] as const

const dropdownMenuSlotsInfo = [
  {
    name: 'slot (trigger)',
    type: 'slot',
    description: 'Триггер. Slot-props: `open`, `toggle()`, `close()`.',
  },
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Содержимое меню. Обычно это `DsDropdownMenu{Group,Item,Divider,Columns,...}`.',
  },
] as const

const usageCode = `<template>
  <DsDropdownMenu align="right" width="48" :dividers="true">
    <template #trigger="{ open }">
      <DsButton variant="outline" :aria-expanded="open" aria-haspopup="menu">Menu</DsButton>
    </template>

    <DsDropdownMenuGroup title="Account">
      <DsDropdownMenuItem>Profile</DsDropdownMenuItem>
      <DsDropdownMenuItem>Settings</DsDropdownMenuItem>
    </DsDropdownMenuGroup>

    <DsDropdownMenuDivider />

    <DsDropdownMenuItem variant="danger">
      <IconLogout class="h-4 w-4" aria-hidden="true" />
      Logout
    </DsDropdownMenuItem>
  </DsDropdownMenu>
</template>
`
</script>

<template>
  <PlaygroundPage
    title="Dropdown menu"
    description="Готовое меню на базе DsDropdown: список, группы, разделители и колонки. Используйте его вместо ручной вёрстки контента внутри DsDropdown."
  >
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

            <div class="flex items-center gap-3">
              <DsSwitch v-model="dividers" size="sm" />
              <span class="text-sm ds-muted">dividers</span>
            </div>

            <div class="flex items-center gap-3">
              <DsSwitch v-model="borderTop" size="sm" />
              <span class="text-sm ds-muted">borderTop</span>
            </div>

            <div class="flex items-center gap-3">
              <DsSwitch v-model="borderBottom" size="sm" />
              <span class="text-sm ds-muted">borderBottom</span>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <DsDropdownMenu
            :align="align"
            :width="width"
            :close-on-content-click="closeOnContentClick"
            :dividers="dividers"
            :border-top="borderTop"
            :border-bottom="borderBottom"
          >
            <template #trigger="{ open }">
              <DsButton variant="outline" :aria-expanded="open" aria-haspopup="menu">Open menu</DsButton>
            </template>

            <DsDropdownMenuGroup title="Account">
              <DsDropdownMenuItem>Profile</DsDropdownMenuItem>
              <DsDropdownMenuItem>Settings</DsDropdownMenuItem>
            </DsDropdownMenuGroup>

            <DsDropdownMenuDivider />

            <DsDropdownMenuGroup title="Icons (DsLink)" :uppercase="false">
              <div class="px-4 py-2.5">
                <div class="flex items-center gap-2">
                  <DsLink
                    href="#"
                    underline="none"
                    aria-label="Home"
                    class="p-2 hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
                    @click.prevent
                  >
                    <IconHome class="h-4 w-4" aria-hidden="true" />
                  </DsLink>
                  <DsLink
                    href="#"
                    underline="none"
                    aria-label="Search"
                    class="p-2 hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
                    @click.prevent
                  >
                    <IconSearch class="h-4 w-4" aria-hidden="true" />
                  </DsLink>
                  <DsLink
                    href="#"
                    underline="none"
                    aria-label="Notifications"
                    class="p-2 hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
                    @click.prevent
                  >
                    <IconBell class="h-4 w-4" aria-hidden="true" />
                  </DsLink>
                  <DsLink
                    href="#"
                    underline="none"
                    aria-label="Profile"
                    class="p-2 hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
                    @click.prevent
                  >
                    <IconUser class="h-4 w-4" aria-hidden="true" />
                  </DsLink>
                  <DsLink
                    href="#"
                    underline="none"
                    aria-label="Settings"
                    class="p-2 hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
                    @click.prevent
                  >
                    <IconSettings class="h-4 w-4" aria-hidden="true" />
                  </DsLink>
                </div>
              </div>
            </DsDropdownMenuGroup>

            <DsDropdownMenuDivider />

            <DsDropdownMenuGroup title="Icons (DsButton)" :uppercase="false">
              <div class="px-4 py-2.5">
                <div class="flex items-center gap-2">
                  <DsButton variant="ghost" size="sm" square aria-label="Home">
                    <IconHome class="h-4 w-4" aria-hidden="true" />
                  </DsButton>
                  <DsButton variant="ghost" size="sm" square aria-label="Search">
                    <IconSearch class="h-4 w-4" aria-hidden="true" />
                  </DsButton>
                  <DsButton variant="ghost" size="sm" square aria-label="Notifications">
                    <IconBell class="h-4 w-4" aria-hidden="true" />
                  </DsButton>
                  <DsButton variant="ghost" size="sm" square aria-label="Profile">
                    <IconUser class="h-4 w-4" aria-hidden="true" />
                  </DsButton>
                  <DsButton variant="ghost" size="sm" square aria-label="Settings">
                    <IconSettings class="h-4 w-4" aria-hidden="true" />
                  </DsButton>
                </div>
              </div>
            </DsDropdownMenuGroup>

            <DsDropdownMenuDivider />

            <DsDropdownMenuColumns :cols="2">
              <DsDropdownMenuColumn align="left">
                <div class="grid gap-1">
                  <div class="text-xs ds-muted">Shortcuts</div>
                  <div class="text-sm">⌘K</div>
                </div>
              </DsDropdownMenuColumn>
              <DsDropdownMenuColumn align="left">
                <div class="grid gap-1">
                  <div class="text-xs ds-muted">Help</div>
                  <div class="text-sm">F1</div>
                </div>
              </DsDropdownMenuColumn>
            </DsDropdownMenuColumns>

            <DsDropdownMenuDivider />

            <DsDropdownMenuItem variant="danger">
              <IconLogout class="h-4 w-4" aria-hidden="true" />
              Logout
            </DsDropdownMenuItem>
          </DsDropdownMenu>

          <span class="text-sm ds-muted">Попробуйте: клик вне / ESC</span>
        </div>
      </DsCard>
    </template>

    <template #usage>
      <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsDropdownMenu — Props" :items="dropdownMenuPropsInfo" />
      <PlaygroundProps title="DsDropdownMenu — Slots" :items="dropdownMenuSlotsInfo" />
    </template>
  </PlaygroundPage>
</template>
