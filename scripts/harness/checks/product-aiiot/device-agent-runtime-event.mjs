export function checkDeviceAgentRuntimeEventContracts(ctx) {
  const { assert, tailwind, runtimeTimeline, runtimePanelShell, runtimeEventPanel, runtimeContextPanel, runtimeContextSnapshot } = ctx
assert(
  runtimePanelShell.includes('animate-panel-in') &&
    runtimePanelShell.includes(
      'relative flex h-[530px] flex-col overflow-hidden rounded-2xl border border-dt-line-strong/60 bg-dt-bg-soft/30 xl:h-[480px]',
    ) &&
    runtimePanelShell.includes('flex min-h-0 flex-1 flex-col rounded-xl border border-dt-line-strong/60 bg-dt-bg p-4') &&
    runtimePanelShell.includes('rounded bg-dt-bg-soft/40 px-2 py-0.5 text-[10px] font-medium text-muted') &&
    runtimePanelShell.includes('badgeDot?: boolean') &&
    runtimePanelShell.includes('v-if="badgeDot"') &&
    runtimePanelShell.includes('size-1 animate-pulse rounded-full bg-primary') &&
    runtimePanelShell.includes('v-if="$slots.footer"') &&
    runtimePanelShell.includes('relative border-t border-dt-line-strong/40 px-5 py-4') &&
    runtimePanelShell.includes('<slot name="footer" />') &&
    !runtimePanelShell.includes('<style'),
  'RuntimePanelShell must keep the reference fixed-height muted container with an inner default card, status badge, and optional footer slot, Tailwind-only.',
)
assert(
  tailwind.includes('--animate-panel-in: panel-in 0.32s ease-out both') &&
    tailwind.includes('@keyframes panel-in'),
  'tailwind.css must define the runtime panel entry animation token.',
)
assert(
  runtimeTimeline.includes('export function useRuntimeTimeline') &&
    runtimeTimeline.includes('requestAnimationFrame') &&
    runtimeTimeline.includes('onMounted') &&
    runtimeTimeline.includes('onBeforeUnmount') &&
    runtimeTimeline.includes('import.meta.client') &&
    runtimeTimeline.includes('RUNTIME_BAR_WIDTH_CLASSES') &&
    runtimeTimeline.includes("w-[100%]") &&
    runtimeTimeline.includes('export const RUNTIME_LOOP_HOLD_MS') &&
    runtimeTimeline.includes('(now - startedAt) % cycleMs'),
  'useRuntimeTimeline must be an SSR-safe rAF timeline with literal Tailwind width classes and a looping playback cycle.',
)
assert(
  runtimeEventPanel.includes('title="事件触发器"') &&
    runtimeEventPanel.includes('badge="监听中"') &&
    runtimeEventPanel.includes('DEVICE AGENT') &&
    runtimeEventPanel.includes('等待事件') &&
    runtimeEventPanel.includes('事件已触发') &&
    runtimeEventPanel.includes('事件校验') &&
    runtimeEventPanel.includes('事件去重') &&
    runtimeEventPanel.includes('上下文构建') &&
    runtimeEventPanel.includes('61.8°C') &&
    runtimeEventPanel.includes('让设备告警、指标异常、规则命中与定时任务直接触发 Agent，自动启动后续分析与处置。') &&
    !runtimeEventPanel.includes('<style'),
  'The event trigger panel must animate the four ESS-01 event sources into the Device Agent runtime with the validation pipeline.',
)
assert(
  runtimeEventPanel.includes('rounded-xl border border-primary/20 bg-primary/5 p-3') &&
    runtimeEventPanel.includes('animate-ping') &&
    runtimeEventPanel.includes('truncate font-mono text-base font-semibold text-highlighted') &&
    runtimeEventPanel.includes("triggered ? '事件已触发' : '等待事件'") &&
    runtimeEventPanel.includes('h-1.5 flex-1 rounded-full transition-colors duration-200') &&
    runtimeEventPanel.includes("index < activeBars ? 'bg-primary' : 'bg-dt-bg-soft'") &&
    runtimeEventPanel.includes('rounded-xl border border-dt-line-strong/60 bg-dt-bg p-2.5') &&
    runtimeEventPanel.includes('mt-5 rounded-xl border border-dt-line-strong/60 bg-dt-bg p-2.5') &&
    runtimeEventPanel.includes('flex items-baseline justify-between gap-2 text-xs leading-4 transition-opacity duration-500') &&
    runtimeEventPanel.includes('mb-3 flex items-center gap-2') &&
    runtimeEventPanel.includes('grid gap-2') &&
    runtimeEventPanel.includes('mt-5 flex items-stretch gap-1') &&
    runtimeEventPanel.includes('验证来源与事件结构') &&
    runtimeEventPanel.includes('过滤短时重复事件') &&
    runtimeEventPanel.includes('关联设备与历史上下文') &&
    runtimeEventPanel.includes('校验通过') &&
    runtimeEventPanel.includes('去重完成') &&
    runtimeEventPanel.includes('构建中...') &&
    runtimeEventPanel.includes('BadgeCheck') &&
    runtimeEventPanel.includes('CopyCheck') &&
    runtimeEventPanel.includes('Database') &&
    runtimeEventPanel.includes('ArrowRight') &&
    runtimeEventPanel.includes('animate-pulse') &&
    runtimeEventPanel.includes("import IconBox from '~/components/common/card/IconBox.vue'") &&
    runtimeEventPanel.includes("stepState(index) === 'pending' ? 'soft' : 'primary'") &&
    runtimeEventPanel.includes('truncate text-sm font-semibold text-highlighted') &&
    runtimeEventPanel.includes('mt-1 hidden truncate text-xs leading-5 text-muted xl:block') &&
    runtimeEventPanel.includes('flex min-w-0 flex-1 flex-col items-center gap-1 rounded-lg border p-2.5 transition-colors duration-500 xl:flex-row xl:items-center xl:gap-2.5') &&
    runtimeEventPanel.includes('<template #footer>') &&
    runtimeEventPanel.includes('max-w-xl text-sm text-muted lg:line-clamp-2') &&
    !runtimeEventPanel.includes('<style'),
  'The event trigger panel must follow the EMQX reference: primary DEVICE AGENT status card, four event progress bars, three always-visible horizontal pipeline state cards, and the caption in the shell footer.',
)
assert(
  runtimeContextPanel.includes('title="设备上下文引擎"') &&
    runtimeContextPanel.includes('badge="实时构建"') &&
    runtimeContextPanel.includes('badge-dot') &&
    runtimeContextPanel.includes('ESS-01 设备上下文') &&
    runtimeContextPanel.includes('构建中') &&
    runtimeContextPanel.includes('已就绪') &&
    runtimeContextPanel.includes('正在融合实时状态、历史时序、设备信息与知识数据。') &&
    runtimeContextPanel.includes('relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15') &&
    runtimeContextPanel.includes('shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary') &&
    runtimeContextPanel.includes('mt-2 grid min-h-0 flex-1 grid-cols-2 gap-2 sm:gap-3 xl:flex-none xl:grid-cols-4') &&
    runtimeContextPanel.includes('mt-3 flex items-center gap-2') &&
    runtimeContextPanel.includes('h-1.5 flex-1 rounded-full transition-colors duration-200') &&
    runtimeContextPanel.includes("sourceState(card) === 'idle' ? 'bg-dt-bg-soft' : 'bg-primary'") &&
    runtimeContextPanel.includes('flex h-full items-center gap-2 rounded-lg border p-2.5 transition-all duration-300') &&
    runtimeContextPanel.includes('min-w-0 flex-1') &&
    runtimeContextPanel.includes('truncate text-sm font-semibold leading-5 text-highlighted') &&
    runtimeContextPanel.includes('mt-0.5 hidden truncate text-xs leading-4 text-muted xl:block') &&
    runtimeContextPanel.includes('mt-1 truncate font-mono text-xs leading-4') &&
    runtimeContextPanel.includes('<RuntimeContextSnapshot :group="activeSnapshotGroup" />') &&
    !runtimeContextSnapshot.includes('持续更新') &&
    !runtimeContextSnapshot.includes('animate-sync-pulse') &&
    runtimeContextSnapshot.includes('flex gap-1.5 overflow-x-auto xl:grid xl:grid-cols-7') &&
    runtimeContextSnapshot.includes('最高电芯温度') &&
    runtimeContextSnapshot.includes('知识匹配') &&
    runtimeContextPanel.includes('设备实时运行指标') &&
    runtimeContextPanel.includes('历史趋势与运行基线') &&
    runtimeContextPanel.includes('设备及子系统状态') &&
    runtimeContextPanel.includes('运维知识与处置规范') &&
    runtimeContextPanel.includes('text-sm font-semibold leading-5') &&
    runtimeContextPanel.includes('font-mono text-xs leading-4') &&
    runtimeContextPanel.includes('mt-3 rounded-xl border border-dt-line-strong/60 bg-dt-bg p-2.5 xl:mt-5') &&
    runtimeContextPanel.includes('truncate text-sm text-muted') &&
    runtimeContextPanel.includes("import IconBox from '~/components/common/card/IconBox.vue'") &&
    runtimeContextPanel.includes('Activity') &&
    runtimeContextPanel.includes('ChartNoAxesCombined') &&
    runtimeContextPanel.includes('Cpu') &&
    runtimeContextPanel.includes('BookOpen') &&
    runtimeContextPanel.includes('Terminal') &&
    runtimeContextPanel.includes('上下文构建序列') &&
    runtimeContextPanel.includes('context.realtime({ device: "ESS-01" })') &&
    runtimeContextPanel.includes('context.timeseries({ device: "ESS-01", window: "7d" })') &&
    runtimeContextPanel.includes('context.device({ device: "ESS-01" })') &&
    runtimeContextPanel.includes('context.knowledge({ query: "电芯持续高温" })') &&
    runtimeContextPanel.includes('context.build({ device: "ESS-01", sources: 4 })') &&
    runtimeContextPanel.includes('Context Ready · 1.2s') &&
    runtimeContextPanel.includes('useRuntimeTimeline(8800)') &&
    runtimeContextPanel.includes('Agent 自动融合实时状态、历史时序、设备信息与知识数据，为每一次运行动态构建设备级上下文。') &&
    runtimeContextPanel.includes('<template #footer>') &&
    !runtimeContextPanel.includes('<style'),
  'The context panel must keep the simplified ESS-01 context header card, four horizontal source cards with wider section spacing, typed build sequence, and a single-line footer caption.',
)
}
