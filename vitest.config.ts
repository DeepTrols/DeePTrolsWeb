import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/**/*.spec.ts'],
  },
  resolve: {
    alias: {
      // fileURLToPath 解码中文目录（pathname 会把「项目」百分号编码导致运行时 ~/ 导入解析失败）
      '~': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
})
