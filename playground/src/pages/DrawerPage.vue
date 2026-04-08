<script setup lang="ts">
import { ref } from 'vue'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

const open = ref(false)

const name = ref('')
const email = ref('')

const side = ref<'left' | 'right'>('right')
const size = ref<'sm' | 'md' | 'lg' | 'full'>('md')
const closeOnBackdrop = ref(true)

const sideOptions = [
  { value: 'left', label: 'left' },
  { value: 'right', label: 'right' },
] as const

const sizeOptions = [
  { value: 'sm', label: 'sm' },
  { value: 'md', label: 'md' },
  { value: 'lg', label: 'lg' },
  { value: 'full', label: 'full' },
] as const

const drawerPropsInfo = [
  {
    name: 'v-model / modelValue',
    type: 'boolean',
    description: 'Открытие/закрытие drawer (управляемый компонент).',
  },
  {
    name: 'title',
    type: 'string | undefined',
    description: 'Заголовок. Если не задан — используется дефолт (Drawer).',
  },
  {
    name: 'closeOnBackdrop',
    type: 'boolean',
    default: 'true',
    description: 'Закрывать при клике по фону. ESC закрывает всегда.',
  },
  {
    name: 'side',
    type: "'left' | 'right'",
    default: "'right'",
    description: 'Сторона появления drawer.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg' | 'full'",
    default: "'md'",
    description: 'Ширина drawer-панели.',
  },
] as const

const drawerSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Контент drawer.',
  },
  {
    name: 'slot (title)',
    type: 'slot',
    description: 'Кастомный заголовок (вместо пропса title).',
  },
  {
    name: 'slot (footer)',
    type: 'slot',
    description: 'Футер (например, кнопки действий).',
  },
] as const

const drawerEventsInfo = [
  {
    name: '@update:modelValue',
    type: '(value: boolean) => void',
    description: 'Эмитится при закрытии (и при любом изменении modelValue через компонент).',
  },
] as const

const usageCode = `<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</scr${'ipt'}>

<template>
  <DsButton @click="open = true">Open drawer</DsButton>

  <DsDrawer v-model="open" title="Settings" side="right" size="md">
    Drawer content

    <template #footer>
      <div class="flex justify-end gap-2">
        <DsButton variant="outline" @click="open = false">Cancel</DsButton>
        <DsButton variant="primary" @click="open = false">Save</DsButton>
      </div>
    </template>
  </DsDrawer>
</template>
`
</script>

<template>
  <PlaygroundPage title="Drawer" description="Боковая панель на базе HeadlessUI Dialog: ESC, фокус-ловушка, оверлей.">
    <template #ui>
      <DsCard class="p-5 grid gap-6">
        <div class="grid gap-3">
          <div class="text-sm font-600">Controls</div>
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex items-center gap-2">
              <span class="text-sm ds-muted">side:</span>
              <DsSelect v-model="side" view="link" :options="sideOptions" aria-label="Side" />
            </div>

            <div class="flex items-center gap-2">
              <span class="text-sm ds-muted">size:</span>
              <DsSelect v-model="size" view="link" :options="sizeOptions" aria-label="Size" />
            </div>

            <div class="flex items-center gap-3">
              <DsSwitch v-model="closeOnBackdrop" size="sm" />
              <span class="text-sm ds-muted">closeOnBackdrop</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <DsButton @click="open = true">Open drawer</DsButton>
          <span class="text-sm ds-muted">ESC закрывает всегда</span>
        </div>

        <DsDrawer v-model="open" title="Drawer title" :side="side" :size="size" :close-on-backdrop="closeOnBackdrop">
          <div class="grid gap-3">
            <div class="text-sm font-700">Content</div>
            <div class="text-sm ds-muted">
              Пример контента drawer. Если контента много — появится скролл внутри панели.
            </div>

            <div class="grid gap-2">
              <DsInput v-model="name" label="Name" placeholder="John" />
              <DsInput v-model="email" label="Email" placeholder="john@example.com" type="email" autocomplete="email" />
            </div>
          </div>

          <template #footer>
            <div class="flex justify-end gap-2">
              <DsButton variant="outline" @click="open = false">Cancel</DsButton>
              <DsButton variant="primary" @click="open = false">Save</DsButton>
            </div>
          </template>
        </DsDrawer>
      </DsCard>
    </template>

    <template #usage>
      <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsDrawer — Props" :items="drawerPropsInfo" />
      <PlaygroundProps title="DsDrawer — Slots" :items="drawerSlotsInfo" />
      <PlaygroundProps title="DsDrawer — Events" :items="drawerEventsInfo" />
    </template>
  </PlaygroundPage>
</template>
