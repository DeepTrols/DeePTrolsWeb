import { registerDdpVisualContracts } from './product-data/ddp.contract'
import { registerDgpVisualContracts } from './product-data/dgp.contract'
import { registerDlpVisualContracts } from './product-data/dlp.contract'
import { registerDmsVisualContracts } from './product-data/dms.contract'

export function registerProductDataVisualContracts() {
  registerDgpVisualContracts()
  registerDlpVisualContracts()
  registerDdpVisualContracts()
  registerDmsVisualContracts()
}
