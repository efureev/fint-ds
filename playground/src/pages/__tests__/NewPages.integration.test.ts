import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { describe, expect, it } from 'vitest'

import AvatarPage from '../AvatarPage.vue'
import BottomNavPage from '../BottomNavPage.vue'
import InputsPage from '../InputsPage.vue'

const PlaygroundPageStub = defineComponent({
  name: 'PlaygroundPage',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
  template: '<section :data-title="title"><slot name="ui" /><slot name="usage" /><slot name="api" /></section>',
})

const PlaygroundPropsStub = defineComponent({
  name: 'PlaygroundProps',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
  template: '<div data-testid="playground-props" :data-title="title" />',
})

function mountPage(component: typeof AvatarPage | typeof BottomNavPage | typeof InputsPage) {
  return mount(component, {
    shallow: true,
    global: {
      stubs: {
        PlaygroundPage: PlaygroundPageStub,
        PlaygroundProps: PlaygroundPropsStub,
        DsAvatar: true,
        DsBottomNav: true,
        DsCard: true,
        DsFormField: true,
        DsFormSection: true,
        DsInput: true,
        DsNumberInput: true,
        DsRadioGroup: true,
        DsSelect: true,
        DsSwitch: true,
        DsTextarea: true,
      },
    },
  })
}

function pageTitle(wrapper: ReturnType<typeof mount>) {
  return wrapper.get('section').attributes('data-title')
}

function propsTitles(wrapper: ReturnType<typeof mount>) {
  return wrapper.findAll('[data-testid="playground-props"]').map(component => component.attributes('data-title'))
}

describe('Playground pages integration', () => {
  it('документирует DsAvatar', () => {
    const wrapper = mountPage(AvatarPage)

    expect(pageTitle(wrapper)).toBe('DsAvatar')
    expect(propsTitles(wrapper)).toEqual([
      'DsAvatar — Props',
      'DsAvatar — Slots',
    ])
  })

  it('документирует DsBottomNav', () => {
    const wrapper = mountPage(BottomNavPage)

    expect(pageTitle(wrapper)).toBe('DsBottomNav')
    expect(propsTitles(wrapper)).toEqual([
      'DsBottomNav — Props',
      'DsBottomNav — Events',
    ])
  })

  it('добавляет DsFormSection в страницу Inputs', () => {
    const wrapper = mountPage(InputsPage)

    expect(propsTitles(wrapper)).toContain('DsFormSection — Props')
    expect(propsTitles(wrapper)).toContain('DsFormSection — Slots')
  })
})