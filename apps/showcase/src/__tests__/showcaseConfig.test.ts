import { readFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { describe, expect, it } from 'vitest'

import {
  showcaseContentIncludes,
} from '../../uno.config'
import {
  showcaseBuildAnalyzeMode,
  showcaseBuildVisualizerConfig,
} from '../../vite.config'

const showcasePackageJson = readFileSync(
  fileURLToPath(new URL('../../package.json', import.meta.url)),
  'utf8',
)

const showcaseMainEntry = readFileSync(
  fileURLToPath(new URL('../main.ts', import.meta.url)),
  'utf8',
)

const showcaseAppEntry = readFileSync(
  fileURLToPath(new URL('../App.vue', import.meta.url)),
  'utf8',
)

const showcaseLayoutEntry = readFileSync(
  fileURLToPath(new URL('../layouts/ShowcaseLayout.vue', import.meta.url)),
  'utf8',
)

const showcaseUnoConfig = readFileSync(
  fileURLToPath(new URL('../../uno.config.ts', import.meta.url)),
  'utf8',
)

describe('showcase bootstrap config', () => {
  it('настраивает базовые app scripts, включая analyze-режим сборки', () => {
    expect(showcasePackageJson).toContain('"dev": "vite"')
    expect(showcasePackageJson).toContain('"generate:api": "node ./scripts/generate-component-api.mjs"')
    expect(showcasePackageJson).toContain('"generate:search": "node ./scripts/generate-showcase-search-index.mjs"')
    expect(showcasePackageJson).toContain('"build": "yarn generate:api && yarn generate:search && vite build"')
    expect(showcasePackageJson).toContain('"build:analyze": "yarn generate:api && yarn generate:search && vite build --mode analyze"')
    expect(showcasePackageJson).toContain('"test:run": "yarn generate:api && yarn generate:search && vitest run --config vitest.config.ts"')
    expect(showcaseBuildAnalyzeMode).toBe('analyze')
    expect(showcaseBuildVisualizerConfig).toEqual({
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
    })
  })

  it('подключает reset, uno runtime и раннюю инициализацию темы без legacy-зависимостей', () => {
    expect(showcaseMainEntry).toContain("import '@unocss/reset/tailwind-compat.css'")
    expect(showcaseMainEntry).toContain("import 'virtual:uno.css'")
    expect(showcaseMainEntry).toContain("import { initThemeEarly } from '@feugene/granularity'")
    expect(showcaseMainEntry).toContain("import { router } from './app/router'")
    expect(showcaseMainEntry).toContain('initThemeEarly()')
    expect(showcaseMainEntry).toContain('.use(router)')
    expect(showcaseMainEntry).not.toContain("@feugene/granularity/styles.css")
    expect(showcaseMainEntry).not.toContain('legacy')
  })

  it('использует router shell и root public API пакета в layout-компоненте', () => {
    expect(showcaseAppEntry).toContain('<RouterView />')
    expect(showcaseLayoutEntry).toContain("from '@feugene/granularity'")
    expect(showcaseLayoutEntry).not.toContain('@feugene/granularity/components/')
  })

  it('сканирует только исходники showcase и включает пакетный Uno preset через package exports', () => {
    expect(showcaseContentIncludes.some(re => re.test('/repo/apps/showcase/src/main.ts'))).toBe(true)
    expect(showcaseContentIncludes.some(re => re.test('/repo/apps/playground/src/main.ts'))).toBe(false)
    expect(showcaseContentIncludes.some(re => re.test('/repo/packages/granularity/dist/index.js'))).toBe(false)
    expect(showcaseUnoConfig).toContain("import {presetGranularityNode} from '@feugene/granularity/uno-node'")
    expect(showcaseUnoConfig).toContain("themes: ['light', 'dark']")
  })
})