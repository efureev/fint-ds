import { createGenerator } from '@unocss/core'
import { describe, expect, it } from 'vitest'

import { spacingRules, spacingVariants } from '@/uno'

async function createSpacingGenerator(themeSpacing: Record<string, string> = {}) {
  return createGenerator({
    rules: spacingRules,
    variants: spacingVariants,
    theme: {
      spacing: themeSpacing,
    },
  })
}

describe('spacingRules', () => {
  it('генерирует spacing по оси x из theme spacing', async () => {
    const uno = await createSpacingGenerator({
      4: '1rem',
    })

    const { css } = await uno.generate('space-x-4')

    expect(css).toContain('>:not([hidden])~:not([hidden])')
    expect(css).toContain('--un-space-x-reverse:0')
    expect(css).toContain('margin-inline-start:calc(1rem * calc(1 - var(--un-space-x-reverse)))')
    expect(css).toContain('margin-inline-end:calc(1rem * var(--un-space-x-reverse))')
  })

  it('генерирует spacing по оси y из arbitrary values', async () => {
    const uno = await createSpacingGenerator()

    const { css } = await uno.generate('space-y-[var(--stack-gap)]')

    expect(css).toContain('>:not([hidden])~:not([hidden])')
    expect(css).toContain('--un-space-y-reverse:0')
    expect(css).toContain('margin-block-start:calc(var(--stack-gap) * calc(1 - var(--un-space-y-reverse)))')
    expect(css).toContain('margin-block-end:calc(var(--stack-gap) * var(--un-space-y-reverse))')
  })

  it('нормализует операторы внутри calc() для theme spacing и arbitrary values', async () => {
    const uno = await createSpacingGenerator({
      card: 'calc(100%-1rem)',
      stack: 'calc(var(--stack-gap)-0.5rem)',
    })

    const themeCss = await uno.generate('space-x-card space-y-stack')
    const arbitraryCss = await uno.generate('space-y-[calc(var(--stack-gap)-1rem)]')

    expect(themeCss.css).toContain('calc(100% - 1rem)')
    expect(themeCss.css).toContain('var(--stack-gap) - 0.5rem')
    expect(themeCss.css).not.toContain('100%-1rem')
    expect(arbitraryCss.css).toContain('var(--stack-gap) - 1rem')
    expect(arbitraryCss.css).not.toContain('var(--stack-gap)-1rem')
  })

  it('генерирует reverse utility даже если в theme есть token reverse', async () => {
    const uno = await createSpacingGenerator({
      reverse: '2rem',
    })

    const { css } = await uno.generate('space-x-reverse')

    expect(css).toContain('>:not([hidden])~:not([hidden])')
    expect(css).toContain('--un-space-x-reverse:1')
    expect(css).not.toContain('margin-inline-start')
    expect(css).not.toContain('margin-inline-end')
  })

  it('не генерирует CSS для невалидных spacing values', async () => {
    const uno = await createSpacingGenerator()

    const { css } = await uno.generate('space-x-unknown')

    expect(css.trim()).toBe('')
  })
})