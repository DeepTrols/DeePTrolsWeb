import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = process.cwd()
const read = (path: string) => readFileSync(resolve(root, path), 'utf8')

export function registerKnowledgeHubVisualContracts() {
  describe('knowledge hub demo visual contract', () => {
    const flow = read('components/demo/knowledge-hub/KnowledgeHubFlow.client.vue')
    const center = read('components/demo/knowledge-hub/KnowledgeCenterNode.vue')
    const demo = read('components/demo/KnowledgeHubDemo.client.vue')

    it('keeps the unified canvas and standalone demo boundary', () => {
      expect(demo).toContain('min-w-[1704px] max-w-[1704px]')
      expect(demo).toContain('h-[520px]')
      expect(demo).not.toContain('bg-[linear-gradient')
    })

    it('uses the requested knowledge pipeline and dynamic edges', () => {
      expect(flow).toContain("label: '博曜 · 知识加工'")
      expect(flow).toContain("label: '博曜 · 知识中枢'")
      expect(flow).toContain("label: '智能知识应用'")
      expect(flow).toContain("type: 'knowledgeHubDynamic'")
      expect(center).toContain("boyaoLogo from '~/assets/images/brand/boyao-logo.svg'")
    })
  })
}
