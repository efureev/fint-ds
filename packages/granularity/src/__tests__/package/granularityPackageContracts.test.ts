import { describe, expect, it } from 'vitest'

import { granularityDirectivesIndexSource, granularityViteConfigSource } from '../helpers/granularityTestUtils'
import pkg from '../../../package.json'

describe('granularity package contracts', () => {
  it('публикует раздельные browser-safe и node-only uno exports', () => {
    expect(pkg.exports['./directives/*']).toEqual({
      types: './dist/types/src/directives/*.d.ts',
      import: './dist/directives/*.js',
    })
    expect(pkg.exports['./composables/*']).toEqual({
      types: './dist/types/src/composables/*.d.ts',
      import: './dist/composables/*.js',
    })
    expect(pkg.exports['./components/DsButton']).toEqual({
      types: './dist/types/src/components/DsButton/index.d.ts',
      import: './dist/components/DsButton/index.js',
    })
    expect(pkg.exports['./components/DsDialog']).toEqual({
      types: './dist/types/src/components/DsDialog/index.d.ts',
      import: './dist/components/DsDialog/index.js',
    })
    expect(pkg.exports['./components/DsCollapse']).toEqual({
      types: './dist/types/src/components/DsCollapse/index.d.ts',
      import: './dist/components/DsCollapse/index.js',
    })
    expect(pkg.exports['./components/DsConfirmDialog']).toEqual({
      types: './dist/types/src/components/DsConfirmDialog/index.d.ts',
      import: './dist/components/DsConfirmDialog/index.js',
    })
    expect(pkg.exports['./components/DsFormSection']).toEqual({
      types: './dist/types/src/components/DsFormSection/index.d.ts',
      import: './dist/components/DsFormSection/index.js',
    })
    expect(pkg.exports['./components/DsList']).toEqual({
      types: './dist/types/src/components/DsList/index.d.ts',
      import: './dist/components/DsList/index.js',
    })
    expect(pkg.exports['./components/DsSelect']).toEqual({
      types: './dist/types/src/components/DsSelect/index.d.ts',
      import: './dist/components/DsSelect/index.js',
    })
    expect(pkg.exports['./components/DsSidebar']).toEqual({
      types: './dist/types/src/components/DsSidebar/index.d.ts',
      import: './dist/components/DsSidebar/index.js',
    })
    expect(pkg.exports['./components/DsToaster']).toEqual({
      types: './dist/types/src/components/DsToaster/index.d.ts',
      import: './dist/components/DsToaster/index.js',
    })
    expect(pkg.exports['./uno']).toEqual({
      types: './dist/types/src/unocss/preset.d.ts',
      import: './dist/uno.js',
    })
    expect(pkg.exports['./uno-node']).toEqual({
      types: './dist/types/src/unocss/preset.node.d.ts',
      import: './dist/uno-node.js',
    })
    expect(pkg.exports['./styles.css']).toBe('./dist/styles.css')
    expect(pkg.exports['./foundation.css']).toBe('./dist/foundation.css')
    expect(pkg.exports['./styles/base.css']).toBe('./dist/styles/base.css')
    expect(pkg.exports['./styles/tokens.css']).toBe('./dist/styles/tokens.css')
    expect(pkg.exports['./styles/themes/light.css']).toBe('./dist/styles/themes/light.css')
    expect(pkg.exports['./styles/themes/dark.css']).toBe('./dist/styles/themes/dark.css')
  })

  it('складывает внутренние js-чанки библиотеки в dist/chunks', () => {
    expect(granularityViteConfigSource).toContain("export const granularityInternalChunkFileName = 'chunks/[name]-[hash].js'")
    expect(granularityViteConfigSource).toContain('chunkFileNames: granularityInternalChunkFileName')
  })

  it('собирает отдельные build-entry для top-level composables', () => {
    expect(granularityViteConfigSource).toContain("readdirSync(fileURLToPath(new URL('./src/composables', import.meta.url)), { withFileTypes: true })")
    expect(granularityViteConfigSource).toContain("`composables/${entry.name.slice(0, -'.ts'.length)}`")
  })

  it('собирает отдельные build-entry для top-level directives и подключает global directive typings', () => {
    expect(granularityViteConfigSource).toContain("readdirSync(fileURLToPath(new URL('./src/directives', import.meta.url)), { withFileTypes: true })")
    expect(granularityViteConfigSource).toContain("`directives/${entry.name.slice(0, -'.ts'.length)}`")
    expect(granularityDirectivesIndexSource).toContain("export type {} from './globalDirectives'")
  })
})