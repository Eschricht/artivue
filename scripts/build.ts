import { execSync } from 'node:child_process'
import consola from 'consola'
import { repoRoot } from './paths'

execSync('pnpm run clean', { stdio: 'inherit', cwd: repoRoot })
execSync('pnpm -r --filter=./packages/artivue build', { stdio: 'inherit', cwd: repoRoot })
execSync('pnpm -r --filter=!./packages/artivue --filter=./packages/* build', { stdio: 'inherit', cwd: repoRoot })
execSync('pnpm -r --filter=./packages/nuxt prepack', { stdio: 'inherit', cwd: repoRoot })

consola.success('Build complete!')
