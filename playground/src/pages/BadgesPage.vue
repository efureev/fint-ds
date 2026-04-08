<script setup lang="ts">
import { ref } from 'vue'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

import { useFintI18n } from '@feugene/fint-i18n'

const { t } = useFintI18n()

type PlaygroundBadgeVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info'
type PlaygroundBadgeSize = 'sm' | 'md' | 'lg'
type PlaygroundBadgeRadius = 'square' | 'semi' | 'round'

const interactiveBadgeLabel = ref(t('playground.badges.playground.defaultLabel', 'Needs review'))
const interactiveBadgeVariant = ref<PlaygroundBadgeVariant>('warning')
const interactiveBadgeSize = ref<PlaygroundBadgeSize>('md')
const interactiveBadgeRadius = ref<PlaygroundBadgeRadius>('round')
const interactiveBadgeDark = ref(false)

const badgeVariantOptions = [
  { label: t('playground.badges.neutral', 'Neutral'), value: 'neutral' },
  { label: t('playground.badges.success', 'Success'), value: 'success' },
  { label: t('playground.badges.warning', 'Warning'), value: 'warning' },
  { label: t('playground.badges.danger', 'Danger'), value: 'danger' },
  { label: t('playground.badges.info', 'Info'), value: 'info' },
] as const

const badgeSizeOptions = [
  { label: 'sm', value: 'sm' },
  { label: 'md', value: 'md' },
  { label: 'lg', value: 'lg' },
] as const

const badgeRadiusOptions = [
  { label: t('playground.badges.radius.square', 'Square'), value: 'square' },
  { label: t('playground.badges.radius.semi', 'Semi'), value: 'semi' },
  { label: t('playground.badges.radius.round', 'Round'), value: 'round' },
] as const

const badgePropsInfo = [
  {
    name: 'variant',
    type: '\'neutral\' | \'success\' | \'warning\' | \'danger\' | \'info\'',
    default: '\'neutral\'',
    description: 'Цвет бейджа.',
  },
  {
    name: 'size',
    type: '\'sm\' | \'md\' | \'lg\'',
    default: '\'md\'',
    description: 'Размер бейджа (padding + размер текста).',
  },
  {
    name: 'radius',
    type: '\'square\' | \'semi\' | \'round\'',
    default: '\'round\'',
    description: 'Тип скругления: квадратный / полукруглый / круглый (pill).',
  },
  {
    name: 'dark',
    type: 'boolean',
    default: 'false',
    description: 'Если true — бейдж будет с полностью залитым фоном (filled).',
  },
] as const

const badgeSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Контент бейджа (обычно короткий текст).',
  },
] as const

const badgeWrapPropsInfo = [
  {
    name: 'value',
    type: 'string | number | undefined',
    description: 'Число/строка в бейдже поверх контента (если dot=false).',
  },
  {
    name: 'dot',
    type: 'boolean',
    default: 'false',
    description: 'Если true — показывает точку вместо значения.',
  },
] as const

const badgeWrapSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Контент, поверх которого рисуется badge (например кнопка/иконка).',
  },
] as const

const usageCode = `<template>
  <!-- Light (default) -->
  <DsBadge variant="success">Success</DsBadge>

  <!-- Size / radius -->
  <DsBadge variant="success" size="sm" radius="square">Small square</DsBadge>
  <DsBadge variant="success" size="md" radius="semi">Medium semi</DsBadge>
  <DsBadge variant="success" size="lg" radius="round">Large round</DsBadge>

  <!-- Dark (filled) -->
  <DsBadge variant="success" dark>Success</DsBadge>

  <DsBadgeWrap :value="3">
    <DsButton size="sm" variant="outline">Inbox</DsButton>
  </DsBadgeWrap>

  <DsBadgeWrap dot>
    <DsButton size="sm" variant="outline">Notifications</DsButton>
  </DsBadgeWrap>
</template>
`
</script>

