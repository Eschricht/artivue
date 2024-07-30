import path from 'node:path'
import * as url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const repoRoot = path.join(__dirname, '..')
export const packagesDir = path.join(repoRoot, 'packages')

export const artivueRoot = path.join(packagesDir, 'artivue')
export const artivueSrc = path.join(artivueRoot, 'src')

export const unocssPresetRoot = path.join(packagesDir, 'unocss')
export const unocssPresetSrc = path.join(unocssPresetRoot, 'src')
