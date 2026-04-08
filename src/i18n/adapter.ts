import type { InjectionKey, Ref } from 'vue'

export type FintDsI18nParams = Record<string, unknown>

export type FintDsI18nAdapter = {
  t: (key: string, params?: FintDsI18nParams) => string
  locale?: Readonly<Ref<string>>
  syncLocale?: (locale: string) => void | Promise<void>
}

export const FINT_DS_I18N_KEY: InjectionKey<FintDsI18nAdapter | null> = Symbol('FINT_DS_I18N_KEY')