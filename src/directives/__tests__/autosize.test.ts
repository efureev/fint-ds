import { mount } from '@vue/test-utils'
import { defineComponent, nextTick, ref } from 'vue'
import { afterEach, describe, expect, it } from 'vitest'

import { vAutosize } from '@/directives/autosize'

describe('vAutosize (unit)', () => {
  const originalRaf = globalThis.requestAnimationFrame

  afterEach(() => {
    globalThis.requestAnimationFrame = originalRaf
  })

  it('устанавливает высоту по scrollHeight и обновляет её на input', async () => {
    const text = ref('')

    const Harness = defineComponent({
      name: 'Harness',
      setup() {
        return { text }
      },
      template: '<textarea data-testid="ta" v-autosize v-model="text" style="box-sizing: content-box; border: 0"></textarea>',
    })

    const wrapper = mount(Harness, {
      attachTo: document.body,
      global: {
        directives: {
          autosize: vAutosize,
        },
      },
    })

    const ta = wrapper.get('[data-testid="ta"]').element as HTMLTextAreaElement

    Object.defineProperty(ta, 'scrollHeight', { value: 50, configurable: true })
    await nextTick()

    // В момент mount уже мог быть вызван autosize — принудительно дернём input.
    ta.dispatchEvent(new Event('input', { bubbles: true }))
    expect(ta.style.height).toBe('50px')

    Object.defineProperty(ta, 'scrollHeight', { value: 20, configurable: true })
    ta.dispatchEvent(new Event('input', { bubbles: true }))
    expect(ta.style.height).toBe('20px')

    wrapper.unmount()
  })

  it('пересчитывает высоту после первой отрисовки (nextTick + requestAnimationFrame) без ввода', async () => {
    let rafCb: FrameRequestCallback | null = null
    globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) => {
      rafCb = cb
      return 1 as any
    }) as any

    let scrollHeightValue = 0

    const Harness = defineComponent({
      name: 'Harness',
      setup() {
        const text = ref('Line 1\nLine 2')
        return { text }
      },
      template: '<textarea data-testid="ta" v-autosize v-model="text" style="box-sizing: content-box; border: 0"></textarea>',
    })

    const wrapper = mount(Harness, {
      attachTo: document.body,
      global: {
        directives: {
          autosize: vAutosize,
        },
      },
    })

    const ta = wrapper.get('[data-testid="ta"]').element as HTMLTextAreaElement
    Object.defineProperty(ta, 'scrollHeight', {
      get: () => scrollHeightValue,
      configurable: true,
    })

    // Имитируем ситуацию, когда на момент mounted scrollHeight ещё некорректен,
    // но становится корректным после первого кадра.
    scrollHeightValue = 60
    await nextTick()

    expect(rafCb).not.toBeNull()
    rafCb?.(0)
    expect(ta.style.height).toBe('60px')

    wrapper.unmount()
  })
})
