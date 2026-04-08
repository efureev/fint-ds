import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import { describe, expect, it } from 'vitest'

import DsCollapse from '@/components/DsCollapse.vue'
import DsCollapseItem from '@/components/DsCollapseItem.vue'

describe('DsCollapse', () => {
  it('в режиме multiple (по умолчанию) добавляет/удаляет элементы в массиве v-model', async () => {
    const Harness = defineComponent({
      name: 'Harness',
      components: { DsCollapse, DsCollapseItem },
      setup() {
        const value = ref<(string | number)[]>([])
        return { value }
      },
      template: `
        <div>
          <DsCollapse v-model="value">
            <DsCollapseItem name="a" title="A">A content</DsCollapseItem>
            <DsCollapseItem name="b" title="B">B content</DsCollapseItem>
          </DsCollapse>

          <div data-testid="value">{{ JSON.stringify(value) }}</div>
        </div>
      `,
    })

    const wrapper = mount(Harness)

    const triggers = wrapper.findAll('[data-ds-collapse-trigger]')
    expect(triggers.length).toBe(2)

    expect(wrapper.get('[data-testid="value"]').text()).toBe('[]')

    await triggers[0].trigger('click')
    expect(wrapper.get('[data-testid="value"]').text()).toBe('["a"]')

    await triggers[1].trigger('click')
    expect(wrapper.get('[data-testid="value"]').text()).toBe('["a","b"]')

    await triggers[0].trigger('click')
    expect(wrapper.get('[data-testid="value"]').text()).toBe('["b"]')
  })

  it('в режиме accordion держит открытым только один item и очищает значение при закрытии', async () => {
    const Harness = defineComponent({
      name: 'Harness',
      components: { DsCollapse, DsCollapseItem },
      setup() {
        const value = ref<string | number | undefined>('a')
        return { value }
      },
      template: `
        <div>
          <DsCollapse v-model="value" accordion>
            <DsCollapseItem name="a" title="A">A content</DsCollapseItem>
            <DsCollapseItem name="b" title="B">B content</DsCollapseItem>
          </DsCollapse>

          <div data-testid="value">{{ value === undefined ? 'undefined' : String(value) }}</div>
        </div>
      `,
    })

    const wrapper = mount(Harness)
    const triggers = wrapper.findAll('[data-ds-collapse-trigger]')

    expect(wrapper.get('[data-testid="value"]').text()).toBe('a')
    expect(triggers[0].attributes('aria-expanded')).toBe('true')
    expect(triggers[1].attributes('aria-expanded')).toBe('false')

    await triggers[1].trigger('click')
    expect(wrapper.get('[data-testid="value"]').text()).toBe('b')
    expect(triggers[0].attributes('aria-expanded')).toBe('false')
    expect(triggers[1].attributes('aria-expanded')).toBe('true')

    await triggers[1].trigger('click')
    expect(wrapper.get('[data-testid="value"]').text()).toBe('undefined')
    expect(triggers[1].attributes('aria-expanded')).toBe('false')
  })

  it('не раскрывается при disabled у item', async () => {
    const Harness = defineComponent({
      name: 'Harness',
      components: { DsCollapse, DsCollapseItem },
      setup() {
        const value = ref<(string | number)[]>([])
        return { value }
      },
      template: `
        <div>
          <DsCollapse v-model="value">
            <DsCollapseItem name="a" title="A" disabled>A content</DsCollapseItem>
            <DsCollapseItem name="b" title="B">B content</DsCollapseItem>
          </DsCollapse>

          <div data-testid="value">{{ JSON.stringify(value) }}</div>
        </div>
      `,
    })

    const wrapper = mount(Harness)
    const triggers = wrapper.findAll('[data-ds-collapse-trigger]')

    await triggers[0].trigger('click')
    expect(wrapper.get('[data-testid="value"]').text()).toBe('[]')
    expect(triggers[0].attributes('aria-expanded')).toBe('false')

    await triggers[1].trigger('click')
    expect(wrapper.get('[data-testid="value"]').text()).toBe('["b"]')
  })
})
