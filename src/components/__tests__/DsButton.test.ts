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

describe('DsButton', () => {
  it('поддерживает размер `xs` в квадратном режиме (w/h + p-0 + inline-style safety net)', () => {
    const wrapper = mount(DsButton, {
      props: {
        size: 'xs',
        square: true,
      },
      slots: {
        default: 'X',
      },
    })

    const className = wrapper.get('[data-ds-button]').attributes('class')
    expect(className).toContain('w-7')
    expect(className).toContain('p-0')

    const el = wrapper.get('[data-ds-button]').element as HTMLButtonElement
    expect(el.style.width).toBe('28px')
    expect(el.style.minWidth).toBe('28px')
    expect(el.style.height).toBe('28px')
    expect(el.style.padding).toBe('0px')
  })

  it('делает кнопку квадратной через `square` (w/h + p-0)', () => {
    const wrapper = mount(DsButton, {
      props: {
        size: 'md',
        square: true,
      },
      slots: {
        default: 'X',
      },
    })

    const className = wrapper.get('[data-ds-button]').attributes('class')
    expect(className).toContain('w-10')
    expect(className).toContain('p-0')

    // Inline style is used as a safety net (e.g. when consumer's UnoCSS pipeline misses `w-*`).
    const el = wrapper.get('[data-ds-button]').element as HTMLButtonElement
    expect(el.style.width).toBe('40px')
    expect(el.style.minWidth).toBe('40px')
    expect(el.style.height).toBe('40px')
    expect(el.style.padding).toBe('0px')
  })

  it('по умолчанию не квадратная (есть горизонтальные паддинги)', () => {
    const wrapper = mount(DsButton, {
      props: {
        size: 'md',
      },
      slots: {
        default: 'OK',
      },
    })

    const className = wrapper.get('[data-ds-button]').attributes('class')
    expect(className).toContain('px-4')

    const el = wrapper.get('[data-ds-button]').element as HTMLButtonElement
    expect(el.style.width).toBe('')
    expect(el.style.height).toBe('')
  })

  it('поддерживает variant `ghost-border`: без фона на hover/active, только бордер', () => {
    const wrapper = mount(DsButton, {
      props: {
        variant: 'ghost-border',
      },
      slots: {
        default: 'Ghost border',
      },
    })

    const btn = wrapper.get('[data-ds-button]')
    const className = btn.attributes('class')

    // Variant is exposed as a DOM marker so base CSS can implement interactive styles
    // without relying on consumer UnoCSS extraction.
    expect(btn.attributes('data-ds-variant')).toBe('ghost-border')

    // Normal state: same base as `ghost`.
    expect(className).toContain('bg-transparent')
    expect(className).toContain('text-[var(--foreground)]')

    // No background on hover/active.
    expect(className).not.toContain('hover:bg-')
    expect(className).not.toContain('active:bg-')

    // Border hover/active behavior is implemented via `@feugene/fint-ds/base.css`.
    expect(className).not.toContain('hover:border-')
    expect(className).not.toContain('active:border-')
  })
})
