import { registerDeviceAgentVisualContracts } from './product-aiiot/device-agent.contract'
import { registerTanyaoVisualContracts } from './product-aiiot/tanyao.contract'

export function registerProductAiiotVisualContracts() {
  registerTanyaoVisualContracts()
  registerDeviceAgentVisualContracts()
}
