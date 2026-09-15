import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { expect, it } from 'vitest'
import { readComponent, root } from '../utils'

export function registerCaseDetailVisualContracts() {
  it('builds the case detail page from the shared article template', () => {
    const page = readComponent('pages/cases/[slug].vue')
    const listPage = readComponent('pages/cases/index.vue')
    const breadcrumb = readComponent('components/common/article/ArticleBreadcrumb.vue')
    const content = readComponent('components/common/article/ArticleContent.vue')
    const linkRows = readComponent('components/common/article/ArticleLinkRows.vue')
    const types = readComponent('types/article.ts')
    const data = readComponent('data/case-details.ts')

    expect(page).toContain('SiteHeader')
    expect(page).toContain('SiteFooter')
    expect(page).toContain('<ArticleBreadcrumb :items="breadcrumbItems" />')
    expect(page).toContain('aspect-[1920/363]')
    expect(page).toContain('grid grid-cols-1 gap-14 xl:grid-cols-[minmax(0,1025fr)_309fr] xl:gap-[66px]')
    expect(page).toContain('<ArticleContent :blocks="detail.blocks" />')
    expect(page).toContain('相关产品')
    expect(page).toContain('title="相关客户案例"')
    expect(page).toContain('<CtaSection />')
    expect(page).toContain('statusCode: 404')
    expect(page).toContain('createError')
    expect(page).not.toContain('<style')
    expect(page).not.toContain('style=')

    expect(listPage).toContain('route.query.category')
    expect(listPage).toContain('reportFilterTabs.some((tab) => tab.key === categoryQuery)')

    expect(breadcrumb).toContain('bg-[#eff0f3]')
    expect(breadcrumb).toContain('pt-[var(--dt-header-height)]')
    expect(breadcrumb).toContain('h-[58px]')
    expect(breadcrumb).toContain('text-sm leading-[21px]')
    expect(breadcrumb).toContain('text-primary hover:underline')
    expect(breadcrumb).toContain('text-[#7e7e7e]')
    expect(breadcrumb).toContain('rotate-45 border-r-[1.4px] border-t-[1.4px] border-[#a6a6a6]')
    expect(breadcrumb).toContain('aria-label="面包屑"')
    expect(breadcrumb).not.toContain('<style')
    expect(breadcrumb).not.toContain('style=')

    expect(content).toContain('text-base leading-[30px] text-justify text-[#1d2234]')
    expect(content).toContain("'first:mt-0 mb-5 mt-14 text-left text-[26px] font-medium leading-[38px] text-[#1d2234]'")
    expect(content).toContain("'first:mt-0 mb-3.5 mt-10 text-left text-xl font-medium leading-8 text-[#1d2234]'")
    expect(content).toContain("'first:mt-0 mb-2.5 mt-8 text-left text-[17px] font-medium leading-7 text-[#1d2234]'")
    expect(content).toContain('list-disc pl-[26px] marker:text-primary')
    expect(content).toContain('list-decimal pl-[26px] marker:text-primary')
    expect(content).toContain('my-9 border-l-[3px] border-l-primary py-0.5 pl-6 text-[#3f4d64]')
    expect(content).toContain('my-12 h-px bg-[#e2e2e2]')
    expect(content).toContain('figcaption')
    expect(content).not.toContain('<style')
    expect(content).not.toContain('style=')

    expect(linkRows).toContain('flow-root pb-32 lg:pb-44')
    expect(linkRows).toContain('h-[55px]')
    expect(linkRows).toContain('size-1 shrink-0 rounded-full bg-primary')
    expect(linkRows).toContain('truncate text-base leading-6 text-[#555]')
    expect(linkRows).toContain('ArrowRight')
    expect(linkRows).not.toContain('<style')
    expect(linkRows).not.toContain('style=')

    expect(types).toContain("export type ArticleBlock =")
    expect(types).toContain("type: 'heading'")
    expect(types).toContain("type: 'paragraph'")
    expect(types).toContain("type: 'list'")
    expect(types).toContain("type: 'quote'")
    expect(types).toContain("type: 'image'")
    expect(types).toContain("type: 'divider'")

    expect(data).toContain('模拟样例：7 条案例详情与 data/cases.ts 的 caseResources slug 一一对应')
    expect(data).toContain('export const caseDetails: CaseDetail[] = [')
    expect(data).toContain('export function getCaseDetailBySlug(slug: string)')
    expect(data).toContain("slug: 'automotive-parts-device-agent'")
    expect(data).toContain("slug: 'datacenter-compute-power'")
    expect(data).toContain("categoryKey: 'smart-manufacturing'")
    expect(data).toContain("categoryKey: 'compute-power'")

    expect(existsSync(join(root, 'public/images/common/detail-hero-placeholder.svg'))).toBe(true)
    expect(existsSync(join(root, 'public/images/common/content-placeholder.svg'))).toBe(true)
  })
}
