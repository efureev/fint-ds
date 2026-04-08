import { getCurrentInstance, inject, type AppContext } from 'vue'

import { FINT_DS_I18N_KEY, type FintDsI18nAdapter } from '@/i18n'

export type FintDsI18nLike = FintDsI18nAdapter

function isFintDsI18nLike(value: unknown): value is FintDsI18nLike {
  return typeof (value as FintDsI18nLike | null)?.t === 'function'
}

export function resolveFintDsI18n(context?: AppContext | FintDsI18nLike | null): FintDsI18nLike | null {
  if (isFintDsI18nLike(context)) {
    return context
  }

  const provides = context?.provides

  if (provides) {
    return provides[FINT_DS_I18N_KEY as symbol] as FintDsI18nLike | null
  }

  return getCurrentInstance() ? inject(FINT_DS_I18N_KEY, null) : null
}

export function useFintDsTranslations(context?: AppContext | FintDsI18nLike | null) {
  const i18n = resolveFintDsI18n(context)

  const t = (key: string, fallback: string, params?: Record<string, any>): string => {
    if (!i18n) {
      return fallback
    }

    const result = i18n.t(key, params)
    return result === key ? fallback : result
  }

  return {
    i18n,
    t,
  }
}