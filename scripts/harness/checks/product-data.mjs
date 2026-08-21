import { checkDdpProductContracts } from './product-data/ddp.mjs'
import { checkDgpProductContracts } from './product-data/dgp.mjs'
import { checkDlpProductContracts } from './product-data/dlp.mjs'
import { checkDmsProductContracts } from './product-data/dms.mjs'

export function checkProductDataContracts(ctx) {
  checkDgpProductContracts(ctx)
  checkDlpProductContracts(ctx)
  checkDdpProductContracts(ctx)
  checkDmsProductContracts(ctx)
}
