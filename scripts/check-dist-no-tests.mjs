import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

import { assertNoTestArtifacts } from './distArtifacts.mjs'

const scriptsDir = dirname(fileURLToPath(import.meta.url))
const projectRootDir = resolve(scriptsDir, '..')

assertNoTestArtifacts(resolve(projectRootDir, 'dist'))