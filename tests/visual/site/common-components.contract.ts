import { expect, it } from 'vitest'
import { readComponent } from '../utils'

export function registerCommonComponentVisualContracts() {
  it('exposes configurable icon box size, border, and fill through the feature grid', () => {
    const iconBox = readComponent('components/common/card/IconBox.vue')
    const featureCard = readComponent('components/common/card/FeatureCard.vue')
    const featureGrid = readComponent('components/common/ProductFeatureGridSection.vue')

    expect(iconBox).toContain('dt-icon-box')
    expect(iconBox).toContain('dt-icon-box--gradient')
    expect(iconBox).toContain('bordered?: boolean')
    expect(iconBox).toContain('filled?: boolean')
    expect(iconBox).toContain('bordered: true')
    expect(iconBox).toContain('filled: true')
    expect(iconBox).toContain('icon-box--borderless')
    expect(iconBox).toContain('icon-box--unfilled')
    expect(iconBox).toContain('--dt-icon-box-shadow: none')
    expect(iconBox).toContain('--dt-icon-box-bg: transparent')
    expect(featureCard).toContain('iconBordered?: boolean')
    expect(featureCard).toContain('iconFilled?: boolean')
    expect(featureCard).toContain(':bordered="iconBordered"')
    expect(featureCard).toContain(':filled="iconFilled"')
    expect(featureGrid).toContain('iconBoxSize?: 40 | 48 | 56')
    expect(featureGrid).toContain('iconSize?: 20 | 24 | 28 | 48')
    expect(featureGrid).toContain('iconBordered?: boolean')
    expect(featureGrid).toContain('iconFilled?: boolean')
    expect(featureGrid).toContain(':icon-size="iconSize"')
    expect(featureGrid).toContain(':icon-box-size="iconBoxSize"')
    expect(featureGrid).toContain(':icon-bordered="iconBordered"')
    expect(featureGrid).toContain(':icon-filled="iconFilled"')
  })
}
