import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { describe, expect, it, vi } from 'vitest'

import { vClickOutside } from '@/directives/clickOutside'

describe('vClickOutside (unit)', () => {
  it('вызывает handler при клике вне элемента', async () => {
    const onOutside = vi.fn()

    const Harness = defineComponent({
      name: 'Harness',
      setup() {
        return { onOutside }
      },
      template: '<div data-testid="box" v-click-outside="onOutside">X</div>',
    })

    const wrapper = mount(Harness, {
      attachTo: document.body,
      global: {
        directives: {
          'click-outside': vClickOutside,
        },
      },
    })

    const outside = document.createElement('button')
    outside.setAttribute('data-testid', 'outside')
    document.body.appendChild(outside)

    outside.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    expect(onOutside).toHaveBeenCalledTimes(1)

    wrapper.unmount()
  })

  it('не вызывает handler при клике внутри элемента', async () => {
    const onOutside = vi.fn()

    const Harness = defineComponent({
      name: 'Harness',
      setup() {
        return { onOutside }
      },
      template: '<div data-testid="box" v-click-outside="onOutside"><button data-testid="inner">I</button></div>',
    })

    const wrapper = mount(Harness, {
      attachTo: document.body,
      global: {
        directives: {
          'click-outside': vClickOutside,
        },
      },
    })

    wrapper.get('[data-testid="inner"]').element.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(onOutside).toHaveBeenCalledTimes(0)

    wrapper.unmount()
  })

  it('поддерживает exclude (клик по exclude не считается outside)', async () => {
    const onOutside = vi.fn()

    const Harness = defineComponent({
      name: 'Harness',
      setup() {
        return { onOutside }
      },
      template: `
        <div>
          <button id="toggle" data-testid="toggle">Toggle</button>
          <div data-testid="box" v-click-outside="{ handler: onOutside, exclude: ['#toggle'] }">Box</div>
        </div>
      `,
    })

    const wrapper = mount(Harness, {
      attachTo: document.body,
      global: {
        directives: {
          'click-outside': vClickOutside,
        },
      },
    })

    wrapper.get('[data-testid="toggle"]').element.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(onOutside).toHaveBeenCalledTimes(0)

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(onOutside).toHaveBeenCalledTimes(1)

    wrapper.unmount()
  })
})
