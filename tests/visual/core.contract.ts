import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { expect, it } from 'vitest'
import { listVueFiles, readComponent, root } from './utils'

export function registerCoreVisualContracts() {
  it('uses existing visual assets for the first viewport and solution cards', () => {
    const page = readComponent('pages/index.vue')
    const hero = readComponent('components/home/HomeHero.vue')
    expect(hero).not.toContain('HeroTresBackground')
    expect(hero).not.toContain('TresCanvas')
    expect(page).toContain('class="home-hero-deliverables__video"')
    expect(page).toContain('花瓣素材_+暖蓝光泄漏背景可循环')

    for (const asset of [
      'public/images/home/solutions/industrial.K00G2HaS.png',
      'public/images/home/solutions/smart-env.CWc2pooP.png',
      'public/images/home/solutions/smart-energy.DHKY-NE1.png',
      'public/images/home/solutions/smart-Water.DHKY-NE1.png',
      'public/images/home/solutions/data-center-ai.CDu93Miw.png',
      'public/images/home/solutions/data.DHKY-NE1.png',
    ]) {
      expect(existsSync(join(root, asset))).toBe(true)
    }
  })

  it('keeps component styles in SCSS, avoids inline style attributes, and caps component size', () => {
    const vueFiles = [...listVueFiles('components'), ...listVueFiles('pages')]

    for (const file of vueFiles) {
      const source = readComponent(file)
      const sourceWithoutRequiredNavWrapper = source.replace(' style="position:relative;"', '')
      const lineCount = source.split(/\r?\n/).length

      if (file.startsWith('components/') && source.includes('<style')) {
        expect(source).toContain('<style scoped lang="scss">')
      }

      expect(lineCount, `${file} exceeds 300 lines`).toBeLessThanOrEqual(300)
      expect(sourceWithoutRequiredNavWrapper).not.toMatch(/\sstyle=/)
    }
  })

  it('includes responsive navigation and mobile product fallback', () => {
    expect(readComponent('components/navigation/SiteHeaderMobileNav.vue')).toContain('mobile-navigation')
    expect(readComponent('components/home/HomeProductSystemMobileFlow.vue')).toContain('product-system__mobile-flow')
  })
}
