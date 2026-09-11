import { describe } from 'vitest'
import { registerCoreVisualContracts } from './visual/core.contract'
import { registerProductAiiotVisualContracts } from './visual/product-aiiot.contract'
import { registerProductDataVisualContracts } from './visual/product-data.contract'
import { registerAboutVisualContracts } from './visual/site/about.contract'
import { registerReportVisualContracts } from './visual/site/report.contract'
import { registerSolutionTemplateVisualContracts } from './visual/site/solution-template.contract'
import { registerEducationVisualContracts } from './visual/site/solutions/education.contract'
import { registerEnergySavingVisualContracts } from './visual/site/solutions/energy-saving.contract'
import { registerHydraulicVisualContracts } from './visual/site/solutions/hydraulic.contract'
import { registerManufacturingVisualContracts } from './visual/site/solutions/manufacturing.contract'
import { registerSolutionUseCaseVisualContracts } from './visual/site/solutions/use-cases.contract'
import { registerWhyHomeCommonVisualContracts } from './visual/why-home-common.contract'

describe('visual implementation contract', () => {
  registerCoreVisualContracts()
  registerProductDataVisualContracts()
  registerWhyHomeCommonVisualContracts()
  registerAboutVisualContracts()
  registerReportVisualContracts()
  registerSolutionTemplateVisualContracts()
  registerSolutionUseCaseVisualContracts()
  registerManufacturingVisualContracts()
  registerEnergySavingVisualContracts()
  registerHydraulicVisualContracts()
  registerEducationVisualContracts()
})

registerProductAiiotVisualContracts()
