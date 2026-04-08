import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import { afterEach, describe, expect, it } from 'vitest'

import DsDropdown from '@/components/DsDropdown.vue'

function mountHarness() {
  const Harness = defineComponent({
    name: 'Harness',
    components: { DsDropdown },
    template: `
      <DsDropdown>
        <template #trigger>
          <button type="button" data-testid="trigger">Open</button>
        </template>
        <template #content>
          <div data-testid="content">Content</div>
        </template>
      </DsDropdown>
    `,
  })

  return mount(Harness, {
    attachTo: document.body,
  })
}

describe('DsDropdown (unit)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('открывается и закрывается по клику на триггер', async () => {
    const wrapper = mountHarness()

    const content = wrapper.find('[data-testid="content"]')
    expect(content.exists()).toBe(true)
    expect(content.isVisible()).toBe(false)

    await wrapper.find('[data-testid="trigger"]').trigger('click')
    await nextTick()
    expect(content.isVisible()).toBe(true)

    await wrapper.find('[data-testid="trigger"]').trigger('click')
    await nextTick()
    expect(content.isVisible()).toBe(false)

    wrapper.unmount()
  })

  it('закрывается по клику вне', async () => {
    const wrapper = mountHarness()

    const content = wrapper.find('[data-testid="content"]')

    await wrapper.find('[data-testid="trigger"]').trigger('click')
    await nextTick()
    expect(content.isVisible()).toBe(true)

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(content.isVisible()).toBe(false)

    wrapper.unmount()
  })

  it('закрывается по ESC', async () => {
    const wrapper = mountHarness()

    const content = wrapper.find('[data-testid="content"]')

    await wrapper.find('[data-testid="trigger"]').trigger('click')
    await nextTick()
    expect(content.isVisible()).toBe(true)

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()
    expect(content.isVisible()).toBe(false)

    wrapper.unmount()
  })

  it('закрывается по клику по контенту (по умолчанию)', async () => {
    const wrapper = mountHarness()

    const content = wrapper.find('[data-testid="content"]')

    await wrapper.find('[data-testid="trigger"]').trigger('click')
    await nextTick()
    expect(content.isVisible()).toBe(true)

    await content.trigger('click')
    await nextTick()
    expect(content.isVisible()).toBe(false)

    wrapper.unmount()
  })
})
