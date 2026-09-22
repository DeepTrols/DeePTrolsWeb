export function checkContactPageContracts(ctx) {
  const {
    assert,
    contactPage,
    contactHero,
    contactFormSection,
  } = ctx

  assert(
    contactPage.includes('<SiteHeader />') &&
      contactPage.includes('<ContactHero />') &&
      contactPage.includes('<ContactFormSection />') &&
      contactPage.includes('<SiteFooter />') &&
      contactPage.includes('联系我们 - DeepTrols'),
    'Contact page must compose header/hero/form/footer with the contact SEO title.',
  )

  assert(
    contactHero.includes('title-line="联系我们"') &&
      contactHero.includes('align="center"') &&
      contactHero.includes('hide-cta'),
    'Contact hero must reuse PageHero centered without a CTA (the page itself is the conversion target).',
  )

  assert(
    contactFormSection.includes("$fetch('/api/leads'") &&
      contactFormSection.includes("method: 'POST'") &&
      contactFormSection.includes("source: '/contact'") &&
      contactFormSection.includes('@submit.prevent="handleSubmit"') &&
      contactFormSection.includes('name="website"') &&
      contactFormSection.includes('tabindex="-1"') &&
      contactFormSection.includes('蜜罐') &&
      contactFormSection.includes('role="alert"') &&
      contactFormSection.includes('提交成功') &&
      contactFormSection.includes('dt-button dt-button--primary dt-button--lg') &&
      contactFormSection.includes('aboutContacts') &&
      contactFormSection.includes('aboutAddress'),
    'Contact form must post to /api/leads with a hidden honeypot, inline error reporting, and a success state, alongside the shared contact channels.',
  )
}
