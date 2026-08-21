export function checkDdpProductContracts(ctx) {
  const { assert, pageHero, ddpData, ddpPage, ddpHero, ddpHeroVisual, ddpHeroSql, ddpHeroAnimation, ddpFlowCanvas, ddpFlowNode, ddpArchitecture, ddpTimeline, ddpUnifiedDevelopment } = ctx
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
    ddpHero.includes('import { Network }') &&
    ddpHero.includes('badge="数曜·数据开发平台"') &&
    ddpHero.includes('title-line="标准、智能、高效"') &&
    ddpHero.includes('title-gradient="数据开发平台"') &&
    ddpHero.includes('visual-label="SHUYAODDP_HORE_WEBM"') &&
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
    ddpArchitecture.includes('fallback-text="数据开发体系架构图占位符"') &&
    !ddpArchitecture.includes('EnterpriseFlow') &&
    !ddpArchitecture.includes('<style'),
  'DDP architecture must reuse ProductArchitectureSection without a flow chart.',
)
assert(
  ddpTimeline.includes('AlternatingTimelineSection') &&
    ddpTimeline.includes('ddpTimelineItems') &&
    ddpTimeline.includes('title="覆盖数据开发全生命周期"') &&
    !ddpTimeline.includes('BaseCard') &&
    !ddpTimeline.includes('IconBox') &&
    !ddpTimeline.includes('<style'),
  'DDP core capability timeline must reuse the shared alternating timeline component.',
)
assert(
  ddpUnifiedDevelopment.includes('ProductFeatureGridSection') &&
    ddpUnifiedDevelopment.includes('ProductSystemFlowFrame') &&
    ddpUnifiedDevelopment.includes('title="统一数据开发：从接入到交付"') &&
    ddpUnifiedDevelopment.includes('ddpUnifiedDevelopmentItems') &&
    ddpUnifiedDevelopment.includes('fallback-text="统一数据开发流程图占位符"') &&
    !ddpUnifiedDevelopment.includes('<style'),
  'DDP unified development section must compose ProductFeatureGridSection with ProductSystemFlowFrame through the after slot.',
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
  '开启企业数据治理新征程',
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
