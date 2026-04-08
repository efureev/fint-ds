import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import { describe, expect, it } from 'vitest'

import DsRadio from '@/components/DsRadio.vue'
import DsRadioGroup from '@/components/DsRadioGroup.vue'

describe('DsRadioGroup', () => {
  it('в slot-режиме (variant=button) обновляет значение при выборе DsRadio', async () => {
    const Harness = defineComponent({
      name: 'Harness',
      components: { DsRadioGroup, DsRadio },
      setup() {
        const value = ref('a')
        return { value }
      },
      template: `
        <div>
          <DsRadioGroup v-model="value" variant="button" name="plan">
            <DsRadio variant="button" value="a">A</DsRadio>
            <DsRadio variant="button" value="b">B</DsRadio>
          </DsRadioGroup>
          <div data-testid="value">{{ value }}</div>
        </div>
      `,
    })

    const wrapper = mount(Harness)

    expect(wrapper.get('[data-testid="value"]').text()).toBe('a')
    await wrapper.findAll('[data-ds-radio]')[1].trigger('click')
    expect(wrapper.get('[data-testid="value"]').text()).toBe('b')
  })

  it('в options-режиме (variant=button) рендерит DsRadio и обновляет значение', async () => {
    const Harness = defineComponent({
      name: 'Harness',
      components: { DsRadioGroup },
      setup() {
        const value = ref('a')
        const options = [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]
        return { value, options }
      },
      template: `
        <div>
          <DsRadioGroup v-model="value" variant="button" :options="options" />
          <div data-testid="value">{{ value }}</div>
        </div>
      `,
    })

    const wrapper = mount(Harness)
    await wrapper.findAll('[data-ds-radio]')[1].trigger('click')
    expect(wrapper.get('[data-testid="value"]').text()).toBe('b')
  })

  it('прокидывает size в DsRadio в options-режиме (variant=button)', () => {
    const Harness = defineComponent({
      name: 'Harness',
      components: { DsRadioGroup },
      setup() {
        const value = ref('a')
        const options = [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]
        return { value, options }
      },
      template: `<DsRadioGroup v-model="value" variant="button" size="sm" :options="options" />`,
    })

    const wrapper = mount(Harness)
    const first = wrapper.get('[data-ds-radio]')
    expect(first.attributes('class')).toContain('h-8')
  })

  it('по умолчанию (radiobox) рендерит кнопки role=radio и обновляет значение', async () => {
    const Harness = defineComponent({
      name: 'Harness',
      components: { DsRadioGroup },
      setup() {
        const value = ref('a')
        const options = [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]
        return { value, options }
      },
      template: `
        <div>
          <DsRadioGroup v-model="value" :options="options" />
          <div data-testid="value">{{ value }}</div>
        </div>
      `,
    })

    const wrapper = mount(Harness)

    const radios = wrapper.findAll('[role="radio"][data-ds-radio]')
    expect(radios.length).toBe(2)

    await radios[1].trigger('click')
    expect(wrapper.get('[data-testid="value"]').text()).toBe('b')
  })

  it('участвует в html form (FormData) через нативные input[type=radio]', async () => {
    const Harness = defineComponent({
      name: 'Harness',
      components: { DsRadioGroup },
      setup() {
        const value = ref('a')
        const options = [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]
        return { value, options }
      },
      template: `
        <form data-testid="form">
          <DsRadioGroup v-model="value" name="plan" :options="options" />
        </form>
      `,
    })

    const wrapper = mount(Harness)
    const form = wrapper.get('[data-testid="form"]').element as HTMLFormElement

    expect(new FormData(form).get('plan')).toBe('a')

    await wrapper.findAll('[data-ds-radio]')[1].trigger('click')
    expect(new FormData(form).get('plan')).toBe('b')
  })
})
