import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

function readText(relativeToThisFile: string): string {
  return readFileSync(new URL(relativeToThisFile, import.meta.url), 'utf-8')
}

describe('CSS tokens (no deprecated aliases)', () => {
  it('themes should not define legacy `--ds-*` alias tokens', () => {
    const light = readText('../themes/light.css')
    const dark = readText('../themes/dark.css')

    const deprecated = [
      '--ds-bg',
      '--ds-surface',
      '--ds-surface-muted',
      '--ds-border',
      '--ds-text-primary',
      '--ds-text-secondary',
      '--ds-text-tertiary',
      '--ds-primary',
    ]

    for (const token of deprecated) {
      expect(light).not.toContain(token)
      expect(dark).not.toContain(token)
    }
  })
})
