import { describe, expect, it } from 'vitest'

import {
  showcaseFoundationGuides,
  showcaseFoundationStats,
  showcaseFoundationsChecklist,
  showcaseInstallationNarrative,
  showcaseQuickStartCards,
} from '../foundations'

describe('showcase foundations content', () => {
  it('собирает полный foundations coverage для styling, themes, tokens, unocss и localization', () => {
    expect(showcaseFoundationGuides.map(guide => guide.id)).toEqual([
      'styling',
      'themes',
      'tokens',
      'unocss',
      'localization',
    ])
    expect(showcaseFoundationGuides.every(guide => guide.narrativeSource.length > 80)).toBe(true)
    expect(showcaseFoundationGuides.every(guide => guide.codeSamples.length > 0)).toBe(true)
  })

  it('подключает narrative docs и source layers пакета как источники foundations guidance', () => {
    expect(showcaseFoundationGuides.find(guide => guide.id === 'styling')?.sourcePath).toBe('packages/granularity/docs/styling.md')
    expect(showcaseFoundationGuides.find(guide => guide.id === 'unocss')?.narrativeSource).toContain('@feugene/granularity/uno-node')
    expect(showcaseFoundationGuides.find(guide => guide.id === 'localization')?.narrativeSource).toContain('DS_I18N_BLOCK')
    expect(showcaseFoundationGuides.find(guide => guide.id === 'tokens')?.narrativeSource).toContain('--ds-space-4')
  })

  it('даёт quick-start snippets и обзорные метрики для landing/foundations страниц', () => {
    expect(showcaseQuickStartCards).toHaveLength(3)
    expect(showcaseQuickStartCards.map(card => card.id)).toEqual([
      'quick-start-root',
      'quick-start-granular',
      'quick-start-uno',
    ])
    expect(showcaseInstallationNarrative).toContain('@feugene/granularity/uno-node')
    expect(showcaseFoundationStats).toHaveLength(3)
    expect(showcaseFoundationsChecklist).toHaveLength(3)
  })
})