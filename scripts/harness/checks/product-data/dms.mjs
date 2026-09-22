export function checkDmsProductContracts(ctx) {
  const { assert, dmsData, dmsPage, dmsHero, dmsHeroVisual, dmsHeroAnimation, dmsArchitecture, dmsIntelligentRegulation, dmsCapabilityVisual, dmsRuleCenterVisual, dmsEventMonitorVisual, dmsWorkOrderVisual, dmsCockpitVisual, dmsLifecycleVisual, dmsBusinessValue, dmsRegulationProcess, dmsRegulationProcessFlow } = ctx
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
    dmsHero.includes('background-image-src="/images/products/product-hero-bg.png"') &&
    dmsHero.includes('import { HardDrive }') &&
    dmsHero.includes('badge="数曜·数据要素监管平台"') &&
    dmsHero.includes('title-line="让数据流通安全、可信"') &&
    dmsHero.includes('title-gradient="全流程监管平台"') &&
    dmsHero.includes('visual-label="SHUYAODMS_HORE_WEBM"') &&
    dmsHero.includes('class="min-h-[655px]"') &&
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
    dmsArchitecture.includes('RegulationArchitectureFlow') &&
    dmsArchitecture.includes('class="max-lg:hidden"') &&
    dmsArchitecture.includes('w-full overflow-hidden @container') &&
    dmsArchitecture.includes('scale-[min(1,calc(100cqw/1704px))]') &&
    dmsArchitecture.includes('-translate-x-1/2') &&
    dmsArchitecture.includes('-translate-y-1/2') &&
    !dmsArchitecture.includes('EnterpriseFlow') &&
    !dmsArchitecture.includes('<style'),
  'DMS architecture must reuse ProductArchitectureSection and center the regulation Vue Flow inside the shared grid frame.',
)
assert(
  dmsIntelligentRegulation.includes('AlternatingTimelineSection') &&
    dmsIntelligentRegulation.includes('dmsTimelineItems') &&
    dmsIntelligentRegulation.includes('title="智能监管，全程守护"') &&
    dmsIntelligentRegulation.includes('<template #visual="{ index }">') &&
    dmsIntelligentRegulation.includes('DmsCapabilityVisual') &&
    dmsIntelligentRegulation.includes('transparent-visual') &&
    !dmsIntelligentRegulation.includes('BaseCard') &&
    !dmsIntelligentRegulation.includes('IconBox') &&
    !dmsIntelligentRegulation.includes('<style'),
  'DMS intelligent regulation section must reuse the shared alternating timeline and inject capability visuals through the visual slot.',
)
assert(
  dmsCapabilityVisual.includes('DmsRuleCenterVisual') &&
    dmsCapabilityVisual.includes('DmsEventMonitorVisual') &&
    dmsCapabilityVisual.includes('DmsWorkOrderVisual') &&
    dmsCapabilityVisual.includes('DmsCockpitVisual') &&
    dmsCapabilityVisual.includes('DmsLifecycleVisual') &&
    dmsCapabilityVisual.includes('defineProps<{ index: number }>()'),
  'DMS capability visual dispatcher must map the five timeline indexes to the five regulation animations.',
)
assert(
  dmsRuleCenterVisual.includes('useRuntimeTimeline') &&
    dmsRuleCenterVisual.includes('监管规则中心') &&
    dmsRuleCenterVisual.includes('数据主体准入校验') &&
    dmsRuleCenterVisual.includes('发布启用') &&
    dmsRuleCenterVisual.includes('border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)]') &&
    dmsRuleCenterVisual.includes('flex items-center border-b border-muted px-4 py-3') &&
    dmsRuleCenterVisual.includes('bg-red-500/70') &&
    !dmsRuleCenterVisual.includes('<style') &&
    !dmsRuleCenterVisual.includes('style='),
  'DMS rule center visual must animate graded rule configuration with the traffic-light titlebar.',
)
assert(
  dmsEventMonitorVisual.includes('useRuntimeTimeline') &&
    dmsEventMonitorVisual.includes('实时风险监测') &&
    dmsEventMonitorVisual.includes('异常交易行为') &&
    dmsEventMonitorVisual.includes('收敛去重') &&
    dmsEventMonitorVisual.includes('border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)]') &&
    dmsEventMonitorVisual.includes('flex items-center border-b border-muted px-4 py-3') &&
    dmsEventMonitorVisual.includes('bg-red-500/70') &&
    !dmsEventMonitorVisual.includes('<style') &&
    !dmsEventMonitorVisual.includes('style='),
  'DMS event monitor visual must animate realtime risk detection with event convergence.',
)
assert(
  dmsWorkOrderVisual.includes('useRuntimeTimeline') &&
    dmsWorkOrderVisual.includes('智能工单闭环') &&
    dmsWorkOrderVisual.includes('WO-20260921-017') &&
    dmsWorkOrderVisual.includes('审计留痕') &&
    dmsWorkOrderVisual.includes('border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)]') &&
    dmsWorkOrderVisual.includes('flex items-center border-b border-muted px-4 py-3') &&
    dmsWorkOrderVisual.includes('bg-red-500/70') &&
    !dmsWorkOrderVisual.includes('<style') &&
    !dmsWorkOrderVisual.includes('style='),
  'DMS work order visual must animate the event-to-workorder closed loop with multi-role assignment.',
)
assert(
  dmsCockpitVisual.includes('useRuntimeTimeline') &&
    dmsCockpitVisual.includes('getRuntimeBarWidthClass') &&
    dmsCockpitVisual.includes('可视化监管驾驶舱') &&
    dmsCockpitVisual.includes('规则运行') &&
    dmsCockpitVisual.includes('决策支撑') &&
    dmsCockpitVisual.includes('border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)]') &&
    dmsCockpitVisual.includes('flex items-center border-b border-muted px-4 py-3') &&
    dmsCockpitVisual.includes('bg-red-500/70') &&
    !dmsCockpitVisual.includes('<style') &&
    !dmsCockpitVisual.includes('style='),
  'DMS cockpit visual must animate the supervision dashboard metrics with progress bars.',
)
assert(
  dmsLifecycleVisual.includes('useRuntimeTimeline') &&
    dmsLifecycleVisual.includes('全流程监管体系') &&
    dmsLifecycleVisual.includes('事前预防') &&
    dmsLifecycleVisual.includes('全程追溯') &&
    dmsLifecycleVisual.includes('border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)]') &&
    dmsLifecycleVisual.includes('flex items-center border-b border-muted px-4 py-3') &&
    dmsLifecycleVisual.includes('bg-red-500/70') &&
    !dmsLifecycleVisual.includes('<style') &&
    !dmsLifecycleVisual.includes('style='),
  'DMS lifecycle visual must animate the pre/during/post supervision stages with trace archiving.',
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
    dmsRegulationProcess.includes('label="数据要素监管流程图"') &&
    dmsRegulationProcess.includes('fallback-text="数据要素监管流程图加载中"') &&
    dmsRegulationProcess.includes('DmsRegulationProcessFlow') &&
    dmsRegulationProcess.includes('<ClientOnly>') &&
    dmsRegulationProcess.includes('class="mb-12 max-lg:hidden lg:mb-16"') &&
    dmsRegulationProcess.includes('h-[560px] w-[1704px]') &&
    dmsRegulationProcess.includes('w-full overflow-hidden @container') &&
    dmsRegulationProcess.includes('scale-[min(1,calc(100cqw/1704px))]') &&
    dmsRegulationProcess.includes('-translate-x-1/2 -translate-y-1/2') &&
    !dmsRegulationProcess.includes(':grid="false"') &&
    !dmsRegulationProcess.includes('占位') &&
    !dmsRegulationProcess.includes('<style'),
  'DMS regulation process must embed the regulation process flow with the scale-to-fit recipe through the before slot.',
)
assert(
  dmsRegulationProcessFlow.includes("type: 'dmsRegulationProcessCurve'") &&
    dmsRegulationProcessFlow.includes("type: 'dmsRegulationProcessReturn'") &&
    dmsRegulationProcessFlow.includes('viewportY: 60') &&
    dmsRegulationProcessFlow.includes('事前预防') &&
    dmsRegulationProcessFlow.includes('事中监控') &&
    dmsRegulationProcessFlow.includes('事后处置') &&
    dmsRegulationProcessFlow.includes('监管分析') &&
    dmsRegulationProcessFlow.includes('规则持续优化') &&
    dmsRegulationProcessFlow.includes("sourceHandle: 'loop'") &&
    dmsRegulationProcessFlow.includes("targetHandle: 'loop'") &&
    !dmsRegulationProcessFlow.includes('<style'),
  'DMS regulation process flow must compose the four-stage pipeline with the bottom return loop on the 1704px canvas.',
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
