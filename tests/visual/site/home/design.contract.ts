import { expect, it } from 'vitest'
import { loadHomeVisualSources } from './context'

export function registerHomeDesignVisualContracts() {
  it('keeps HOME design tokens and common component contracts', () => {
    const {
      tailwind,
      tokens,
      baseButton,
      sectionHeading,
      sectionHeader,
    } = loadHomeVisualSources()

    expect(sectionHeading).toContain('SectionHeader')
    expect(sectionHeader).toContain('section-heading--nowrap-subtitle')
    expect(sectionHeader).toContain('max-width: none')
    expect(tailwind).toContain('@import "tailwindcss"')
    expect(tailwind).toContain('@theme inline')
    expect(tailwind).toContain('--color-dt-primary: var(--dt-color-primary)')
    expect(tailwind).toContain('--color-dimmed: var(--dt-color-text-muted)')
    expect(tailwind).toContain('@utility bg-default')
    expect(tailwind).toContain('background-color: var(--dt-color-bg)')
    expect(tailwind).toContain('@utility border-default')
    expect(tokens).toContain('--dt-container: 80rem')
    expect(tokens).toContain('--dt-container-2xl: 96rem')
    expect(tokens).toContain('--dt-color-bg: #151515')
    expect(tokens).toContain('--dt-color-text-highlighted: #ffffff')
    expect(tokens).toContain('--dt-color-nav-text: #e5e5e5')
    expect(tokens).toContain('--dt-radius-lg: 16px')
    expect(tokens).toContain('@media (min-width: 1536px)')
    expect(tokens).toContain('--dt-gradient-spotlight')
    expect(tokens).toContain('--dt-card-radius: var(--dt-radius-lg)')
    expect(tokens).toContain('--dt-icon-box-radius: var(--dt-radius-md)')
    expect(tokens).toContain('.dt-button')
    expect(tokens).toContain('.dt-card')
    expect(tokens).toContain('.dt-card--adaptive')
    expect(tokens).toContain('.dt-card--feature')
    expect(tokens).toContain('.dt-card--soft')
    expect(tokens).toContain('.dt-tab-list')
    expect(tokens).toContain('.dt-tab')
    expect(tokens).toContain('.dt-segmented-tabs')
    expect(tokens).toContain('.dt-segmented-tab')
    expect(tokens).toContain('.dt-product-card')
    expect(tokens).toContain('.dt-ecosystem-card')
    expect(tokens).toContain('.dt-icon-box')
    expect(tokens).toContain('border-radius: var(--dt-icon-box-radius)')
    expect(tokens).toContain('border-radius: var(--dt-card-radius)')
    expect(tokens).toContain('transform: translateY(-4px)')
    expect(tokens).toContain('box-shadow: var(--dt-card-hover-shadow, var(--dt-shadow-primary))')
    expect(tokens).not.toContain('min-height: 280px')
    expect(tokens).toContain('.dt-card-tag')
    expect(tokens).toContain('.dt-cta-panel')
    expect(tokens).not.toContain('@apply')
    expect(baseButton).toContain('data-slot="base"')
    expect(baseButton).toContain('data-slot="label"')
    expect(baseButton).toContain('data-slot="trailingIcon"')
    expect(baseButton).toContain('dt-button')
    expect(sectionHeading).toContain('titleId')
    expect(sectionHeading).toContain('nowrapSubtitle')
    expect(sectionHeader).toContain('align?: \'left\' | \'center\' | \'right\'')
    expect(sectionHeader).toContain('level?: 1 | 2 | 3')
    expect(sectionHeader).toContain('slots.actions')
    expect(sectionHeader).toContain('class="section-heading dt-section-heading"')
  })
}
