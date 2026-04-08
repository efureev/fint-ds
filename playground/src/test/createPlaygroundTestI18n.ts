import { createFintI18n, type FintI18n } from '@feugene/fint-i18n'
import { playgroundLocaleLoaders, PLAYGROUND_I18N_BLOCK } from '../i18n/messages'
import { FINT_DS_I18N_BLOCK, fintDsLocaleLoaders } from '@ds'

export async function createPlaygroundTestI18n(locale = 'en'): Promise<FintI18n> {
  const i18n = createFintI18n({
    locale,
    fallbackLocale: 'en',
    loaders: [fintDsLocaleLoaders, playgroundLocaleLoaders],
  })

  i18n.registerBlocks([FINT_DS_I18N_BLOCK, PLAYGROUND_I18N_BLOCK])
  await i18n.loadUsedBlocks(locale)

  return i18n
}