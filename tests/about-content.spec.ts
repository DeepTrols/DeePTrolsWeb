import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  aboutAddress,
  aboutContacts,
  aboutHero,
  aboutIntroParagraphs,
  aboutMap,
  aboutStats,
  aboutValues,
} from '../data/about'
import { primaryNavigation } from '../data/navigation'

const root = process.cwd()

describe('about page content contract', () => {
  it('wires the primary navigation to the about_us route', () => {
    expect(primaryNavigation.find((item) => item.label === '关于我们')?.href).toBe('/about_us')
  })

  it('defines the required hero copy and runtime background asset', () => {
    expect(aboutHero).toMatchObject({
      title: '关于深度数智（DEEPTROLS）',
      description: '构建企业级AI能力体系，让智能成为业务增长的新引擎',
      visualLabel: 'ABOUTUS_HORE_WEBM',
      backgroundVideo: '/images/about/custom-rad-hero-bg-video.mp4',
    })
    expect(existsSync(join(root, 'public/images/about/custom-rad-hero-bg-video.mp4'))).toBe(true)
  })

  it('keeps the about stats in the required order', () => {
    expect(aboutStats).toEqual([
      { value: '500+', label: '全球客户' },
      { value: '30+', label: '覆盖行业' },
      { value: '25+', label: '构建场景' },
    ])
  })

  it('keeps the company narrative and address content', () => {
    expect(aboutIntroParagraphs).toHaveLength(2)
    expect(aboutIntroParagraphs.join('\n')).toContain('武汉深度数智科技有限公司（DeepTrols）')
    expect(aboutIntroParagraphs.join('\n')).toContain('数曜数据能力平台、博曜知识管理平台、智曜AI平台以及探曜AI物联能力平台')
    expect(aboutAddress).toBe('湖北省武汉市江汉区泛海国际SOHO-2栋2307')
    expect(aboutMap).toMatchObject({
      title: '武汉深度数智科技有限公司',
    })
    expect(aboutMap.embedUrl).toContain('openstreetmap.org/export/embed.html')
  })

  it('defines three values and the required contact channels', () => {
    expect(aboutValues.map((item) => item.title)).toEqual(['极客', '执着', '学习'])
    expect(aboutValues.map((item) => item.revealTitle)).toEqual(['技术驱动', '不走捷径', '持续进化'])
    expect(aboutContacts.map((item) => item.label)).toEqual(['综合咨询', '产品咨询', '技术支持', '人才招聘'])
    expect(aboutContacts.map((item) => item.value)).toEqual([
      'contact@deeptrols.com',
      'product@deeptrols.com',
      'support@deeptrols.com',
      'hr@deeptrols.com',
    ])
    expect(aboutContacts.every((item) => item.href.startsWith('mailto:'))).toBe(true)
  })
})
