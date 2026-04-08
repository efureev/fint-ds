<script setup lang="ts">
import { ref } from 'vue'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

const value = ref('')
const period = ref('month')

const panelValue = ref('')
const panelPlaceholderValue = ref('')
const panelCustomValue = ref('')
const panelClearableValue = ref('b')
const nativeClearableValue = ref('b')
const nativeCustomValue = ref('CUSTOM')

const panelMultiValue = ref<string[]>([])
const nativeMultiValue = ref<string[]>([])
const panelSlotValue = ref<string[]>([])
const panelBadgeSlotValue = ref<string[]>([])

const sizeXs = ref('a')
const sizeSm = ref('a')
const sizeMd = ref('a')
const sizeLg = ref('a')

const options = [
  { value: '', label: 'Pick one' },
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
]

const optionsNoEmpty = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
]

const tagOptions = [
  { value: 'vue', label: 'Vue' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'unocss', label: 'UnoCSS' },
  { value: 'vite', label: 'Vite' },
]

type BadgeOptionMeta = {
  badgeVariant: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  badgeSize: 'sm' | 'md' | 'lg'
  badgeDark?: boolean
}

const badgeOptions: Array<{ value: string; label: string } & BadgeOptionMeta> = [
  { value: 'prio-high', label: 'Priority: High', badgeVariant: 'danger', badgeSize: 'sm', badgeDark: true },
  { value: 'prio-medium', label: 'Priority: Medium', badgeVariant: 'warning', badgeSize: 'sm' },
  { value: 'prio-low', label: 'Priority: Low', badgeVariant: 'info', badgeSize: 'sm' },
  { value: 'done', label: 'Done', badgeVariant: 'success', badgeSize: 'md', badgeDark: true },
  { value: 'draft', label: 'Draft', badgeVariant: 'neutral', badgeSize: 'lg' },
]

const badgeOptionsByValue = new Map(badgeOptions.map(o => [o.value, o] as const))

const periodOptions = [
  { value: 'day', label: 'day' },
  { value: 'week', label: 'week' },
  { value: 'month', label: 'month' },
  { value: 'year', label: 'year' },
]

const selectPropsInfo = [
  {
    name: 'v-model / modelValue',
    type: 'string | string[]',
    description:
      'Текущее значение (двусторонняя связь). При multiple=false ожидается string, при multiple=true — string[].',
  },
  {
    name: 'view',
    type: "'default' | 'link'",
    default: "'default'",
    description: 'default — обычный select. link — inline-режим (стилизуется как ссылка и встраивается в текст).',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Размер select. В view="default" влияет на h/padding/font-size, в view="link" — на font-size.',
  },
  {
    name: 'placeholder',
    type: 'string | undefined',
    description: 'Плейсхолдер (показывается, когда значение не выбрано). Актуально для optionsView="panel".',
  },
  {
    name: 'multiple',
    type: 'boolean',
    default: 'false',
    description: 'Множественный выбор. При включении v-model становится массивом (string[]).',
  },
  {
    name: 'options',
    type: "Array<{ value: string; label: string }> | undefined",
    description: 'Массив опций для быстрого использования. Если передан slot — он имеет приоритет.',
  },
  {
    name: 'optionsView',
    type: "'native' | 'panel'",
    default: "'native'",
    description:
      'native — рендерит нативный <select> и native <option>. panel — рендерит кастомную UI/UX-панель вместо нативных опций (аналогично `DsTreeSelect`).',
  },
  {
    name: 'allowCustomValue',
    type: 'boolean',
    default: 'false',
    description:
      'Разрешает значение, которого нет в options. В panel-режиме появляется инпут для добавления значения. В native-режиме компонент просто добавляет недостающий <option> для текущего modelValue.',
  },
  {
    name: 'customValuePlaceholder',
    type: 'string | undefined',
    default: "'Add value…'",
    description: 'Placeholder для инпута кастомного значения (только в optionsView="panel").',
  },
  {
    name: 'dropdownMaxHeight',
    type: 'number | undefined',
    default: '280',
    description: 'Максимальная высота панели (только в optionsView="panel").',
  },
  {
    name: 'closeOnSelect',
    type: 'boolean | undefined',
    default: 'true',
    description: 'Закрывать панель после выбора (только в optionsView="panel").',
  },
  {
    name: 'clearable',
    type: 'boolean',
    default: 'false',
    description:
      'Разрешает очистку значения. В optionsView="panel" показывает крестик в триггере. В optionsView="native" и multiple=false добавляет пустой <option> в начало списка.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Отключает выбор; в link-режиме дополнительно убирает подчёркивание и снижает контраст.',
  },
  {
    name: 'ariaLabel',
    type: 'string | undefined',
    description: 'Нужен, когда рядом нет видимого <label> (для доступности).',
  },
  {
    name: 'variant',
    type: "'primary' | 'default' | 'muted' | 'danger'",
    default: "'primary'",
    description: 'Цвет/вариант для view="link" (аналогично `DsLink`). В view="default" не влияет.',
  },
  {
    name: 'underline',
    type: "'auto' | 'always' | 'none'",
    default: "'auto'",
    description: 'Подчёркивание для view="link". В view="default" не используется.',
  },
] as const

const selectSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Можно передать native <option> (полезно для кастомной разметки/атрибутов). Используется только в optionsView="native".',
  },
  {
    name: 'value',
    type: 'slot',
    description:
      'Кастомный рендер выбранного значения в триггере (только optionsView="panel"). Slot props: { selectedOptions, selectedValues, displayLabel, placeholder, hasSelection }.',
  },
  {
    name: 'option',
    type: 'slot',
    description: 'Кастомный рендер строки опции (только optionsView="panel"). Slot props: { option, selected }.',
  },
] as const

const selectEventsInfo = [
  {
    name: '@update:modelValue',
    type: '(value: string | string[]) => void',
    description: 'Эмитится при смене значения.',
  },
] as const

const usageCode = `<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const tags = ref<string[]>([])
const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
]
</scr${'ipt'}>

<template>
  <DsSelect v-model="value" optionsView="panel" :options="options" placeholder="Pick one" aria-label="Pick one" />

  <DsSelect
    v-model="tags"
    multiple
    optionsView="panel"
    :close-on-select="false"
    :options="options"
    placeholder="Pick tags"
    aria-label="Tags"
  />

  <DsSelect
    v-model="value"
    optionsView="panel"
    clearable
    :options="options"
    aria-label="Pick one (panel)"
  />

  <DsSelect
    v-model="value"
    clearable
    :options="options"
    aria-label="Pick one (native clearable)"
  />

  <DsSelect
    v-model="value"
    optionsView="panel"
    allow-custom-value
    :options="options"
    aria-label="Pick one (custom)"
  />

  <DsSelect v-model="value" aria-label="Pick one (slot)">
    <option value="">Pick one</option>
    <option value="a">Option A</option>
  </DsSelect>
</template>
`
</script>

