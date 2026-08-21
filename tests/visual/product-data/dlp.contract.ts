import { expect, it } from 'vitest'
import { readComponent } from '../utils'

export function registerDlpVisualContracts() {
  it('keeps the DLP product page aligned with its requirement document', () => {
    const page = readComponent('pages/products/data-labeling.vue')
    const hero = readComponent('components/product/dlp/DlpHero.vue')
    const heroVisual = readComponent('components/product/dlp/DlpHeroVisual.vue')
    const architecture = readComponent('components/product/dlp/DlpArchitecture.vue')
    const timeline = readComponent('components/product/dlp/DlpCapabilityTimelineSection.vue')
    const alternatingTimeline = readComponent('components/common/AlternatingTimelineSection.vue')
    const aiModeling = readComponent('components/product/dlp/DlpAiModelingSection.vue')
    const featureGrid = readComponent('components/common/ProductFeatureGridSection.vue')
    const cardGrid = readComponent('components/common/card/CardGrid.vue')
    const data = readComponent('data/dlp.ts')

    expect(page).toContain('SiteHeader')
    expect(page).toContain('SiteFooter')
    expect(page).toContain('DlpHero')
    expect(page).toContain('ProductFeatureGridSection')
    expect(page).toContain('DlpArchitecture')
    expect(page).toContain('DlpCapabilityTimelineSection')
    expect(page).toContain('DlpAiModelingSection')
    expect(page).toContain('CtaSection')
    expect(page).toContain('id="dlp-challenge"')
    expect(page).toContain('eyebrow="挑战"')
    expect(page).toContain('title="厌倦了低效的标签建设？"')
    expect(page).toContain('title="构建统一的企业标签体系"')
    expect(page).toContain('title="从数据对象到标签服务"')
    expect(page).toContain('title="为企业 AI 场景赋能"')
    expect(page).toContain(':items="dlpAdvantages"')
    expect(page).toContain('columns="two"')
    expect(page).toContain('columns="three"')
    expect(page).toContain('title-id="dlp-cta-title"')
    expect(page).not.toContain('<style')

    expect(hero).toContain('PageHero')
    expect(hero).toContain('import { Boxes }')
    expect(hero).toContain('badge="数曜·数据标签平台"')
    expect(hero).toContain('title-line="协同、智能、高效"')
    expect(hero).toContain('title-gradient="标签生产平台"')
    expect(hero).toContain('visual-label="SHUYAODGP_HORE_WEBM"')
    expect(hero).toContain('DlpHeroVisual')
    expect(hero).toContain('visual-size="large"')
    const heroSql = readComponent('components/product/dlp/heroSql.ts')
    expect(heroVisual).toContain('数曜·数据标签平台')
    expect(heroVisual).toContain('标签生成')
    expect(heroVisual).toContain('标签查询')
    expect(heroVisual).toContain('实时标签生成')
    expect(heroVisual).toContain('tag_results')
    expect(heroVisual).toContain('h-[475px]')
    expect(heroVisual).toContain('grid-cols-4')
    expect(heroVisual).toContain('正在生成标签...')
    expect(heroVisual).toContain('标签已生成，可直接查询、分析与服务调用。')
    expect(heroVisual).toContain('标签实时查询')
    expect(heroVisual).toContain('主体画像')
    expect(heroVisual).toContain('查询标签')
    expect(heroVisual).toContain('正在查询标签...')
    expect(heroVisual).toContain('已找到 3 个标签，可用于分析、分群与服务调用。')
    expect(heroVisual).toContain('animate-glow')
    expect(heroVisual).toContain('dlpHeroFeatures')
    expect(heroVisual).toContain('dlpHeroTagResults')
    expect(heroVisual).toContain('dlpHeroQueryResults')
    expect(heroVisual).not.toContain('BaseTabs')
    expect(heroVisual).not.toContain('图片占位符')
    expect(heroVisual).not.toContain('<style')
    expect(heroSql).toContain('tag_results')
    expect(heroSql).toContain("customer_id = 'A1024'")
    expect(heroSql).toContain('tokenizeSql')

    expect(architecture).toContain('ProductArchitectureSection')
    expect(architecture).toContain('title="轻松构建企业标签体系"')
    expect(architecture).toContain('fallback-text="标签体系架构图占位符"')
    expect(architecture).not.toContain('EnterpriseFlow')
    expect(architecture).not.toContain('<style')

    expect(featureGrid).toContain("columns?: 'two' | 'three' | 'four'")
    expect(cardGrid).toContain('md:grid-cols-3')
    expect(timeline).toContain('AlternatingTimelineSection')
    expect(timeline).not.toContain('BaseCard')
    expect(timeline).not.toContain('IconBox')
    expect(timeline).toContain('dlpTimelineItems')
    expect(alternatingTimeline).toContain('SectionHeader')
    expect(alternatingTimeline).toContain('lg:left-1/2')
    expect(alternatingTimeline).toContain('space-y-[4.5rem]')
    expect(alternatingTimeline).toContain('class="py-4 lg:py-8"')
    expect(alternatingTimeline).toContain('rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[13px] font-semibold text-primary/80')
    expect(alternatingTimeline).not.toContain('BaseCard')
    expect(alternatingTimeline).not.toContain('IconBox')
    expect(timeline).not.toContain('item.icon')
    expect(timeline).not.toContain('eyebrow-size="sm"')
    expect(timeline).not.toContain('eyebrow-tone="primary"')
    expect(alternatingTimeline).toContain('role="img"')
    expect(alternatingTimeline).toContain('图片占位符')
    expect(alternatingTimeline).not.toContain('<style')
    expect(timeline).not.toContain('<style')
    expect(aiModeling).toContain('SectionHeader')
    expect(aiModeling).toContain('AI 辅助建标')
    expect(aiModeling).toContain('图片占位符')
    expect(aiModeling).not.toContain('<style')

    for (const text of [
      '标准混乱',
      '自动化生产',
      '统一定义标签标准',
      '主体对象自由定义',
      '精准用户运营',
      '立即咨询',
      'customer/visit_count',
      'customer/order_amount',
      'customer/last_active',
      '高活跃',
      '高价值',
      '近期活跃',
    ]) {
      expect(data).toContain(text)
    }
  })
}
