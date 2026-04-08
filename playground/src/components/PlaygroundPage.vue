<script setup lang="ts">
import { useFintI18n } from '@feugene/fint-i18n'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
  }>(),
  {
    description: undefined,
  },
)

const { t } = useFintI18n()

const defaultUsageCode = `<template>
  <!-- TODO: добавьте пример использования компонента -->
</template>
`
</script>

<template>
  <div class="grid gap-6">
    <div>
      <h1 class="ds-h1">{{ props.title }}</h1>
      <p v-if="props.description" class="text-sm ds-muted mt-1">
        {{ props.description }}
      </p>
    </div>

    <slot name="ui" />

    <DsCard class="p-5 grid gap-4">
      <div class="text-base font-800">
        {{ t('playground.sections.usage', 'Использование') }}
      </div>
      <slot name="usage">
        <pre
          class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"
        ><code class="text-[12px]">{{ defaultUsageCode }}</code></pre>
      </slot>
    </DsCard>

    <div v-if="$slots.api" class="grid gap-4">
      <div class="text-base font-800">
        {{ t('playground.sections.api', 'API') }}
      </div>
      <slot name="api" />
    </div>
  </div>
</template>
