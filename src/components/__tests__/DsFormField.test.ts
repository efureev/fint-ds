import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import DsFormField from '@/components/DsFormField.vue'

describe('DsFormField', () => {
  it('показывает текст ошибки под контролом и использует danger-цвет', () => {
    const wrapper = mount(DsFormField, {
      props: {
        label: 'Email',
        forId: 'email',
        error: 'Email обязателен.',
      },
      slots: {
        default: '<input id="email" />',
      },
    })

    expect(wrapper.classes()).toContain('flex')
    expect(wrapper.classes()).toContain('flex-col')
    expect(wrapper.classes()).toContain('gap-2')

    expect(wrapper.text()).toContain('Email')
    expect(wrapper.text()).toContain('Email обязателен.')

    const errorEl = wrapper
      .findAll('div')
      .find((x) => x.text() === 'Email обязателен.')

    expect(errorEl).toBeTruthy()
    expect(errorEl!.attributes('class')).toContain('text-[var(--ds-danger)]')
  })
})
