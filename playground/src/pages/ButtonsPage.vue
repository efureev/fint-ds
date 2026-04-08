<script setup lang="ts">
import { ref } from 'vue'

import { useFintI18n } from '@feugene/fint-i18n'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

import IconPlus from '~icons/lucide/plus'
import IconSettings from '~icons/lucide/settings'

const { t } = useFintI18n()

const disabled = ref(false)
const loading = ref(false)

const buttonPropsInfo = [
  {
    name: 'variant',
    type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'ghost-border' | 'destructive'",
    default: "'primary'",
    description: t('playground.buttons.props.variant'),
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    description: t('playground.buttons.props.size'),
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description: t('playground.buttons.props.loading'),
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: t('playground.buttons.props.disabled'),
  },
  {
    name: 'square',
    type: 'boolean',
    default: 'false',
    description: t('playground.buttons.props.square'),
  },
  {
    name: 'type',
    type: "'button' | 'submit' | 'reset'",
    default: "'button'",
    description: t('playground.buttons.props.type'),
  },
  {
    name: 'ariaLabel',
    type: 'string | undefined',
    description: t('playground.buttons.props.ariaLabel'),
  },
] as const

const buttonSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: t('playground.buttons.slots.default'),
  },
] as const

const buttonGroupPropsInfo = [
  {
    name: 'ariaLabel',
    type: 'string | undefined',
    description: t('playground.buttons.props.groupAriaLabel'),
  },
] as const

const buttonGroupSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: t('playground.buttons.slots.groupDefault'),
  },
] as const

const usageCode = `<template>
  <DsButton variant="primary">Primary</DsButton>
  <DsButton variant="secondary" size="xs">Secondary</DsButton>

  <DsButton square aria-label="Settings">
    <i class="i-lucide-settings h-4 w-4" aria-hidden="true" />
  </DsButton>
</template>
`
</script>

