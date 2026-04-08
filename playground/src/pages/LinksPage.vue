<script setup lang="ts">
import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

const linkPropsInfo = [
  {
    name: 'href',
    type: 'string | undefined',
    description: 'Если задан и ссылка не disabled — рендерится <a>. Если href нет — рендерится <span>.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Переводит компонент в «неактивный» режим и форсирует рендер <span>, даже если href задан.',
  },
  {
    name: 'variant',
    type: "'primary' | 'default' | 'muted' | 'danger'",
    default: "'primary'",
    description: 'Цвет ссылки (влияет на hover/active состояния).',
  },
  {
    name: 'underline',
    type: "'auto' | 'always' | 'none'",
    default: "'auto'",
    description: 'Подчёркивание: auto (только hover), always, none.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'sm'",
    description: 'Размер текста.',
  },
  {
    name: 'external',
    type: 'boolean',
    default: 'false',
    description: 'Если true — по умолчанию ставит target=_blank и rel=noopener noreferrer (можно переопределить вручную).',
  },
  {
    name: 'target',
    type: 'string | undefined',
    description: 'Атрибут target (если не задан — берётся из external).',
  },
  {
    name: 'rel',
    type: 'string | undefined',
    description: 'Атрибут rel (если не задан — берётся из external).',
  },
  {
    name: 'ariaLabel',
    type: 'string | undefined',
    description: 'aria-label для доступности (особенно важно для ссылок без текста).',
  },
] as const

const linkSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Контент ссылки: текст и/или иконки.',
  },
] as const

const usageCode = `<template>
  <DsLink href="https://example.com" variant="primary">Link</DsLink>
  <DsLink href="https://example.com" external>External</DsLink>
  <DsLink disabled>Disabled</DsLink>
</template>
`
</script>

<template>
  <PlaygroundPage title="DsLink" description="Варианты: variant / underline / size / disabled / external.">
    <template #ui>
      <DsCard class="p-5 grid gap-6">
        <div class="grid gap-2">
          <div class="text-sm font-600">Variants</div>
          <div class="flex flex-wrap gap-4">
            <DsLink href="https://example.com" variant="primary">Primary</DsLink>
            <DsLink href="https://example.com" variant="default">Default</DsLink>
            <DsLink href="https://example.com" variant="muted">Muted</DsLink>
            <DsLink href="https://example.com" variant="danger">Danger</DsLink>
          </div>
        </div>

        <div class="grid gap-2">
          <div class="text-sm font-600">Underline</div>
          <div class="flex flex-wrap gap-4">
            <DsLink href="https://example.com" underline="auto">auto</DsLink>
            <DsLink href="https://example.com" underline="always">always</DsLink>
            <DsLink href="https://example.com" underline="none">none</DsLink>
          </div>
        </div>

        <div class="grid gap-2">
          <div class="text-sm font-600">Sizes</div>
          <div class="flex flex-wrap items-baseline gap-4">
            <DsLink href="https://example.com" size="sm">Small</DsLink>
            <DsLink href="https://example.com" size="md">Medium</DsLink>
            <DsLink href="https://example.com" size="lg">Large</DsLink>
          </div>
        </div>

        <div class="grid gap-2">
          <div class="text-sm font-600">Disabled</div>
          <div class="flex flex-wrap gap-4">
            <DsLink disabled>Disabled (renders as span)</DsLink>
            <DsLink href="https://example.com" disabled>Disabled with href (still span)</DsLink>
          </div>
        </div>

        <div class="grid gap-2">
          <div class="text-sm font-600">External</div>
          <div class="flex flex-wrap gap-4">
            <DsLink href="https://example.com" external>External link (target=_blank)</DsLink>
          </div>
        </div>
      </DsCard>
    </template>

    <template #usage>
      <pre class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsLink — Props" :items="linkPropsInfo" />
      <PlaygroundProps title="DsLink — Slots" :items="linkSlotsInfo" />
    </template>
  </PlaygroundPage>
</template>
