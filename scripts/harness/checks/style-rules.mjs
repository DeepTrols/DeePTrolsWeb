export function checkStyleRules(ctx) {
  const { assert, read, listFiles, footer, footerSubscribe, footerMain, footerSocials, footerBottom, footerData } = ctx
const filesToScan = [
  ...listFiles('components', (path) => path.endsWith('.vue')),
  ...listFiles('pages', (path) => path.endsWith('.vue')),
  ...listFiles('data', (path) => path.endsWith('.ts')),
  'assets/scss/main.scss',
]

for (const file of filesToScan) {
  const source = read(file)
  assert(!source.includes('@apply'), `${file} contains @apply, which is not processed by the current Nuxt build.`)
  assert(
    !/doc\/product\/PAGE_REQUIREMENTS\/.*\/imgs\/.*\?url/.test(source),
    `${file} imports runtime assets from doc/product/**/imgs. Move the asset to assets/images/** or public/images/** first.`,
  )

  if (file.endsWith('.vue') && file.startsWith('components/') && source.includes('<style')) {
    assert(source.includes('<style scoped lang="scss">'), `${file} must use <style scoped lang="scss">.`)
  }

  if (file.endsWith('.vue')) {
    const lineCount = source.split(/\r?\n/).length
    assert(lineCount <= 300, `${file} exceeds the 300-line component limit (${lineCount}).`)
  }

  const sourceWithoutRequiredNavWrapper = source.replace(' style="position:relative;"', '')
  assert(!/\sstyle=/.test(sourceWithoutRequiredNavWrapper), `${file} contains an inline style attribute.`)
}

const footerSources = [footer, footerSubscribe, footerMain, footerSocials, footerBottom, footerData].join('\n')
assert(!footerSources.includes('class="site-footer__locale"'), 'Footer locale switcher must remain removed.')
assert(
  footer.indexOf('<FooterMain') > -1 &&
    footer.indexOf('<FooterSocials') > footer.indexOf('<FooterMain') &&
    footer.indexOf('class="site-footer__rule site-footer__rule--bottom"') > footer.indexOf('<FooterSocials'),
  'Footer socials must be a sibling after site-footer__main and before bottom rule.',
)
}
