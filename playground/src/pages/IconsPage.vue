<script setup lang="ts">
import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

import IconPlus from '~icons/lucide/plus'
import IconSettings from '~icons/lucide/settings'
import IconTrash from '~icons/lucide/trash-2'

const iconPropsInfo = [
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg' | number",
    default: "'md'",
    description: 'Размер иконки. Токены маппятся на px, либо можно передать число напрямую.',
  },
] as const

const iconSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'SVG-иконка (обычно из unplugin-icons).',
  },
] as const

const usageCode = `<template>
  <!-- Token sizes -->
  <DsIcon size="sm"><IconPlus aria-hidden="true" /></DsIcon>
  <DsIcon size="md"><IconPlus aria-hidden="true" /></DsIcon>
  <DsIcon size="lg"><IconPlus aria-hidden="true" /></DsIcon>

  <!-- Numeric size -->
  <DsIcon :size="28"><IconSettings aria-hidden="true" /></DsIcon>

  <!-- Inline usage -->
  <span class="inline-flex items-center gap-2">
    <DsIcon size="sm" class="text-[var(--muted-foreground)]"><IconTrash aria-hidden="true" /></DsIcon>
    Delete
  </span>
</template>
`
</script>

<template>
  <PlaygroundPage
    title="Icons"
    description="DsIcon — лёгкая обёртка вокруг SVG-иконок: выравнивание, размер и единый контракт."
  >
    <template #ui>
      <DsCard class="p-5 grid gap-6">
        <div class="grid gap-3">
          <div class="text-sm font-600">Sizes</div>
          <div class="flex items-center gap-4 flex-wrap">
            <div class="flex items-center gap-2">
              <DsIcon size="sm"><IconPlus aria-hidden="true" /></DsIcon>
              <span class="text-xs ds-muted">sm</span>
            </div>
            <div class="flex items-center gap-2">
              <DsIcon size="md"><IconPlus aria-hidden="true" /></DsIcon>
              <span class="text-xs ds-muted">md</span>
            </div>
            <div class="flex items-center gap-2">
              <DsIcon size="lg"><IconPlus aria-hidden="true" /></DsIcon>
              <span class="text-xs ds-muted">lg</span>
            </div>

            <div class="w-6" />

            <div class="flex items-center gap-2">
              <DsIcon :size="28"><IconSettings aria-hidden="true" /></DsIcon>
              <span class="text-xs ds-muted">28</span>
            </div>
          </div>
        </div>

        <div class="grid gap-3">
          <div class="text-sm font-600">Inline alignment</div>
          <div class="grid gap-2 text-sm">
            <div class="inline-flex items-center gap-2">
              <DsIcon size="sm" class="text-[var(--muted-foreground)]">
                <IconTrash aria-hidden="true" />
              </DsIcon>
              <span>Delete</span>
            </div>
            <div class="inline-flex items-center gap-2">
              <span>Settings</span>
              <DsIcon size="sm" class="text-[var(--muted-foreground)]">
                <IconSettings aria-hidden="true" />
              </DsIcon>
            </div>
          </div>
        </div>

        <div class="grid gap-3">
          <div class="text-sm font-600">Icon-only buttons (example)</div>
          <div class="flex items-center gap-2">
            <DsButton square variant="outline" aria-label="Settings">
              <DsIcon size="sm"><IconSettings aria-hidden="true" /></DsIcon>
            </DsButton>
            <DsButton square aria-label="Add">
              <DsIcon size="sm"><IconPlus aria-hidden="true" /></DsIcon>
            </DsButton>
          </div>
        </div>
      </DsCard>
    </template>

    <template #usage>
      <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsIcon — Props" :items="iconPropsInfo" />
      <PlaygroundProps title="DsIcon — Slots" :items="iconSlotsInfo" />
    </template>
  </PlaygroundPage>
</template>
