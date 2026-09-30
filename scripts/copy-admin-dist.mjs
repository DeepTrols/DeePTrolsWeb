import { cpSync, existsSync, readFileSync, readdirSync, rmSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

// 把后台 SPA 构建产物（admin/apps/web-antd/dist，base=/admin/）拷贝到主站 public/admin/，
// 使 Nuxt 以单一 origin 按路径服务后台（/admin/）。生产清单是构建期快照，
// 因此本脚本必须先于 nuxt build 执行（见 package.json 的 build:deploy）。
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const source = join(root, 'admin', 'apps', 'web-antd', 'dist')
const target = join(root, 'public', 'admin')

function fail(message) {
  console.error(`[copy-admin-dist] ${message}`)
  process.exit(1)
}

if (!existsSync(join(source, 'index.html'))) {
  fail(`未找到 ${source}/index.html。请先构建后台：pnpm -C admin build:antd`)
}

function countFiles(dir) {
  let count = 0
  const stack = [dir]
  while (stack.length > 0) {
    const current = stack.pop()
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      if (entry.isDirectory()) stack.push(join(current, entry.name))
      else count += 1
    }
  }
  return count
}

rmSync(target, { recursive: true, force: true })
cpSync(source, target, { recursive: true })

const indexHtml = readFileSync(join(target, 'index.html'), 'utf8')
if (!indexHtml.includes('/admin/')) {
  fail('public/admin/index.html 未包含 /admin/ 资源前缀，请检查 admin/apps/web-antd/.env.production 的 VITE_BASE')
}

console.log(`[copy-admin-dist] 已拷贝 ${countFiles(target)} 个文件到 public/admin/`)
