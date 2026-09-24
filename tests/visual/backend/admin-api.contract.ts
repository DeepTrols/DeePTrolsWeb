import { expect, it } from 'vitest'
import { readComponent } from '../utils'

export function registerBackendAdminVisualContracts() {
  it('guards the admin leads APIs with sealed-session auth, rate-limited login, and zod status transitions', () => {
    const adminUtil = readComponent('server/utils/admin.ts')
    const leadsAdminUtil = readComponent('server/utils/leads-admin.ts')
    const loginApi = readComponent('server/api/admin/login.post.ts')
    const logoutApi = readComponent('server/api/admin/logout.post.ts')
    const sessionApi = readComponent('server/api/admin/session.get.ts')
    const leadsListApi = readComponent('server/api/admin/leads/index.get.ts')
    const leadPatchApi = readComponent('server/api/admin/leads/[id].patch.ts')
    const nuxtConfig = readComponent('nuxt.config.ts')

    expect(adminUtil).toContain("const SESSION_NAME = 'dt-admin'")
    expect(adminUtil).toContain('export async function requireAdmin(event: H3Event)')
    expect(adminUtil).toContain('session.data.admin !== true')
    expect(adminUtil).toContain('statusCode: 401')
    expect(adminUtil).toContain('statusCode: 503')
    expect(adminUtil).toContain('timingSafeEqual')
    expect(nuxtConfig).toContain('adminPassword')
    expect(nuxtConfig).toContain('sessionPassword')

    expect(loginApi).toContain('consumeRateLimit(`admin-login:${ip}`)')
    expect(loginApi).toContain('verifyAdminPassword(body?.password, adminPassword)')
    expect(loginApi).toContain('session.update({ admin: true })')
    expect(logoutApi).toContain('session.clear()')
    expect(sessionApi).toContain('requireAdmin')

    expect(leadsAdminUtil).toContain("z.enum(['new', 'followed', 'closed'])")
    expect(leadsAdminUtil).toContain('export async function listLeads(): Promise<LeadRecord[]>')
    expect(leadsAdminUtil).toContain('desc(leads.createdAt), desc(leads.id)')
    expect(leadsAdminUtil).toContain('export async function updateLeadStatus(id: number, status: LeadStatus): Promise<boolean>')
    expect(leadsAdminUtil).toContain('.returning({ id: leads.id })')
    expect(leadsListApi).toContain('requireAdmin')
    expect(leadPatchApi).toContain('leadStatusSchema')
    expect(leadPatchApi).toContain('updateLeadStatus')
    expect(leadPatchApi).toContain('statusCode: 400')
    expect(leadPatchApi).toContain('statusCode: 404')
  })

  it('guards the admin content CRUD APIs with requireAdmin, zod inputs, and conflict semantics', () => {
    const contentUtil = readComponent('server/utils/content-admin.ts')
    const newsUtil = readComponent('server/utils/news-admin.ts')
    const casesUtil = readComponent('server/utils/cases-admin.ts')
    const reportsUtil = readComponent('server/utils/reports-admin.ts')

    expect(contentUtil).toContain("contentStatusSchema = z.enum(['draft', 'published'])")
    expect(contentUtil).toContain('solutionKeySchema')
    expect(contentUtil).toContain('isoDateSchema')
    expect(newsUtil).toContain('newsInputSchema')
    expect(newsUtil).toContain(
      'export async function createNews(input: NewsInput): Promise<number | null>',
    )
    expect(casesUtil).toContain('caseSlugSchema')
    expect(casesUtil).toContain('caseUpdateSchema = caseInputSchema.omit({ slug: true })')
    expect(casesUtil).toContain("Promise<'conflict' | string | null>")
    expect(reportsUtil).toContain("Promise<'conflict' | number | null>")
    expect(reportsUtil).toContain("Promise<'conflict' | boolean>")

    const routes = [
      'server/api/admin/news/index.get.ts',
      'server/api/admin/news/index.post.ts',
      'server/api/admin/news/[id].get.ts',
      'server/api/admin/news/[id].put.ts',
      'server/api/admin/news/[id].delete.ts',
      'server/api/admin/cases/index.get.ts',
      'server/api/admin/cases/index.post.ts',
      'server/api/admin/cases/[slug].get.ts',
      'server/api/admin/cases/[slug].put.ts',
      'server/api/admin/cases/[slug].delete.ts',
      'server/api/admin/reports/index.get.ts',
      'server/api/admin/reports/index.post.ts',
      'server/api/admin/reports/[id].get.ts',
      'server/api/admin/reports/[id].put.ts',
      'server/api/admin/reports/[id].delete.ts',
    ].map((path) => readComponent(path))
    for (const route of routes) {
      expect(route).toContain('requireAdmin')
    }

    const newsCreate = readComponent('server/api/admin/news/index.post.ts')
    const newsUpdate = readComponent('server/api/admin/news/[id].put.ts')
    const casesCreate = readComponent('server/api/admin/cases/index.post.ts')
    const casesUpdate = readComponent('server/api/admin/cases/[slug].put.ts')
    const reportsCreate = readComponent('server/api/admin/reports/index.post.ts')
    const reportsUpdate = readComponent('server/api/admin/reports/[id].put.ts')
    expect(newsCreate).toContain("statusCode: 400, statusMessage: 'Invalid news input'")
    expect(newsCreate).toContain('statusCode: 503')
    expect(newsUpdate).toContain("statusCode: 404, statusMessage: 'News not found'")
    expect(casesCreate).toContain("statusCode: 409, statusMessage: 'Case slug already exists'")
    expect(casesCreate).toContain('statusCode: 503')
    expect(casesUpdate).toContain("statusCode: 404, statusMessage: 'Case not found'")
    expect(reportsCreate).toContain("statusCode: 409, statusMessage: 'Report href already exists'")
    expect(reportsCreate).toContain('statusCode: 503')
    expect(reportsUpdate).toContain("statusCode: 409, statusMessage: 'Report href already exists'")
    expect(reportsUpdate).toContain("statusCode: 404, statusMessage: 'Report not found'")
  })

  it('guards the media library with requireAdmin, magic-byte sniffing, and a traversal-safe local driver', () => {
    const mediaUtil = readComponent('server/utils/media-admin.ts')
    const storageUtil = readComponent('server/utils/storage.ts')
    const uploadApi = readComponent('server/api/admin/upload.post.ts')
    const mediaListApi = readComponent('server/api/admin/media/index.get.ts')
    const mediaDeleteApi = readComponent('server/api/admin/media/[id].delete.ts')

    expect(mediaUtil).toContain('MAX_UPLOAD_BYTES = 5 * 1024 * 1024')
    expect(mediaUtil).toContain('export function sniffImageMime(buffer: Buffer): MediaMime | null')
    expect(mediaUtil).toContain('export async function listMedia(): Promise<MediaAssetRecord[]>')
    expect(mediaUtil).toContain('export async function deleteMediaRecord(id: number): Promise<string | null>')
    expect(storageUtil).toContain('export interface StorageDriver')
    expect(storageUtil).toContain("PUBLIC_URL_PREFIX = '/uploads/'")
    expect(storageUtil).toContain("path.includes('..')")

    expect(uploadApi).toContain('requireAdmin')
    expect(uploadApi).toContain('consumeRateLimitWith(`admin-upload:${ip}`, 30')
    expect(uploadApi).toContain('readMultipartFormData')
    expect(uploadApi).toContain("statusCode: 400, statusMessage: 'Missing file'")
    expect(uploadApi).toContain("statusCode: 413, statusMessage: 'File too large'")
    expect(uploadApi).toContain("statusCode: 415, statusMessage: 'Unsupported image type'")
    expect(uploadApi).toContain('statusCode: 503')
    expect(mediaListApi).toContain('requireAdmin')
    expect(mediaListApi).toContain('listMedia')
    expect(mediaDeleteApi).toContain('requireAdmin')
    expect(mediaDeleteApi).toContain("statusCode: 400, statusMessage: 'Invalid media id'")
    expect(mediaDeleteApi).toContain("statusCode: 404, statusMessage: 'Media not found'")
  })

  it('guards the menu management APIs with requireAdmin, whole-tree zod schemas, and static fallbacks', () => {
    const menuUtil = readComponent('server/utils/menu-admin.ts')
    const navIcons = readComponent('components/navigation/nav-icons.ts')
    const navigationApi = readComponent('server/api/navigation.get.ts')
    const menuGetApi = readComponent('server/api/admin/menus/[key].get.ts')
    const menuPutApi = readComponent('server/api/admin/menus/[key].put.ts')
    const composable = readComponent('composables/use-navigation.ts')
    const navigationData = readComponent('data/navigation.ts')

    expect(menuUtil).toContain("export const menuKeySchema = z.enum(['header', 'footer'])")
    expect(menuUtil).toContain('export const headerMenuSchema')
    expect(menuUtil).toContain('export const footerMenuSchema')
    expect(menuUtil).toContain('navIconComponents')
    expect(menuUtil).toContain('export async function getMenuItems(')
    expect(menuUtil).toContain('export async function upsertMenuItems(key: MenuKey')
    expect(navIcons).toContain('export function resolveNavIcon(name?: string)')

    // 导航数据的 icon 字段必须是可序列化的字符串（入库前提）
    expect(navigationData).toContain('icon?: string')
    expect(navigationData).not.toContain('Component')

    expect(navigationApi).toContain('getMenuItems')
    expect(navigationApi).toContain('primaryNavigation')
    expect(navigationApi).toContain('footerColumns')
    expect(navigationApi).toContain("statusCode: 400, statusMessage: 'Invalid menu key'")
    expect(menuGetApi).toContain('requireAdmin')
    expect(menuGetApi).toContain("source: 'static'")
    expect(menuPutApi).toContain('requireAdmin')
    expect(menuPutApi).toContain("statusCode: 400, statusMessage: 'Invalid menu items'")
    expect(menuPutApi).toContain('statusCode: 503')

    expect(composable).toContain('useHeaderNavigation')
    expect(composable).toContain('useFooterNavigation')
    expect(composable).toContain('default: () => primaryNavigation')
  })

  it('guards the CMS pages APIs with requireAdmin, reserved-path blacklist, and published-only public reads', () => {
    const pagesUtil = readComponent('server/utils/pages-admin.ts')
    const sectionsUtil = readComponent('server/utils/page-sections.ts')
    const publicApi = readComponent('server/api/pages/[...path].get.ts')
    const listApi = readComponent('server/api/admin/pages/index.get.ts')
    const createApi = readComponent('server/api/admin/pages/index.post.ts')
    const getApi = readComponent('server/api/admin/pages/[...slug].get.ts')
    const putApi = readComponent('server/api/admin/pages/[...slug].put.ts')
    const deleteApi = readComponent('server/api/admin/pages/[...slug].delete.ts')
    const catchAll = readComponent('pages/[...slug].vue')
    const cmsView = readComponent('components/common/CmsPageView.vue')
    const cmsRenderer = readComponent('components/sections/CmsPageRenderer.vue')
    const customNames = readComponent('components/sections/custom-names.ts')
    const customRegistry = readComponent('components/sections/custom-registry.ts')

    // 保留路径黑名单：代码路由占用即渲染不到，必须提前拦截
    expect(pagesUtil).toContain('export const CMS_RESERVED_EXACT_PATHS')
    expect(pagesUtil).toContain('export const CMS_RESERVED_PREFIXES')
    expect(pagesUtil).toContain('export function isReservedPagePath(slug: string)')
    // 页面列表全量：代码页目录在前（source:'code' 只读），CMS 页在后
    expect(pagesUtil).toContain('export const CODE_PAGE_CATALOG')
    expect(pagesUtil).toContain("source: 'cms' | 'code'")
    expect(pagesUtil).toContain('[...codeRows, ...cmsRows]')
    expect(pagesUtil).toContain('pageUpdateSchema = pageInputSchema.omit({ slug: true })')
    expect(pagesUtil).toContain("row.status !== 'published'")

    // 区块协议：discriminatedUnion 七标准型 + custom 逃生门（名字必须登记）
    expect(sectionsUtil).toContain("z.discriminatedUnion('type'")
    expect(sectionsUtil).toContain("z.literal('hero')")
    expect(sectionsUtil).toContain("z.literal('metrics')")
    expect(sectionsUtil).toContain("z.literal('featureGrid')")
    expect(sectionsUtil).toContain("z.literal('cta')")
    expect(sectionsUtil).toContain("z.literal('richText')")
    expect(sectionsUtil).toContain("z.literal('logoStrip')")
    expect(sectionsUtil).toContain("z.literal('imageBanner')")
    expect(sectionsUtil).toContain("z.literal('custom')")
    expect(sectionsUtil).toContain('articleBlocksSchema')
    expect(sectionsUtil).toContain('z.enum(CUSTOM_SECTION_NAMES)')
    expect(sectionsUtil).toContain("sectionSpacingSchema = z.enum(['tight', 'compact', 'default'])")
    expect(customNames).toContain('CUSTOM_SECTION_NAMES')
    expect(customRegistry).toContain('Record<CustomSectionName, Component>')

    for (const route of [listApi, createApi, getApi, putApi, deleteApi]) {
      expect(route).toContain('requireAdmin')
    }
    expect(createApi).toContain("statusCode: 400, statusMessage: 'Invalid page input'")
    expect(createApi).toContain("statusCode: 409, statusMessage: 'Page slug already exists'")
    expect(createApi).toContain('statusCode: 503')
    expect(putApi).toContain('pageUpdateSchema')
    expect(getApi).toContain("statusCode: 404, statusMessage: 'Page not found'")
    expect(deleteApi).toContain("statusCode: 404, statusMessage: 'Page not found'")

    expect(publicApi).toContain('getPublishedPage')
    expect(publicApi).not.toContain('requireAdmin')
    expect(catchAll).toContain('CmsPageView')
    expect(cmsView).toContain('CmsPageRenderer')
    // 渲染器：visible 过滤 + custom 逃生门分发
    expect(cmsRenderer).toContain('section.visible')
    expect(cmsRenderer).toContain('customSectionComponents[section.name]')

    // vben 结构化编辑器：defineModel 双向 + 排序/显隐 + richText JSON 草稿
    const sectionsHelper = readComponent(
      'admin/apps/web-antd/src/views/pages/sections.ts',
    )
    const sectionsEditor = readComponent(
      'admin/apps/web-antd/src/views/pages/components/SectionsEditor.vue',
    )
    const sectionBody = readComponent(
      'admin/apps/web-antd/src/views/pages/components/SectionBody.vue',
    )
    expect(sectionsHelper).toContain('export function createSection(')
    expect(sectionsHelper).toContain('export function sectionSummary(')
    expect(sectionsHelper).toContain('customSectionOptions')
    expect(sectionsHelper).toContain('spacingOptions')
    expect(sectionsEditor).toContain("defineModel<PageSection[]>('sections'")
    expect(sectionsEditor).toContain('moveItem(sections')
    expect(sectionsEditor).toContain('v-model:checked="s.visible"')
    expect(sectionBody).toContain("defineModel<PageSection>('section'")
    expect(sectionBody).toContain('function onBlocksInput(')
    expect(sectionBody).toContain('NAV_ICON_OPTIONS')
    expect(sectionBody).toContain('featureGridColumnOptions')
    expect(sectionBody).toContain('spacingOptions')
    expect(cmsRenderer).toContain('spacingClass(section)')
  })

  it('guards component management (zod disabled list behind requireAdmin) and home insights featured fallback', () => {
    const componentUtil = readComponent('server/utils/component-admin.ts')
    const componentsGet = readComponent('server/api/admin/components/index.get.ts')
    const componentsPut = readComponent('server/api/admin/components/index.put.ts')
    const insightsApi = readComponent('server/api/home/insights.get.ts')
    const homeInsightsSection = readComponent('components/home/HomeInsights.vue')
    const newsUtil = readComponent('server/utils/news-admin.ts')
    const reportsUtil = readComponent('server/utils/reports-admin.ts')

    expect(componentUtil).toContain('export const PAGE_COMPONENT_IDS')
    expect(componentUtil).toContain('export const disabledComponentsSchema')
    expect(componentUtil).toContain('CUSTOM_SECTION_NAMES')
    expect(componentUtil).toContain('export async function getDisabledComponents(')
    expect(componentUtil).toContain('export async function setDisabledComponents(')
    expect(componentUtil).toContain('onConflictDoUpdate')
    expect(componentsGet).toContain('requireAdmin')
    expect(componentsGet).toContain("source: 'static'")
    expect(componentsPut).toContain('requireAdmin')
    expect(componentsPut).toContain('disabledComponentsSchema')
    expect(componentsPut).toContain("statusCode: 400, statusMessage: 'Invalid component list'")
    expect(componentsPut).toContain('statusCode: 503')

    // 首页推荐：featured 且 published 的新闻优先、报告补足、封顶 4 条，双层静态回退
    expect(newsUtil).toContain('featured: z.boolean().default(false)')
    expect(reportsUtil).toContain('featured: z.boolean().default(false)')
    expect(insightsApi).toContain('eq(news.featured, true)')
    expect(insightsApi).toContain('eq(reports.featured, true)')
    expect(insightsApi).toContain('staticInsights')
    expect(insightsApi).not.toContain('requireAdmin')
    expect(homeInsightsSection).toContain("useFetch<InsightItem[]>('/api/home/insights'")
    expect(homeInsightsSection).toContain('default: () => insights')
  })

  it('guards the rich-text blocks editor with a blocks↔HTML converter and media-library upload', () => {
    const blocksHtml = readComponent(
      'admin/apps/web-antd/src/views/content/shared/blocks-html.ts',
    )
    const blocksEditor = readComponent(
      'admin/apps/web-antd/src/views/content/shared/BlocksEditor.vue',
    )
    const newsEdit = readComponent(
      'admin/apps/web-antd/src/views/content/news/edit.vue',
    )
    const casesEdit = readComponent(
      'admin/apps/web-antd/src/views/content/cases/edit.vue',
    )

    // 转换器：双向 + 防注入 + heading 夹紧 2-4
    expect(blocksHtml).toContain('export function blocksToHtml(')
    expect(blocksHtml).toContain('export function htmlToBlocks(')
    expect(blocksHtml).toContain('escapeHtml')
    expect(blocksHtml).toContain('clampHeadingLevel')

    // 编辑器：VbenTiptap + defineModel blocks + 回环哨兵 + 媒体库上传
    expect(blocksEditor).toContain("from '@vben/plugins/tiptap'")
    expect(blocksEditor).toContain("defineModel<null | unknown[]>('blocks'")
    expect(blocksEditor).toContain('uploadMediaApi')
    expect(blocksEditor).toContain('lastEmitted')

    // 编辑页：BlocksEditor 接入 + null 守卫阻止保存
    for (const page of [newsEdit, casesEdit]) {
      expect(page).toContain('BlocksEditor')
      expect(page).toContain('v-model:blocks="blocksValue"')
      expect(page).toContain('blocksValue.value === null')
      expect(page).not.toContain('blocksText')
    }
  })
}
