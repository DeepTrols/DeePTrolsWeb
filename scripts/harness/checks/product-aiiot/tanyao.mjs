export function checkTanyaoProductContracts(ctx) {
  const { assert, pageHero, tanyaoData, tanyaoPage, tanyaoHero, tanyaoHeroVisual, tanyaoSolution, tanyaoCapability, tanyaoStats, deviceAgentHeroVisual } = ctx
assert(
  pageHero.includes("align?: 'left' | 'center'") &&
    pageHero.includes("align: 'left',") &&
    pageHero.includes("align === 'center' ? 'max-w-4xl' : 'max-w-2xl lg:self-center lg:text-left'") &&
    pageHero.includes("align === 'center' ? 'lg:flex lg:justify-center' : ''") &&
    pageHero.includes("align === 'center' ? '' : 'lg:justify-start'") &&
    pageHero.includes("v-if=\"align !== 'center'\" class=\"page-hero__visual-glow\""),
  'PageHero must support the centered align variant (centered content, description, actions, visual and no visual glow) used by the Device Agent hero.',
)
assert(
  tanyaoHeroVisual.includes('viewBox="0 0 560 560"') &&
    tanyaoHeroVisual.includes('tanyaoFlowGradientUp') &&
    tanyaoHeroVisual.includes('tanyaoFlowGradientDown') &&
    tanyaoHeroVisual.includes('stroke-dashoffset') &&
    tanyaoHeroVisual.includes('IconBox') &&
    tanyaoHeroVisual.includes('tone="soft"') &&
    tanyaoHeroVisual.includes('探曜AIoT') &&
    tanyaoHeroVisual.includes('智能物联底座') &&
    tanyaoHeroVisual.includes('链接生态') &&
    tanyaoHeroVisual.includes('DeepSeek') &&
    tanyaoHeroVisual.includes('千问') &&
    tanyaoHeroVisual.includes('智谱') &&
    tanyaoHeroVisual.includes('Kimi') &&
    tanyaoHeroVisual.includes('探曜 Edge') &&
    tanyaoHeroVisual.includes('设备接入') &&
    tanyaoHeroVisual.includes('边缘计算') &&
    tanyaoHeroVisual.includes('策略执行') &&
    tanyaoHeroVisual.includes('Node-RED') &&
    tanyaoHeroVisual.includes('Neuron') &&
    tanyaoHeroVisual.includes('grid-cols-5') &&
    tanyaoHeroVisual.includes('工业设备') &&
    tanyaoHeroVisual.includes('传感器') &&
    tanyaoHeroVisual.includes('能源设备') &&
    tanyaoHeroVisual.includes('PLC') &&
    tanyaoHeroVisual.includes('摄像头') &&
    tanyaoHeroVisual.includes('h-[600px]') &&
    tanyaoHeroVisual.includes('top-[18px]') &&
    tanyaoHeroVisual.includes('top-[208px]') &&
    tanyaoHeroVisual.includes('bottom-[46px]') &&
    tanyaoHeroVisual.includes('rounded-[24px]') &&
    tanyaoHeroVisual.includes('rounded-[32px]') &&
    !tanyaoHeroVisual.includes('<style'),
  'TanyaoHeroVisual must replicate the EMQX Edge three-layer hero visual with IconBox logos, the expanded AI ecosystem / edge runtime / device tiles, boyao-aligned card radii, and Tailwind-only styles.',
)
assert(
  tanyaoHero.includes('PageHero') &&
    tanyaoHero.includes('badge="探曜·AI物联感知平台"') &&
    tanyaoHero.includes('title-line="连接、感知、智能"') &&
    tanyaoHero.includes('title-gradient="AIoT智能物联底座"') &&
    tanyaoHero.includes('visual-label="TANYAOIOT_HORE_WEBM"') &&
    tanyaoHero.includes('flush-bottom') &&
    !tanyaoHero.includes('flush-visual-end') &&
    !tanyaoHero.includes('HeroStatsStrip'),
  'TanyaoHero must compose the shared PageHero with the requirement copy and a flush-bottom rhythm, and must align the visual right edge the boyao way (ml-auto canvas, no flush-visual-end); the stats strip lives in its own section.',
)
assert(
  tanyaoStats.includes('HeroStatsStrip') &&
    tanyaoStats.includes('tanyaoHeroStats') &&
    tanyaoStats.includes(':columns="4"') &&
    tanyaoStats.includes('placement="section"') &&
    tanyaoStats.includes('container') &&
    !tanyaoStats.includes('<style'),
  'TanyaoStatsSection must render the 1x4 HeroStatsStrip as a standalone section below the flush-bottom hero.',
)
assert(
  tanyaoSolution.includes('ProductArchitectureSection') &&
    tanyaoSolution.includes('SystemCards') &&
    tanyaoSolution.includes('tanyaoSolutionCards') &&
    tanyaoSolution.includes('eyebrow="解决方案"') &&
    tanyaoSolution.includes('fallback-text="解决方案流程图占位符"') &&
    !tanyaoSolution.includes('<style'),
  'TanyaoSolutionSection must combine ProductArchitectureSection with SystemCards and a flow frame placeholder.',
)
assert(
  tanyaoCapability.includes('AlternatingTimelineSection') &&
    tanyaoCapability.includes('tanyaoTimelineItems') &&
    tanyaoCapability.includes('eyebrow="核心能力"') &&
    tanyaoCapability.includes('title-id="tanyao-capability-title"') &&
    !tanyaoCapability.includes('<style'),
  'TanyaoCapabilitySection must reuse the shared AlternatingTimelineSection for the six core capabilities.',
)
assert(
  tanyaoPage.includes('SiteHeader') &&
    tanyaoPage.includes('SiteFooter') &&
    tanyaoPage.includes('eyebrow="挑战"') &&
    tanyaoPage.includes('eyebrow="Device Agent"') &&
    tanyaoPage.includes('columns="three"') &&
    tanyaoPage.includes('title-id="tanyao-cta-title"') &&
    tanyaoPage.indexOf('<TanyaoHero') < tanyaoPage.indexOf('<TanyaoStatsSection') &&
    tanyaoPage.indexOf('<TanyaoStatsSection') < tanyaoPage.indexOf('tanyao-challenge-title') &&
    tanyaoPage.indexOf('tanyao-challenge-title') < tanyaoPage.indexOf('<TanyaoSolutionSection') &&
    tanyaoPage.indexOf('<TanyaoSolutionSection') < tanyaoPage.indexOf('<TanyaoCapabilitySection') &&
    tanyaoPage.indexOf('<TanyaoCapabilitySection') < tanyaoPage.indexOf('tanyao-agent-title') &&
    tanyaoPage.indexOf('tanyao-agent-title') < tanyaoPage.indexOf('<CtaSection'),
  'The ai-iot page must assemble hero, stats section, challenges, solution, capabilities, Device Agent grid, and CTA in order.',
)
assert(
  tanyaoData.includes('export const tanyaoHeroStats: HeroStatItem[]') &&
    tanyaoData.includes('export const tanyaoChallenges: ProductFeatureGridItem[]') &&
    tanyaoData.includes('export const tanyaoSolutionCards: SystemCard[]') &&
    tanyaoData.includes('export const tanyaoTimelineItems: AlternatingTimelineItem[]') &&
    tanyaoData.includes('export const tanyaoAgents: ProductFeatureGridItem[]') &&
    tanyaoData.includes('tanyaoIotLogo') &&
    tanyaoData.includes('deepseekLogo') &&
    tanyaoData.includes('qwenLogo') &&
    tanyaoData.includes('zhipuLogo') &&
    tanyaoData.includes('kimiLogo'),
  'data/tanyao.ts must centralize the TANYAO page content with typed exports and all ecosystem logo assets.',
)
assert(
  deviceAgentHeroVisual.includes('relative mt-10 w-full max-w-[860px]') &&
    deviceAgentHeroVisual.includes(
      'pointer-events-none absolute -inset-x-12 -bottom-4 -top-8 -z-0 rounded-[3rem] bg-primary/8 blur-3xl lg:-inset-x-24',
    ) &&
    deviceAgentHeroVisual.includes(
      'relative overflow-hidden rounded-2xl border border-primary/20 bg-elevated shadow-lg transition-shadow',
    ) &&
    deviceAgentHeroVisual.includes('relative min-h-[140px] px-5 pt-5 pb-3') &&
    deviceAgentHeroVisual.includes(
      'pointer-events-none absolute inset-x-5 top-5 text-left text-base leading-relaxed text-muted sm:text-lg',
    ) &&
    deviceAgentHeroVisual.includes('ml-[2px] inline-block h-[1em] w-[1.5px] animate-pulse bg-primary align-baseline') &&
    deviceAgentHeroVisual.includes('aria-label="Agent 编排器"') &&
    deviceAgentHeroVisual.includes('rows="3"') &&
    deviceAgentHeroVisual.includes(
      'relative w-full resize-none bg-transparent text-base leading-relaxed text-highlighted outline-none sm:text-lg',
    ) &&
    deviceAgentHeroVisual.includes(
      'flex items-center justify-between gap-3 border-t border-primary/15 bg-dt-bg-soft/30 px-3 py-2.5',
    ) &&
    deviceAgentHeroVisual.includes(
      'inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors',
    ) &&
    deviceAgentHeroVisual.includes('border-primary/30 bg-primary/10 text-primary') &&
    deviceAgentHeroVisual.includes('border-default bg-dt-bg/70 text-muted hover:bg-dt-bg-soft/50 hover:text-highlighted') &&
    deviceAgentHeroVisual.includes('aria-label="发送"') &&
    deviceAgentHeroVisual.includes('ArrowUp') &&
    deviceAgentHeroVisual.includes('aria-pressed') &&
    deviceAgentHeroVisual.includes('deviceAgentScenes') &&
    deviceAgentHeroVisual.includes('onMounted') &&
    deviceAgentHeroVisual.includes('onBeforeUnmount') &&
    !deviceAgentHeroVisual.includes('<style'),
  'DeviceAgentHeroVisual must replicate the EMQX Agents orchestrator panel (glow, panel, ghost typing overlay with pulsing cursor, scene buttons, send button) Tailwind-only with SSR-safe timers.',
)
}