<template>
  <PlaygroundPage
      :title="t('playground.badges.title', 'Badges')"
      :description="t('playground.badges.lead', 'Status badges and badge overlays.')"
  >
    <template #ui>
      <DsCard class="p-5 grid gap-8">
        <div class="grid gap-3">
          <div class="text-sm font-600">DsBadge</div>
          <div class="flex flex-wrap gap-2 items-center">
            <DsBadge>{{ t('playground.badges.neutral', 'Neutral') }}</DsBadge>
            <DsBadge variant="info">{{ t('playground.badges.info', 'Info') }}</DsBadge>
            <DsBadge variant="success">{{ t('playground.badges.success', 'Success') }}</DsBadge>
            <DsBadge variant="warning">{{ t('playground.badges.warning', 'Warning') }}</DsBadge>
            <DsBadge variant="danger">{{ t('playground.badges.danger', 'Danger') }}</DsBadge>
          </div>

          <div class="mt-2 text-[12px] text-[var(--muted-foreground)]">
            Dark (filled)
          </div>
          <div class="flex flex-wrap gap-2 items-center">
            <DsBadge dark>{{ t('playground.badges.neutral', 'Neutral') }}</DsBadge>
            <DsBadge variant="info" dark>{{ t('playground.badges.info', 'Info') }}</DsBadge>
            <DsBadge variant="success" dark>{{ t('playground.badges.success', 'Success') }}</DsBadge>
            <DsBadge variant="warning" dark>{{ t('playground.badges.warning', 'Warning') }}</DsBadge>
            <DsBadge variant="danger" dark>{{ t('playground.badges.danger', 'Danger') }}</DsBadge>
          </div>

          <div class="mt-4 text-[12px] text-[var(--muted-foreground)]">
            Size / radius
          </div>
          <div class="flex flex-wrap gap-2 items-center">
            <DsBadge size="sm" variant="success" radius="square">sm square</DsBadge>
            <DsBadge size="sm" variant="success" radius="semi">sm semi</DsBadge>
            <DsBadge size="sm" variant="success" radius="round">sm round</DsBadge>

            <DsBadge size="md" variant="warning" radius="square">md square</DsBadge>
            <DsBadge size="md" variant="warning" radius="semi">md semi</DsBadge>
            <DsBadge size="md" variant="warning" radius="round">md round</DsBadge>

            <DsBadge size="lg" variant="info" radius="square">lg square</DsBadge>
            <DsBadge size="lg" variant="info" radius="semi">lg semi</DsBadge>
            <DsBadge size="lg" variant="info" radius="round">lg round</DsBadge>

            <DsBadge variant="info" size="lg" radius="semi" dark>dark + lg + semi</DsBadge>
          </div>

          <div class="mt-4 text-[12px] text-[var(--muted-foreground)]">
            {{ t('playground.badges.playground.title', 'Interactive badge playground') }}
          </div>
          <div class="grid gap-4 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)]/35 p-4">
            <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div class="grid gap-1">
                <div class="text-sm font-600">
                  {{ t('playground.badges.playground.previewTitle', 'Try different badge states') }}
                </div>
                <div class="text-[12px] text-[var(--muted-foreground)]">
                  {{ t('playground.badges.playground.description', 'Изменяйте параметры справа и сразу смотрите, как обновляется бейдж.') }}
                </div>
              </div>

              <div
                data-testid="badge-playground-preview"
                class="flex min-h-[72px] min-w-[220px] items-center justify-center rounded-[var(--ds-radius-md)] border border-dashed border-[var(--border)] bg-[var(--background)] px-4 py-3"
              >
                <DsBadge
                  :variant="interactiveBadgeVariant"
                  :size="interactiveBadgeSize"
                  :radius="interactiveBadgeRadius"
                  :dark="interactiveBadgeDark"
                >
                  {{ interactiveBadgeLabel || t('playground.badges.playground.emptyLabel', 'Badge') }}
                </DsBadge>
              </div>
            </div>

            <div class="grid gap-3 md:grid-cols-[180px_1fr] md:items-center">
              <span class="text-sm ds-muted">{{ t('playground.badges.playground.label', 'Label') }}</span>
              <DsInput
                v-model="interactiveBadgeLabel"
                data-testid="badge-playground-label"
                :placeholder="t('playground.badges.playground.labelPlaceholder', 'Например, Needs review')"
              />

              <span class="text-sm ds-muted">{{ t('playground.badges.playground.variant', 'Variant') }}</span>
              <DsSelect
                v-model="interactiveBadgeVariant"
                data-testid="badge-playground-variant"
                :options="badgeVariantOptions"
              />

              <span class="text-sm ds-muted">{{ t('playground.badges.playground.size', 'Size') }}</span>
              <DsSelect
                v-model="interactiveBadgeSize"
                data-testid="badge-playground-size"
                :options="badgeSizeOptions"
              />

              <span class="text-sm ds-muted">{{ t('playground.badges.playground.radius', 'Radius') }}</span>
              <DsSelect
                v-model="interactiveBadgeRadius"
                data-testid="badge-playground-radius"
                :options="badgeRadiusOptions"
              />

              <span class="text-sm ds-muted">{{ t('playground.badges.playground.dark', 'Dark (filled)') }}</span>
              <div>
                <DsSwitch v-model="interactiveBadgeDark" data-testid="badge-playground-dark">
                  {{ t('playground.badges.playground.darkHint', 'Use filled style') }}
                </DsSwitch>
              </div>
            </div>

            <div class="text-sm ds-muted">
              {{ {
                label: interactiveBadgeLabel || t('playground.badges.playground.emptyLabel', 'Badge'),
                variant: interactiveBadgeVariant,
                size: interactiveBadgeSize,
                radius: interactiveBadgeRadius,
                dark: interactiveBadgeDark,
              } }}
            </div>
          </div>
        </div>

        <div class="grid gap-3">
          <div class="text-sm font-600">DsBadgeWrap</div>
          <div class="flex flex-wrap gap-3 items-center">
            <DsBadgeWrap :value="3">
              <DsButton size="sm" variant="outline">{{ t('playground.badges.inbox', 'Inbox') }}</DsButton>
            </DsBadgeWrap>

            <DsBadgeWrap dot>
              <DsButton size="sm" variant="outline">{{
                  t('playground.badges.notifications', 'Notifications')
                }}
              </DsButton>
            </DsBadgeWrap>

            <DsBadgeWrap :value="12">
              <DsButton size="sm">{{ t('playground.badges.messages', 'Messages') }}</DsButton>
            </DsBadgeWrap>
          </div>
        </div>
      </DsCard>
    </template>

    <template #usage>
      <pre
          class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code
          class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsBadge — Props" :items="badgePropsInfo" />
      <PlaygroundProps title="DsBadge — Slots" :items="badgeSlotsInfo" />
      <PlaygroundProps title="DsBadgeWrap — Props" :items="badgeWrapPropsInfo" />
      <PlaygroundProps title="DsBadgeWrap — Slots" :items="badgeWrapSlotsInfo" />
    </template>
  </PlaygroundPage>
</template>
