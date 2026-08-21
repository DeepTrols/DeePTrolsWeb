import { describe, expect, it } from 'vitest'
import { readComponent } from '../utils'

export function registerDeviceAgentBaseVisualContracts() {
describe('device agent page contract', () => {
  it('renders the device agent hero through the centered PageHero variant', () => {
    const hero = readComponent('components/product/device-agent/DeviceAgentHero.vue')
    const pageHero = readComponent('components/common/PageHero.vue')

    expect(hero).toContain('badge="Device Agent"')
    expect(hero).toContain('Cpu')
    expect(hero).toContain('title-id="device-agent-hero-title"')
    expect(hero).toContain('title-line="让Agent基于实时数据决策与行动"')
    expect(hero).toContain('title-gradient="串联事件、记忆、执行和决策"')
    expect(hero).toContain('visual-label="DEVICEAGENT_HORE_WEBM"')
    expect(hero).toContain('align="center"')
    expect(hero).toContain(':actions="[]"')
    expect(hero).toContain('<DeviceAgentHeroVisual />')

    // shared PageHero exposes the centered variant without breaking the left baseline
    expect(pageHero).toContain("align?: 'left' | 'center'")
    expect(pageHero).toContain("align === 'center' ? 'max-w-4xl' : 'max-w-2xl lg:self-center lg:text-left'")
    expect(pageHero).toContain("align === 'center' ? 'lg:flex lg:justify-center' : ''")
    expect(pageHero).toContain("v-if=\"align !== 'center'\" class=\"page-hero__visual-glow\"")
    expect(pageHero).toContain("flushVisualEnd ? 'lg:-mr-4 lg:justify-self-end' : ''")
  })

  it('replicates the EMQX Agents orchestrator panel structure with the six scenes', () => {
    const heroVisual = readComponent('components/product/device-agent/DeviceAgentHeroVisual.vue')

    // Tailwind-only component with SSR-safe timers
    expect(heroVisual).not.toContain('<style')
    expect(heroVisual).not.toMatch(/\sstyle=/)
    expect(heroVisual).toContain('onMounted')
    expect(heroVisual).toContain('onBeforeUnmount')

    // panel glow and frame
    expect(heroVisual).toContain('class="relative mt-10 w-full max-w-[860px]"')
    expect(heroVisual).toContain(
      'pointer-events-none absolute -inset-x-12 -bottom-4 -top-8 -z-0 rounded-[3rem] bg-primary/8 blur-3xl lg:-inset-x-24',
    )
    expect(heroVisual).toContain(
      'relative overflow-hidden rounded-2xl border border-primary/20 bg-elevated shadow-lg transition-shadow',
    )

    // ghost typing overlay with pulsing cursor plus the orchestrator textarea
    expect(heroVisual).toContain('relative min-h-[140px] px-5 pt-5 pb-3')
    expect(heroVisual).toContain(
      'pointer-events-none absolute inset-x-5 top-5 text-left text-base leading-relaxed text-muted sm:text-lg',
    )
    expect(heroVisual).toContain('ml-[2px] inline-block h-[1em] w-[1.5px] animate-pulse bg-primary align-baseline')
    expect(heroVisual).toContain('aria-label="Agent 编排器"')
    expect(heroVisual).toContain('rows="3"')
    expect(heroVisual).toContain(
      'relative w-full resize-none bg-transparent text-base leading-relaxed text-highlighted outline-none sm:text-lg',
    )

    // toolbar with the six scene buttons and the send button
    expect(heroVisual).toContain(
      'flex items-center justify-between gap-3 border-t border-primary/15 bg-dt-bg-soft/30 px-3 py-2.5',
    )
    expect(heroVisual).toContain(
      'inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors',
    )
    expect(heroVisual).toContain('border-primary/30 bg-primary/10 text-primary')
    expect(heroVisual).toContain('border-default bg-dt-bg/70 text-muted hover:bg-dt-bg-soft/50 hover:text-highlighted')
    expect(heroVisual).toContain('aria-pressed')
    expect(heroVisual).toContain('size-3.5')
    expect(heroVisual).toContain('hidden sm:inline')
    expect(heroVisual).toContain('aria-label="发送"')
    expect(heroVisual).toContain('ArrowUp')
    expect(heroVisual).toContain('size-4')
  })

  it('assembles the device agent page with the ecosystem grid reusing the tanyao agents', () => {
    const page = readComponent('pages/products/device-agent.vue')
    const data = readComponent('data/device-agent.ts')

    expect(page).toContain('<DeviceAgentHero />')
    expect(page).toContain('SiteHeader')
    expect(page).toContain('SiteFooter')
    expect(page).toContain('eyebrow="智能体生态"')
    expect(page).toContain('title-id="device-agent-ecosystem-title"')
    expect(page).toContain(':items="tanyaoAgents"')
    expect(page).toContain('columns="three"')
    expect(page.indexOf('<DeviceAgentHero')).toBeLessThan(page.indexOf('device-agent-ecosystem-title'))

    expect(data).toContain('export interface DeviceAgentScene')
    expect(data).toContain('export const deviceAgentScenes: DeviceAgentScene[]')
    expect(data.indexOf('事件预警')).toBeLessThan(data.indexOf('事件处置'))
    expect(data.indexOf('事件处置')).toBeLessThan(data.indexOf('工单派发'))
    expect(data.indexOf('工单派发')).toBeLessThan(data.indexOf('预测维护'))
    expect(data.indexOf('预测维护')).toBeLessThan(data.indexOf('周报汇总'))
    expect(data.indexOf('周报汇总')).toBeLessThan(data.indexOf('智能问数'))
  })

  it('renders Section2 through the shared ProductArchitectureSection with a flow frame placeholder', () => {
    const section = readComponent('components/product/device-agent/DeviceAgentArchitectureSection.vue')

    expect(section).toContain('ProductArchitectureSection')
    expect(section).toContain('eyebrow="智能体架构"')
    expect(section).toContain('title="从设备模型，到真正会行动的 Agent"')
    expect(section).toContain('title-id="device-agent-architecture-title"')
    expect(section).toContain('subtitle="Agent 理解设备能力，读取实时状态，执行指令并返回可验证的结果。"')
    expect(section).toContain('Device Agent 智能体架构图占位符')
    expect(section).not.toContain('<style')
  })

  it('renders Section3 as three borderless numeric-icon cards and keeps FeatureCard backward compatible', () => {
    const section = readComponent('components/product/device-agent/DeviceAgentValueSection.vue')
    const featureCard = readComponent('components/common/card/FeatureCard.vue')

    expect(section).toContain('eyebrow="核心价值"')
    expect(section).toContain('title="Device Agent解决的三个关键问题"')
    expect(section).toContain('title-id="device-agent-value-title"')
    expect(section).toContain(':items="deviceAgentValueItems"')
    expect(section).toContain('columns="three"')
    expect(section).toContain(':icon-bordered="false"')

    // numeric icon labels now honor iconBordered/iconFilled without changing the default rendering
    expect(featureCard).toContain('feature-card__icon-label--borderless')
    expect(featureCard).toContain('feature-card__icon-label--unfilled')
    expect(featureCard).toContain("--dt-icon-box-shadow: none")
    expect(featureCard).toContain("--dt-icon-box-bg: transparent")
    expect(featureCard).toContain('class="relative dt-icon-box dt-icon-box--gradient text-sm font-bold"')
  })
  })
}
