import { createFintI18n, PersistencePlugin, type FintI18n } from '@feugene/fint-i18n'

import { FINT_DS_I18N_BLOCK, fintDsLocaleLoaders } from '@ds'
import { playgroundLocaleLoaders, PLAYGROUND_I18N_BLOCK } from './messages'

type CreatePlaygroundI18nOptions = {
  enablePersistence?: boolean
}

export async function createPlaygroundI18n(options: CreatePlaygroundI18nOptions = {}): Promise<FintI18n> {
  const plugins = []

  if (options.enablePersistence !== false) {
    plugins.push(new PersistencePlugin({ key: 'fint-ds-playground-locale' }))
  }

  const i18n = createFintI18n({
    locale: 'en',
    fallbackLocale: 'en',
    loaders: [fintDsLocaleLoaders, playgroundLocaleLoaders],
    plugins,
  })

  i18n.registerBlocks([FINT_DS_I18N_BLOCK, PLAYGROUND_I18N_BLOCK])
  await i18n.loadUsedBlocks(i18n.locale.value)

  return i18n
}