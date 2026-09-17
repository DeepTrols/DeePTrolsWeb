import { describe } from 'vitest'
import { registerCoreVisualContracts } from './visual/core.contract'
import { registerProductAiiotVisualContracts } from './visual/product-aiiot.contract'
import { registerProductDataVisualContracts } from './visual/product-data.contract'
import { registerAboutVisualContracts } from './visual/site/about.contract'
import { registerCaseVisualContracts } from './visual/site/case.contract'
import { registerCaseDetailVisualContracts } from './visual/site/case-detail.contract'
import { registerNewsVisualContracts } from './visual/site/news.contract'
import { registerNewsDetailVisualContracts } from './visual/site/news-detail.contract'
import { registerReportVisualContracts } from './visual/site/report.contract'
import { registerSolutionTemplateVisualContracts } from './visual/site/solution-template.contract'
import { registerDatacenterVisualContracts } from './visual/site/solutions/datacenter.contract'
import { registerEducationVisualContracts } from './visual/site/solutions/education.contract'
import { registerEnergySavingVisualContracts } from './visual/site/solutions/energy-saving.contract'
import { registerFdeVisualContracts } from './visual/site/solutions/fde.contract'
import { registerHydraulicVisualContracts } from './visual/site/solutions/hydraulic.contract'
import { registerManufacturingVisualContracts } from './visual/site/solutions/manufacturing.contract'
import { registerSolutionUseCaseVisualContracts } from './visual/site/solutions/use-cases.contract'
import { registerWhyHomeCommonVisualContracts } from './visual/why-home-common.contract'
import { registerSmartDataHubVisualContracts } from './visual/demo-smart-data-hub.contract'
import { registerKnowledgeHubVisualContracts } from './visual/demo-knowledge-hub.contract'

describe('visual implementation contract', () => {
  registerCoreVisualContracts()
  registerProductDataVisualContracts()
  registerWhyHomeCommonVisualContracts()
  registerAboutVisualContracts()
  registerCaseVisualContracts()
  registerCaseDetailVisualContracts()
  registerNewsVisualContracts()
  registerNewsDetailVisualContracts()
  registerReportVisualContracts()
  registerSolutionTemplateVisualContracts()
  registerSolutionUseCaseVisualContracts()
  registerManufacturingVisualContracts()
  registerEnergySavingVisualContracts()
  registerHydraulicVisualContracts()
  registerEducationVisualContracts()
  registerFdeVisualContracts()
  registerDatacenterVisualContracts()
  registerSmartDataHubVisualContracts()
  registerKnowledgeHubVisualContracts()
})

registerProductAiiotVisualContracts()
