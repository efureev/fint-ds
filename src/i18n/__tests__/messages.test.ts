import { describe, expect, it } from 'vitest'

import { FINT_DS_I18N_BLOCK, fintDsLocaleLoaders } from '@/i18n'

async function loadLocalePayload(locale: 'en' | 'ru') {
  return (await import(`../locales/${locale}.json`)).default
}

describe('fint-ds i18n messages', () => {
  it('locale payload files имеют payload-only формат', async () => {
    const en = await loadLocalePayload('en')
    const ru = await loadLocalePayload('ru')

    expect(FINT_DS_I18N_BLOCK).toBe('fintDs')
    expect(en.loading.defaultText).toBe('Loading...')
    expect(ru.loading.defaultText).toBe('Загрузка...')
    expect((en as Record<string, unknown>).fintDs).toBeUndefined()
  })

  it('экспортирует package-level locale loaders для fint-i18n', async () => {
    const enMessages = await fintDsLocaleLoaders.en[FINT_DS_I18N_BLOCK]()
    const ruMessages = await fintDsLocaleLoaders.ru[FINT_DS_I18N_BLOCK]()

    expect(enMessages.default.loading.defaultText).toBe('Loading...')
    expect(ruMessages.default.loading.defaultText).toBe('Загрузка...')
  })
})