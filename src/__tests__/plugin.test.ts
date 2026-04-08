import { createApp, h } from 'vue'
import { describe, expect, it } from 'vitest'

import { FINT_DS_I18N_KEY } from '@/i18n'
import { FintDs } from '@/plugin'

describe('FintDs plugin (install)', () => {
  it('регистрирует DsDropdown и DsDrawer глобально', () => {
    const app = createApp({ render: () => h('div') })

    app.use(FintDs)

    expect(app.component('DsDropdown')).toBeTruthy()
    expect(app.component('DsDrawer')).toBeTruthy()
    expect(app.component('DsInputTag')).toBeTruthy()
    expect(app.directive('loading')).toBeTruthy()
  })

  it('прокидывает i18n-адаптер только через собственный DI-ключ пакета', () => {
    const app = createApp({ render: () => h('div') })
    const i18n = {
      t: (key: string) => key,
    }

    app.use(FintDs, { i18n })

    expect(app._context.provides[FINT_DS_I18N_KEY as symbol]).toBe(i18n)
  })
})
