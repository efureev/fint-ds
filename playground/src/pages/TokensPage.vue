<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import PlaygroundPage from '../components/PlaygroundPage.vue'

import { useTheme } from '@ds/composables/useTheme'
import { useFintI18n } from '@feugene/fint-i18n'

type TokenRow = {
  token: string
  description: string
}

type TokenGroup = {
  id: string
  title: string
  items: TokenRow[]
}

const { t } = useFintI18n()

const groups = computed<TokenGroup[]>(() => {
  return [
    {
      id: 'base',
      title: t('playground.tokens.group.base', 'Base (surface / text)'),
      items: [
        { token: '--background', description: t('playground.tokens.desc.background', 'Application background.') },
        { token: '--foreground', description: t('playground.tokens.desc.foreground', 'Primary text.') },
        { token: '--card', description: t('playground.tokens.desc.card', 'Surfaces (cards/panels).') },
        { token: '--card-foreground', description: t('playground.tokens.desc.cardForeground', 'Text on card surfaces.') },
        { token: '--popover', description: t('playground.tokens.desc.popover', 'Popover surfaces.') },
        { token: '--popover-foreground', description: t('playground.tokens.desc.popoverForeground', 'Text on popover surfaces.') },
        { token: '--muted', description: t('playground.tokens.desc.muted', 'Muted surface (backdrops/hover).') },
        { token: '--muted-foreground', description: t('playground.tokens.desc.mutedForeground', 'Secondary text.') },
        { token: '--border', description: t('playground.tokens.desc.border', 'Borders.') },
        { token: '--input', description: t('playground.tokens.desc.input', 'Input borders/background (if used separately from border).') },
        { token: '--ring', description: t('playground.tokens.desc.ring', 'Focus ring color (focus-visible:ring).') },
      ],
    },
    {
      id: 'actions',
      title: t('playground.tokens.group.actions', 'Actions (primary/secondary/accent)'),
      items: [
        { token: '--primary', description: t('playground.tokens.desc.primary', 'Primary action / accent.') },
        { token: '--primary-foreground', description: t('playground.tokens.desc.primaryForeground', 'Text/icons on primary.') },
        { token: '--primary-hover', description: t('playground.tokens.desc.primaryHover', 'Derived: primary hover state (usually not overridden manually).') },
        { token: '--primary-active', description: t('playground.tokens.desc.primaryActive', 'Derived: primary active state (usually not overridden manually).') },

        { token: '--secondary', description: t('playground.tokens.desc.secondary', 'Secondary surface/action.') },
        { token: '--secondary-foreground', description: t('playground.tokens.desc.secondaryForeground', 'Text/icons on secondary.') },
        { token: '--secondary-hover', description: t('playground.tokens.desc.secondaryHover', 'Derived: secondary hover state.') },
        { token: '--secondary-active', description: t('playground.tokens.desc.secondaryActive', 'Derived: secondary active state.') },

        { token: '--accent', description: t('playground.tokens.desc.accent', 'Accent surface.') },
        { token: '--accent-foreground', description: t('playground.tokens.desc.accentForeground', 'Text/icons on accent.') },
      ],
    },
    {
      id: 'status',
      title: t('playground.tokens.group.status', 'Status (semantic colors)'),
      items: [
        { token: '--destructive', description: t('playground.tokens.desc.destructive', 'Destructive action.') },
        { token: '--destructive-foreground', description: t('playground.tokens.desc.destructiveForeground', 'Text/icons on destructive.') },
        { token: '--destructive-hover', description: t('playground.tokens.desc.destructiveHover', 'Derived: destructive hover state.') },
        { token: '--destructive-active', description: t('playground.tokens.desc.destructiveActive', 'Derived: destructive active state.') },

        { token: '--ds-success', description: t('playground.tokens.desc.success', 'Success status.') },
        { token: '--ds-success-light', description: t('playground.tokens.desc.successLight', 'Success light surface (badge/alert background).') },
        { token: '--ds-success-hover', description: t('playground.tokens.desc.successHover', 'Derived: success hover state.') },
        { token: '--ds-success-active', description: t('playground.tokens.desc.successActive', 'Derived: success active state.') },

        { token: '--ds-warning', description: t('playground.tokens.desc.warning', 'Warning status.') },
        { token: '--ds-warning-light', description: t('playground.tokens.desc.warningLight', 'Warning light surface.') },
        { token: '--ds-warning-hover', description: t('playground.tokens.desc.warningHover', 'Derived: warning hover state.') },
        { token: '--ds-warning-active', description: t('playground.tokens.desc.warningActive', 'Derived: warning active state.') },

        { token: '--ds-danger', description: t('playground.tokens.desc.danger', 'Danger status.') },
        { token: '--ds-danger-light', description: t('playground.tokens.desc.dangerLight', 'Danger light surface.') },
        { token: '--ds-danger-hover', description: t('playground.tokens.desc.dangerHover', 'Derived: danger hover state.') },
        { token: '--ds-danger-active', description: t('playground.tokens.desc.dangerActive', 'Derived: danger active state.') },

        { token: '--ds-info', description: t('playground.tokens.desc.info', 'Info status.') },
        { token: '--ds-info-light', description: t('playground.tokens.desc.infoLight', 'Info light surface.') },
        { token: '--ds-info-hover', description: t('playground.tokens.desc.infoHover', 'Derived: info hover state.') },
        { token: '--ds-info-active', description: t('playground.tokens.desc.infoActive', 'Derived: info active state.') },
      ],
    },
    {
      id: 'sidebar',
      title: t('playground.tokens.group.sidebar', 'Sidebar'),
      items: [
        { token: '--sidebar', description: t('playground.tokens.desc.sidebar', 'Sidebar background.') },
        { token: '--sidebar-foreground', description: t('playground.tokens.desc.sidebarForeground', 'Sidebar text.') },
        { token: '--sidebar-primary', description: t('playground.tokens.desc.sidebarPrimary', 'Primary accent inside the sidebar.') },
        { token: '--sidebar-primary-foreground', description: t('playground.tokens.desc.sidebarPrimaryForeground', 'Text/icons on sidebar-primary.') },
        { token: '--sidebar-accent', description: t('playground.tokens.desc.sidebarAccent', 'Accent surface inside the sidebar.') },
        { token: '--sidebar-accent-foreground', description: t('playground.tokens.desc.sidebarAccentForeground', 'Text/icons on sidebar-accent.') },
        { token: '--sidebar-border', description: t('playground.tokens.desc.sidebarBorder', 'Sidebar borders.') },
        { token: '--sidebar-ring', description: t('playground.tokens.desc.sidebarRing', 'Focus ring inside the sidebar.') },
      ],
    },
    {
      id: 'charts',
      title: t('playground.tokens.group.charts', 'Charts'),
      items: [
        { token: '--chart-1', description: t('playground.tokens.desc.chart1', 'Chart palette.') },
        { token: '--chart-2', description: t('playground.tokens.desc.chart2', 'Chart palette.') },
        { token: '--chart-3', description: t('playground.tokens.desc.chart3', 'Chart palette.') },
        { token: '--chart-4', description: t('playground.tokens.desc.chart4', 'Chart palette.') },
        { token: '--chart-5', description: t('playground.tokens.desc.chart5', 'Chart palette.') },
      ],
    },
    {
      id: 'radius',
      title: t('playground.tokens.group.radius', 'Radius / Shadow / Typography'),
      items: [
        { token: '--ds-radius-md', description: t('playground.tokens.desc.radiusMd', 'Border radius (md).') },
        { token: '--ds-radius-lg', description: t('playground.tokens.desc.radiusLg', 'Border radius (lg).') },
        { token: '--ds-radius-xl', description: t('playground.tokens.desc.radiusXl', 'Border radius (xl).') },
        { token: '--ds-shadow-1', description: t('playground.tokens.desc.shadow1', 'Elevation/shadow 1.') },
        { token: '--ds-shadow-2', description: t('playground.tokens.desc.shadow2', 'Elevation/shadow 2.') },
        { token: '--ds-font-ui', description: t('playground.tokens.desc.fontUi', 'UI font stack (no network imports by default).') },
        { token: '--ds-font-mono', description: t('playground.tokens.desc.fontMono', 'Monospace font stack.') },
      ],
    },
  ]
})

