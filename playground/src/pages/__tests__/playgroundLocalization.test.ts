import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

const playgroundRoot = path.resolve(import.meta.dirname, '..', '..')
const pagesDir = path.join(playgroundRoot, 'pages')
const componentsDir = path.join(playgroundRoot, 'components')
const localesDir = path.join(playgroundRoot, 'i18n', 'locales')
const appFile = path.join(playgroundRoot, 'App.vue')

function flattenMessages(value: unknown, prefix = ''): Set<string> {
  if (value == null || typeof value !== 'object' || Array.isArray(value)) {
    return prefix ? new Set([prefix]) : new Set()
  }

  const keys = new Set<string>()

  for (const [key, nested] of Object.entries(value)) {
    const nestedPrefix = prefix ? `${prefix}.${key}` : key

    for (const nestedKey of flattenMessages(nested, nestedPrefix)) {
      keys.add(nestedKey)
    }
  }

  return keys
}

function extractPlaygroundKeys(source: string): Set<string> {
  const keys = new Set<string>()
  const matches = source.matchAll(/t\(\s*['"](playground\.[^'"]+)['"]/g)

  for (const match of matches) {
    const key = match[1]?.replace(/^playground\./, '')

    if (key) {
      keys.add(key)
    }
  }

  return keys
}

function collectUsedKeys(): Set<string> {
  const files = [
    appFile,
    ...readdirSync(pagesDir).filter(file => file.endsWith('.vue')).map(file => path.join(pagesDir, file)),
    path.join(componentsDir, 'PlaygroundPage.vue'),
    path.join(componentsDir, 'PlaygroundProps.vue'),
  ]

  const keys = new Set<string>()

  for (const file of files) {
    const source = readFileSync(file, 'utf8')

    for (const key of extractPlaygroundKeys(source)) {
      keys.add(key)
    }
  }

  return keys
}

function readLocale(locale: string): Set<string> {
  const source = readFileSync(path.join(localesDir, `${locale}.json`), 'utf8')
  return flattenMessages(JSON.parse(source))
}

describe('playground localization coverage', () => {
  it('contains every playground page key in all locales', () => {
    const usedKeys = collectUsedKeys()
    const locales = ['en', 'ru', 'es'] as const

    for (const locale of locales) {
      const localeKeys = readLocale(locale)
      const missingKeys = [...usedKeys].filter(key => !localeKeys.has(key)).sort()

      expect(missingKeys, `Missing keys in ${locale}`).toEqual([])
    }
  })
})