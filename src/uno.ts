import type { Preset } from 'unocss'

import { fintDsUnoSafelist } from './unocss/safelist'
import { colorOpacityRules } from './unocss/rules/colorOpacity'
import { spacingRules, spacingVariants } from './unocss/rules/spacing'

export { colorOpacityRules, fintDsUnoSafelist, spacingRules, spacingVariants }

export function presetFintDs(): Preset {
  return {
    name: 'fint-ds-preset',
    safelist: fintDsUnoSafelist,
    variants: spacingVariants,
    rules: [
      ...spacingRules,
      ...colorOpacityRules,
    ],
  }
}