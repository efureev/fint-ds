import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import DsBadge from '@/components/DsBadge.vue'

describe('DsBadge', () => {
  it('renders light variant by default', () => {
    const wrapper = mount(DsBadge, {
      props: {
        variant: 'success',
      },
      slots: {
        default: 'Success',
      },
    })

    expect(wrapper.text()).toContain('Success')
    expect(wrapper.attributes('class')).toContain('bg-[var(--ds-success-light)]')
    expect(wrapper.attributes('class')).toContain('text-[var(--ds-success)]')
    expect(wrapper.attributes('class')).toContain(
      'border-[color-mix(in_srgb,var(--ds-success)_30%,var(--ds-success-light))]',
    )
  })

  it('keeps warning and danger borders aligned with their tinted background in soft mode', () => {
    const warning = mount(DsBadge, {
      props: {
        variant: 'warning',
      },
      slots: {
        default: 'Warning',
      },
    })

    const danger = mount(DsBadge, {
      props: {
        variant: 'danger',
      },
      slots: {
        default: 'Danger',
      },
    })

    expect(warning.attributes('class')).toContain(
      'border-[color-mix(in_srgb,var(--ds-warning)_30%,var(--ds-warning-light))]',
    )
    expect(danger.attributes('class')).toContain(
      'border-[color-mix(in_srgb,var(--ds-danger)_30%,var(--ds-danger-light))]',
    )
  })

  it('supports size: sm / md / lg', () => {
    const sm = mount(DsBadge, { props: { size: 'sm' }, slots: { default: 'SM' } })
    expect(sm.attributes('class')).toContain('text-[11px]')
    expect(sm.attributes('class')).toContain('px-2')

    const md = mount(DsBadge, { props: { size: 'md' }, slots: { default: 'MD' } })
    expect(md.attributes('class')).toContain('text-[12px]')
    expect(md.attributes('class')).toContain('px-2.5')

    const lg = mount(DsBadge, { props: { size: 'lg' }, slots: { default: 'LG' } })
    expect(lg.attributes('class')).toContain('text-[13px]')
    expect(lg.attributes('class')).toContain('px-3')
    expect(lg.attributes('class')).toContain('py-1')
  })

  it('supports border radius presets: square / semi / round', () => {
    const square = mount(DsBadge, { props: { radius: 'square' }, slots: { default: 'Square' } })
    expect(square.attributes('class')).toContain('rounded-[var(--ds-radius-none)]')

    const semi = mount(DsBadge, {
      props: { radius: 'semi', size: 'lg' },
      slots: { default: 'Semi' },
    })
    expect(semi.attributes('class')).toContain('rounded-[5px]')

    const round = mount(DsBadge, { props: { radius: 'round' }, slots: { default: 'Round' } })
    expect(round.attributes('class')).toContain('rounded-full')
  })

  it('renders dark filled variant when `dark` is true', () => {
    const wrapper = mount(DsBadge, {
      props: {
        variant: 'success',
        dark: true,
        size: 'lg',
        radius: 'semi',
      },
      slots: {
        default: 'Success',
      },
    })

    expect(wrapper.attributes('class')).toContain('bg-[var(--ds-success)]')
    expect(wrapper.attributes('class')).toContain('text-white')
    expect(wrapper.attributes('class')).toContain('text-[13px]')
    expect(wrapper.attributes('class')).toContain('rounded-[5px]')
  })

  it('renders dark neutral as inverted', () => {
    const wrapper = mount(DsBadge, {
      props: {
        variant: 'neutral',
        dark: true,
      },
      slots: {
        default: 'Neutral',
      },
    })

    expect(wrapper.attributes('class')).toContain('bg-[var(--foreground)]')
    expect(wrapper.attributes('class')).toContain('text-[var(--background)]')
  })
})
