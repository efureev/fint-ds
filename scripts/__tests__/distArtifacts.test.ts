import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { afterEach, describe, expect, it } from 'vitest'

import {
  assertNoTestArtifacts,
  collectTestArtifactPaths,
  isTestArtifactPath,
} from '../distArtifacts.mjs'

const tempDirs: string[] = []

afterEach(() => {
  for (const dir of tempDirs.splice(0))
    rmSync(dir, { recursive: true, force: true })
})

function createTempDist() {
  const dir = mkdtempSync(join(tmpdir(), 'fint-ds-dist-'))
  tempDirs.push(dir)
  return dir
}

describe('distArtifacts', () => {
  it('распознаёт тестовые файлы и каталоги', () => {
    expect(isTestArtifactPath('components/__tests__/DsSwitch.test.js')).toBe(true)
    expect(isTestArtifactPath('types/test/setup.d.ts')).toBe(true)
    expect(isTestArtifactPath('types/components/DsSwitch.spec.d.ts')).toBe(true)
    expect(isTestArtifactPath('types/components/DsSwitch.d.ts')).toBe(false)
  })

  it('собирает тестовые артефакты из dist', () => {
    const distDir = createTempDist()

    mkdirSync(join(distDir, 'types/components/__tests__'), { recursive: true })
    writeFileSync(join(distDir, 'types/components/__tests__/DsSwitch.test.d.ts'), '')
    writeFileSync(join(distDir, 'types/components/DsSwitch.d.ts'), '')

    expect(collectTestArtifactPaths(distDir)).toEqual([
      'types/components/__tests__',
    ])
  })

  it('падает, если в dist есть тестовые артефакты', () => {
    const distDir = createTempDist()

    mkdirSync(join(distDir, 'test'), { recursive: true })
    writeFileSync(join(distDir, 'test/setup.js'), '')

    expect(() => assertNoTestArtifacts(distDir)).toThrowError(
      /\s- test$/m,
    )
  })
})