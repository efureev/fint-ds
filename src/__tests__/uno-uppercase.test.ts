import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const UPPERCASE_CLASS_RE = /\.uppercase\s*\{[^}]*text-transform:\s*uppercase\s*;?/i

describe('base.css (unit)', () => {
  it('содержит семантический класс `uppercase` (text-transform: uppercase)', async () => {
    const css = await readFile(resolve(process.cwd(), 'src/styles/base.css'), 'utf8')

    expect(css).toMatch(UPPERCASE_CLASS_RE)
  })
})
