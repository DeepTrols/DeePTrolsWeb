import { expect, it } from 'vitest'
import { readComponent } from '../../utils'

export function registerSolutionUseCaseVisualContracts() {
  it('renders generated use case pages through the reusable solution template', () => {
    const page = readComponent('pages/solutions/[slug].vue')
    const data = readComponent('data/solutions/use-cases.ts')
    const visual = readComponent('components/solution/SolutionScenarioVisual.vue')
    const navigation = readComponent('data/navigation.ts')
    const footer = readComponent('data/footer.ts')

    expect(page).toContain('SolutionPageTemplate')
    expect(page).toContain('SolutionScenarioVisual')
    expect(page).toContain('getSolutionUseCaseBySlug')
    expect(page).toContain('createError')
    expect(page).toContain('<template #hero-visual>')
    expect(page).not.toContain('SiteHeader')
    expect(page).not.toContain('SiteFooter')
    expect(page).not.toContain('<style')
    expect(page).not.toContain('style=')

    expect(visual).toContain('HeroVisualShell')
    expect(visual).toContain('IconBox')
    expect(visual).toContain('panel-class="overflow-hidden rounded-2xl border border-default bg-dt-bg-soft/70')
    expect(visual).toContain('v-for="(layer, index) in visual.layers"')
    expect(visual).toContain('v-for="signal in visual.signals"')
    expect(visual).not.toContain('<style')
    expect(visual).not.toContain('style=')
    expect(visual).not.toContain('@apply')

    for (const route of [
      '/solutions/manufacturing',
      '/solutions/environment',
      '/solutions/water',
      '/solutions/energy',
      '/solutions/data-governance',
      '/solutions/enterprise-ai',
      '/solutions/city',
      '/solutions/healthcare',
    ]) {
      expect(data).toContain(route)
      expect(navigation).toContain(route)
      expect(footer).toContain(route)
    }

    expect(data).toContain('solutionUseCaseSlugs')
    expect(data).toContain('solutionUseCasePages')
    expect(data).toContain('getSolutionUseCaseBySlug')
    expect(data).toContain('智能制造')
    expect(data).toContain('智慧医疗')
    expect(data).not.toContain('doc/product/PAGE_REQUIREMENTS')
  })
}
