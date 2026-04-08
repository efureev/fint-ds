import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import DsIcon from '@/components/DsIcon.vue'

describe('DsIcon', () => {
  it('рендерит слот', () => {
    const wrapper = mount(DsIcon, {
      slots: {
        default: '<svg data-icon="x" />',
      },
    })

    expect(wrapper.get('[data-ds-icon]').exists()).toBe(true)
    expect(wrapper.get('[data-icon="x"]').exists()).toBe(true)
  })

  it('устанавливает размер через CSS var', () => {
    const wrapper = mount(DsIcon, {
      props: {
        size: 24,
      },
      slots: {
        default: '<svg />',
      },
    })

    const el = wrapper.get('[data-ds-icon]').element as HTMLSpanElement
    expect(el.style.getPropertyValue('--ds-icon-size')).toBe('24px')
  })

  it('поддерживает size token', () => {
    const wrapper = mount(DsIcon, {
      props: {
        size: 'sm',
      },
      slots: {
        default: '<svg />',
      },
    })

    const el = wrapper.get('[data-ds-icon]').element as HTMLSpanElement
    expect(el.style.getPropertyValue('--ds-icon-size')).toBe('16px')
  })
})
