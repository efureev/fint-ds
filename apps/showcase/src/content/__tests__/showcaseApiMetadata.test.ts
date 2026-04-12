import { describe, expect, it } from 'vitest'

import { showcaseComponentEntities } from '../../app/showcase'
import generatedComponentApiMetadata from '../generated/componentApi.generated.json'

describe('showcase generated component API metadata', () => {
  it('создаёт build-time metadata для каждого компонента из registry', () => {
    expect(Object.keys(generatedComponentApiMetadata).length).toBe(showcaseComponentEntities.length)
  })

  it('извлекает реальные props и slots как минимум для DsButton', () => {
    const buttonMetadata = generatedComponentApiMetadata.DsButton
    const propsSection = buttonMetadata.sections.find(section => section.key === 'props')
    const slotsSection = buttonMetadata.sections.find(section => section.key === 'slots')

    expect(propsSection?.items.some(item => item.name === 'variant')).toBe(true)
    expect(propsSection?.items.some(item => item.name === 'loading')).toBe(true)
    expect(slotsSection?.items.some(item => item.name === 'default')).toBe(true)
  })

  it('подмешивает fallback-описания для слотов там, где auto extraction не даёт достаточного описания', () => {
    const buttonEntity = showcaseComponentEntities.find(entity => entity.name === 'DsButton')
    const slotsSection = buttonEntity?.apiSections.find(section => section.key === 'slots')

    expect(slotsSection?.origin).toBe('generated')
    expect(slotsSection?.items.find(item => item.name === 'default')?.description).toContain('Текст кнопки')
  })
})