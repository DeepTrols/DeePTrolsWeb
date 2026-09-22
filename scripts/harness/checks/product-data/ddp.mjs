export function checkDdpProductContracts(ctx) {
  const { assert, pageHero, ddpData, ddpPage, ddpHero, ddpHeroVisual, ddpHeroSql, ddpHeroAnimation, ddpFlowCanvas, ddpFlowNode, ddpArchitecture, ddpTimeline, ddpUnifiedDevelopment, ddpCapabilityVisual, ddpCapabilityIntegrationVisual, ddpCapabilityDevelopmentVisual, ddpCapabilityOrchestrationVisual, ddpCapabilityDeliveryVisual } = ctx
assert(
  ddpPage.includes('SiteHeader') &&
    ddpPage.includes('SiteFooter') &&
    ddpPage.includes('DdpHero') &&
    ddpPage.includes('ProductFeatureGridSection') &&
    ddpPage.includes('DdpArchitecture') &&
    ddpPage.includes('DdpCapabilityTimelineSection') &&
    ddpPage.includes('DdpUnifiedDevelopmentSection') &&
    ddpPage.includes('CtaSection') &&
    ddpPage.includes('id="ddp-challenge"') &&
    ddpPage.includes('columns="two"') &&
    ddpPage.includes('columns="three"') &&
    ddpPage.includes('title-id="ddp-cta-title"') &&
    !ddpPage.includes('<style'),
  'DDP page must compose the required product sections with global Header, Footer, feature grids, timeline, unified development, and CtaSection.',
)
assert(
  ddpHero.includes('PageHero') &&
    ddpHero.includes('background-image-src="/images/products/product-hero-bg.png"') &&
    ddpHero.includes('import { Network }') &&
    ddpHero.includes('badge="数曜·数据开发平台"') &&
    ddpHero.includes('title-line="标准、智能、高效"') &&
    ddpHero.includes('title-gradient="数据开发平台"') &&
    ddpHero.includes('visual-label="SHUYAODDP_HORE_WEBM"') &&
    ddpHero.includes('class="min-h-[655px]"') &&
    ddpHero.includes('DdpHeroVisual') &&
    ddpHero.includes('visual-size="fluid"') &&
    !ddpHero.includes('visual-size="large"'),
  'DDP hero must follow the PageHero contract from DDP.md.',
)
assert(
  pageHero.includes("visualSize?: 'default' | 'large' | 'fluid'") &&
    pageHero.includes('lg:flex-row lg:items-center lg:justify-between') &&
    pageHero.includes('max-w-lg xl:max-w-xl 2xl:max-w-2xl'),
  'PageHero fluid visual size must reproduce the EMQX data-processing responsive hero visual width.',
)
assert(
  ddpHeroVisual.includes('SQL 开发') &&
    ddpHeroVisual.includes('可视化编排') &&
    ddpHeroVisual.includes('h-[368px]') &&
    ddpHeroVisual.includes('<ClientOnly>') &&
    ddpHeroVisual.includes('DdpFlowCanvas') &&
    ddpHeroVisual.includes('useDdpHeroAnimation') &&
    !ddpHeroVisual.includes('图片占位符') &&
    !ddpHeroVisual.includes('<style'),
  'DDP hero visual must reproduce the EMQX data-processing window card with SQL/flow tabs.',
)
assert(
  ddpHeroSql.includes("text: 'INSERT OVERWRITE TABLE '") &&
    ddpHeroSql.includes("text: 'dws_user_order_summary'") &&
    ddpHeroSql.includes("text: 'PARTITION '") &&
    ddpHeroSql.includes('${bizdate}') &&
    ddpHeroSql.includes("text: 'GROUP BY '") &&
    ddpHeroSql.includes("text: 'dwd_order_detail '") &&
    ddpHeroSql.includes("text: 'dim_user_info '") &&
    ddpHeroSql.includes('text-emerald-600 dark:text-emerald-400') &&
    ddpHeroSql.includes('top-[352px]'),
  'DDP hero SQL must use the Hero.md warehouse script with the original token palette.',
)
assert(
  ddpHeroAnimation.includes('LINE_REVEAL_INTERVAL_MS = 300') &&
    ddpHeroAnimation.includes('TAB_SWITCH_INTERVAL_MS = 5000'),
  'DDP hero animation must keep the original 300ms line reveal and 5s tab rotation.',
)
assert(
  ddpFlowCanvas.includes('@vue-flow/core') &&
    ddpFlowCanvas.includes('DWD Detail') &&
    ddpFlowCanvas.includes('Data Transform') &&
    ddpFlowCanvas.includes('DIM Join') &&
    ddpFlowCanvas.includes('DWS Summary') &&
    ddpFlowCanvas.includes('ADS Application') &&
    ddpFlowCanvas.includes('x: 560') &&
    ddpFlowCanvas.includes('fit-view-on-init'),
  'DDP flow canvas must keep the original node layout with warehouse-layer content.',
)
assert(
  ddpFlowNode.includes('bg-emerald-500') &&
    ddpFlowNode.includes('bg-indigo-500') &&
    ddpFlowNode.includes('bg-purple-500') &&
    ddpFlowNode.includes('min-w-[190px]') &&
    !ddpFlowNode.includes('<style'),
  'DDP flow node must keep the original card markup and tone stripe palette.',
)
assert(
  ddpArchitecture.includes('ProductArchitectureSection') &&
    ddpArchitecture.includes('title="构建智能数据开发体系"') &&
    ddpArchitecture.includes('SmartDataHubFlow') &&
    ddpArchitecture.includes('<ClientOnly>') &&
    ddpArchitecture.includes('h-[560px] w-[1704px]') &&
    ddpArchitecture.includes('class="max-lg:hidden"') &&
    ddpArchitecture.includes('w-full overflow-hidden @container') &&
    ddpArchitecture.includes('scale-[min(1,calc(100cqw/1704px))]') &&
    ddpArchitecture.includes('-translate-x-1/2 -translate-y-1/2') &&
    ddpArchitecture.includes('fallback-text="数据开发体系架构图加载中"') &&
    !ddpArchitecture.includes('EnterpriseFlow') &&
    !ddpArchitecture.includes('<style'),
  'DDP architecture must reuse ProductArchitectureSection with the centered Smart Data Hub flow.',
)
assert(
  ddpTimeline.includes('AlternatingTimelineSection') &&
    ddpTimeline.includes('ddpTimelineItems') &&
    ddpTimeline.includes('title="覆盖数据开发全生命周期"') &&
    ddpTimeline.includes('<template #visual="{ index }">') &&
    ddpTimeline.includes('DdpCapabilityVisual') &&
    ddpTimeline.includes('transparent-visual') &&
    !ddpTimeline.includes('BaseCard') &&
    !ddpTimeline.includes('IconBox') &&
    !ddpTimeline.includes('<style'),
  'DDP core capability timeline must reuse the shared alternating timeline and inject capability visuals through the visual slot.',
)
assert(
  ddpCapabilityVisual.includes('DdpDataIntegrationVisual') &&
    ddpCapabilityVisual.includes('DdpDataDevelopmentVisual') &&
    ddpCapabilityVisual.includes('DdpTaskOrchestrationVisual') &&
    ddpCapabilityVisual.includes('DdpContinuousDeliveryVisual') &&
    ddpCapabilityVisual.includes('defineProps<{ index: number }>()'),
  'DDP capability visual dispatcher must map the four timeline indexes to the four capability animations.',
)
assert(
  ddpCapabilityIntegrationVisual.includes('useRuntimeTimeline') &&
    ddpCapabilityIntegrationVisual.includes('多源数据接入') &&
    ddpCapabilityIntegrationVisual.includes('连接配置') &&
    ddpCapabilityIntegrationVisual.includes('统一目录') &&
    ddpCapabilityIntegrationVisual.includes('border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)]') &&
    ddpCapabilityIntegrationVisual.includes('flex items-center border-b border-muted px-4 py-3') &&
    ddpCapabilityIntegrationVisual.includes('bg-red-500/70') &&
    !ddpCapabilityIntegrationVisual.includes('<style') &&
    !ddpCapabilityIntegrationVisual.includes('style='),
  'DDP data integration visual must animate multi-source connectors syncing into a unified catalog.',
)
assert(
  ddpCapabilityDevelopmentVisual.includes('useRuntimeTimeline') &&
    ddpCapabilityDevelopmentVisual.includes('统一开发工作台') &&
    ddpCapabilityDevelopmentVisual.includes('低代码') &&
    ddpCapabilityDevelopmentVisual.includes('task_customer_value.sql') &&
    ddpCapabilityDevelopmentVisual.includes('语法校验') &&
    ddpCapabilityDevelopmentVisual.includes('border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)]') &&
    ddpCapabilityDevelopmentVisual.includes('flex items-center border-b border-muted px-4 py-3') &&
    ddpCapabilityDevelopmentVisual.includes('bg-red-500/70') &&
    !ddpCapabilityDevelopmentVisual.includes('<style') &&
    !ddpCapabilityDevelopmentVisual.includes('style='),
  'DDP data development visual must animate the dual-mode SQL workspace with staged validation and run.',
)
assert(
  ddpCapabilityOrchestrationVisual.includes('useRuntimeTimeline') &&
    ddpCapabilityOrchestrationVisual.includes('getRuntimeBarWidthClass') &&
    ddpCapabilityOrchestrationVisual.includes('智能任务编排') &&
    ddpCapabilityOrchestrationVisual.includes('数据抽取') &&
    ddpCapabilityOrchestrationVisual.includes('计算资源分配') &&
    ddpCapabilityOrchestrationVisual.includes('资源优化') &&
    ddpCapabilityOrchestrationVisual.includes('border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)]') &&
    ddpCapabilityOrchestrationVisual.includes('flex items-center border-b border-muted px-4 py-3') &&
    ddpCapabilityOrchestrationVisual.includes('bg-red-500/70') &&
    !ddpCapabilityOrchestrationVisual.includes('<style') &&
    !ddpCapabilityOrchestrationVisual.includes('style='),
  'DDP task orchestration visual must animate the DAG dependency chain with dynamic resource allocation.',
)
assert(
  ddpCapabilityDeliveryVisual.includes('useRuntimeTimeline') &&
    ddpCapabilityDeliveryVisual.includes('持续交付流水线') &&
    ddpCapabilityDeliveryVisual.includes('v2.3.0 已发布') &&
    ddpCapabilityDeliveryVisual.includes('质量门禁') &&
    ddpCapabilityDeliveryVisual.includes('运行监控') &&
    ddpCapabilityDeliveryVisual.includes('border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)]') &&
    ddpCapabilityDeliveryVisual.includes('flex items-center border-b border-muted px-4 py-3') &&
    ddpCapabilityDeliveryVisual.includes('bg-red-500/70') &&
    !ddpCapabilityDeliveryVisual.includes('<style') &&
    !ddpCapabilityDeliveryVisual.includes('style='),
  'DDP continuous delivery visual must animate the develop-test-release-monitor pipeline with quality gates.',
)
assert(
  ddpUnifiedDevelopment.includes('ProductFeatureGridSection') &&
    ddpUnifiedDevelopment.includes('ProductSystemFlowFrame') &&
    ddpUnifiedDevelopment.includes('title="统一数据开发：从接入到交付"') &&
    ddpUnifiedDevelopment.includes('ddpUnifiedDevelopmentItems') &&
    ddpUnifiedDevelopment.includes('DdpUnifiedDevelopmentFlow') &&
    ddpUnifiedDevelopment.includes('<ClientOnly>') &&
    ddpUnifiedDevelopment.includes('h-[560px] w-[1704px]') &&
    ddpUnifiedDevelopment.includes('mt-12 max-lg:hidden lg:mt-16') &&
    ddpUnifiedDevelopment.includes('w-full overflow-hidden @container') &&
    ddpUnifiedDevelopment.includes('scale-[min(1,calc(100cqw/1704px))]') &&
    ddpUnifiedDevelopment.includes('-translate-x-1/2 -translate-y-1/2') &&
    ddpUnifiedDevelopment.includes(':viewport-y="16"') &&
    ddpUnifiedDevelopment.includes('label="统一数据开发流程图"') &&
    ddpUnifiedDevelopment.includes('fallback-text="统一数据开发流程图加载中"') &&
    !ddpUnifiedDevelopment.includes('占位符') &&
    !ddpUnifiedDevelopment.includes('<style'),
  'DDP unified development section must compose ProductFeatureGridSection with the centered unified development flow inside ProductSystemFlowFrame through the after slot.',
)
const ddpSources = [ddpData, ddpPage, ddpHero, ddpArchitecture, ddpTimeline, ddpUnifiedDevelopment].join('\n')
for (const text of [
  '数曜·数据开发平台',
  '标准、智能、高效',
  '数据开发平台',
  '数据开发，正在成为企业增长瓶颈',
  '构建智能数据开发体系',
  '持续释放企业数据生产力',
  '覆盖数据开发全生命周期',
  '统一数据开发：从接入到交付',
  '赋能企业数据工程实践',
]) {
  assert(ddpSources.includes(text), `DDP requirement text is missing: ${text}`)
}
for (const text of [
  '数据孤岛难破除',
  '更快的实施数据集成',
  '多源数据统一接入',
  '持续集成与敏捷交付',
  '企业数据中台',
  'AI 数据底座',
]) {
  assert(ddpData.includes(text), `DDP configured content is missing: ${text}`)
}
}
