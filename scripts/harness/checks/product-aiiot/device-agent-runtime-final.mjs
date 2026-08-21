export function checkDeviceAgentRuntimeFinalContracts(ctx) {
  const { assert, baseTabs, deviceAgentData, runtimeGuardrailsPanel, runtimeGuardrailsSequence, runtimeTracePanel } = ctx
assert(
  runtimeGuardrailsPanel.includes('title="安全执行"') &&
    runtimeGuardrailsPanel.includes('badge="护栏已启用"') &&
    runtimeGuardrailsPanel.includes('待执行动作') &&
    runtimeGuardrailsPanel.includes('device.command') &&
    runtimeGuardrailsPanel.includes('500 kW') &&
    runtimeGuardrailsPanel.includes('420 kW') &&
    runtimeGuardrailsPanel.includes('身份与权限') &&
    runtimeGuardrailsPanel.includes('设备范围') &&
    runtimeGuardrailsPanel.includes('参数边界') &&
    runtimeGuardrailsPanel.includes('运行安全策略') &&
    runtimeGuardrailsPanel.includes('中风险') &&
    runtimeGuardrailsPanel.includes('ALLOW_WITH_APPROVAL') &&
    runtimeGuardrailsPanel.includes('需人工审批') &&
    runtimeGuardrailsPanel.includes('人工审批') &&
    runtimeGuardrailsPanel.includes('等待审批') &&
    runtimeGuardrailsPanel.includes('批准') &&
    runtimeGuardrailsPanel.includes('拒绝') &&
    runtimeGuardrailsPanel.includes('Agent 通过 Guardrails 安全执行护栏') &&
    !runtimeGuardrailsPanel.includes('opacity-0') &&
    !runtimeGuardrailsPanel.includes('<style') &&
    runtimeGuardrailsSequence.includes('安全校验') &&
    runtimeGuardrailsSequence.includes('权限·参数·策略校验') &&
    runtimeGuardrailsSequence.includes('人工审批') &&
    runtimeGuardrailsSequence.includes('人工审批确认') &&
    runtimeGuardrailsSequence.includes('指令执行') &&
    runtimeGuardrailsSequence.includes('指令下发执行') &&
    runtimeGuardrailsSequence.includes('结果验证') &&
    runtimeGuardrailsSequence.includes('执行结果验证') &&
    runtimeGuardrailsSequence.includes('IconBox') &&
    !runtimeGuardrailsSequence.includes('opacity-0') &&
    !runtimeGuardrailsSequence.includes('<style'),
  'The guardrails panel must replay a real device action through always-resident low-density modules — action proposal (500 kW → 420 kW), four compressed Guardrails checks with a single-line risk result, human approval with approve/reject — ending in four IconBox step cards (安全校验 → 人工审批 → 指令执行 → 结果验证), with only color/state/connector-dot changes.',
)
assert(
  runtimeTracePanel.includes('title="运行 Trace"') &&
    runtimeTracePanel.includes('badge="采集中"') &&
    runtimeTracePanel.includes('deviceAgentTraceSteps') &&
    runtimeTracePanel.includes('重放本次运行') &&
    runtimeTracePanel.includes('restart') &&
    runtimeTracePanel.includes('耗时') &&
    runtimeTracePanel.includes('工具调用') &&
    runtimeTracePanel.includes('Skills') &&
    !runtimeTracePanel.includes('<style'),
  'The trace panel must replay the full ESS-01 runtime trace with live stats and a replay control.',
)
assert(
  deviceAgentData.includes('export interface DeviceAgentValueItem') &&
    deviceAgentData.includes('export const deviceAgentValueItems: DeviceAgentValueItem[]') &&
    deviceAgentData.includes('设备事件无法直接驱动 AI') &&
    deviceAgentData.includes('AI 能判断，但无法形成执行闭环') &&
    deviceAgentData.includes('通用 Agent 难以适配工业场景') &&
    deviceAgentData.includes('MQTT 消息原生触发') &&
    deviceAgentData.includes('export interface DeviceAgentRuntimeTab') &&
    deviceAgentData.includes('export const deviceAgentRuntimeTabs: DeviceAgentRuntimeTab[]') &&
    deviceAgentData.includes('多源事件触发') &&
    deviceAgentData.includes('设备上下文融合') &&
    deviceAgentData.includes('MCP 工具连接') &&
    deviceAgentData.includes('Skills 按需挂载') &&
    deviceAgentData.includes('安全执行护栏') &&
    deviceAgentData.includes('全链路可观测') &&
    deviceAgentData.includes('export interface DeviceAgentTraceStep') &&
    deviceAgentData.includes('export const deviceAgentTraceSteps: DeviceAgentTraceStep[]') &&
    deviceAgentData.includes('WO-20260814-018') &&
    deviceAgentData.includes('10:24:12.031') &&
    deviceAgentData.includes('10:24:20.419'),
  'data/device-agent.ts must centralize core value items, runtime capability tabs, and trace steps with typed exports.',
)
assert(
  baseTabs.includes('role="tablist"') &&
    baseTabs.includes('role="tab"') &&
    baseTabs.includes('dt-tab-list') &&
    baseTabs.includes('dt-segmented-tabs') &&
    baseTabs.includes("variant === 'underline'") &&
    baseTabs.includes('handleKeydown'),
  'BaseTabs must centralize ARIA, keyboard behavior, and pill/segmented/underline variants.',
)
}
