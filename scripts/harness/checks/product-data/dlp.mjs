export function checkDlpProductContracts(ctx) {
  const { assert, read, dlpData, dlpPage, dlpHero, dlpHeroVisual, dlpHeroSql, dlpArchitecture, dlpTimeline, dlpAiModeling, dlpCapabilityVisual, dlpCapabilityModelingVisual, dlpCapabilityProductionVisual, dlpCapabilityGovernanceVisual, dlpCapabilityServiceVisual, dlpCapabilityScenarioVisual } = ctx
const dlpAiModelingVisual = read('components/product/dlp/DlpAiModelingVisual.vue')
assert(
  dlpPage.includes('SiteHeader') &&
    dlpPage.includes('SiteFooter') &&
    dlpPage.includes('DlpHero') &&
    dlpPage.includes('ProductFeatureGridSection') &&
    dlpPage.includes('DlpArchitecture') &&
    dlpPage.includes('DlpCapabilityTimelineSection') &&
    dlpPage.includes('DlpAiModelingSection') &&
    dlpPage.includes('CtaSection') &&
    dlpPage.includes('id="dlp-challenge"') &&
    dlpPage.includes('columns="two"') &&
    dlpPage.includes('columns="three"') &&
    !dlpPage.includes('<style'),
  'DLP page must compose the required product sections with global Header, Footer, feature grids, timeline, AI assist, and CtaSection.',
)
assert(
  dlpHero.includes('PageHero') &&
    dlpHero.includes('background-image-src="/images/products/product-hero-bg.png"') &&
    dlpHero.includes('import { Boxes }') &&
    dlpHero.includes('badge="数曜·数据标签平台"') &&
    dlpHero.includes('title-line="协同、智能、高效"') &&
    dlpHero.includes('title-gradient="标签生产平台"') &&
    dlpHero.includes('visual-label="SHUYAODGP_HORE_WEBM"') &&
    dlpHero.includes('class="min-h-[655px]"') &&
    dlpHero.includes('DlpHeroVisual') &&
    dlpHero.includes('visual-size="large"'),
  'DLP hero must follow the PageHero contract from DLP.md with the same large visual width as DGP.',
)
assert(
  dlpHeroVisual.includes('数曜·数据标签平台') &&
    dlpHeroVisual.includes('标签生成') &&
    dlpHeroVisual.includes('标签查询') &&
    dlpHeroVisual.includes('实时标签生成') &&
    dlpHeroVisual.includes('tag_results') &&
    dlpHeroVisual.includes('h-[475px]') &&
    dlpHeroVisual.includes('grid-cols-4') &&
    dlpHeroVisual.includes('正在生成标签...') &&
    dlpHeroVisual.includes('标签已生成，可直接查询、分析与服务调用。') &&
    dlpHeroVisual.includes('标签实时查询') &&
    dlpHeroVisual.includes('主体画像') &&
    dlpHeroVisual.includes('查询标签') &&
    dlpHeroVisual.includes('正在查询标签...') &&
    dlpHeroVisual.includes('已找到 3 个标签，可用于分析、分群与服务调用。') &&
    dlpHeroVisual.includes('animate-glow') &&
    dlpHeroVisual.includes('dlpHeroFeatures') &&
    dlpHeroVisual.includes('dlpHeroTagResults') &&
    dlpHeroVisual.includes('dlpHeroQueryResults') &&
    !dlpHeroVisual.includes('BaseTabs') &&
    !dlpHeroVisual.includes('DlpTagGenerationPanel') &&
    !dlpHeroVisual.includes('DlpTagQueryPanel') &&
    !dlpHeroVisual.includes('图片占位符') &&
    !dlpHeroVisual.includes('style='),
  'DLP hero visual must be a single-component 1:1 adaptation of the EMQX Tables hero animation from Hero.md.',
)
assert(
  dlpHeroSql.includes('tag_results') &&
    dlpHeroSql.includes("customer_id = 'A1024'") &&
    dlpHeroSql.includes('tokenizeSql') &&
    dlpHeroSql.includes('dlpSqlTokenClasses'),
  'DLP hero SQL helper must provide the tag query statement and syntax tokens from Hero.md.',
)
assert(
  read('assets/css/tailwind.css').includes('--animate-glow') &&
    read('assets/css/tailwind.css').includes('@keyframes glow'),
  'Tailwind theme must define the animate-glow keyframes used by the DLP hero query button.',
)
assert(
  dlpArchitecture.includes('ProductArchitectureSection') &&
    dlpArchitecture.includes('TagPlatformArchitectureFlow') &&
    dlpArchitecture.includes('class="max-lg:hidden"') &&
    dlpArchitecture.includes('w-full overflow-hidden @container') &&
    dlpArchitecture.includes('scale-[min(1,calc(100cqw/1704px))]') &&
    dlpArchitecture.includes('-translate-x-1/2') &&
    dlpArchitecture.includes('-translate-y-1/2') &&
    !dlpArchitecture.includes('EnterpriseFlow') &&
    !dlpArchitecture.includes('<style'),
  'DLP architecture must reuse ProductArchitectureSection and center the tag platform Vue Flow inside the shared grid frame.',
)
assert(
  dlpTimeline.includes('AlternatingTimelineSection') &&
    !dlpTimeline.includes('BaseCard') &&
    !dlpTimeline.includes('IconBox') &&
    dlpTimeline.includes('dlpTimelineItems') &&
    dlpTimeline.includes('<template #visual="{ index }">') &&
    dlpTimeline.includes('DlpCapabilityVisual') &&
    dlpTimeline.includes('transparent-visual') &&
    !dlpTimeline.includes('item.icon') &&
    !dlpTimeline.includes('eyebrow-size="sm"') &&
    !dlpTimeline.includes('eyebrow-tone="primary"') &&
    !dlpTimeline.includes('<style'),
  'DLP core capability timeline must reuse the shared alternating timeline and inject capability visuals through the visual slot.',
)
assert(
  dlpCapabilityVisual.includes('DlpTagModelingVisual') &&
    dlpCapabilityVisual.includes('DlpTagProductionVisual') &&
    dlpCapabilityVisual.includes('DlpTagGovernanceVisual') &&
    dlpCapabilityVisual.includes('DlpTagServiceVisual') &&
    dlpCapabilityVisual.includes('DlpScenarioApplyVisual') &&
    dlpCapabilityVisual.includes('defineProps<{ index: number }>()'),
  'DLP capability visual dispatcher must map the five timeline indexes to the five capability animations.',
)
assert(
  dlpCapabilityModelingVisual.includes('useRuntimeTimeline') &&
    dlpCapabilityModelingVisual.includes('标签模型设计') &&
    dlpCapabilityModelingVisual.includes('customer/visit_count') &&
    dlpCapabilityModelingVisual.includes('目录规划') &&
    dlpCapabilityModelingVisual.includes('模型发布') &&
    dlpCapabilityModelingVisual.includes('border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)]') &&
    dlpCapabilityModelingVisual.includes('flex items-center border-b border-muted px-4 py-3') &&
    dlpCapabilityModelingVisual.includes('bg-red-500/70') &&
    !dlpCapabilityModelingVisual.includes('<style') &&
    !dlpCapabilityModelingVisual.includes('style='),
  'DLP tag modeling visual must animate the standardized tag modeling flow with the shared runtime timeline.',
)
assert(
  dlpCapabilityProductionVisual.includes('useRuntimeTimeline') &&
    dlpCapabilityProductionVisual.includes('getRuntimeBarWidthClass') &&
    dlpCapabilityProductionVisual.includes('标签生产任务') &&
    dlpCapabilityProductionVisual.includes('用户活跃标签') &&
    dlpCapabilityProductionVisual.includes('规则配置') &&
    dlpCapabilityProductionVisual.includes('实时更新') &&
    dlpCapabilityProductionVisual.includes('border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)]') &&
    dlpCapabilityProductionVisual.includes('flex items-center border-b border-muted px-4 py-3') &&
    dlpCapabilityProductionVisual.includes('bg-red-500/70') &&
    !dlpCapabilityProductionVisual.includes('<style') &&
    !dlpCapabilityProductionVisual.includes('style='),
  'DLP tag production visual must animate offline/realtime tag production with progress bars.',
)
assert(
  dlpCapabilityGovernanceVisual.includes('useRuntimeTimeline') &&
    dlpCapabilityGovernanceVisual.includes('标签治理看板') &&
    dlpCapabilityGovernanceVisual.includes('标签血缘') &&
    dlpCapabilityGovernanceVisual.includes('版本记录') &&
    dlpCapabilityGovernanceVisual.includes('生命周期') &&
    dlpCapabilityGovernanceVisual.includes('border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)]') &&
    dlpCapabilityGovernanceVisual.includes('flex items-center border-b border-muted px-4 py-3') &&
    dlpCapabilityGovernanceVisual.includes('bg-red-500/70') &&
    !dlpCapabilityGovernanceVisual.includes('<style') &&
    !dlpCapabilityGovernanceVisual.includes('style='),
  'DLP tag governance visual must animate lineage, version, and quality governance.',
)
assert(
  dlpCapabilityServiceVisual.includes('useRuntimeTimeline') &&
    dlpCapabilityServiceVisual.includes('标签服务中心') &&
    dlpCapabilityServiceVisual.includes('统一服务网关') &&
    dlpCapabilityServiceVisual.includes('API 查询') &&
    dlpCapabilityServiceVisual.includes('人群圈选') &&
    dlpCapabilityServiceVisual.includes('调用监控') &&
    dlpCapabilityServiceVisual.includes('border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)]') &&
    dlpCapabilityServiceVisual.includes('flex items-center border-b border-muted px-4 py-3') &&
    dlpCapabilityServiceVisual.includes('bg-red-500/70') &&
    !dlpCapabilityServiceVisual.includes('<style') &&
    !dlpCapabilityServiceVisual.includes('style='),
  'DLP tag service visual must animate tag aggregation through the unified service gateway to three service outputs.',
)
assert(
  dlpCapabilityScenarioVisual.includes('useRuntimeTimeline') &&
    dlpCapabilityScenarioVisual.includes('标签场景应用') &&
    dlpCapabilityScenarioVisual.includes('用户画像') &&
    dlpCapabilityScenarioVisual.includes('精准营销') &&
    dlpCapabilityScenarioVisual.includes('风险识别') &&
    dlpCapabilityScenarioVisual.includes('AI 模型') &&
    dlpCapabilityScenarioVisual.includes('效果回流') &&
    dlpCapabilityScenarioVisual.includes('border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)]') &&
    dlpCapabilityScenarioVisual.includes('flex items-center border-b border-muted px-4 py-3') &&
    dlpCapabilityScenarioVisual.includes('bg-red-500/70') &&
    !dlpCapabilityScenarioVisual.includes('<style') &&
    !dlpCapabilityScenarioVisual.includes('style='),
  'DLP scenario apply visual must animate the four business/AI scenarios lighting up with audience growth.',
)
assert(
  dlpAiModeling.includes('SectionHeader') &&
    dlpAiModeling.includes('AI 辅助建标') &&
    dlpAiModeling.includes('DlpAiModelingVisual') &&
    !dlpAiModeling.includes('图片占位符') &&
    !dlpAiModeling.includes('<style'),
  'DLP AI modeling section must use SectionHeader and the dedicated AI modeling visual.',
)
assert(
  dlpAiModelingVisual.includes('useRuntimeTimeline(6400)') &&
    dlpAiModelingVisual.includes('border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)]') &&
    dlpAiModelingVisual.includes('flex items-center border-b border-muted px-4 py-3') &&
    dlpAiModelingVisual.includes('bg-red-500/70') &&
    dlpAiModelingVisual.includes('bg-yellow-500/70') &&
    dlpAiModelingVisual.includes('bg-green-500/70') &&
    dlpAiModelingVisual.includes('AI 语义理解') &&
    dlpAiModelingVisual.includes('智能建模结果') &&
    dlpAiModelingVisual.includes('标签模型校验通过，已发布至标签目录') &&
    !dlpAiModelingVisual.includes('<style') &&
    !dlpAiModelingVisual.includes('style='),
  'DLP AI modeling visual must keep the requested traffic-light titlebar and animate requirement-to-model generation.',
)
const dlpSources = [dlpData, dlpPage, dlpHero, dlpArchitecture, dlpTimeline, dlpAiModeling].join('\n')
for (const text of [
  '数曜·数据标签平台',
  '协同、智能、高效',
  '标签生产平台',
  '厌倦了低效的标签建设？',
  '轻松构建企业标签体系',
  '让每一个标签创造价值',
  '从数据对象到标签服务',
  '通过 AI 快速完成标签设计与建模',
  '为企业 AI 场景赋能',
  '立即咨询',
]) {
  assert(dlpSources.includes(text), `DLP requirement text is missing: ${text}`)
}
}
