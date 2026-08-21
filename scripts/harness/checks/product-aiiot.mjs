import { checkDeviceAgentBaseContracts } from './product-aiiot/device-agent-base.mjs'
import { checkDeviceAgentRuntimeEventContracts } from './product-aiiot/device-agent-runtime-event.mjs'
import { checkDeviceAgentRuntimeFinalContracts } from './product-aiiot/device-agent-runtime-final.mjs'
import { checkDeviceAgentRuntimeToolsContracts } from './product-aiiot/device-agent-runtime-tools.mjs'
import { checkTanyaoProductContracts } from './product-aiiot/tanyao.mjs'

export function checkProductAiiotContracts(ctx) {
  checkTanyaoProductContracts(ctx)
  checkDeviceAgentBaseContracts(ctx)
  checkDeviceAgentRuntimeEventContracts(ctx)
  checkDeviceAgentRuntimeToolsContracts(ctx)
  checkDeviceAgentRuntimeFinalContracts(ctx)
}
