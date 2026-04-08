<script setup lang="ts">
import { computed, ref } from 'vue'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

const tooltipText = ref('Дополнительная информация о поле')
const iconColor = ref('var(--muted-foreground)')

const tooltipPropsInfo = [
  {
    name: 'text',
    type: 'string',
    default: '—',
    description: 'Plain-text содержимое подсказки.',
  },
  {
    name: 'iconColor',
    type: 'string',
    default: 'var(--muted-foreground)',
    description: 'Цвет иконки/trigger. Можно передать CSS-переменную или hex-значение.',
  },
] as const

const tooltipSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Позволяет переопределить trigger. По умолчанию используется иконка info.',
  },
] as const

const basicUsageCode = `<template>
  <label class="inline-flex items-center gap-2">
    Email
    <DsTooltip text="Мы будем присылать уведомления на этот адрес" />
  </label>
</template>`

const usageCode = computed(() => `<template>
  <DsTooltip text="${tooltipText.value}" icon-color="${iconColor.value}">
    <button type="button" class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted-foreground)]">
      ?
    </button>
  </DsTooltip>
</template>`)
</script>

<template>
  <PlaygroundPage
    title="DsTooltip"
    description="Подсказка с plain-text текстом, которая показывается по наведению на иконку или кастомный trigger."
  >
    <template #ui>
      <DsCard class="grid gap-5 p-5">
        <div class="grid gap-2">
          <span class="text-sm ds-muted">Basic usage</span>
          <div class="flex items-center gap-2 text-sm">
            <span>Email</span>
            <DsTooltip text="Мы будем присылать уведомления на этот адрес" />
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-6">
          <div class="flex items-center gap-2">
            <span class="text-sm ds-muted">Default</span>
            <DsTooltip :text="tooltipText" :icon-color="iconColor" />
          </div>

          <div class="flex items-center gap-2">
            <span class="text-sm ds-muted">Custom trigger</span>
            <DsTooltip text="Можно подставить любой slot" :icon-color="iconColor">
              <button
                type="button"
                class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-current transition-colors hover:bg-[var(--muted)]"
                aria-label="Open tooltip"
              >
                ?
              </button>
            </DsTooltip>
          </div>
        </div>

        <div class="grid gap-3 md:grid-cols-[220px_1fr] md:items-center">
          <span class="text-sm ds-muted">text</span>
          <DsInput v-model="tooltipText" placeholder="Введите plain-text подсказку" />

          <span class="text-sm ds-muted">iconColor</span>
          <DsInput v-model="iconColor" placeholder="var(--muted-foreground) / #64748b" />
        </div>

        <div class="text-sm ds-muted">
          Наведи курсор на иконку или кнопку, чтобы увидеть подсказку.
        </div>
      </DsCard>
    </template>

    <template #usage>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <span class="text-sm ds-muted">Basic usage</span>
          <pre
            class="m-0 overflow-auto rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4"
          ><code class="text-[12px]">{{ basicUsageCode }}</code></pre>
        </div>

        <div class="grid gap-2">
          <span class="text-sm ds-muted">Custom trigger</span>
          <pre
            class="m-0 overflow-auto rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4"
          ><code class="text-[12px]">{{ usageCode }}</code></pre>
        </div>
      </div>
    </template>

    <template #api>
      <PlaygroundProps title="DsTooltip — Props" :items="tooltipPropsInfo" />
      <PlaygroundProps title="DsTooltip — Slots" :items="tooltipSlotsInfo" />
    </template>
  </PlaygroundPage>
</template>