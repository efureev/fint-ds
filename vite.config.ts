import { fileURLToPath, URL } from 'node:url'
import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import UnoCSS from 'unocss/vite'

import { isTestArtifactPath } from './scripts/distArtifacts.mjs'

const DIST_PREFIX_RE = /^\.\/dist\//

function stripDistPrefix(path: string) {
  return path.replace(DIST_PREFIX_RE, './')
}

function rewriteExports(value: unknown): unknown {
  if (typeof value === 'string')
    return stripDistPrefix(value)

  if (Array.isArray(value))
    return value.map(rewriteExports)

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, rewriteExports(val)]),
    )
  }

  return value
}

function getDistPackageJson() {
  const pkg = JSON.parse(
    readFileSync(fileURLToPath(new URL('./package.json', import.meta.url)), 'utf8'),
  )

  return {
    name: pkg.name,
    version: pkg.version,
    private: pkg.private,
    type: pkg.type,
    sideEffects: pkg.sideEffects,
    exports: rewriteExports(pkg.exports),
    peerDependencies: pkg.peerDependencies,
    dependencies: pkg.dependencies,
  }
}

export default defineConfig({
  plugins: [
    vue(),
    Icons({
      compiler: 'vue3',
      autoInstall: false,
    }),
    UnoCSS({
      configFile: false,
    }),
    {
      name: 'fint-ds:emit-extra-css-assets',
      apply: 'build',
      generateBundle() {
        const remoteFontsCss = readFileSync(
          fileURLToPath(new URL('./src/styles/fonts.remote.css', import.meta.url)),
          'utf8',
        )

        const baseCss = readFileSync(
          fileURLToPath(new URL('./src/styles/base.css', import.meta.url)),
          'utf8',
        )

        this.emitFile({
          type: 'asset',
          fileName: 'fonts.css',
          source: remoteFontsCss,
        })

        this.emitFile({
          type: 'asset',
          fileName: 'base.css',
          source: baseCss,
        })

        this.emitFile({
          type: 'asset',
          fileName: 'package.json',
          source: `${JSON.stringify(getDistPackageJson(), null, 2)}\n`,
        })
      },
    },
    {
      name: 'fint-ds:strip-test-artifacts',
      apply: 'build',
      generateBundle(_, bundle) {
        for (const fileName of Object.keys(bundle)) {
          if (isTestArtifactPath(fileName))
            delete bundle[fileName]
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'esnext',
    reportCompressedSize: true,
    minify: 'oxc',
    lib: {
      entry: {
        index: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        styles: fileURLToPath(new URL('./src/styles.ts', import.meta.url)),
        uno: fileURLToPath(new URL('./src/uno.ts', import.meta.url)),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rolldownOptions: {
      external: [
        'vue',
      ],
      output: {
        assetFileNames: (assetInfo) => {
          // Normalize CSS output name for consumer-friendly `exports`.
          // In library mode Vite may emit `<package-name>.css`.
          if (assetInfo.name?.endsWith('.css'))
            return 'styles.css'
          return assetInfo.name ?? '[name][extname]'
        },
      },
    },
  },
})
