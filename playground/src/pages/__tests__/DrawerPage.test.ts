import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import { describe, expect, it, vi } from 'vitest'

import DrawerPage from '../DrawerPage.vue'

describe('DrawerPage (playground)', () => {
  it('не выводит warn Missing required prop: "modelValue" при открытии drawer', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const PlaygroundPageStub = defineComponent({
      name: 'PlaygroundPageStub',
      template: '<div><slot name="ui" /></div>',
    })

    const PlaygroundPropsStub = defineComponent({
      name: 'PlaygroundPropsStub',
      template: '<div />',
    })

    const DsCardStub = defineComponent({
      name: 'DsCardStub',
      template: '<div><slot /></div>',
    })

    const DsButtonStub = defineComponent({
      name: 'DsButtonStub',
      emits: ['click'],
      template: '<button type="button" @click="$emit(\'click\')"><slot /></button>',
    })

    const DsDrawerStub = defineComponent({
      name: 'DsDrawerStub',
      props: {
        modelValue: {
          type: Boolean,
          required: true,
        },
      },
      template: '<div><slot v-if="modelValue" /></div>',
    })

    const DsInputStub = defineComponent({
      name: 'DsInputStub',
      props: {
        modelValue: {
          type: String,
          required: true,
        },
      },
      emits: ['update:modelValue'],
      template: '<input />',
    })

    const DsSelectStub = defineComponent({
      name: 'DsSelectStub',
      props: {
        modelValue: {
          type: String,
          required: false,
          default: '',
        },
        options: {
          type: Array,
          required: false,
          default: () => [],
        },
      },
      emits: ['update:modelValue'],
      template: '<div />',
    })

    const DsSwitchStub = defineComponent({
      name: 'DsSwitchStub',
      props: {
        modelValue: {
          type: Boolean,
          required: false,
          default: false,
        },
      },
      emits: ['update:modelValue'],
      template: '<div />',
    })

    const wrapper = mount(DrawerPage, {
      global: {
        stubs: {
          PlaygroundPage: PlaygroundPageStub,
          PlaygroundProps: PlaygroundPropsStub,
        },
        components: {
          DsCard: DsCardStub,
          DsButton: DsButtonStub,
          DsDrawer: DsDrawerStub,
          DsInput: DsInputStub,
          DsSelect: DsSelectStub,
          DsSwitch: DsSwitchStub,
        },
      },
    })

    const openBtn = wrapper.findAll('button').find((b) => b.text().trim() === 'Open drawer')
    expect(openBtn, 'Open drawer button not found').toBeTruthy()

    await openBtn!.trigger('click')
    await nextTick()

    const allMessages = [...warnSpy.mock.calls, ...errorSpy.mock.calls]
      .flat()
      .map((v) => (typeof v === 'string' ? v : ''))
      .join('\n')

    expect(allMessages).not.toContain('Missing required prop: "modelValue"')

    wrapper.unmount()
    warnSpy.mockRestore()
    errorSpy.mockRestore()
  })
})
