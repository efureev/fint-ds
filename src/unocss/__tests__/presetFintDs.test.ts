import { createGenerator } from '@unocss/core'
import { describe, expect, it } from 'vitest'

import { presetFintDs } from '@/uno'
import { fintDsUnoSafelist } from '../safelist'

describe('presetFintDs', () => {
  it('включает safelist для динамических классов DsDialog и DsButton', () => {
    expect(fintDsUnoSafelist).toContain('max-w-[920px]')
    expect(fintDsUnoSafelist).toContain('bg-[var(--destructive)]')
    expect(fintDsUnoSafelist).toContain('hover:bg-[var(--destructive-hover)]')
  })

  it('экспортирует preset с safelist и rules', () => {
    const preset = presetFintDs()

    expect(preset.name).toBe('fint-ds-preset')
    expect(preset.safelist).toEqual(expect.arrayContaining(fintDsUnoSafelist))
    expect(preset.rules).toHaveLength(4)
  })

  it('нормализует бинарные операторы внутри calc() для spacing rules', async () => {
    const uno = await createGenerator({
      presets: [presetFintDs()],
    })

    const { css } = await uno.generate('space-x-[calc(100%-1rem)]')

    expect(css).toContain('calc(100% - 1rem)')
    expect(css).not.toContain('100%-1rem')
  })

  it('не ломает CSS custom properties внутри calc() для spacing rules', async () => {
    const uno = await createGenerator({
      presets: [presetFintDs()],
    })

    const { css } = await uno.generate('space-x-[calc(var(--gap)-1rem)]')

    expect(css).toContain('var(--gap) - 1rem')
    expect(css).toContain('--gap')
  })

  it('поддерживает стандартные spacing tokens как в оригинальном UnoCSS', async () => {
    const uno = await createGenerator({
      presets: [presetFintDs()],
    })

    const { css } = await uno.generate('space-y-5')

    expect(css).toContain('.space-y-5>:not([hidden])~:not([hidden])')
    expect(css).toContain('--un-space-y-reverse:0')
    expect(css).toContain('margin-block-start:calc(1.25rem * calc(1 - var(--un-space-y-reverse)))')
    expect(css).toContain('margin-block-end:calc(1.25rem * var(--un-space-y-reverse))')
  })
})