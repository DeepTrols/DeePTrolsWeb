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

    expect(header).toContain('height: var(--dt-header-height)')
    expect(header).toContain('margin-bottom: calc(var(--dt-header-height) * -1)')
    expect(header).toContain('data-slot="root"')
    expect(header).toContain('data-slot="container"')
    expect(header).toContain('src="/logo-while.svg"')
    expect(header).toContain('width: 200px')
    expect(header).not.toContain('filter: brightness(0) invert(1)')
    expect(header).toContain('background: rgba(21, 21, 21, 0.95)')
    expect(header).toContain('0 10px 15px -3px rgba(0, 0, 0, 0.1)')
    expect(header).toContain('site-header__left')
    expect(header).toContain('flex: 1 1 0')
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
    expect(headerActions).toContain('font-size: 14px')
    expect(headerActions).not.toContain('GitFork')
    expect(headerActions).not.toContain('联系我们')
    expect(headerActions).not.toContain('免费咨询')
    expect(headerDesktopNav).toContain('<div style="position:relative;">')
    expect(headerDesktopNav).toContain('@mouseenter="$emit(\'enter\', item, index)"')
    expect(headerDesktopNav).toContain('@mouseleave="$emit(\'leave\', item)"')
    expect(headerDesktopNav).toContain(":class=\"{ 'direct-link': !hasMega(item) }\"")
    expect(headerDesktopNav).toContain('color: var(--dt-color-nav-text)')
    expect(headerDesktopNav).toContain('color: var(--dt-color-text-highlighted)')
    expect(headerDesktopNav).toContain('&.direct-link:hover')
    expect(headerDesktopNav).toContain('color: var(--dt-color-primary)')
    expect(headerDesktopNav).toContain('rgba(39, 30, 53, 0.5)')
    expect(headerDesktopNav).toContain('color-mix(in oklab, var(--dt-color-bg-elevated) 50%, transparent)')
    expect(headerDesktopNav).toContain('border-radius: var(--dt-ui-radius)')
    expect(headerMobileNav).toContain('mobile-navigation')
    expect(headerMenuButton).toContain('Menu')
  })
}
