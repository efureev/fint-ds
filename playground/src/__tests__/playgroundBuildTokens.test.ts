import { readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { execFileSync } from 'node:child_process'

import { describe, expect, it } from 'vitest'

const PROJECT_ROOT = process.cwd()
const PLAYGROUND_ROOT = resolve(PROJECT_ROOT, 'playground')

function readBuiltIndexCss(): string {
  const assetsDir = join(PLAYGROUND_ROOT, 'dist', 'assets')
  const indexCssFile = readdirSync(assetsDir).find((fileName) => /^index-.*\.css$/.test(fileName))

  expect(indexCssFile, 'Expected playground build to emit index-*.css asset').toBeTruthy()

  return readFileSync(join(assetsDir, indexCssFile!), 'utf8')
}

describe('playground production styles', () => {
  it('keeps DS tokens in the built CSS bundle', { timeout: 60_000 }, () => {
    execFileSync('yarn', ['playground:build'], {
      cwd: PROJECT_ROOT,
      stdio: 'pipe',
    })

    const builtCss = readBuiltIndexCss()

    expect(builtCss).toContain('--ds-slate-0')
    expect(builtCss).toContain('--ds-font-ui')
    expect(builtCss).toContain('--ds-space-4')
  })
})