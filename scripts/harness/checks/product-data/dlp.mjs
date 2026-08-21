export function checkDlpProductContracts(ctx) {
  const { assert, read, dlpData, dlpPage, dlpHero, dlpHeroVisual, dlpHeroSql, dlpArchitecture, dlpTimeline, dlpAiModeling } = ctx
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
    dlpHero.includes('import { Boxes }') &&
    dlpHero.includes('badge="数曜·数据标签平台"') &&
    dlpHero.includes('title-line="协同、智能、高效"') &&
    dlpHero.includes('title-gradient="标签生产平台"') &&
    dlpHero.includes('visual-label="SHUYAODGP_HORE_WEBM"') &&
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
    dlpArchitecture.includes('fallback-text="标签体系架构图占位符"') &&
    !dlpArchitecture.includes('EnterpriseFlow') &&
    !dlpArchitecture.includes('<style'),
  'DLP architecture must reuse ProductArchitectureSection without a flow chart.',
)
assert(
  dlpTimeline.includes('AlternatingTimelineSection') &&
    !dlpTimeline.includes('BaseCard') &&
    !dlpTimeline.includes('IconBox') &&
    dlpTimeline.includes('dlpTimelineItems') &&
    !dlpTimeline.includes('item.icon') &&
    !dlpTimeline.includes('eyebrow-size="sm"') &&
    !dlpTimeline.includes('eyebrow-tone="primary"') &&
    !dlpTimeline.includes('<style'),
  'DLP core capability timeline must reuse the shared EMQX Edge-like Tailwind-only alternating timeline.',
)
assert(
  dlpAiModeling.includes('SectionHeader') &&
    dlpAiModeling.includes('AI 辅助建标') &&
    dlpAiModeling.includes('图片占位符') &&
    !dlpAiModeling.includes('<style'),
  'DLP AI modeling section must use SectionHeader and a Tailwind-only image placeholder.',
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
