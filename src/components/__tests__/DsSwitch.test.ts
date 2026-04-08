import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import DsSwitch from '@/components/DsSwitch.vue'

describe('DsSwitch', () => {
  it('по умолчанию оставляет текущие цвета трека для обоих состояний', async () => {
    const wrapper = mount(DsSwitch, {
      props: {
        modelValue: false,
      },
    })

    const track = wrapper.get('[data-testid="ds-switch-track"]')

    expect(track.attributes('style')).toContain('--ds-switch-track-bg: var(--muted);')
    expect(track.attributes('style')).toContain('--ds-switch-track-border: var(--border);')

    await wrapper.setProps({ modelValue: true })

    expect(track.attributes('style')).toContain('--ds-switch-track-bg: var(--primary);')
    expect(track.attributes('style')).toContain('--ds-switch-track-border: var(--primary);')
  })

  it('поддерживает size=sm (трек и ползунок)', () => {
    const wrapper = mount(DsSwitch, {
      props: {
        modelValue: false,
        size: 'sm',
      },
      slots: {
        default: 'Label',
      },
    })

    const track = wrapper.get('[data-testid="ds-switch-track"]')
    const thumb = wrapper.get('[data-testid="ds-switch-thumb"]')

    expect(track.attributes('class')).toContain('h-5')
    expect(track.attributes('class')).toContain('w-9')

    expect(thumb.attributes('class')).toContain('h-4')
    expect(thumb.attributes('class')).toContain('w-4')
    expect(thumb.attributes('class')).toContain('translate-x-[2px]')
  })

  it('поддерживает size=lg и положение в checked-состоянии', () => {
    const wrapper = mount(DsSwitch, {
      props: {
        modelValue: true,
        size: 'lg',
      },
    })

    const track = wrapper.get('[data-testid="ds-switch-track"]')
    const thumb = wrapper.get('[data-testid="ds-switch-thumb"]')

    expect(track.attributes('class')).toContain('h-7')
    expect(track.attributes('class')).toContain('w-14')

    expect(thumb.attributes('class')).toContain('h-6')
    expect(thumb.attributes('class')).toContain('w-6')
    expect(thumb.attributes('class')).toContain('translate-x-[28px]')
  })

  it('применяет кастомные цвета фона для активного и неактивного состояний', async () => {
    const wrapper = mount(DsSwitch, {
      props: {
        modelValue: false,
        activeBackgroundColor: '#22c55e',
        inactiveBackgroundColor: '#e5e7eb',
      },
    })

    const track = wrapper.get('[data-testid="ds-switch-track"]')

    expect(track.attributes('style')).toContain('--ds-switch-track-bg: #e5e7eb;')
    expect(track.attributes('style')).toContain('--ds-switch-track-border: #e5e7eb;')

    await wrapper.setProps({ modelValue: true })

    expect(track.attributes('style')).toContain('--ds-switch-track-bg: #22c55e;')
    expect(track.attributes('style')).toContain('--ds-switch-track-border: #22c55e;')
  })
})
