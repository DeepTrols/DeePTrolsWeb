import { expect, it } from 'vitest'
import { loadHomeVisualSources } from './context'

export function registerHomeAboutVisualContracts() {
  it('keeps HOME about section aligned with the DeepCtrls company and partner reference', () => {
    const {
      homeAbout,
      homeData,
      page,
      tailwind,
    } = loadHomeVisualSources()

    expect(page).toContain('<HomeEcosystem />\n      <HomeAbout />\n      <HomeInsights />')
    expect(homeAbout).toContain('SectionHeading')
    expect(homeAbout).toContain(':eyebrow="homeAbout.eyebrow"')
    expect(homeAbout).toContain(':title="homeAbout.title"')
    expect(homeAbout).toContain('title-id="home-about-title"')
    expect(homeAbout).toContain(
      'class="home-about bg-[linear-gradient(180deg,#ffffff_52.91%,#eceeff_120.63%)] flow-root"',
    )
    expect(homeAbout).toContain('class="container mt-10 mb-10"')
    expect(homeAbout).not.toContain('whitespace-pre-line')
    expect(homeAbout).toContain('company-stats__banner block aspect-[1402/357] w-full rounded-dt-md object-cover')
    expect(homeAbout).toContain(
      'clients-label mx-auto mb-[42px] mt-[62px] block h-auto max-h-[26px] w-auto max-w-full object-contain',
    )
    expect(homeAbout).toContain('partner-rows flex w-screen flex-col gap-[18px] overflow-hidden')
    expect(homeAbout).toContain('partner-row__track flex w-max items-center gap-[22px] motion-reduce:animate-none')
    expect(homeAbout).toContain('animate-home-about-marquee-right')
    expect(homeAbout).toContain('animate-home-about-marquee-left')
    expect(homeAbout).toContain('partner-logo flex h-[55px] w-36 shrink-0')
    expect(homeAbout).toContain('block h-[55px] w-36 object-contain')
    expect(homeAbout).not.toContain('<style')

    expect(homeData).toContain("export const homeAbout: HomeAboutContent")
    expect(homeData).toContain("eyebrow: '关于我们'")
    expect(homeData).toContain("title: '深度数智，企业AI基础设施赛道的构建者与引领者'")
    expect(homeData).toContain("bannerImage: '/O1CN0.png'")
    expect(homeData).toContain("clientsLabelImage: '/clients-label.webp'")
    expect(homeData).toContain('partnerRows')
    expect(tailwind).toContain('--animate-home-about-marquee-left')
    expect(tailwind).toContain('--animate-home-about-marquee-right')
    expect(tailwind).toContain('@keyframes home-about-marquee-left')
    expect(tailwind).toContain('@keyframes home-about-marquee-right')
  })
}
