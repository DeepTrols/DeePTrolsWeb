export function checkDmsProductContracts(ctx) {
  const { assert, dmsData, dmsPage, dmsHero, dmsHeroVisual, dmsHeroAnimation, dmsArchitecture, dmsIntelligentRegulation, dmsBusinessValue, dmsRegulationProcess } = ctx
assert(
  dmsPage.includes('SiteHeader') &&
    dmsPage.includes('SiteFooter') &&
    dmsPage.includes('DmsHero') &&
    dmsPage.includes('ProductFeatureGridSection') &&
    dmsPage.includes('DmsArchitecture') &&
    dmsPage.includes('DmsIntelligentRegulationSection') &&
    dmsPage.includes('DmsBusinessValueSection') &&
    dmsPage.includes('DmsRegulationProcessSection') &&
    dmsPage.includes('CtaSection') &&
    dmsPage.includes('id="dms-challenge"') &&
    dmsPage.includes('columns="three"') &&
    dmsPage.includes('columns="two"') &&
    dmsPage.includes('title-id="dms-cta-title"') &&
    !dmsPage.includes('<style'),
  'DMS page must compose the required product sections with global Header, Footer, feature grids, timeline, business value, process flow, and CtaSection.',
)
assert(
  dmsHero.includes('PageHero') &&
    dmsHero.includes('import { HardDrive }') &&
    dmsHero.includes('badge="数曜·数据要素监管平台"') &&
    dmsHero.includes('title-line="让数据流通安全、可信"') &&
    dmsHero.includes('title-gradient="全流程监管平台"') &&
    dmsHero.includes('visual-label="SHUYAODMS_HORE_WEBM"') &&
    dmsHero.includes('visual-size="large"') &&
    dmsHero.includes('DmsHeroVisual'),
  'DMS hero must follow the PageHero contract from DMS.md and Hero.md.',
)
assert(
  dmsHeroVisual.includes('dmsHeroTitle') &&
    dmsHeroVisual.includes('dmsHeroTabs') &&
    dmsHeroVisual.includes('dmsHeroIntakeFields') &&
    dmsHeroVisual.includes('dmsHeroRiskRules') &&
    dmsHeroVisual.includes('dmsHeroRiskSummary') &&
    dmsHeroVisual.includes('dmsHeroDisposalFields') &&
    dmsHeroVisual.includes('dmsHeroDisposalSteps') &&
    dmsHeroVisual.includes('useDmsHeroAnimation') &&
    dmsHeroVisual.includes('getProgressWidthClass') &&
    dmsHeroVisual.includes('relative h-[320px]') &&
    dmsHeroVisual.includes('flex gap-1.5 border-t border-muted px-5 py-3') &&
    !dmsHeroVisual.includes('<style') &&
    !dmsHeroVisual.includes('style='),
  'DMS hero visual must be a Tailwind-only 1:1 adaptation of the EMQX smart-data-hub window hero from Hero.md.',
)
assert(
  dmsHeroAnimation.includes('STAGE_DURATION_MS = 5000') &&
    dmsHeroAnimation.includes('PROGRESS_WIDTH_CLASSES') &&
    dmsHeroAnimation.includes('getProgressWidthClass') &&
    dmsHeroAnimation.includes('INTAKE_STEP_INTERVAL_MS = 800') &&
    dmsHeroAnimation.includes('RISK_SCAN_START_MS = 700') &&
    dmsHeroAnimation.includes('RISK_SCAN_INTERVAL_MS = 500') &&
    dmsHeroAnimation.includes('DISPOSAL_STEP_START_MS = 900') &&
    dmsHeroAnimation.includes('DISPOSAL_STEP_INTERVAL_MS = 800') &&
    dmsHeroAnimation.includes('DISPOSAL_DONE_DELAY_MS = 4100'),
  'useDmsHeroAnimation must keep the smart-data-hub 5s auto-cycle and the staged supervision phase timings.',
)
assert(
  dmsData.includes('dmsHeroTitle') &&
    dmsData.includes('dmsHeroTabs') &&
    dmsData.includes('流通接入') &&
    dmsData.includes('风险识别') &&
    dmsData.includes('监管处置') &&
    dmsData.includes('TX-20260811-042') &&
    dmsData.includes('企业经营分析数据集') &&
    dmsData.includes('敏感字段超范围') &&
    dmsData.includes('EVT-20260811-017') &&
    dmsData.includes('监管工单已创建') &&
    dmsData.includes('风险事件已进入处置流程，全程留痕可追溯'),
  'DMS hero data must carry the supervision event script from Hero.md.',
)
assert(
  dmsArchitecture.includes('ProductArchitectureSection') &&
    dmsArchitecture.includes('title="构建数据要素流通全过程监管体系"') &&
    dmsArchitecture.includes('fallback-text="数据要素监管体系架构图占位符"') &&
    !dmsArchitecture.includes('EnterpriseFlow') &&
    !dmsArchitecture.includes('<style'),
  'DMS architecture must reuse ProductArchitectureSection without a flow chart.',
)
assert(
  dmsIntelligentRegulation.includes('AlternatingTimelineSection') &&
    dmsIntelligentRegulation.includes('dmsTimelineItems') &&
    dmsIntelligentRegulation.includes('title="智能监管，全程守护"') &&
    !dmsIntelligentRegulation.includes('BaseCard') &&
    !dmsIntelligentRegulation.includes('IconBox') &&
    !dmsIntelligentRegulation.includes('<style'),
  'DMS intelligent regulation section must reuse the shared alternating timeline component.',
)
assert(
  dmsBusinessValue.includes('ProductSystemSection') &&
    dmsBusinessValue.includes('eyebrow="业务价值"') &&
    dmsBusinessValue.includes('title="可量化的数据要素监管效能"') &&
    dmsBusinessValue.includes('title-id="dms-business-value-title"') &&
    dmsBusinessValue.includes('dmsValueItems') &&
    dmsBusinessValue.includes('grid gap-5 md:grid-cols-2') &&
    dmsBusinessValue.includes('group relative overflow-hidden rounded-2xl border border-default bg-default p-7 shadow-sm transition-shadow duration-500 hover:shadow-md lg:p-9') &&
    dmsBusinessValue.includes('pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent') &&
    dmsBusinessValue.includes('text-4xl font-bold tracking-tight text-primary lg:text-5xl') &&
    dmsBusinessValue.includes('mt-4 text-sm leading-relaxed text-muted') &&
    dmsBusinessValue.includes('mt-5 text-[13px] italic text-dimmed/60') &&
    dmsBusinessValue.includes('item.detail') &&
    !dmsBusinessValue.includes('<style'),
  'DMS business value section must reuse ProductSystemSection and reproduce the EMQX product business-value cards 1:1 with Tailwind-only markup.',
)
assert(
  dmsRegulationProcess.includes('ProductFeatureGridSection') &&
    dmsRegulationProcess.includes('ProductSystemFlowFrame') &&
    dmsRegulationProcess.includes('dmsProcessItems') &&
    dmsRegulationProcess.includes('<template #before>') &&
    dmsRegulationProcess.includes('fallback-text="数据要素监管流程图占位符"') &&
    !dmsRegulationProcess.includes('<style'),
  'DMS regulation process must compose ProductFeatureGridSection with ProductSystemFlowFrame through the before slot.',
)
const dmsSources = [dmsData, dmsPage, dmsHero, dmsArchitecture, dmsIntelligentRegulation, dmsBusinessValue, dmsRegulationProcess].join('\n')
for (const text of [
  '数曜·数据要素监管平台',
  '让数据流通安全、可信',
  '全流程监管平台',
  '数据流通不断扩大 监管能力亟需升级',
  '构建数据要素流通全过程监管体系',
  '要素全流程监管能力',
  '智能监管，全程守护',
  '可量化的数据要素监管效能',
  '事前预防 → 事中监控 → 事后处置 → 监管分析',
  '赋能多场景数据要素监管',
  '开启智能化数据要素监管',
]) {
  assert(dmsSources.includes(text), `DMS requirement text is missing: ${text}`)
}
for (const text of [
  '风险发现滞后',
  '实时风险监测',
  '统一监管规则',
  '100%',
  '监管规则配置',
  '数据交易平台',
  '数据运营机构',
]) {
  assert(dmsData.includes(text), `DMS configured content is missing: ${text}`)
}
}
