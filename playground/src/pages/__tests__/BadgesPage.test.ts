import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { describe, expect, it, vi } from 'vitest'

import BadgesPage from '../BadgesPage.vue'

vi.mock('@feugene/fint-i18n', () => ({
  useFintI18n: () => ({
    t: (_key: string, fallback: string) => fallback,
  }),
}))

const PlaygroundPageStub = defineComponent({
  name: 'PlaygroundPage',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
  },
  template: '<section :data-title="title" :data-description="description"><slot name="ui" /><slot name="usage" /><slot name="api" /></section>',
})

const PlaygroundPropsStub = defineComponent({
  name: 'PlaygroundProps',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
  template: '<div data-testid="playground-props" :data-title="title" />',
})

const DsCardStub = defineComponent({
  name: 'DsCard',
  template: '<div class="ds-card-stub"><slot /></div>',
})

const DsBadgeStub = defineComponent({
  name: 'DsBadge',
  inheritAttrs: false,
  props: {
    variant: {
      type: String,
      required: false,
      default: 'neutral',
    },
    size: {
      type: String,
      required: false,
      default: 'md',
    },
    radius: {
      type: String,
      required: false,
      default: 'round',
    },
    dark: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  template: `
    <div
      class="ds-badge-stub"
      v-bind="$attrs"
      :data-variant="variant"
      :data-size="size"
      :data-radius="radius"
      :data-dark="dark ? 'true' : 'false'"
    >
      <slot />
    </div>
  `,
})

const DsInputStub = defineComponent({
  name: 'DsInput',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  template: `
    <input
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  `,
})

const DsSelectStub = defineComponent({
  name: 'DsSelect',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      required: false,
      default: '',
    },
    options: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  template: `
    <select
      v-bind="$attrs"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
  `,
})

const DsSwitchStub = defineComponent({
  name: 'DsSwitch',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  template: `
    <label v-bind="$attrs">
      <input
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
      />
      <slot />
    </label>
  `,
})

function mountPage() {
  return mount(BadgesPage, {
    global: {
      stubs: {
        PlaygroundPage: PlaygroundPageStub,
        PlaygroundProps: PlaygroundPropsStub,
        DsBadge: DsBadgeStub,
        DsBadgeWrap: true,
        DsButton: true,
        DsCard: DsCardStub,
        DsInput: DsInputStub,
        DsSelect: DsSelectStub,
        DsSwitch: DsSwitchStub,
      },
    },
  })
}

describe('BadgesPage', () => {
  it('реактивно обновляет превью бейджа при изменении контролов', async () => {
    const wrapper = mountPage()

    const previewBadge = () => wrapper.get('[data-testid="badge-playground-preview"] .ds-badge-stub')

    expect(previewBadge().text()).toContain('Needs review')
    expect(previewBadge().attributes('data-variant')).toBe('warning')
    expect(previewBadge().attributes('data-size')).toBe('md')
    expect(previewBadge().attributes('data-radius')).toBe('round')
    expect(previewBadge().attributes('data-dark')).toBe('false')

    await wrapper.get('[data-testid="badge-playground-label"]').setValue('Approved')
    await wrapper.get('[data-testid="badge-playground-variant"]').setValue('success')
    await wrapper.get('[data-testid="badge-playground-size"]').setValue('lg')
    await wrapper.get('[data-testid="badge-playground-radius"]').setValue('square')
    await wrapper.get('[data-testid="badge-playground-dark"] input').setValue(true)

    expect(previewBadge().text()).toContain('Approved')
    expect(previewBadge().attributes('data-variant')).toBe('success')
    expect(previewBadge().attributes('data-size')).toBe('lg')
    expect(previewBadge().attributes('data-radius')).toBe('square')
    expect(previewBadge().attributes('data-dark')).toBe('true')

    await wrapper.get('[data-testid="badge-playground-label"]').setValue('')

    expect(previewBadge().text()).toContain('Badge')
  })
})