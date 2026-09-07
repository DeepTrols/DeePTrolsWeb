import { expect, it } from 'vitest'
import { loadHomeVisualSources } from './context'

export function registerHomeHeaderVisualContracts() {
  it('keeps HOME header rhythm and navigation contracts', () => {
    const {
      header,
      headerDesktopNav,
      headerActions,
      headerMobileNav,
      headerMenuButton,
    } = loadHomeVisualSources()

    expect(header).toContain('position: fixed')
    expect(header).toContain('height: var(--dt-header-height)')
    expect(header).not.toContain('margin-bottom: calc(var(--dt-header-height) * -1)')
    expect(header).toContain('data-slot="root"')
    expect(header).toContain('data-slot="container"')
    expect(header).toContain('src="/logo-while.svg"')
    expect(header).toContain('width: 200px')
    expect(header).toContain('filter: invert(1)')
    expect(header).toContain('background: rgba(255, 255, 255, 0.88)')
    expect(header).toContain('0 8px 20px rgba(16, 15, 20, 0.06)')
    expect(header).toContain('site-header__left')
    expect(header).toContain('width: 100%')
    expect(header).not.toContain('max-width: 1600px')
    expect(header).toContain('flex: 0 1 auto')
    expect(header).toContain('SiteHeaderDesktopNav')
    expect(header).toContain('SiteHeaderActions')
    expect(header).toContain('SiteHeaderMobileNav')
    expect(header).toContain('SiteHeaderMenuButton')
    expect(header).toContain('function handleNavMouseEnter')
    expect(header).toContain('function handleNavMouseLeave')
    expect(header).not.toContain('max-width: var(--dt-container)')
    expect(header).not.toContain('@media (max-width: 1279px)')
    expect(headerActions).toContain('site-header__github-icon')
    expect(headerActions).toContain('site-header__language-icon')
    expect(headerActions).toContain('site-header__github-icon size-5')
    expect(headerActions).toContain('site-header__language-icon size-5')
    expect(headerActions).toContain('site-header__text-link')
    expect(headerActions).toContain('登录OPS')
    expect(headerActions).toContain('margin-left: auto')
    expect(headerActions).toContain('font-size: 14px')
    expect(headerActions).not.toContain('GitFork')
    expect(headerActions).not.toContain('联系我们')
    expect(headerActions).not.toContain('免费咨询')
    expect(headerDesktopNav).toContain('<div style="position:relative;">')
    expect(headerDesktopNav).toContain('margin-left: 56px')
    expect(headerDesktopNav).toContain('width: 121px')
    expect(headerDesktopNav).toContain('@mouseenter="$emit(\'enter\', item, index)"')
    expect(headerDesktopNav).toContain('@mouseleave="$emit(\'leave\', item)"')
    expect(headerDesktopNav).toContain(":class=\"{ 'direct-link': !hasMega(item) }\"")
    expect(headerDesktopNav).toContain('color: var(--dt-color-nav-text)')
    expect(headerDesktopNav).toContain('color: var(--dt-color-primary)')
    expect(headerDesktopNav).toContain('&.direct-link:hover')
    expect(headerDesktopNav).toContain('color: var(--dt-color-primary)')
    expect(headerDesktopNav).toContain('background: transparent')
    expect(headerDesktopNav).toContain('color-mix(in oklab, #ffffff 50%, transparent)')
    expect(headerDesktopNav).toContain('border-radius: var(--dt-ui-radius)')
    expect(headerMobileNav).toContain('mobile-navigation')
    expect(headerMenuButton).toContain('Menu')
  })
}
