import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

function readText(relativeToThisFile: string): string {
  return readFileSync(new URL(relativeToThisFile, import.meta.url), 'utf-8')
}

function collectDefinedTokens(css: string): Set<string> {
  return new Set(css.match(/--ds-[A-Za-z0-9_-]+\s*:/g)?.map((token) => token.replace(/\s*:\s*$/, '')) ?? [])
}

function collectUsedTokens(css: string): Set<string> {
  return new Set(css.match(/var\(--ds-[A-Za-z0-9_-]+/g)?.map((token) => token.slice(4)) ?? [])
}

describe('global DS tokens', () => {
  it('defines every `--ds-*` token used by exported global styles', () => {
    const tokensCss = readText('../tokens.css')
    const lightThemeCss = readText('../themes/light.css')
    const darkThemeCss = readText('../themes/dark.css')
    const baseCss = readText('../base.css')

    const definedTokens = new Set([
      ...collectDefinedTokens(tokensCss),
      ...collectDefinedTokens(lightThemeCss),
      ...collectDefinedTokens(darkThemeCss),
    ])

    const missingTokens = [...new Set([
      ...collectUsedTokens(tokensCss),
      ...collectUsedTokens(baseCss),
    ])].filter((token) => !definedTokens.has(token))

    expect(missingTokens).toEqual([])
  })
})