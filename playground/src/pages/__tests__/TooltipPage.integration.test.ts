import { mount } from '@vue/test-utils'
import { installI18n } from '@feugene/fint-i18n'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'

import App from '../../App.vue'
import { createPlaygroundTestI18n } from '../../test/createPlaygroundTestI18n'

const DsSelectStub = defineComponent({
  name: 'DsSelect',
  template: '<select />',
})

const ThemeSwitcherStub = defineComponent({
  name: 'ThemeSwitcher',
  template: '<div />',
})

describe('Tooltip playground integration', () => {
  afterEach(() => {
    window.location.hash = ''
  })

  it('показывает страницу Tooltip в навигации playground', async () => {
    const i18n = await createPlaygroundTestI18n()

    const wrapper = mount(App, {
      shallow: true,
      global: {
        components: {
          DsSelect: DsSelectStub,
          ThemeSwitcher: ThemeSwitcherStub,
        },
        plugins: [[{ install: (app: any) => installI18n(app, i18n) }]],
      },
    })

    const tooltipButton = wrapper.findAll('button').find((button) => button.text().trim() === 'Tooltip')

    expect(tooltipButton, 'Tooltip button not found').toBeTruthy()
  })
})