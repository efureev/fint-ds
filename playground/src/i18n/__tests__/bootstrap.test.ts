import { describe, expect, it } from 'vitest'

import { createPlaygroundI18n } from '../createPlaygroundI18n'

describe('playground i18n bootstrap', () => {
  it('загружает блоки локализации при инициализации как в main.ts', async () => {
    const i18n = await createPlaygroundI18n({ enablePersistence: false })

    expect(i18n.t('playground.app.selectLanguage')).toBe('Select language')
    expect(i18n.t('fintDs.pagination.next')).toBe('Next')
  })
})