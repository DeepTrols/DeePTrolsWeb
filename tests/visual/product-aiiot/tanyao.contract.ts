import { describe, expect, it } from 'vitest'
import { readComponent } from '../utils'

export function registerTanyaoVisualContracts() {
describe('tanyao ai-iot page contract', () => {
  it('renders the tanyao hero through PageHero with a flush-bottom rhythm and the boyao-aligned visual', () => {
    const hero = readComponent('components/product/tanyao/TanyaoHero.vue')
    const pageHero = readComponent('components/common/PageHero.vue')

    expect(hero).toContain('badge="探曜·AI物联感知平台"')
    expect(hero).toContain('RadioTower')
    expect(hero).toContain('title-id="tanyao-hero-title"')
    expect(hero).toContain('title-line="连接、感知、智能"')
    expect(hero).toContain('title-gradient="AIoT智能物联底座"')
    expect(hero).toContain('visual-label="TANYAOIOT_HORE_WEBM"')
    expect(hero).toContain('visual-size="large"')
    expect(hero).toContain('flush-bottom')
    // the visual right edge follows the boyao baseline (ml-auto canvas), not flush-visual-end
    expect(hero).not.toContain('flush-visual-end')
    expect(hero).toContain('<TanyaoHeroVisual />')
    expect(hero).not.toContain('HeroStatsStrip')
    expect(pageHero).toContain('flushVisualEnd?: boolean')
    expect(pageHero).toContain("flushVisualEnd ? 'lg:-mr-4 lg:justify-self-end' : ''")
  })

  it('renders the 1x4 stats strip as a standalone section below the hero', () => {
    const stats = readComponent('components/product/tanyao/TanyaoStatsSection.vue')
    const heroStatsStrip = readComponent('components/common/HeroStatsStrip.vue')

    expect(stats).toContain('HeroStatsStrip')
    expect(stats).toContain('tanyaoHeroStats')
    expect(stats).toContain(':columns="4"')
    expect(stats).toContain('placement="section"')
    expect(stats).toContain('container')
    expect(stats).not.toContain('<style')
    expect(heroStatsStrip).toContain('columns?: 3 | 4')
    expect(heroStatsStrip).toContain('grid-cols-2 sm:grid-cols-4')
    expect(heroStatsStrip).toContain('grid-cols-3')
    expect(heroStatsStrip).toContain("placement?: 'hero' | 'section'")
    expect(heroStatsStrip).toContain('mx-auto mt-8 max-w-2xl lg:mx-0')
    expect(heroStatsStrip).toContain('rounded-xl border border-default bg-dt-bg-soft/50 px-4 py-4 text-center backdrop-blur-sm')
    expect(heroStatsStrip).toContain('text-2xl font-semibold text-highlighted lg:text-3xl')
    expect(heroStatsStrip).toContain('mt-1 text-xs text-muted lg:text-sm')
    expect(heroStatsStrip).toContain('bg-[var(--dt-color-bg-soft)]/50 px-3 py-3 text-center backdrop-blur-sm')
  })

  it('replicates the EMQX Edge hero visual structure with tanyao copy and unique SVG ids', () => {
    const heroVisual = readComponent('components/product/tanyao/TanyaoHeroVisual.vue')

    // Tailwind-only component
    expect(heroVisual).not.toContain('<style')
    expect(heroVisual).not.toMatch(/\sstyle=/)

    // canvas and glow baseline; the root and canvas follow the boyao right-flush geometry
    expect(heroVisual).toContain('class="hidden w-full lg:block"')
    expect(heroVisual).toContain('pointer-events-none relative ml-auto h-[600px] w-full max-w-[600px]')
    expect(heroVisual).toContain('viewBox="0 0 560 560"')
    expect(heroVisual).toContain('id="tanyaoFlowGradientUp"')
    expect(heroVisual).toContain('id="tanyaoFlowGradientDown"')
    expect(heroVisual).toContain('id="tanyaoEdgeGlow"')
    expect(heroVisual).toContain('stroke-dasharray="6 10"')
    expect(heroVisual).toContain('attributeName="stroke-dashoffset"')

    // card radii follow the boyao hero visual baseline (24px cards, 32px platform card)
    expect(heroVisual).toContain('rounded-[24px]')
    expect(heroVisual).toContain('rounded-[32px]')
    expect(heroVisual).not.toContain('rounded-xl ')
    expect(heroVisual).not.toContain('rounded-2xl ')
    expect(heroVisual).not.toContain('rounded-lg ')

    // top platform card
    expect(heroVisual).toContain('absolute left-1/2 top-[18px] w-[460px] -translate-x-1/2')
    expect(heroVisual).toContain('探曜AIoT')
    expect(heroVisual).toContain('智能物联底座')
    expect(heroVisual).toContain('AI Powered')
    expect(heroVisual).toContain('链接生态')
    expect(heroVisual).toContain('tanyaoIotLogo')

    // ecosystem logos keep the AI partners ahead of the 曜 platforms
    expect(heroVisual).toContain('deepseekLogo')
    expect(heroVisual).toContain('qwenLogo')
    expect(heroVisual).toContain('zhipuLogo')
    expect(heroVisual).toContain('kimiLogo')
    expect(heroVisual).toContain('DeepSeek')
    expect(heroVisual).toContain('千问')
    expect(heroVisual).toContain('智谱')
    expect(heroVisual).toContain('Kimi')
    expect(heroVisual.indexOf('DeepSeek')).toBeLessThan(heroVisual.indexOf('数曜'))

    // middle edge card grows to five runtime nodes and stays inside the lg canvas
    expect(heroVisual).toContain('absolute left-1/2 top-[208px] w-[504px] xl:w-[560px] -translate-x-1/2')
    expect(heroVisual).toContain('探曜 Edge')
    expect(heroVisual).toContain('relative grid grid-cols-5 gap-2')
    expect(heroVisual).toContain('设备接入')
    expect(heroVisual).toContain('边缘计算')
    expect(heroVisual).toContain('策略执行')
    expect(heroVisual).toContain('Node-RED')
    expect(heroVisual).toContain('Neuron')
    expect(heroVisual).toContain('animate-pulse-bar')
    expect(heroVisual).toContain('animate-pulse-dot')
    // node padding and broker bars relax at lg so five nodes fit the 520px lg canvas
    expect(heroVisual).toContain('p-3 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg xl:p-4')
    expect(heroVisual).toContain('h-1.5 w-3 animate-pulse-bar rounded-full bg-fuchsia-500/60 xl:w-3.5')

    // bottom device card grows to five tiles
    expect(heroVisual).toContain('absolute bottom-[46px] left-1/2 w-[460px] -translate-x-1/2')
    expect(heroVisual).toContain('grid grid-cols-5 gap-3')
    expect(heroVisual).toContain('工业设备')
    expect(heroVisual).toContain('传感器')
    expect(heroVisual).toContain('能源设备')
    expect(heroVisual).toContain('PLC')
    expect(heroVisual).toContain('摄像头')

    // logo boxes reuse the shared IconBox soft tone
    expect(heroVisual).toContain('IconBox')
    expect(heroVisual).toContain(':size="48" tone="soft"')
    expect(heroVisual).toContain(':size="40" tone="soft"')
  })

  it('assembles the tanyao page from shared section components in the required order', () => {
    const page = readComponent('pages/products/ai-iot.vue')
    const solution = readComponent('components/product/tanyao/TanyaoSolutionSection.vue')
    const capability = readComponent('components/product/tanyao/TanyaoCapabilitySection.vue')
    const timeline = readComponent('components/common/AlternatingTimelineSection.vue')
    const tanyaoData = readComponent('data/tanyao.ts')

    expect(page).toContain('<TanyaoHero />')
    expect(page).toContain('<TanyaoStatsSection />')
    expect(page).toContain('title-id="tanyao-challenge-title"')
    expect(page).toContain('title-id="tanyao-agent-title"')
    expect(page).toContain('title-id="tanyao-cta-title"')
    expect(page.indexOf('<TanyaoHero')).toBeLessThan(page.indexOf('<TanyaoStatsSection'))
    expect(page.indexOf('<TanyaoStatsSection')).toBeLessThan(page.indexOf('tanyao-challenge-title'))
    expect(page.indexOf('tanyao-challenge-title')).toBeLessThan(page.indexOf('<TanyaoSolutionSection'))
    expect(page.indexOf('<TanyaoSolutionSection')).toBeLessThan(page.indexOf('<TanyaoCapabilitySection'))
    expect(page.indexOf('<TanyaoCapabilitySection')).toBeLessThan(page.indexOf('tanyao-agent-title'))
    expect(page.indexOf('tanyao-agent-title')).toBeLessThan(page.indexOf('tanyao-cta-title'))

    expect(solution).toContain('ProductArchitectureSection')
    expect(solution).toContain('eyebrow="解决方案"')
    expect(solution).toContain('title-id="tanyao-solution-title"')
    expect(solution).toContain('SystemCards')

    expect(capability).toContain('AlternatingTimelineSection')
    expect(capability).toContain('eyebrow="核心能力"')
    expect(capability).toContain('title-id="tanyao-capability-title"')
    expect(capability).toContain('tanyaoTimelineItems')

    // capability items have no bullets, so the shared timeline must guard the list
    expect(timeline).toContain('v-if="item.bullets.length"')

    expect(tanyaoData).toContain('export const tanyaoHeroStats: HeroStatItem[]')
    expect(tanyaoData).toContain('export const tanyaoChallenges: ProductFeatureGridItem[]')
    expect(tanyaoData).toContain('export const tanyaoSolutionCards: SystemCard[]')
    expect(tanyaoData).toContain('export const tanyaoTimelineItems: AlternatingTimelineItem[]')
    expect(tanyaoData).toContain('export const tanyaoAgents: ProductFeatureGridItem[]')
  })
})
}
