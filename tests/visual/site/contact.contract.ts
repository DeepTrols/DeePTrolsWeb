import { expect, it } from 'vitest'
import { readComponent } from '../utils'

export function registerContactVisualContracts() {
  it('composes the contact page with a centered hero, lead form, and shared contact channels', () => {
    const page = readComponent('pages/contact.vue')
    const hero = readComponent('components/contact/ContactHero.vue')
    const form = readComponent('components/contact/ContactFormSection.vue')

    expect(page).toContain('<SiteHeader />')
    expect(page).toContain('<ContactHero />')
    expect(page).toContain('<ContactFormSection />')
    expect(page).toContain('<SiteFooter />')
    expect(page).toContain('联系我们 - DeepTrols')

    expect(hero).toContain('title-line="联系我们"')
    expect(hero).toContain('align="center"')
    expect(hero).toContain('hide-cta')

    expect(form).toContain("$fetch('/api/leads'")
    expect(form).toContain("method: 'POST'")
    expect(form).toContain("source: '/contact'")
    expect(form).toContain('@submit.prevent="handleSubmit"')
    expect(form).toContain('name="website"')
    expect(form).toContain('tabindex="-1"')
    expect(form).toContain('role="alert"')
    expect(form).toContain('提交成功')
    expect(form).toContain('dt-button dt-button--primary dt-button--lg')
    expect(form).toContain('aboutContacts')
    expect(form).toContain('aboutAddress')
  })
}