<template>
  <PlaygroundPage :title="$t('playground.buttons.title')" :description="$t('playground.buttons.lead')">
    <template #ui>
      <DsCard class="p-5 grid gap-6">
        <div class="flex items-center gap-3">
          <DsSwitch v-model="disabled" size="sm" />
          <span class="text-sm ds-muted">{{ $t('playground.buttons.demo.disabled') }}</span>

          <div class="w-4" />

          <DsSwitch v-model="loading" size="sm" />
          <span class="text-sm ds-muted">{{ $t('playground.buttons.demo.loading') }}</span>
        </div>

        <div class="grid gap-3">
          <div class="text-sm font-600">{{ $t('playground.buttons.sections.variants') }}</div>
          <div class="flex flex-wrap gap-2">
            <DsButton variant="primary" :disabled="disabled" :loading="loading">{{ $t('playground.buttons.demo.primary') }}</DsButton>
            <DsButton variant="secondary" :disabled="disabled" :loading="loading">{{ $t('playground.buttons.demo.secondary') }}</DsButton>
            <DsButton variant="outline" :disabled="disabled" :loading="loading">{{ $t('playground.buttons.demo.outline') }}</DsButton>
            <DsButton variant="ghost" :disabled="disabled" :loading="loading">{{ $t('playground.buttons.demo.ghost') }}</DsButton>
            <DsButton variant="ghost-border" :disabled="disabled" :loading="loading">{{ $t('playground.buttons.demo.ghostBorder') }}</DsButton>
            <DsButton
              variant="ghost-border"
              :disabled="disabled"
              :loading="loading"
              :style="{
                color: 'var(--destructive)',
                '--border-hover': 'var(--destructive)',
                '--border-active': 'var(--destructive)',
              }"
            >
              <IconPlus class="h-4 w-4" aria-hidden="true" />
              {{ $t('playground.buttons.demo.ghostBorderDanger') }}
            </DsButton>
            <DsButton variant="destructive" :disabled="disabled" :loading="loading">{{ $t('playground.buttons.demo.destructive') }}</DsButton>
          </div>
        </div>

        <div class="grid gap-3">
          <div class="flex items-baseline justify-between gap-3">
            <div class="text-sm font-600">{{ $t('playground.buttons.sections.states') }}</div>
            <div class="text-xs ds-muted">{{ $t('playground.buttons.sections.statesNote') }}</div>
          </div>

          <div class="overflow-auto">
            <div class="grid gap-2 min-w-[760px]">
              <div class="grid grid-cols-[120px_repeat(4,minmax(0,1fr))] gap-2 items-center text-xs ds-muted">
                <div />
                <div>{{ $t('playground.buttons.stateLabels.normal') }}</div>
                <div>{{ $t('playground.buttons.stateLabels.hover') }}</div>
                <div>{{ $t('playground.buttons.stateLabels.active') }}</div>
                <div>{{ $t('playground.buttons.stateLabels.disabled') }}</div>
              </div>

              <div class="grid grid-cols-[120px_repeat(4,minmax(0,1fr))] gap-2 items-center">
                <div class="text-xs ds-muted">{{ $t('playground.buttons.demo.primary') }}</div>
                <DsButton variant="primary">{{ $t('playground.buttons.demo.primary') }}</DsButton>
                <DsButton variant="primary" class="!bg-[var(--primary-hover)]">{{ $t('playground.buttons.demo.primary') }}</DsButton>
                <DsButton variant="primary" class="!bg-[var(--primary-active)]">{{ $t('playground.buttons.demo.primary') }}</DsButton>
                <DsButton variant="primary" disabled>{{ $t('playground.buttons.demo.primary') }}</DsButton>
              </div>

              <div class="grid grid-cols-[120px_repeat(4,minmax(0,1fr))] gap-2 items-center">
                <div class="text-xs ds-muted">{{ $t('playground.buttons.demo.secondary') }}</div>
                <DsButton variant="secondary">{{ $t('playground.buttons.demo.secondary') }}</DsButton>
                <DsButton variant="secondary" class="!bg-[var(--secondary-hover)]">{{ $t('playground.buttons.demo.secondary') }}</DsButton>
                <DsButton variant="secondary" class="!bg-[var(--secondary-active)]">{{ $t('playground.buttons.demo.secondary') }}</DsButton>
                <DsButton variant="secondary" disabled>{{ $t('playground.buttons.demo.secondary') }}</DsButton>
              </div>

              <div class="grid grid-cols-[120px_repeat(4,minmax(0,1fr))] gap-2 items-center">
                <div class="text-xs ds-muted">{{ $t('playground.buttons.demo.outline') }}</div>
                <DsButton variant="outline">{{ $t('playground.buttons.demo.outline') }}</DsButton>
                <DsButton variant="outline" class="!bg-[var(--muted)]">{{ $t('playground.buttons.demo.outline') }}</DsButton>
                <DsButton variant="outline" class="!bg-[var(--secondary)]">{{ $t('playground.buttons.demo.outline') }}</DsButton>
                <DsButton variant="outline" disabled>{{ $t('playground.buttons.demo.outline') }}</DsButton>
              </div>

              <div class="grid grid-cols-[120px_repeat(4,minmax(0,1fr))] gap-2 items-center">
                <div class="text-xs ds-muted">{{ $t('playground.buttons.demo.ghost') }}</div>
                <DsButton variant="ghost">{{ $t('playground.buttons.demo.ghost') }}</DsButton>
                <DsButton variant="ghost" class="!bg-[var(--muted)]">{{ $t('playground.buttons.demo.ghost') }}</DsButton>
                <DsButton variant="ghost" class="!bg-[var(--secondary)]">{{ $t('playground.buttons.demo.ghost') }}</DsButton>
                <DsButton variant="ghost" disabled>{{ $t('playground.buttons.demo.ghost') }}</DsButton>
              </div>

              <div class="grid grid-cols-[120px_repeat(4,minmax(0,1fr))] gap-2 items-center">
                <div class="text-xs ds-muted">{{ $t('playground.buttons.demo.ghostBorder') }}</div>
                <DsButton variant="ghost-border">{{ $t('playground.buttons.demo.ghost') }}</DsButton>
                <DsButton variant="ghost-border" class="!border-[var(--border-hover)]">{{ $t('playground.buttons.demo.ghost') }}</DsButton>
                <DsButton variant="ghost-border" class="!border-[var(--border-active)]">{{ $t('playground.buttons.demo.ghost') }}</DsButton>
                <DsButton variant="ghost-border" disabled>{{ $t('playground.buttons.demo.ghost') }}</DsButton>
              </div>

              <div class="grid grid-cols-[120px_repeat(4,minmax(0,1fr))] gap-2 items-center">
                <div class="text-xs ds-muted">{{ $t('playground.buttons.demo.destructive') }}</div>
                <DsButton variant="destructive">{{ $t('playground.buttons.demo.destructive') }}</DsButton>
                <DsButton variant="destructive" class="!bg-[var(--destructive-hover)]">{{ $t('playground.buttons.demo.destructive') }}</DsButton>
                <DsButton variant="destructive" class="!bg-[var(--destructive-active)]">{{ $t('playground.buttons.demo.destructive') }}</DsButton>
                <DsButton variant="destructive" disabled>{{ $t('playground.buttons.demo.destructive') }}</DsButton>
              </div>
            </div>
          </div>
        </div>

        <div class="grid gap-3">
          <div class="text-sm font-600">{{ $t('playground.buttons.sections.sizes') }}</div>
          <div class="flex flex-wrap items-center gap-2">
            <DsButton size="xs" :disabled="disabled" :loading="loading">{{ $t('playground.buttons.demo.extraSmall') }}</DsButton>
            <DsButton size="sm" :disabled="disabled" :loading="loading">{{ $t('playground.buttons.demo.small') }}</DsButton>
            <DsButton size="md" :disabled="disabled" :loading="loading">{{ $t('playground.buttons.demo.medium') }}</DsButton>
            <DsButton size="lg" :disabled="disabled" :loading="loading">{{ $t('playground.buttons.demo.large') }}</DsButton>
          </div>
        </div>

        <div class="grid gap-3">
          <div class="text-sm font-600">{{ $t('playground.buttons.sections.square') }}</div>
          <div class="flex flex-wrap items-center gap-2">
            <DsButton square :aria-label="$t('playground.buttons.props.ariaLabel')" :disabled="disabled" :loading="loading" size="xs">
              <IconPlus class="h-4 w-4" aria-hidden="true" />
            </DsButton>
            <DsButton square :aria-label="$t('playground.buttons.props.ariaLabel')" :disabled="disabled" :loading="loading" size="sm">
              <IconPlus class="h-4 w-4" aria-hidden="true" />
            </DsButton>
            <DsButton variant="outline" square :aria-label="$t('playground.buttons.props.ariaLabel')" :disabled="disabled" :loading="loading">
              <IconSettings class="h-4 w-4" aria-hidden="true" />
            </DsButton>
          </div>
        </div>

        <div class="grid gap-3">
          <div class="text-sm font-600">{{ $t('playground.buttons.sections.buttonGroup') }}</div>
          <div class="flex flex-wrap items-center gap-3">
            <DsButtonGroup :aria-label="$t('playground.buttons.props.groupAriaLabel')">
              <DsButton variant="outline" :disabled="disabled" :loading="loading">{{ $t('playground.buttons.demo.day') }}</DsButton>
              <DsButton variant="outline" :disabled="disabled" :loading="loading">{{ $t('playground.buttons.demo.week') }}</DsButton>
              <DsButton variant="outline" :disabled="disabled" :loading="loading">{{ $t('playground.buttons.demo.month') }}</DsButton>
            </DsButtonGroup>

            <DsButtonGroup :aria-label="$t('playground.buttons.props.groupAriaLabel') + ' 2'">
              <DsButton variant="primary" :disabled="disabled" :loading="loading">{{ $t('playground.buttons.demo.active') }}</DsButton>
              <DsButton variant="outline" :disabled="disabled" :loading="loading">{{ $t('playground.buttons.demo.inactive') }}</DsButton>
            </DsButtonGroup>
          </div>
        </div>
      </DsCard>
    </template>

    <template #usage>
      <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsButton — Props" :items="buttonPropsInfo" />
      <PlaygroundProps title="DsButton — Slots" :items="buttonSlotsInfo" />
      <PlaygroundProps title="DsButtonGroup — Props" :items="buttonGroupPropsInfo" />
      <PlaygroundProps title="DsButtonGroup — Slots" :items="buttonGroupSlotsInfo" />
    </template>
  </PlaygroundPage>
</template>
