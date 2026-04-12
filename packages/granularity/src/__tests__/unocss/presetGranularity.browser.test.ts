import { createGenerator } from '@unocss/core'
import { presetMini } from 'unocss'
import { describe, expect, it } from 'vitest'

import { normalizeCss } from '../helpers/granularityTestUtils'
import {
  createGranularityCssPreflights,
  getGranularitySafelist,
  presetGranularity,
  resolvePresetGranularityPreflights,
} from '../../unocss/preset'

describe('granularity browser-safe preset', () => {
  it('держит browser-safe core preset без node-only preflights по умолчанию', async () => {
    const safelist = getGranularitySafelist(['DsButton'])
    const uno = await createGenerator({
      presets: [presetMini(), presetGranularity({ components: ['DsButton'] })],
    })

    const { css } = await uno.generate(safelist.join(' '))
    const normalizedCss = normalizeCss(css)

    expect(resolvePresetGranularityPreflights()).toEqual([])
    expect(css).toContain('.bg-\\[var\\(--primary\\)\\]')
    expect(css).toContain('.focus-visible\\:ring-\\[var\\(--ring\\)\\]')
    expect(css).toContain('.animate-spin')
    expect(css).toContain('.border-transparent')
    expect(css).toContain('.hover\\:border-\\[var\\(--border-hover\\,var\\(--border\\)\\)\\]:hover')
    expect(css).toContain('.active\\:border-\\[var\\(--border-active\\,var\\(--border\\)\\)\\]:active')
    expect(css).toContain('@keyframes granularity-spin')
    expect(normalizedCss).toContain('background-color:transparent')
    expect(normalizedCss).toContain('border-color:transparent')
    expect(normalizedCss).toContain('border-color:var(--border-hover,var(--border))')
    expect(normalizedCss).toContain('border-color:var(--border-active,var(--border))')
    expect(normalizedCss).not.toContain('--ds-space-4:16px')
    expect(normalizedCss).not.toContain('--primary:#4f46e5')
  })

  it('позволяет pure preset-у принять внешние CSS preflight-ы без node imports', async () => {
    const safelist = getGranularitySafelist(['DsButton'])
    const granularityLayer = 'granularity'
    const layeredPreset = presetGranularity({
      components: ['DsButton'],
      layer: granularityLayer,
      preflights: createGranularityCssPreflights([':root { --primary: hotpink; }']),
    })
    const uno = await createGenerator({
      presets: [
        presetMini(),
        layeredPreset,
      ],
    })

    const { css } = await uno.generate(safelist.join(' '))
    const normalizedCss = normalizeCss(css)

    expect(layeredPreset.layer).toBe(granularityLayer)
    expect(layeredPreset.preflights?.map(preflight => preflight.layer)).toEqual([
      granularityLayer,
      granularityLayer,
    ])
    expect(normalizedCss).toContain('--primary:hotpink')
  })
})