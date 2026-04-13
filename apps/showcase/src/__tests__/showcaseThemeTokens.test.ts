import { readFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { describe, expect, it } from 'vitest'

const tokenDrivenShellFiles = [
  '../layouts/ShowcaseLayout.vue',
  '../components/layout/ShowcaseHeader.vue',
  '../components/layout/ShowcaseQuickSearch.vue',
  '../components/doc/ApiTable.vue',
  '../components/doc/CodeBlock.vue',
  '../components/doc/DocPage.vue',
  '../components/doc/ExampleCard.vue',
  '../components/doc/InfoSectionCard.vue',
  '../pages/OverviewPage.vue',
  '../pages/FoundationsPage.vue',
  '../pages/ComponentsPage.vue',
  '../pages/ComponentDetailPage.vue',
] as const

const hardcodedPalettePattern = /slate-\d{2,3}|(?:bg|text|border)-white(?:\/\d+)?|rgba\(/

describe('showcase theme tokens', () => {
  it('подключает локальный token-based showcase stylesheet', () => {
    const showcaseMainEntry = readFileSync(
      fileURLToPath(new URL('../main.ts', import.meta.url)),
      'utf8',
    )

    expect(showcaseMainEntry).toContain("import './styles/showcase-theme.css'")
  })

  it('не использует hardcoded palette в ключевых showcase shell-файлах', () => {
    for (const relativePath of tokenDrivenShellFiles) {
      const fileContent = readFileSync(
        fileURLToPath(new URL(relativePath, import.meta.url)),
        'utf8',
      )

      expect(fileContent, relativePath).not.toMatch(hardcodedPalettePattern)
    }
  })
})