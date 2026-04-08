import type { LocaleLoaderCollection } from '@feugene/fint-i18n'

export const FINT_DS_I18N_BLOCK = 'fintDs'

export const fintDsLocaleLoaders = {
  en: {
    [FINT_DS_I18N_BLOCK]: () => import('./locales/en.json'),
  },
  ru: {
    [FINT_DS_I18N_BLOCK]: () => import('./locales/ru.json'),
  },
  es: {
    [FINT_DS_I18N_BLOCK]: () => import('./locales/es.json'),
  },
} satisfies LocaleLoaderCollection