<template>
  <PlaygroundPage title="DsSelect">
    <template #ui>
      <DsCard class="p-5 grid gap-4">
        <div class="grid gap-2">
          <div class="text-sm font-600">Default</div>
          <DsSelect v-model="value" :options="options" aria-label="Pick one" />
          <div class="text-sm ds-muted">value: {{ value }}</div>
        </div>

        <div class="grid gap-2">
          <div class="text-sm font-600">Panel (optionsView=&quot;panel&quot;)</div>
          <DsSelect v-model="panelValue" optionsView="panel" :options="options" aria-label="Pick one (panel)" />
          <div class="text-sm ds-muted">panelValue: {{ panelValue }}</div>
        </div>

        <div class="grid gap-2">
          <div class="text-sm font-600">Panel + clearable</div>
          <DsSelect
            v-model="panelClearableValue"
            optionsView="panel"
            clearable
            :options="optionsNoEmpty"
            placeholder="Pick one"
            aria-label="Pick one (panel clearable)"
          />
          <div class="text-sm ds-muted">panelClearableValue: {{ panelClearableValue || '—' }}</div>
        </div>

        <div class="grid gap-2">
          <div class="text-sm font-600">Native + clearable</div>
          <DsSelect
            v-model="nativeClearableValue"
            clearable
            :options="optionsNoEmpty"
            aria-label="Pick one (native clearable)"
          />
          <div class="text-sm ds-muted">nativeClearableValue: {{ nativeClearableValue || '—' }}</div>
        </div>

        <div class="grid gap-2">
          <div class="text-sm font-600">Panel + placeholder</div>
          <DsSelect
            v-model="panelPlaceholderValue"
            optionsView="panel"
            :options="optionsNoEmpty"
            placeholder="Pick one"
            aria-label="Pick one (placeholder)"
          />
          <div class="text-sm ds-muted">panelPlaceholderValue: {{ panelPlaceholderValue || '—' }}</div>
        </div>

        <div class="grid gap-2">
          <div class="text-sm font-600">Panel + custom value</div>
          <DsSelect
            v-model="panelCustomValue"
            optionsView="panel"
            allow-custom-value
            :options="options"
            aria-label="Pick one (panel custom)"
          />
          <div class="text-sm ds-muted">panelCustomValue: {{ panelCustomValue }}</div>
        </div>

        <div class="grid gap-2">
          <div class="text-sm font-600">Native + custom value (programmatic)</div>
          <DsSelect
            v-model="nativeCustomValue"
            allow-custom-value
            :options="options"
            aria-label="Pick one (native custom)"
          />
          <div class="text-sm ds-muted">nativeCustomValue: {{ nativeCustomValue }}</div>
        </div>

        <div class="grid gap-2">
          <div class="text-sm font-600">Multiple</div>
          <div class="grid gap-2">
            <DsSelect
              v-model="panelMultiValue"
              multiple
              optionsView="panel"
              :close-on-select="false"
              :options="optionsNoEmpty"
              placeholder="Pick many"
              aria-label="Pick many (panel)"
            />
            <div class="text-sm ds-muted">panelMultiValue: {{ JSON.stringify(panelMultiValue) }}</div>

            <DsSelect
              v-model="nativeMultiValue"
              multiple
              :options="optionsNoEmpty"
              aria-label="Pick many (native)"
            />
            <div class="text-sm ds-muted">nativeMultiValue: {{ JSON.stringify(nativeMultiValue) }}</div>
          </div>
        </div>

        <div class="grid gap-2">
          <div class="text-sm font-600">Panel + slots (value/option)</div>
          <DsSelect
            v-model="panelSlotValue"
            multiple
            optionsView="panel"
            :close-on-select="false"
            :options="tagOptions"
            placeholder="Pick tags"
            aria-label="Tags (slots)"
          >
            <template #value="slotProps">
              <div class="flex items-center gap-1 min-w-0">
                <span
                  v-if="!slotProps.hasSelection"
                  class="block truncate text-[var(--muted-foreground)]"
                >
                  {{ slotProps.placeholder || '' }}
                </span>

                <template v-else>
                  <DsBadge
                    v-for="opt in slotProps.selectedOptions.slice(0, 3)"
                    :key="opt.value"
                    size="sm"
                    variant="info"
                    :title="opt.label"
                  >
                    <span class="truncate max-w-[140px]">{{ opt.label }}</span>
                  </DsBadge>

                  <DsBadge
                    v-if="slotProps.selectedOptions.length > 3"
                    size="sm"
                    variant="neutral"
                    :title="slotProps.displayLabel"
                  >
                    +{{ slotProps.selectedOptions.length - 3 }}
                  </DsBadge>
                </template>
              </div>
            </template>

            <template #option="slotProps">
              <span class="flex items-center gap-2 min-w-0">
                <span
                  class="h-4 w-4 shrink-0"
                  :class="slotProps.selected ? 'i-lucide-check text-[var(--primary)]' : ''"
                  aria-hidden="true"
                />
                <DsBadge size="sm" :variant="slotProps.selected ? 'primary' : 'neutral'">
                  <span class="truncate">{{ slotProps.option.label }}</span>
                </DsBadge>
              </span>
            </template>
          </DsSelect>
          <div class="text-sm ds-muted">panelSlotValue: {{ JSON.stringify(panelSlotValue) }}</div>
        </div>

        <div class="grid gap-2">
          <div class="text-sm font-600">Panel + slots (badges w/ variants)</div>
          <DsSelect
            v-model="panelBadgeSlotValue"
            multiple
            optionsView="panel"
            :close-on-select="false"
            :options="badgeOptions"
            placeholder="Pick labels"
            aria-label="Badges (slots)"
          >
            <template #value="slotProps">
              <div class="flex items-center gap-1 min-w-0">
                <span
                  v-if="!slotProps.hasSelection"
                  class="block truncate text-[var(--muted-foreground)]"
                >
                  {{ slotProps.placeholder || '' }}
                </span>

                <template v-else>
                  <DsBadge
                    v-for="opt in slotProps.selectedOptions.slice(0, 3)"
                    :key="opt.value"
                    :size="badgeOptionsByValue.get(opt.value)?.badgeSize ?? 'sm'"
                    :variant="badgeOptionsByValue.get(opt.value)?.badgeVariant ?? 'neutral'"
                    :dark="badgeOptionsByValue.get(opt.value)?.badgeDark ?? false"
                    :title="opt.label"
                  >
                    <span class="truncate max-w-[180px]">{{ opt.label }}</span>
                  </DsBadge>

                  <DsBadge
                    v-if="slotProps.selectedOptions.length > 3"
                    size="sm"
                    variant="neutral"
                    :title="slotProps.displayLabel"
                  >
                    +{{ slotProps.selectedOptions.length - 3 }}
                  </DsBadge>
                </template>
              </div>
            </template>

            <template #option="slotProps">
              <span class="flex items-center gap-2 min-w-0">
                <span
                  class="h-4 w-4 shrink-0"
                  :class="slotProps.selected ? 'i-lucide-check text-[var(--primary)]' : ''"
                  aria-hidden="true"
                />

                <DsBadge
                  :size="badgeOptionsByValue.get(slotProps.option.value)?.badgeSize ?? 'sm'"
                  :variant="badgeOptionsByValue.get(slotProps.option.value)?.badgeVariant ?? 'neutral'"
                  :dark="badgeOptionsByValue.get(slotProps.option.value)?.badgeDark ?? false"
                >
                  <span class="truncate">{{ slotProps.option.label }}</span>
                </DsBadge>
              </span>
            </template>
          </DsSelect>
          <div class="text-sm ds-muted">panelBadgeSlotValue: {{ JSON.stringify(panelBadgeSlotValue) }}</div>
        </div>

        <div class="grid gap-2">
          <div class="text-sm font-600">Sizes (default)</div>
          <div class="grid gap-2">
            <DsSelect v-model="sizeXs" size="xs" :options="options" aria-label="Pick one (xs)" />
            <DsSelect v-model="sizeSm" size="sm" :options="options" aria-label="Pick one (sm)" />
            <DsSelect v-model="sizeMd" size="md" :options="options" aria-label="Pick one (md)" />
            <DsSelect v-model="sizeLg" size="lg" :options="options" aria-label="Pick one (lg)" />
          </div>
        </div>

        <div class="grid gap-2">
          <div class="text-sm font-600">Inline (view=&quot;link&quot;)</div>
          <div class="text-sm text-[var(--foreground)]">
            Show analytics for
            <DsSelect v-model="period" view="link" :options="periodOptions" aria-label="Period" />.
          </div>
          <div class="text-sm ds-muted">period: {{ period }}</div>
        </div>
      </DsCard>
    </template>

    <template #usage>
      <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsSelect — Props" :items="selectPropsInfo" />
      <PlaygroundProps title="DsSelect — Slots" :items="selectSlotsInfo" />
      <PlaygroundProps title="DsSelect — Events" :items="selectEventsInfo" />
    </template>
  </PlaygroundPage>
</template>
