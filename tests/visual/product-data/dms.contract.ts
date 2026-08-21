import { expect, it } from 'vitest'
import { readComponent } from '../utils'

export function registerDmsVisualContracts() {
  it('keeps the DMS product page aligned with its requirement document', () => {
    const page = readComponent('pages/products/data-element-regulation.vue')
    const hero = readComponent('components/product/dms/DmsHero.vue')
    const heroVisual = readComponent('components/product/dms/DmsHeroVisual.vue')
    const heroAnimation = readComponent('components/product/dms/useDmsHeroAnimation.ts')
    const architecture = readComponent('components/product/dms/DmsArchitecture.vue')
    const intelligentRegulation = readComponent('components/product/dms/DmsIntelligentRegulationSection.vue')
    const businessValue = readComponent('components/product/dms/DmsBusinessValueSection.vue')
    const regulationProcess = readComponent('components/product/dms/DmsRegulationProcessSection.vue')
    const featureGrid = readComponent('components/common/ProductFeatureGridSection.vue')
    const data = readComponent('data/dms.ts')

    expect(page).toContain('SiteHeader')
    expect(page).toContain('SiteFooter')
    expect(page).toContain('DmsHero')
    expect(page).toContain('ProductFeatureGridSection')
    expect(page).toContain('DmsArchitecture')
    expect(page).toContain('DmsIntelligentRegulationSection')
    expect(page).toContain('DmsBusinessValueSection')
    expect(page).toContain('DmsRegulationProcessSection')
    expect(page).toContain('CtaSection')
    expect(page).toContain('id="dms-challenge"')
    expect(page).toContain('title="数据流通不断扩大 监管能力亟需升级"')
    expect(page).toContain('title="要素全流程监管能力"')
    expect(page).toContain('title="赋能多场景数据要素监管"')
    expect(page).toContain('columns="three"')
    expect(page).toContain('columns="two"')
    expect(page).toContain('title-id="dms-cta-title"')
    expect(page).not.toContain('<style')

    expect(hero).toContain('PageHero')
    expect(hero).toContain('import { HardDrive }')
    expect(hero).toContain('badge="数曜·数据要素监管平台"')
    expect(hero).toContain('title-line="让数据流通安全、可信"')
    expect(hero).toContain('title-gradient="全流程监管平台"')
    expect(hero).toContain('visual-label="SHUYAODMS_HORE_WEBM"')
    expect(hero).toContain('visual-size="large"')
    expect(hero).toContain('DmsHeroVisual')
    expect(heroVisual).toContain('dmsHeroTitle')
    expect(heroVisual).toContain('dmsHeroTabs')
    expect(heroVisual).toContain('dmsHeroIntakeFields')
    expect(heroVisual).toContain('dmsHeroRiskRules')
    expect(heroVisual).toContain('dmsHeroRiskSummary')
    expect(heroVisual).toContain('dmsHeroDisposalFields')
    expect(heroVisual).toContain('dmsHeroDisposalSteps')
    expect(heroVisual).toContain('useDmsHeroAnimation')
    expect(heroVisual).toContain('getProgressWidthClass')
    expect(heroVisual).toContain('relative h-[320px]')
    expect(heroVisual).toContain('flex gap-1.5 border-t border-muted px-5 py-3')
    expect(heroVisual).not.toContain('<style')
    expect(heroVisual).not.toContain('style=')
    expect(heroAnimation).toContain('STAGE_DURATION_MS = 5000')
    expect(heroAnimation).toContain('PROGRESS_WIDTH_CLASSES')
    expect(heroAnimation).toContain('getProgressWidthClass')
    expect(heroAnimation).toContain('INTAKE_STEP_INTERVAL_MS = 800')
    expect(heroAnimation).toContain('RISK_SCAN_START_MS = 700')
    expect(heroAnimation).toContain('RISK_SCAN_INTERVAL_MS = 500')
    expect(heroAnimation).toContain('DISPOSAL_STEP_START_MS = 900')
    expect(heroAnimation).toContain('DISPOSAL_STEP_INTERVAL_MS = 800')
    expect(heroAnimation).toContain('DISPOSAL_DONE_DELAY_MS = 4100')
    expect(data).toContain('dmsHeroTitle')
    expect(data).toContain('dmsHeroTabs')
    expect(data).toContain('TX-20260811-042')
    expect(data).toContain('企业经营分析数据集')
    expect(data).toContain('敏感字段超范围')
    expect(data).toContain('EVT-20260811-017')
    expect(data).toContain('监管工单已创建')

    expect(architecture).toContain('ProductArchitectureSection')
    expect(architecture).toContain('title="构建数据要素流通全过程监管体系"')
    expect(architecture).toContain('fallback-text="数据要素监管体系架构图占位符"')
    expect(architecture).not.toContain('EnterpriseFlow')
    expect(architecture).not.toContain('<style')

    expect(intelligentRegulation).toContain('AlternatingTimelineSection')
    expect(intelligentRegulation).toContain('dmsTimelineItems')
    expect(intelligentRegulation).toContain('title="智能监管，全程守护"')
    expect(intelligentRegulation).not.toContain('BaseCard')
    expect(intelligentRegulation).not.toContain('IconBox')
    expect(intelligentRegulation).not.toContain('<style')

    expect(businessValue).toContain('ProductSystemSection')
    expect(businessValue).toContain('eyebrow="业务价值"')
    expect(businessValue).toContain('title="可量化的数据要素监管效能"')
    expect(businessValue).toContain('title-id="dms-business-value-title"')
    expect(businessValue).toContain('dmsValueItems')
    expect(businessValue).toContain('grid gap-5 md:grid-cols-2')
    expect(businessValue).toContain('group relative overflow-hidden rounded-2xl border border-default bg-default p-7 shadow-sm transition-shadow duration-500 hover:shadow-md lg:p-9')
    expect(businessValue).toContain('pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent')
    expect(businessValue).toContain('text-4xl font-bold tracking-tight text-primary lg:text-5xl')
    expect(businessValue).toContain('mt-4 text-sm leading-relaxed text-muted')
    expect(businessValue).toContain('mt-5 text-[13px] italic text-dimmed/60')
    expect(businessValue).toContain('item.detail')
    expect(businessValue).not.toContain('<style')

    expect(regulationProcess).toContain('ProductFeatureGridSection')
    expect(regulationProcess).toContain('ProductSystemFlowFrame')
    expect(regulationProcess).toContain('dmsProcessItems')
    expect(regulationProcess).toContain('columns="three"')
    expect(regulationProcess).toContain('<template #before>')
    expect(regulationProcess).toContain('fallback-text="数据要素监管流程图占位符"')
    expect(regulationProcess).not.toContain('<style')
    expect(featureGrid).toContain('<slot name="before" />')

    for (const text of [
      '数曜·数据要素监管平台',
      '数据流通不断扩大 监管能力亟需升级',
      '构建数据要素流通全过程监管体系',
      '要素全流程监管能力',
      '智能监管，全程守护',
      '可量化的数据要素监管效能',
      '事前预防 → 事中监控 → 事后处置 → 监管分析',
      '赋能多场景数据要素监管',
      '开启智能化数据要素监管',
    ]) {
      expect([page, hero, architecture, intelligentRegulation, businessValue, regulationProcess, data].join('\n')).toContain(text)
    }
  })
}
