<script setup lang="ts">
import { ref } from 'vue'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

import { useFintI18n } from '@feugene/fint-i18n'

const { t } = useFintI18n()

const closableAlertVisible = ref(true)

const alertPropsInfo = [
  {
    name: 'variant',
    type: "'info' | 'success' | 'warning' | 'warning-light' | 'danger'",
    default: "'info'",
    description: 'Визуальный стиль алерта (семантический статус).',
  },
  {
    name: 'title',
    type: 'string | undefined',
    description: 'Опциональный заголовок в шапке алерта.',
  },
  {
    name: 'closable',
    type: 'boolean',
    default: 'false',
    description: 'Добавляет кнопку-крестик. При клике эмитит событие close.',
  },
  {
    name: 'backgroundColor',
    type: 'string | undefined',
    description: 'Явно задаёт CSS-цвет фона и переопределяет цвет варианта.',
  },
  {
    name: 'textColor',
    type: 'string | undefined',
    description: 'Явно задаёт CSS-цвет иконки, заголовка и текста.',
  },
  {
    name: 'borderColor',
    type: 'string | undefined',
    description: 'Явно задаёт CSS-цвет рамки и переопределяет цвет варианта.',
  },
] as const

const alertEventsInfo = [
  {
    name: '@close',
    type: '() => void',
    default: '—',
    description: 'Срабатывает при закрытии (клик по крестику, если включён closable).',
  },
] as const

const usageCode = `<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(true)
</scr${'ipt'}>

<template>
  <DsAlert variant="info" title="Info">Message</DsAlert>
  <DsAlert variant="warning-light" title="Warning light">Use a softer warning tone.</DsAlert>

  <DsAlert
    title="Custom colors"
    background-color="#111827"
    text-color="#f9fafb"
    border-color="#22c55e"
  >
    Override background, text and border colors directly.
  </DsAlert>

  <DsAlert v-if="visible" variant="warning" title="Closable" closable @close="visible = false">
    Click the cross to close.
  </DsAlert>
</template>
`
</script>

<template>
  <PlaygroundPage
    :title="t('playground.alerts.title', 'Alerts')"
    :description="t('playground.alerts.lead', 'Semantic alerts for feedback and status messages.')"
  >
    <template #ui>
      <DsCard class="p-5 grid gap-3">
        <DsAlert variant="info" :title="t('playground.alerts.infoTitle', 'Info')">
          {{ t('playground.alerts.message', 'Message text') }}
        </DsAlert>
        <DsAlert variant="success" :title="t('playground.alerts.successTitle', 'Success')">
          {{ t('playground.alerts.message', 'Message text') }}
        </DsAlert>
        <DsAlert variant="warning" :title="t('playground.alerts.warningTitle', 'Warning')">
          {{ t('playground.alerts.message', 'Message text') }}
        </DsAlert>
        <DsAlert variant="warning-light" :title="t('playground.alerts.warningLightTitle', 'Warning light')">
          {{ t('playground.alerts.warningLightText', 'Use a softer warning tone for less critical notices.') }}
        </DsAlert>
        <DsAlert variant="danger" :title="t('playground.alerts.dangerTitle', 'Danger')">
          {{ t('playground.alerts.message', 'Message text') }}
        </DsAlert>
        <DsAlert
          :title="t('playground.alerts.customTitle', 'Custom colors')"
          background-color="#111827"
          text-color="#f9fafb"
          border-color="#D81C5EFF"
        >
          {{ t('playground.alerts.customText', 'Override background, text and border colors directly.') }}
        </DsAlert>

        <DsAlert
          v-if="closableAlertVisible"
          variant="warning"
          :title="t('playground.alerts.closableTitle', 'Closable')"
          closable
          @close="closableAlertVisible = false"
        >
          {{ t('playground.alerts.closableText', 'Click the cross to close.') }}
        </DsAlert>
        <DsButton v-else size="sm" variant="outline" @click="closableAlertVisible = true">
          {{ t('playground.alerts.resetClosable', 'Reset closable alert') }}
        </DsButton>
      </DsCard>
    </template>

    <template #usage>
      <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsAlert — Props" :items="alertPropsInfo" />
      <PlaygroundProps title="DsAlert — Events" :items="alertEventsInfo" />
    </template>
  </PlaygroundPage>
</template>
