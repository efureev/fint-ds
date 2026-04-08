import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('base styles', () => {
  it('forces transparent background for plain buttons and links', () => {
    const __dirname = dirname(fileURLToPath(import.meta.url))
    const css = readFileSync(resolve(__dirname, '../base.css'), 'utf8')

    expect(css).toContain(':where(a, button)')
    expect(css).toContain('background-color: transparent')
  })
})
