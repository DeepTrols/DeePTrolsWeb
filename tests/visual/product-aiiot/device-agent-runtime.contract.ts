import { describe, expect, it } from 'vitest'
import { readComponent } from '../utils'

export function registerDeviceAgentRuntimeVisualContracts() {
describe('device agent runtime contract', () => {
  it('replicates the EMQX agents left-tab runtime layout with keyed panel switching', () => {
    const section = readComponent('components/product/device-agent/DeviceAgentRuntimeSection.vue')

    expect(section).not.toContain('<style')
    expect(section).toContain('title-id="device-agent-runtime-title"')
    expect(section).toContain('eyebrow="核心能力"')
    expect(section).toContain('title="为设备事件而生的 Agent Runtime"')
    expect(section).toContain('grid gap-8 lg:grid-cols-[360px_1fr] lg:gap-10')
    expect(section).toContain('deviceAgentRuntimeTabs')
    expect(section).toContain(':aria-pressed="index === activeTab"')
    expect(section).toContain('border-primary/30 bg-gradient-to-r from-primary/10 to-primary/5')
    expect(section).toContain('border-transparent bg-transparent hover:bg-dt-bg-soft/50')
    expect(section).toContain('absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-primary transition-all duration-300')
    expect(section).toContain('bg-primary/15 text-primary')
    expect(section).toContain('bg-dt-bg-soft/60 text-muted group-hover:text-highlighted')
    expect(section).toContain('group-hover:translate-x-0 group-hover:opacity-40')
    expect(section).toContain('ChevronRight')
    expect(section).toContain(':key="active?.id"')
  })

  it('keeps the runtime panel shell fixed-height with the muted container and inner default card', () => {
    const shell = readComponent('components/product/device-agent/runtime/RuntimePanelShell.vue')
    const tailwind = readComponent('assets/css/tailwind.css')

    expect(shell).not.toContain('<style')
    expect(shell).toContain('animate-panel-in')
    expect(shell).toContain(
      'relative flex h-[530px] flex-col overflow-hidden rounded-2xl border border-dt-line-strong/60 bg-dt-bg-soft/30 xl:h-[480px]',
    )
    expect(shell).toContain('flex min-h-0 flex-1 flex-col rounded-xl border border-dt-line-strong/60 bg-dt-bg p-4')
    expect(shell).toContain('rounded bg-dt-bg-soft/40 px-2 py-0.5 text-[10px] font-medium text-muted')
    expect(shell).toContain('badgeDot?: boolean')
    expect(shell).toContain('v-if="badgeDot"')
    expect(shell).toContain('v-if="$slots.footer"')
    expect(shell).toContain('relative border-t border-dt-line-strong/40 px-5 py-4')
    expect(shell).toContain('<slot name="footer" />')

    expect(tailwind).toContain('--animate-panel-in: panel-in 0.32s ease-out both')
    expect(tailwind).toContain('@keyframes panel-in')
    expect(tailwind).toContain('--animate-sync-pulse: sync-pulse 2s ease-in-out infinite')
    expect(tailwind).toContain('@keyframes sync-pulse')
    expect(tailwind).toContain('@utility clip-hex')
    expect(tailwind).toContain('@utility clip-hex-inner')
    expect(tailwind).toContain('clip-path: path(')
    expect(tailwind).toContain('Q 78.12 24.25 78.12 32.25')
    expect(tailwind).toContain('Q 122.76 38 122.76 46')
    expect(tailwind).not.toContain('--animate-line-dot')
  })

  it('uses an SSR-safe rAF timeline composable for the six runtime panels', () => {
    const timeline = readComponent('components/product/device-agent/useRuntimeTimeline.ts')

    expect(timeline).toContain('export function useRuntimeTimeline')
    expect(timeline).toContain('requestAnimationFrame')
    expect(timeline).toContain('onMounted')
    expect(timeline).toContain('onBeforeUnmount')
    expect(timeline).toContain('import.meta.client')
    expect(timeline).toContain('RUNTIME_BAR_WIDTH_CLASSES')
    expect(timeline).toContain("'w-[0%]'")
    expect(timeline).toContain("'w-[100%]'")
    expect(timeline).toContain('export function stageCount')
    expect(timeline).toContain('export const RUNTIME_LOOP_HOLD_MS')
    expect(timeline).toContain('(now - startedAt) % cycleMs')
  })
  })
}
