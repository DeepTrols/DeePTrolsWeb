import { describe } from 'vitest'
import { registerCoreVisualContracts } from './visual/core.contract'
import { registerProductAiiotVisualContracts } from './visual/product-aiiot.contract'
import { registerProductDataVisualContracts } from './visual/product-data.contract'
import { registerAboutVisualContracts } from './visual/site/about.contract'
import { registerWhyHomeCommonVisualContracts } from './visual/why-home-common.contract'

describe('visual implementation contract', () => {
  registerCoreVisualContracts()
  registerProductDataVisualContracts()
  registerWhyHomeCommonVisualContracts()
  registerAboutVisualContracts()
})

registerProductAiiotVisualContracts()
