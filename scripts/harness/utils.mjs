import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

export const root = process.cwd()
export const failures = []

export function read(path) {
  return readFileSync(join(root, path), 'utf8')
}

export function assert(condition, message) {
  if (!condition) {
    failures.push(message)
  }
}

export function listFiles(directory, predicate) {
  return readdirSync(join(root, directory), { withFileTypes: true }).flatMap((entry) => {
    const path = `${directory}/${entry.name}`

    if (entry.isDirectory()) {
      return listFiles(path, predicate)
    }

    return predicate(path) ? [path] : []
  })
}