const allTokens = computed(() => {
  return groups.value.flatMap((g) => g.items.map((it) => it.token))
})

const values = ref<Record<string, string>>({})

function readTokenValues(): void {
  const style = getComputedStyle(document.documentElement)
  const next: Record<string, string> = {}

  for (const token of allTokens.value) {
    next[token] = style.getPropertyValue(token).trim()
  }

  values.value = next
}

function isColor(value: string | undefined): boolean {
  if (!value) return false
  const v = value.trim().toLowerCase()
  if (v.startsWith('#')) return true
  if (v.startsWith('rgb(') || v.startsWith('rgba(')) return true
  if (v.startsWith('hsl(') || v.startsWith('hsla(')) return true
  return false
}

const { isDark } = useTheme()

onMounted(() => {
  readTokenValues()
})

watch(isDark, () => {
  readTokenValues()
})

const usageCode = `/* app.css (пример переопределения токенов) */

:root {
  --primary: #0ea5e9;
  --primary-foreground: #ffffff;
  --border: rgba(0, 0, 0, 0.12);
}

/* если у вас есть отдельный класс для тёмной темы */
.dark {
  --background: #0b1220;
  --foreground: #e5e7eb;
}
`
</script>

<template>
  <PlaygroundPage :title="t('playground.tokens.title', 'Tokens (CSS variables)')" :description="t('playground.tokens.lead')">
    <template #ui>
      <div class="grid gap-4">
        <DsCard class="p-4 flex items-center justify-between gap-4 flex-wrap">
          <div class="text-sm ds-muted">{{ t('playground.tokens.controls', 'Controls') }}</div>
          <div class="flex items-center gap-2">
            <ThemeSwitcher />
            <DsButton size="sm" variant="outline" @click="readTokenValues">
              {{ t('playground.tokens.refresh', 'Refresh') }}
            </DsButton>
          </div>
        </DsCard>

        <div class="grid gap-4">
          <DsCard v-for="g in groups" :key="g.id" class="p-5">
            <div class="text-[14px] font-700">{{ g.title }}</div>
            <div class="mt-4">
              <DsTable>
                <template #head>
                  <tr>
                    <th class="text-left font-700 text-xs px-4 py-3 w-[260px]">
                      {{ t('playground.tokens.table.token', 'Token') }}
                    </th>
                    <th class="text-left font-700 text-xs px-4 py-3 w-[260px]">
                      {{ t('playground.tokens.table.value', 'Value') }}
                    </th>
                    <th class="text-left font-700 text-xs px-4 py-3">
                      {{ t('playground.tokens.table.description', 'Description') }}
                    </th>
                  </tr>
                </template>

                <tr v-for="it in g.items" :key="it.token" class="border-t border-[var(--border)]">
                  <td class="px-4 py-3">
                    <span class="font-mono text-[12px]">{{ it.token }}</span>
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-2 min-w-0">
                      <span
                        v-if="isColor(values[it.token])"
                        class="w-[14px] h-[14px] rounded-[4px] border border-[var(--border)] shrink-0"
                        :style="{ background: values[it.token] }"
                        aria-hidden="true"
                      />
                      <span class="font-mono text-[12px] truncate">{{ values[it.token] || '—' }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-[13px] text-[var(--muted-foreground)]">
                    {{ it.description }}
                  </td>
                </tr>
              </DsTable>
            </div>
          </DsCard>
        </div>
      </div>
    </template>

    <template #usage>
      <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>
  </PlaygroundPage>
</template>
