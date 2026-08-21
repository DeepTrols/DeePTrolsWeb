export function checkDeviceAgentRuntimeToolsContracts(ctx) {
  const { assert, tailwind, runtimeToolsPanel, runtimeToolsGraph, runtimeToolsHex, runtimeSkillsPanel } = ctx
assert(
  runtimeToolsPanel.includes('title="MCP 工具连接"') &&
    runtimeToolsPanel.includes('badge="已连接"') &&
    runtimeToolsPanel.includes('badge-dot') &&
    runtimeToolsPanel.includes('<RuntimeToolsGraph :call="activeCall" :dot="dot" />') &&
    runtimeToolsPanel.includes('当前工具') &&
    runtimeToolsPanel.includes('调用示例') &&
    runtimeToolsPanel.includes('CALL_MS = 3000') &&
    runtimeToolsPanel.includes('DOT_A_MS = 300') &&
    runtimeToolsPanel.includes('DOT_B_MS = 900') &&
    runtimeToolsPanel.includes('EXEC_MS = 1500') &&
    runtimeToolsPanel.includes('DONE_MS = 2200') &&
    runtimeToolsPanel.includes('useRuntimeTimeline(CALL_MS * calls.length)') &&
    runtimeToolsPanel.includes('name: \'tables.query\'') &&
    runtimeToolsPanel.includes('name: \'device.command\'') &&
    runtimeToolsPanel.includes('name: \'humans.approve\'') &&
    runtimeToolsPanel.includes('查询储能柜历史时序数据') &&
    runtimeToolsPanel.includes('向储能柜下发运行控制指令') &&
    runtimeToolsPanel.includes('高风险动作请求人工确认') &&
    runtimeToolsPanel.includes('数据指标') &&
    runtimeToolsPanel.includes('温度 / SOC / 功率') &&
    runtimeToolsPanel.includes('采样粒度') &&
    runtimeToolsPanel.includes('5 min') &&
    runtimeToolsPanel.includes('控制动作') &&
    runtimeToolsPanel.includes('调整充电功率') &&
    runtimeToolsPanel.includes('目标功率') &&
    runtimeToolsPanel.includes('420 kW') &&
    runtimeToolsPanel.includes('执行模式') &&
    runtimeToolsPanel.includes('单次执行') &&
    runtimeToolsPanel.includes('审批事项') &&
    runtimeToolsPanel.includes('审批策略') &&
    runtimeToolsPanel.includes('人工确认') &&
    runtimeToolsPanel.includes('truncate font-mono text-sm font-bold text-primary') &&
    runtimeToolsPanel.includes('mt-3 hidden gap-2 xl:grid') &&
    runtimeToolsPanel.includes('flex justify-between gap-2 text-xs leading-4') &&
    runtimeToolsPanel.includes('完成状态') &&
    runtimeToolsPanel.includes('✓ {{ currentCall.done }}') &&
    runtimeToolsPanel.includes('tools.tables.query({ device: "ESS-01", window: "7d" })') &&
    runtimeToolsPanel.includes('tools.device.command({ device: "ESS-01", action: "set_power" })') &&
    runtimeToolsPanel.includes('tools.humans.approve({ device: "ESS-01", action: "set_power" })') &&
    runtimeToolsPanel.includes('running: \'调用中\'') &&
    runtimeToolsPanel.includes('running: \'执行中\'') &&
    runtimeToolsPanel.includes('running: \'等待审批\'') &&
    runtimeToolsPanel.includes('done: \'已完成\'') &&
    runtimeToolsPanel.includes('done: \'已批准\'') &&
    runtimeToolsPanel.includes('近 7 天') &&
    runtimeToolsPanel.includes('set_power') &&
    runtimeToolsPanel.includes('等待调用') &&
    runtimeToolsPanel.includes('执行中 ···') &&
    runtimeToolsPanel.includes('✓ 调用成功 · 284 ms') &&
    runtimeToolsPanel.includes('<template #footer>') &&
    runtimeToolsPanel.includes('Agent 通过 MCP 协议连接设备、数据与业务工具，在消息流中完成读取、查询、检索与执行。') &&
    !runtimeToolsPanel.includes('<style'),
  'The MCP tools panel must cycle three Tool Calls (tables.query / device.command / humans.approve) over a 9s loop, syncing the current-tool card and the call example with per-call states.',
)
assert(
  tailwind.includes('@utility clip-hex') &&
    tailwind.includes('@utility clip-hex-inner') &&
    tailwind.includes('clip-path: path(') &&
    tailwind.includes('Q 78.12 24.25 78.12 32.25') &&
    tailwind.includes('Q 122.76 38 122.76 46') &&
    !tailwind.includes('--animate-line-dot'),
  'Tailwind must expose rounded hexagon clip-path utilities (outer + 1px-inset inner, responsive per breakpoint) and drop the obsolete line-dot token.',
)
assert(
  runtimeToolsGraph.includes('grid h-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-4 xl:gap-6') &&
    runtimeToolsGraph.includes('grid h-full grid-rows-3 grid-cols-[minmax(0,1fr)]') &&
    runtimeToolsGraph.includes('truncate text-sm font-semibold text-highlighted') &&
    runtimeToolsGraph.includes('truncate text-xs leading-4 text-muted') &&
    runtimeToolsGraph.includes('truncate font-mono text-xs leading-4 text-muted') &&
    runtimeToolsGraph.includes('数据平台') &&
    runtimeToolsGraph.includes('设备管理') &&
    runtimeToolsGraph.includes('企业系统') &&
    runtimeToolsGraph.includes('tables.query') &&
    runtimeToolsGraph.includes('device.command') &&
    runtimeToolsGraph.includes('humans.approve') &&
    runtimeToolsGraph.includes('relative w-24 xl:w-[150px]') &&
    runtimeToolsGraph.includes('viewBox="0 0 128 198"') &&
    runtimeToolsGraph.includes('viewBox="0 0 198 241"') &&
    runtimeToolsGraph.includes('-left-4 -right-4 overflow-visible xl:hidden') &&
    runtimeToolsGraph.includes('-left-6 -right-6 hidden overflow-visible xl:block') &&
    runtimeToolsGraph.includes('preserveAspectRatio="none"') &&
    runtimeToolsGraph.includes('vector-effect="non-scaling-stroke"') &&
    runtimeToolsGraph.includes('stroke-width="1"') &&
    runtimeToolsGraph.includes('stroke-dasharray="4 5"') &&
    runtimeToolsGraph.includes('stroke-linecap="round"') &&
    runtimeToolsGraph.includes('stroke-primary/30') &&
    runtimeToolsGraph.includes('stroke-primary/70') &&
    runtimeToolsGraph.includes('<RuntimeToolsHex :active="call !== null" />') &&
    runtimeToolsGraph.includes('bezierPoint') &&
    runtimeToolsGraph.includes(' C ') &&
    runtimeToolsGraph.includes('rows: [33, 99, 165]') &&
    runtimeToolsGraph.includes('rows: [40.2, 120.5, 200.8]') &&
    runtimeToolsGraph.includes('ports: [86.75, 99, 111.25]') &&
    runtimeToolsGraph.includes('ports: [101.5, 120.5, 139.5]') &&
    runtimeToolsGraph.includes('r="3"') &&
    runtimeToolsGraph.includes('drop-shadow-[0_0_3px_rgba(139,92,246,0.5)]') &&
    !runtimeToolsGraph.includes(' H ') &&
    !runtimeToolsGraph.includes(' Q ') &&
    !runtimeToolsGraph.includes('<style'),
  'The MCP graph must connect sources and tools to the hub with always-present soft bezier SVG dash paths (stroke-primary/30 → /70 when active), fixed glowing 6px nodes at card/MCP interfaces, and a single dot traveling the active bezier path.',
)
assert(
  runtimeToolsHex.includes('clip-hex') &&
    runtimeToolsHex.includes('MCP 工具层') &&
    runtimeToolsHex.includes('Tools Ready') &&
    runtimeToolsHex.includes('<polygon') &&
    runtimeToolsHex.includes('viewBox="0 0 146 170"') &&
    runtimeToolsHex.includes('h-[143px] w-[123px]') &&
    runtimeToolsHex.includes('xl:h-[224px] xl:w-[193px]') &&
    runtimeToolsHex.includes('clip-hex relative h-[97px] w-[84px] transition-colors duration-300 xl:h-[152px] xl:w-[132px]') &&
    runtimeToolsHex.includes('clip-hex-inner absolute inset-px bg-dt-bg') &&
    runtimeToolsHex.includes('stroke-linejoin="round"') &&
    runtimeToolsHex.includes('font-mono text-xs leading-4 text-muted') &&
    runtimeToolsHex.includes('shadow-[inset_0_0_18px_rgba(139,92,246,0.15)]') &&
    runtimeToolsHex.includes('points="73,18.3 122.5,51.7 122.5,118.4 73,151.7 23.6,118.4 23.6,51.7"') &&
    runtimeToolsHex.includes('points="73,9.6 128.9,47.3 128.9,122.7 73,160.4 17.1,122.7 17.1,47.3"') &&
    runtimeToolsHex.includes('points="73,0.9 135.4,42.9 135.4,127.1 73,169.1 10.6,127.1 10.6,42.9"') &&
    runtimeToolsHex.includes('stroke-primary/16') &&
    runtimeToolsHex.includes('stroke-primary/12') &&
    runtimeToolsHex.includes('stroke-primary/8') &&
    runtimeToolsHex.includes('active ? \'bg-primary/45\' : \'bg-primary/30\'') &&
    runtimeToolsHex.includes('active ? \'bg-primary/15\' : \'bg-primary/10\'') &&
    runtimeToolsHex.includes('transition-colors duration-300') &&
    !runtimeToolsHex.includes('animate-') &&
    !runtimeToolsHex.includes('<style'),
  'The MCP hub must be a large static clip-hex hexagon (~132px wide at xl, thin primary outline over dark base, bg-primary/10 with slight inner glow, slight brightening when active) wrapped by three concentric low-opacity hexagon contour rings (primary/16, /12, /8).',
)
assert(
  runtimeSkillsPanel.includes('title="Skills"') &&
    runtimeSkillsPanel.includes('badge="按需加载"') &&
    runtimeSkillsPanel.includes('ESS-01 · 电芯温度告警') &&
    runtimeSkillsPanel.includes('收到事件') &&
    runtimeSkillsPanel.includes('61.8°C') &&
    runtimeSkillsPanel.includes('animate-ping') &&
    runtimeSkillsPanel.includes('正在匹配 Skills...') &&
    runtimeSkillsPanel.includes('正在挂载 Skills...') &&
    runtimeSkillsPanel.includes('getRuntimeBarWidthClass') &&
    runtimeSkillsPanel.includes('设备巡检') &&
    runtimeSkillsPanel.includes('告警分诊') &&
    runtimeSkillsPanel.includes('热异常诊断') &&
    runtimeSkillsPanel.includes('工单派发') &&
    !runtimeSkillsPanel.includes('参数优化') &&
    runtimeSkillsPanel.includes('Skill 挂载序列') &&
    runtimeSkillsPanel.includes('skills.mount(') &&
    runtimeSkillsPanel.includes('匹配中') &&
    runtimeSkillsPanel.includes('挂载中') &&
    runtimeSkillsPanel.includes('3 Skills mounted') &&
    runtimeSkillsPanel.includes('Agent 通过 Skills 按需挂载能力') &&
    runtimeSkillsPanel.includes('truncate text-sm text-muted') &&
    !runtimeSkillsPanel.includes('热异常分析') &&
    !runtimeSkillsPanel.includes('处置决策') &&
    !runtimeSkillsPanel.includes('ArrowRight') &&
    !runtimeSkillsPanel.includes('opacity-0') &&
    !runtimeSkillsPanel.includes('<style'),
  'The skills panel must open with an event-style trigger card, keep four always-visible candidate bars, and end in a Skill 挂载序列 card whose growing skills.mount code flows 匹配中 → 挂载中 → ✓ 3 Skills mounted, with no execution-chain row.',
)
}
