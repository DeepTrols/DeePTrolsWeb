import { registerHomeCasesVisualContracts } from './home/cases.contract'
import { registerHomeDesignVisualContracts } from './home/design.contract'
import { registerHomeEcosystemVisualContracts } from './home/ecosystem.contract'
import { registerHomeFooterVisualContracts } from './home/footer.contract'
import { registerHomeHeaderVisualContracts } from './home/header.contract'
import { registerHomeHeroProductVisualContracts } from './home/hero-product.contract'
import { registerHomeInsightsCtaVisualContracts } from './home/insights-cta.contract'
import { registerHomeSolutionsVisualContracts } from './home/solutions.contract'

export function registerHomeVisualContracts() {
  registerHomeDesignVisualContracts()
  registerHomeHeaderVisualContracts()
  registerHomeHeroProductVisualContracts()
  registerHomeSolutionsVisualContracts()
  registerHomeEcosystemVisualContracts()
  registerHomeCasesVisualContracts()
  registerHomeInsightsCtaVisualContracts()
  registerHomeFooterVisualContracts()
}
