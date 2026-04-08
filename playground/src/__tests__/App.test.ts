import { mount } from '@vue/test-utils'
import { installI18n } from '@feugene/fint-i18n'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'

import App from '../App.vue'
import { createPlaygroundTestI18n } from '../test/createPlaygroundTestI18n'

const DsSelectStub = defineComponent({
  name: 'DsSelect',
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
  template: '<select />',
})

const ThemeSwitcherStub = defineComponent({
  name: 'ThemeSwitcher',
  template: '<div />',
})

async function mountApp() {
  const i18n = await createPlaygroundTestI18n()

  return mount(App, {
    shallow: true,
    global: {
      components: {
        DsSelect: DsSelectStub,
        ThemeSwitcher: ThemeSwitcherStub,
      },
      plugins: [[{ install: (app: any) => installI18n(app, i18n) }]],
    },
  })
}

describe('Playground App', () => {
  afterEach(() => {
    window.location.hash = ''
  })

  it('показывает страницу Switch в навигации', async () => {
    const wrapper = await mountApp()

    const switchButton = wrapper.findAll('button').find((button) => button.text().trim() === 'Switch')
    const avatarButton = wrapper.findAll('button').find((button) => button.text().trim() === 'Avatar')
    const bottomNavButton = wrapper.findAll('button').find((button) => button.text().trim() === 'Bottom navigation')
    const tooltipButton = wrapper.findAll('button').find((button) => button.text().trim() === 'Tooltip')

    expect(switchButton, 'Switch button not found').toBeTruthy()
    expect(avatarButton, 'Avatar button not found').toBeTruthy()
    expect(bottomNavButton, 'Bottom navigation button not found').toBeTruthy()
    expect(tooltipButton, 'Tooltip button not found').toBeTruthy()
  })

  it('восстанавливает текущую страницу из URL hash после повторного mount', async () => {
    const wrapper = await mountApp()
    const bottomNavButton = wrapper.findAll('button').find((button) => button.text().trim() === 'Bottom navigation')

    expect(bottomNavButton, 'Bottom navigation button not found').toBeTruthy()

    await bottomNavButton!.trigger('click')

    expect(window.location.hash).toBe('#bottomNav')

    wrapper.unmount()

    const remountedWrapper = await mountApp()
    const currentButton = remountedWrapper.findAll('button').find((button) => button.text().trim() === 'Bottom navigation')

    expect(currentButton?.attributes('aria-current')).toBe('page')
  })
})