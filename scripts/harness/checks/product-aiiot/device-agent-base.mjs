export function checkDeviceAgentBaseContracts(ctx) {
  const { assert, featureCard, deviceAgentData, deviceAgentPage, deviceAgentHero, deviceAgentArchitectureSection, deviceAgentValueSection, deviceAgentRuntimeSection } = ctx
assert(
  deviceAgentHero.includes('PageHero') &&
    deviceAgentHero.includes('align="center"') &&
    deviceAgentHero.includes('badge="Device Agent"') &&
    deviceAgentHero.includes('title-line="让Agent基于实时数据决策与行动"') &&
    deviceAgentHero.includes('title-gradient="串联事件、记忆、执行和决策"') &&
    deviceAgentHero.includes('visual-label="DEVICEAGENT_HORE_WEBM"') &&
    deviceAgentHero.includes(':actions="[]"') &&
    deviceAgentHero.includes('Cpu'),
  'DeviceAgentHero must compose the shared PageHero centered variant with the requirement copy and no hero actions.',
)
assert(
  deviceAgentPage.includes('SiteHeader') &&
    deviceAgentPage.includes('SiteFooter') &&
    deviceAgentPage.includes('<DeviceAgentHero') &&
    deviceAgentPage.includes('eyebrow="智能体生态"') &&
    deviceAgentPage.includes('title-id="device-agent-ecosystem-title"') &&
    deviceAgentPage.includes(':items="tanyaoAgents"') &&
    deviceAgentPage.includes('columns="three"') &&
    deviceAgentPage.includes('<DeviceAgentArchitectureSection') &&
    deviceAgentPage.includes('<DeviceAgentValueSection') &&
    deviceAgentPage.includes('<DeviceAgentRuntimeSection') &&
    deviceAgentPage.indexOf('<DeviceAgentHero') < deviceAgentPage.indexOf('device-agent-ecosystem-title') &&
    deviceAgentPage.indexOf('device-agent-ecosystem-title') < deviceAgentPage.indexOf('<DeviceAgentArchitectureSection') &&
    deviceAgentPage.indexOf('<DeviceAgentArchitectureSection') < deviceAgentPage.indexOf('<DeviceAgentValueSection') &&
    deviceAgentPage.indexOf('<DeviceAgentValueSection') < deviceAgentPage.indexOf('<DeviceAgentRuntimeSection'),
  'The device-agent page must assemble hero, ecosystem grid, architecture, core value, and runtime sections in order.',
)
assert(
  deviceAgentData.includes('export interface DeviceAgentScene') &&
    deviceAgentData.includes('export const deviceAgentScenes: DeviceAgentScene[]') &&
    deviceAgentData.includes('事件预警') &&
    deviceAgentData.includes('事件处置') &&
    deviceAgentData.includes('工单派发') &&
    deviceAgentData.includes('预测维护') &&
    deviceAgentData.includes('周报汇总') &&
    deviceAgentData.includes('智能问数') &&
    deviceAgentData.includes('温度超过 85℃'),
  'data/device-agent.ts must centralize the six orchestrator scenes with typed exports.',
)
assert(
  deviceAgentArchitectureSection.includes('ProductArchitectureSection') &&
    deviceAgentArchitectureSection.includes('eyebrow="智能体架构"') &&
    deviceAgentArchitectureSection.includes('title="从设备模型，到真正会行动的 Agent"') &&
    deviceAgentArchitectureSection.includes('title-id="device-agent-architecture-title"') &&
    deviceAgentArchitectureSection.includes('label="Device Agent 智能体架构图占位"') &&
    !deviceAgentArchitectureSection.includes('<style'),
  'The device-agent architecture section must reuse ProductArchitectureSection with a ProductSystemFlowFrame placeholder (no flow yet) and stay Tailwind-only.',
)
assert(
  deviceAgentValueSection.includes('ProductFeatureGridSection') &&
    deviceAgentValueSection.includes('eyebrow="核心价值"') &&
    deviceAgentValueSection.includes('title="Device Agent解决的三个关键问题"') &&
    deviceAgentValueSection.includes('title-id="device-agent-value-title"') &&
    deviceAgentValueSection.includes(':items="deviceAgentValueItems"') &&
    deviceAgentValueSection.includes('columns="three"') &&
    deviceAgentValueSection.includes(':icon-bordered="false"'),
  'The device-agent core value section must render three borderless numeric-icon cards via ProductFeatureGridSection.',
)
assert(
  featureCard.includes('feature-card__icon-label--borderless') &&
    featureCard.includes('feature-card__icon-label--unfilled') &&
    featureCard.includes('--dt-icon-box-shadow: none') &&
    featureCard.includes('--dt-icon-box-bg: transparent'),
  'FeatureCard numeric icon labels must honor iconBordered/iconFilled via icon-box CSS variables.',
)
assert(
  deviceAgentRuntimeSection.includes('title-id="device-agent-runtime-title"') &&
    deviceAgentRuntimeSection.includes('eyebrow="核心能力"') &&
    deviceAgentRuntimeSection.includes('title="为设备事件而生的 Agent Runtime"') &&
    deviceAgentRuntimeSection.includes('grid gap-8 lg:grid-cols-[360px_1fr] lg:gap-10') &&
    deviceAgentRuntimeSection.includes('deviceAgentRuntimeTabs') &&
    deviceAgentRuntimeSection.includes('aria-pressed') &&
    deviceAgentRuntimeSection.includes('border-primary/30 bg-gradient-to-r from-primary/10 to-primary/5') &&
    deviceAgentRuntimeSection.includes('border-transparent bg-transparent hover:bg-dt-bg-soft/50') &&
    deviceAgentRuntimeSection.includes('absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-primary transition-all duration-300') &&
    deviceAgentRuntimeSection.includes('bg-primary/15 text-primary') &&
    deviceAgentRuntimeSection.includes('bg-dt-bg-soft/60 text-muted group-hover:text-highlighted') &&
    deviceAgentRuntimeSection.includes('group-hover:translate-x-0 group-hover:opacity-40') &&
    deviceAgentRuntimeSection.includes('ChevronRight') &&
    deviceAgentRuntimeSection.includes(':key="active?.id"') &&
    !deviceAgentRuntimeSection.includes('<style'),
  'DeviceAgentRuntimeSection must replicate the EMQX agents left-tab layout (active bar, gradient, hover arrow) with keyed panel switching, Tailwind-only.',
)
}
