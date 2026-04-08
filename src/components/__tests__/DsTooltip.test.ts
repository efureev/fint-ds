import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { describe, expect, it, vi } from 'vitest'

vi.mock('~icons/lucide/info', () => {
  return {
    default: defineComponent({
      name: 'IconInfo',
      template: '<svg data-icon="info" />',
    }),
  }
})

import DsTooltip from '@/components/DsTooltip.vue'

describe('DsTooltip', () => {
  it('по умолчанию рендерит иконку info и plain-text подсказку', () => {
    const wrapper = mount(DsTooltip, {
      props: {
        text: 'Подсказка',
      },
    })

    expect(wrapper.find('[data-icon="info"]').exists()).toBe(true)
    expect(wrapper.get('[role="tooltip"]').text()).toBe('Подсказка')
  })

  it('позволяет переопределить trigger через slot', () => {
    const wrapper = mount(DsTooltip, {
      props: {
        text: 'Подробнее',
      },
      slots: {
        default: '<button type="button" data-testid="custom-trigger">?</button>',
      },
    })

    expect(wrapper.find('[data-icon="info"]').exists()).toBe(false)
    expect(wrapper.get('[data-testid="custom-trigger"]').exists()).toBe(true)
  })

  it('применяет кастомный цвет иконки', () => {
    const wrapper = mount(DsTooltip, {
      props: {
        text: 'Подсказка',
        iconColor: '#64748b',
      },
    })

    const trigger = wrapper.get('[data-testid="ds-tooltip-trigger"]').element as HTMLSpanElement

    expect(trigger.style.getPropertyValue('--ds-tooltip-icon-color')).toBe('#64748b')
  })
})