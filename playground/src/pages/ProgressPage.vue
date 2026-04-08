<script setup lang="ts">
import { ref } from 'vue'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

const value = ref(42)

const progressPropsInfo = [
  {
    name: 'value',
    type: 'number',
    description: 'Значение прогресса. Компонент сам ограничивает (clamp) диапазон 0..100; NaN → 0.',
  },
  {
    name: 'ariaLabel',
    type: 'string | undefined',
    description: 'Текст для доступности, если рядом нет видимого описания прогресса.',
  },
] as const

const usageCode = `<template>
  <DsProgressBar :value="42" aria-label="Progress" />
</template>
`
</script>

<template>
  <PlaygroundPage title="DsProgressBar" description="Несколько значений + крайние случаи (clamp 0..100).">
    <template #ui>
      <DsCard class="p-5 grid gap-6">
        <div class="grid gap-3">
          <div class="text-sm font-600">Interactive</div>
          <div class="flex flex-wrap gap-2">
            <DsButton size="sm" variant="outline" @click="value = 0">0</DsButton>
            <DsButton size="sm" variant="outline" @click="value = 25">25</DsButton>
            <DsButton size="sm" variant="outline" @click="value = 50">50</DsButton>
            <DsButton size="sm" variant="outline" @click="value = 75">75</DsButton>
            <DsButton size="sm" variant="outline" @click="value = 100">100</DsButton>
            <DsButton size="sm" variant="outline" @click="value = 133">133</DsButton>
            <DsButton size="sm" variant="outline" @click="value = -20">-20</DsButton>
          </div>

          <div class="grid gap-2">
            <div class="text-sm ds-muted">value: {{ value }}</div>
            <DsProgressBar :value="value" aria-label="Progress" />
          </div>
        </div>

        <div class="grid gap-3">
          <div class="text-sm font-600">Examples</div>
          <div class="grid gap-3">
            <div class="grid gap-2">
              <div class="text-xs ds-muted">0%</div>
              <DsProgressBar :value="0" aria-label="0%" />
            </div>
            <div class="grid gap-2">
              <div class="text-xs ds-muted">33%</div>
              <DsProgressBar :value="33" aria-label="33%" />
            </div>
            <div class="grid gap-2">
              <div class="text-xs ds-muted">66%</div>
              <DsProgressBar :value="66" aria-label="66%" />
            </div>
            <div class="grid gap-2">
              <div class="text-xs ds-muted">100%</div>
              <DsProgressBar :value="100" aria-label="100%" />
            </div>
          </div>
        </div>
      </DsCard>
    </template>

    <template #usage>
      <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsProgressBar — Props" :items="progressPropsInfo" />
    </template>
  </PlaygroundPage>
</template>
