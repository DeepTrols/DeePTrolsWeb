import { registerDeviceAgentBaseVisualContracts } from './device-agent-base.contract'
import { registerDeviceAgentPanelVisualContracts } from './device-agent-panels.contract'
import { registerDeviceAgentRuntimeVisualContracts } from './device-agent-runtime.contract'

export function registerDeviceAgentVisualContracts() {
  registerDeviceAgentBaseVisualContracts()
  registerDeviceAgentRuntimeVisualContracts()
  registerDeviceAgentPanelVisualContracts()
}
