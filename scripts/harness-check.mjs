import { existsSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import { checkAboutPageContracts } from './harness/checks/about-page.mjs'
import { checkDesignSystemContracts } from './harness/checks/design-system.mjs'
import { checkHomeLayoutContracts } from './harness/checks/home-layout.mjs'
import { checkProductAiiotContracts } from './harness/checks/product-aiiot.mjs'
import { checkProductDataContracts } from './harness/checks/product-data.mjs'
import { checkServiceReportContracts } from './harness/checks/service-report.mjs'
import { checkSolutionUseCaseContracts } from './harness/checks/solution-use-cases.mjs'
import { checkSolutionTemplateContracts } from './harness/checks/solution-template.mjs'
import { checkStyleRules } from './harness/checks/style-rules.mjs'
import { checkWhyPageContracts } from './harness/checks/why-page.mjs'
import { checkRequiredFiles } from './harness/required-files.mjs'
import { loadHarnessSources } from './harness/sources.mjs'
import { assert, failures, listFiles, read, root } from './harness/utils.mjs'

const ctx = {
  assert,
  existsSync,
  join,
  listFiles,
  read,
  root,
  ...loadHarnessSources(read),
}

checkRequiredFiles(ctx)
checkDesignSystemContracts(ctx)
checkProductAiiotContracts(ctx)
checkHomeLayoutContracts(ctx)
checkWhyPageContracts(ctx)
checkProductDataContracts(ctx)
checkAboutPageContracts(ctx)
checkServiceReportContracts(ctx)
checkSolutionTemplateContracts(ctx)
checkSolutionUseCaseContracts(ctx)
checkStyleRules(ctx)

if (failures.length) {
  console.error('Harness Engineering check failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Harness Engineering check passed.')
