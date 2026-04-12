import { defineGranularityComponentConfig } from '../../registry/componentConfig'

import { dsIconSafelist } from './safelist'

export const dsIconConfig = defineGranularityComponentConfig(import.meta.url, {
  name: 'DsIcon',
  safelist: dsIconSafelist,
  cssFiles: ['./tokens.css', './styles.css'],
})