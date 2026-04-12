import { readFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { describe, expect, it } from 'vitest'

import { showcaseChildRoutes } from '../../app/routeDefinitions'

const componentDetailPageSource = readFileSync(
  fileURLToPath(new URL('../ComponentDetailPage.vue', import.meta.url)),
  'utf8',
)

const packageEntityDetailPageSource = readFileSync(
  fileURLToPath(new URL('../PackageEntityDetailPage.vue', import.meta.url)),
  'utf8',
)

describe('showcase page smoke coverage', () => {
  it('держит ключевые overview/catalog/detail routes для всех основных разделов витрины', () => {
    expect(showcaseChildRoutes.map(route => route.path)).toEqual(expect.arrayContaining([
      '',
      'foundations',
      'components',
      'components/:componentSlug',
      'directives',
      'directives/:entitySlug',
      'composables',
      'composables/:entitySlug',
      'utilities',
      'utilities/:entitySlug',
    ]))
  })

  it('рендерит ключевые doc primitives для component detail и сохраняет empty-state fallback', () => {
    expect(componentDetailPageSource).toContain('import ExampleCard from')
    expect(componentDetailPageSource).toContain('import PropsTable from')
    expect(componentDetailPageSource).toContain('import SlotsTable from')
    expect(componentDetailPageSource).toContain('import EventsTable from')
    expect(componentDetailPageSource).toContain('import MethodsTable from')
    expect(componentDetailPageSource).toContain('← Back to components')
    expect(componentDetailPageSource).toContain('Component not found')
  })

  it('рендерит package-level api/actions и сохраняет fallback для missing entity', () => {
    expect(packageEntityDetailPageSource).toContain('import ApiTable from')
    expect(packageEntityDetailPageSource).toContain('import ExampleCard from')
    expect(packageEntityDetailPageSource).toContain('<EntityActionBar')
    expect(packageEntityDetailPageSource).toContain('Package entity not found')
    expect(packageEntityDetailPageSource).toContain('Back to {{ page.shortTitle.toLowerCase() }}')
  })
})