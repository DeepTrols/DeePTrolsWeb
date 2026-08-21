import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

export const root = process.cwd()

export function readComponent(relativePath: string) {
  return readFileSync(join(root, relativePath), 'utf8')
}

export function listVueFiles(directory: string): string[] {
  return readdirSync(join(root, directory), { withFileTypes: true }).flatMap((entry) => {
    const path = `${directory}/${entry.name}`

    if (entry.isDirectory()) {
      return listVueFiles(path)
    }

    return entry.name.endsWith('.vue') ? [path] : []
  })
}
