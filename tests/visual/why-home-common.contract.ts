import { registerBoyaoVisualContracts } from './site/boyao.contract'
import { registerCommonComponentVisualContracts } from './site/common-components.contract'
import { registerHomeVisualContracts } from './site/home.contract'
import { registerWhyVisualContracts } from './site/why.contract'

export function registerWhyHomeCommonVisualContracts() {
  registerWhyVisualContracts()
  registerHomeVisualContracts()
  registerCommonComponentVisualContracts()
  registerBoyaoVisualContracts()
}
