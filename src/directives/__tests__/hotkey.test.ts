import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { describe, expect, it, vi } from 'vitest'

import { vHotkey } from '@/directives/hotkey'

describe('vHotkey (unit)', () => {
  it('срабатывает на Escape и на Ctrl+K', async () => {
    const onEsc = vi.fn()
    const onSearch = vi.fn()

    const Harness = defineComponent({
      name: 'Harness',
      setup() {
        return { onEsc, onSearch }
      },
      template: '<div v-hotkey="{ Escape: onEsc, \'Ctrl+K\': onSearch }">X</div>',
    })

    const wrapper = mount(Harness, {
      attachTo: document.body,
      global: {
        directives: {
          hotkey: vHotkey,
        },
      },
    })

    const esc = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
    window.dispatchEvent(esc)
    expect(onEsc).toHaveBeenCalledTimes(1)
    expect(esc.defaultPrevented).toBe(false)

    const ctrlK = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true, cancelable: true })
    window.dispatchEvent(ctrlK)
    expect(onSearch).toHaveBeenCalledTimes(1)
    expect(ctrlK.defaultPrevented).toBe(true)

    wrapper.unmount()
  })

  it('не срабатывает после unmount', async () => {
    const onEsc = vi.fn()

    const Harness = defineComponent({
      name: 'Harness',
      setup() {
        return { onEsc }
      },
      template: '<div v-hotkey="{ Escape: onEsc }">X</div>',
    })

    const wrapper = mount(Harness, {
      attachTo: document.body,
      global: {
        directives: {
          hotkey: vHotkey,
        },
      },
    })

    wrapper.unmount()

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(onEsc).toHaveBeenCalledTimes(0)
  })
})
