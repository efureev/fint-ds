import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import DsSegmented from '../DsSegmented.vue'

const options = [
  { value: 'list', label: 'List' },
  { value: 'board', label: 'Board' },
  { value: 'calendar', label: 'Calendar' },
] as const

class ResizeObserverMock {
  observe = vi.fn()
  disconnect = vi.fn()
}

function createRect({ left, top = 0, width, height }: { left: number, top?: number, width: number, height: number }) {
  return {
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    x: left,
    y: top,
    toJSON() {
      return this
    },
  }
}

describe('DsSegmented', () => {
  const originalResizeObserver = globalThis.ResizeObserver
  let rectSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver

    rectSpy = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function getBoundingClientRect() {
      const element = this as HTMLElement

      if (element.hasAttribute('data-ds-segmented')) {
        return createRect({ left: 0, width: 260, height: 48 }) as DOMRect
      }

      if (element.hasAttribute('data-ds-segmented-item')) {
        const value = element.getAttribute('data-value')

        if (value === 'list') {
          return createRect({ left: 4, top: 4, width: 72, height: 40 }) as DOMRect
        }

        if (value === 'board') {
          return createRect({ left: 80, top: 4, width: 84, height: 40 }) as DOMRect
        }

        if (value === 'calendar') {
          return createRect({ left: 168, top: 4, width: 92, height: 40 }) as DOMRect
        }
      }

      return createRect({ left: 0, width: 0, height: 0 }) as DOMRect
    })
  })

  afterEach(() => {
    rectSpy.mockRestore()
    globalThis.ResizeObserver = originalResizeObserver
  })

  it('рендерит radiogroup, selected-state и индикатор для pills-варианта', async () => {
    const wrapper = mount(DsSegmented, {
      props: {
        modelValue: 'board',
        options: [...options],
        ariaLabel: 'View mode',
      },
    })

    await nextTick()
    await nextTick()

    const group = wrapper.get('[role="radiogroup"]')
    expect(group.attributes('aria-label')).toBe('View mode')
    expect(group.attributes('data-variant')).toBe('pills')

    const radios = wrapper.findAll('[role="radio"]')
    expect(radios).toHaveLength(3)
    expect(radios[1].attributes('aria-checked')).toBe('true')
    expect(radios[1].attributes('tabindex')).toBe('0')

    const indicator = wrapper.get('[data-ds-segmented-indicator]')
    expect(indicator.attributes('style')).toContain('width: 84px')
    expect(indicator.attributes('style')).toContain('height: 40px')
    expect(indicator.attributes('style')).toContain('translate3d(80px, 4px, 0)')
  })

  it('применяет indicatorDuration через inline transitionDuration', async () => {
    const wrapper = mount(DsSegmented, {
      props: {
        modelValue: 'board',
        options: [...options],
        indicatorDuration: 420,
      },
    })

    await nextTick()
    await nextTick()

    const indicator = wrapper.get('[data-ds-segmented-indicator]')
    expect(indicator.attributes('style')).toContain('transition-duration: 420ms')
  })

  it('эмитит update:modelValue и change при клике по новой опции', async () => {
    const wrapper = mount(DsSegmented, {
      props: {
        modelValue: 'list',
        options: [...options],
      },
    })

    await wrapper.findAll('[role="radio"]')[1].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([['board']])
    expect(wrapper.emitted('change')).toEqual([[ 'board', { value: 'board', label: 'Board' } ]])
  })

  it('игнорирует disabled group и disabled option', async () => {
    const wrapper = mount(DsSegmented, {
      props: {
        modelValue: 'list',
        disabled: true,
        options: [
          { value: 'list', label: 'List' },
          { value: 'board', label: 'Board', disabled: true },
        ],
      },
    })

    const radios = wrapper.findAll('[role="radio"]')
    await radios[0].trigger('click')
    await radios[1].trigger('click')

    expect(radios[0].attributes('disabled')).toBeDefined()
    expect(radios[1].attributes('disabled')).toBeDefined()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('поддерживает keyboard navigation с пропуском disabled option', async () => {
    const wrapper = mount(DsSegmented, {
      props: {
        modelValue: 'list',
        options: [
          { value: 'list', label: 'List' },
          { value: 'board', label: 'Board', disabled: true },
          { value: 'calendar', label: 'Calendar' },
        ],
      },
      attachTo: document.body,
    })

    const radios = wrapper.findAll('[role="radio"]')
    await radios[0].trigger('keydown', { key: 'ArrowRight' })

    expect(wrapper.emitted('update:modelValue')).toEqual([['calendar']])
    expect(document.activeElement).toBe(radios[2].element)
  })

  it('применяет block-layout и button-variant', async () => {
    const wrapper = mount(DsSegmented, {
      props: {
        modelValue: 'calendar',
        variant: 'button',
        block: true,
        options: [...options],
      },
    })

    await nextTick()

    const group = wrapper.get('[data-ds-segmented]')
    expect(group.attributes('data-variant')).toBe('button')
    expect(group.attributes('class')).toContain('w-full')
    expect(group.attributes('style')).toContain('grid-template-columns: minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)')
  })

  it('обновляет индикатор при controlled update без сброса в ноль', async () => {
    const wrapper = mount(DsSegmented, {
      props: {
        modelValue: 'list',
        options: [...options],
      },
    })

    await nextTick()
    await nextTick()
    await wrapper.setProps({ modelValue: 'calendar' })
    await nextTick()
    await nextTick()

    const indicator = wrapper.get('[data-ds-segmented-indicator]')
    const style = indicator.attributes('style')
    expect(style).toContain('translate3d(168px, 4px, 0)')
    expect(style).not.toContain('translate3d(0px, 0px, 0px)')
  })

  it('поддерживает scoped slot для кастомного контента', () => {
    const wrapper = mount(DsSegmented, {
      props: {
        modelValue: 'board',
        options: [...options],
      },
      slots: {
        default: ({ option, selected, disabled }) => {
          return h('span', { class: 'custom-option' }, `${option.label} / ${selected ? 'selected' : 'idle'} / ${disabled ? 'disabled' : 'enabled'}`)
        },
      },
    })

    expect(wrapper.findAll('.custom-option')).toHaveLength(3)
    expect(wrapper.text()).toContain('Board / selected / enabled')
  })
})