import type { LocaleLoaderCollection } from '@feugene/fint-i18n'

export const PLAYGROUND_I18N_BLOCK = 'playground'

export const playgroundLocaleLoaders = {
  en: {
    [PLAYGROUND_I18N_BLOCK]: () => import('../i18n/locales/en.json'),
  },
  ru: {
    [PLAYGROUND_I18N_BLOCK]: () => import('../i18n/locales/ru.json'),
  },
  es: {
    [PLAYGROUND_I18N_BLOCK]: () => import('../i18n/locales/es.json'),
  },
} satisfies LocaleLoaderCollection
