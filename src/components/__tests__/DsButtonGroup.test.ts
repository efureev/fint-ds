import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { describe, expect, it, vi } from 'vitest'

vi.mock('~icons/lucide/loader-circle', () => {
  return {
    default: defineComponent({
      name: 'IconLoader',
      template: '<svg data-icon="loader" />',
    }),
  }
})

import DsButton from '@/components/DsButton.vue'
import DsButtonGroup from '@/components/DsButtonGroup.vue'

describe('DsButtonGroup', () => {
  it('рендерит слот и содержит DS-кнопки (data-ds-button) внутри контейнера', () => {
    const wrapper = mount(DsButtonGroup, {
      slots: {
        default: [
          defineComponent({
            components: { DsButton },
            template: '<DsButton>One</DsButton>',
          }),
          defineComponent({
            components: { DsButton },
            template: '<DsButton variant="outline">Two</DsButton>',
          }),
        ],
      },
    })

    expect(wrapper.get('[data-ds-button-group]').exists()).toBe(true)
    expect(wrapper.findAll('[data-ds-button]').length).toBe(2)
  })
})
