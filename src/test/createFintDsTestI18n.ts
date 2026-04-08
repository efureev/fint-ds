import { createFintI18n, type FintI18n } from '@feugene/fint-i18n'

import { FINT_DS_I18N_BLOCK, fintDsLocaleLoaders } from '@/i18n'

type FintDsTestLocale = keyof typeof fintDsLocaleLoaders

export async function createFintDsTestI18n(locale: FintDsTestLocale = 'en'): Promise<FintI18n> {
  const i18n = createFintI18n({
    locale,
    fallbackLocale: 'en',
    loaders: fintDsLocaleLoaders,
  })

  i18n.registerBlocks([FINT_DS_I18N_BLOCK])
  await i18n.loadUsedBlocks(locale)

  return i18n
}