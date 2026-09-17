import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = process.cwd()
const read = (path: string) => readFileSync(resolve(root, path), 'utf8')

export function registerSmartDataHubVisualContracts() {
  describe('smart data hub demo visual contract', () => {
    const flow = read('components/demo/smart-data-hub/SmartDataHubFlow.client.vue')
    const node = read('components/demo/smart-data-hub/SmartDataHubNode.vue')
    const demo = read('components/demo/SmartDataHubDemo.client.vue')

    it('keeps the unified 1704px canvas without a grid background', () => {
      expect(demo).toContain('min-w-[1704px] max-w-[1704px]')
      expect(demo).not.toContain('bg-[linear-gradient')
    })

    it('uses the requested data development content and dynamic edges', () => {
      expect(flow).toContain("label: '数曜 · 数据开发平台'")
      expect(flow).toContain("label: '开发全流程'")
      expect(flow).toContain("type: 'smartDataHubDynamic'")
      expect(node).toContain("shuyaoLogo from '~/assets/images/brand/shuyao-logo.svg'")
      expect(node).toContain('class="size-16 object-contain"')
    })
  })
}
