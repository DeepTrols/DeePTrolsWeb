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

  it('guards the showcase (015.14) APIs with requireAdmin, per-key zod schemas, and static fallbacks', () => {
    const showcaseUtil = readComponent('server/utils/showcase-admin.ts')
    const publicApi = readComponent('server/api/showcase/index.get.ts')
    const getApi = readComponent('server/api/admin/showcase/[key].get.ts')
    const putApi = readComponent('server/api/admin/showcase/[key].put.ts')
    const composable = readComponent('composables/use-showcase.ts')
    const logosData = readComponent('data/home-logos.ts')
    const carousel = readComponent('components/about/AboutIntroImageCarousel.vue')
    const customerLogos = readComponent('components/home/HomeCustomerLogos.vue')
    const adminApi = readComponent('admin/apps/web-antd/src/api/showcase.ts')
    const adminRoutes = readComponent('admin/apps/web-antd/src/router/routes/modules/showcase.ts')
    const cropperUpload = readComponent('admin/apps/web-antd/src/views/showcase/components/CropperUpload.vue')

    expect(showcaseUtil).toContain("SHOWCASE_KEYS = ['about-gallery', 'home-logos'] as const")
    expect(showcaseUtil).toContain('export const galleryItemSchema')
    expect(showcaseUtil).toContain('export const logoItemSchema')
    expect(showcaseUtil).toContain('safeUrlSchema(500)')
    expect(showcaseUtil).toContain('export function parseShowcaseItems(')
    expect(showcaseUtil).toContain('export async function getShowcase(')
    expect(showcaseUtil).toContain('export async function putShowcase(')

    expect(publicApi).toContain('getShowcase')
    expect(publicApi).toContain('aboutIntroGallery')
    expect(publicApi).toContain('customerLogos')
    expect(publicApi).toContain("statusCode: 400, statusMessage: 'Invalid showcase key'")
    expect(getApi).toContain('requireAdmin')
    expect(getApi).toContain("source: 'static'")
    // Logo 静态回退的纯文本条目被丢弃时必须显式计数（保存不致静默丢失）
    expect(getApi).toContain('skippedTextEntries')
    expect(getApi).toContain("statusCode: 404, statusMessage: 'Unknown showcase key'")
    expect(putApi).toContain('requireAdmin')
    expect(putApi).toContain("statusCode: 400, statusMessage: 'Invalid showcase items'")
    expect(putApi).toContain('statusCode: 503')

    // 静态回退数据必须可被 server 路由 import（纯字符串模块，无 ?url 资源导入）
    expect(logosData).toContain('export const customerLogos')
    expect(logosData).not.toContain('?url')

    expect(composable).toContain('useShowcaseGallery')
    expect(composable).toContain('useShowcaseLogos')
    expect(composable).toContain("key: 'showcase-about-gallery'")
    expect(composable).toContain("key: 'showcase-home-logos'")
    expect(carousel).toContain('useShowcaseGallery')
    expect(customerLogos).toContain('useShowcaseLogos')

    expect(adminApi).toContain('getShowcaseApi')
    expect(adminApi).toContain('saveShowcaseApi')
    expect(adminRoutes).toContain("path: '/showcase/gallery'")
    expect(adminRoutes).toContain("path: '/showcase/logos'")
    expect(cropperUpload).toContain('VCropper')
    expect(cropperUpload).toContain('getCropImage')
    expect(cropperUpload).toContain('uploadMediaApi')
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

  it('guards the component registry, section presets, drag page builder, and draft preview (015.13)', () => {
    const customProps = readComponent('components/sections/custom-props.ts')
    const sectionsUtil = readComponent('server/utils/page-sections.ts')
    const cmsRenderer = readComponent('components/sections/CmsPageRenderer.vue')
    const componentUtil = readComponent('server/utils/component-admin.ts')
    const componentsGet = readComponent('server/api/admin/components/index.get.ts')
    const adminUtil = readComponent('server/utils/admin.ts')
    const publicApi = readComponent('server/api/pages/[...path].get.ts')
    const catchAll = readComponent('pages/[...slug].vue')
    const cmsView = readComponent('components/common/CmsPageView.vue')

    // 注册组件元数据：纯 TS（禁 .vue import）+ 全名覆盖 Record
    expect(customProps).toContain('CUSTOM_COMPONENT_META')
    expect(customProps).toContain('Record<CustomSectionName, RegisteredComponentMeta>')
    expect(customProps).not.toContain(".vue'")
    // 协议：custom 稀疏 props + per-name superRefine 校验
    expect(sectionsUtil).toContain('superRefine')
    expect(sectionsUtil).toContain('props: z.record(')
    // 渲染：custom 分支 v-bind 透传（on* 过滤在 customProps）
    expect(cmsRenderer).toContain('v-bind="customProps(section)"')
    // 发现 API：registry + usage
    expect(componentUtil).toContain('export function listComponentRegistry(')
    expect(componentUtil).toContain('export function scanSectionUsage(')
    expect(componentUtil).toContain('export async function getComponentUsage(')
    expect(componentsGet).toContain('listComponentRegistry')
    expect(componentsGet).toContain('usage')

    // 模板库：协议层 + 4 路由 requireAdmin（400/404/503 语义）
    const presetUtil = readComponent('server/utils/preset-admin.ts')
    expect(presetUtil).toContain('export const presetInputSchema')
    expect(presetUtil).toContain('section: pageSectionSchema')
    expect(presetUtil).toContain('export async function listPresets(')
    expect(presetUtil).toContain('export async function createPreset(')
    expect(presetUtil).toContain('export async function updatePreset(')
    expect(presetUtil).toContain('export async function deletePreset(')
    const presetList = readComponent('server/api/admin/presets/index.get.ts')
    const presetCreate = readComponent('server/api/admin/presets/index.post.ts')
    const presetUpdate = readComponent('server/api/admin/presets/[id].put.ts')
    const presetDelete = readComponent('server/api/admin/presets/[id].delete.ts')
    for (const route of [presetList, presetCreate, presetUpdate, presetDelete]) {
      expect(route).toContain('requireAdmin')
    }
    expect(presetCreate).toContain('statusCode: 400')
    expect(presetCreate).toContain('statusCode: 503')
    expect(presetUpdate).toContain('statusCode: 404')
    expect(presetDelete).toContain('statusCode: 404')

    // vben 拖拽编辑器：useSortable + 面板 clone + BlocksEditor + 描述符表单
    const sectionsEditor = readComponent(
      'admin/apps/web-antd/src/views/pages/components/SectionsEditor.vue',
    )
    const sectionPalette = readComponent(
      'admin/apps/web-antd/src/views/pages/components/SectionPalette.vue',
    )
    const sectionBody = readComponent(
      'admin/apps/web-antd/src/views/pages/components/SectionBody.vue',
    )
    const webAntdPkg = readComponent('admin/apps/web-antd/package.json')
    expect(sectionsEditor).toContain('useSortable')
    expect(sectionsEditor).toContain('SectionPalette')
    expect(sectionPalette).toContain("pull: 'clone'")
    expect(sectionBody).toContain('BlocksEditor')
    expect(sectionBody).toContain('customComponents')
    expect(webAntdPkg).toContain('@vueuse/integrations')

    // 模板库 vben 侧：API + 路由 + 列表页
    const presetsApi = readComponent('admin/apps/web-antd/src/api/presets.ts')
    const pagesRoutes = readComponent('admin/apps/web-antd/src/router/routes/modules/pages.ts')
    const presetsView = readComponent('admin/apps/web-antd/src/views/pages/presets.vue')
    expect(presetsApi).toContain('listPresetsApi')
    expect(pagesRoutes).toContain('/pages/presets')
    expect(presetsView).toContain('deletePresetApi')

    // 草稿预览：软守卫 + 显式 query 触发 + 缓存 key 隔离 + 横幅 + iframe Drawer
    expect(adminUtil).toContain(
      'export async function isAdminRequest(event: H3Event): Promise<boolean>',
    )
    expect(publicApi).toContain('isAdminRequest')
    expect(publicApi).toContain("query.preview === '1'")
    expect(publicApi).toContain('getAdminPage')
    expect(catchAll).toContain(':preview')
    expect(cmsView).toContain('page.preview')
    const pagesEdit = readComponent('admin/apps/web-antd/src/views/pages/edit.vue')
    expect(pagesEdit).toContain('iframe')
    expect(pagesEdit).toContain('preview=1')
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

  it('guards the 23505 conflict mapping and featured single-column PATCH endpoints (audit #15/#16)', () => {
    const newsUtil = readComponent('server/utils/news-admin.ts')
    const pagesUtil = readComponent('server/utils/pages-admin.ts')
    const reportsUtil = readComponent('server/utils/reports-admin.ts')
    const newsFeaturedApi = readComponent(
      'server/api/admin/news/[id]/featured.patch.ts',
    )
    const reportFeaturedApi = readComponent(
      'server/api/admin/reports/[id]/featured.patch.ts',
    )

    // 审计#15：23505 唯一冲突 → createNews 重算 id 重试（最多 3 次）、耗尽 409；
    // check-then-insert/update 并发窗口映射既有 conflict 哨兵（端点 409），只落 warn
    expect(newsUtil).toContain('export function isUniqueViolationError(error: unknown): boolean')
    expect(newsUtil).toContain("=== '23505'")
    expect(newsUtil).toContain('CREATE_NEWS_MAX_RETRIES = 3')
    expect(newsUtil).toContain("statusCode: 409, statusMessage: 'News id conflict'")
    expect(pagesUtil).toContain('isUniqueViolationError')
    expect(reportsUtil).toContain('isUniqueViolationError')

    // 审计#16：featured 单列切换三态（null→503 / false→404 / true→ok；异常 500 穿透）
    expect(newsUtil).toContain(
      'export async function setNewsFeatured(id: number, featured: boolean): Promise<boolean | null>',
    )
    expect(reportsUtil).toContain(
      'export async function setReportFeatured(id: number, featured: boolean): Promise<boolean | null>',
    )
    expect(newsUtil).toContain('.set({ featured })')
    expect(reportsUtil).toContain('.set({ featured })')
    for (const route of [newsFeaturedApi, reportFeaturedApi]) {
      expect(route).toContain('requireAdmin')
      expect(route).toContain('z.object({ featured: z.boolean() })')
      expect(route).toContain("statusCode: 400, statusMessage: 'Invalid featured payload'")
      expect(route).toContain('statusCode: 503')
      expect(route).toContain('statusCode: 404')
    }
    expect(newsFeaturedApi).toContain('setNewsFeatured')
    expect(newsFeaturedApi).toContain("statusCode: 404, statusMessage: 'News not found'")
    expect(reportFeaturedApi).toContain('setReportFeatured')
    expect(reportFeaturedApi).toContain("statusCode: 404, statusMessage: 'Report not found'")

    // vben 列表页：推荐开关改走 PATCH 单列端点，消除 GET→整条 PUT 读改写与缺正文守卫
    const contentApi = readComponent('admin/apps/web-antd/src/api/content.ts')
    const newsList = readComponent(
      'admin/apps/web-antd/src/views/content/news/list.vue',
    )
    const reportsList = readComponent(
      'admin/apps/web-antd/src/views/content/reports/list.vue',
    )
    expect(contentApi).toContain('export const setNewsFeaturedApi')
    expect(contentApi).toContain('export const setReportFeaturedApi')
    expect(contentApi).toContain("method: 'PATCH'")
    expect(newsList).toContain('setNewsFeaturedApi(record.id, checked)')
    expect(newsList).not.toContain('getAdminNewsApi')
    expect(newsList).not.toContain('updateNewsApi')
    expect(reportsList).toContain('setReportFeaturedApi(record.id, checked)')
    expect(reportsList).not.toContain('getAdminReportApi')
    expect(reportsList).not.toContain('updateReportApi')
  })

  it('hard-caps featured budgets end-to-end (015.15): home news+reports ≤4, cases ≤3', () => {
    const limitsUtil = readComponent('server/utils/featured-limits.ts')
    const casesAdminUtil = readComponent('server/utils/cases-admin.ts')
    const casesRepo = readComponent('server/utils/cases-repo.ts')
    const newsRepo = readComponent('server/utils/news-repo.ts')
    const caseFeaturedApi = readComponent(
      'server/api/admin/cases/[slug]/featured.patch.ts',
    )

    // 预算工具：home 复用首页上限常量、news+reports 合并计数；超限 409；无 DB null 哨兵
    expect(limitsUtil).toContain('FEATURED_LIMITS')
    expect(limitsUtil).toContain('home: HOME_INSIGHTS_MAX_ITEMS')
    expect(limitsUtil).toContain('cases: 3')
    expect(limitsUtil).toContain('export async function assertFeaturedBudget(')
    expect(limitsUtil).toContain('statusCode: 409')

    // 全部写入路径收口：PATCH 单列 + POST/PUT 整单（news/reports/cases 对称）
    for (const route of [
      'server/api/admin/news/[id]/featured.patch.ts',
      'server/api/admin/reports/[id]/featured.patch.ts',
      'server/api/admin/news/index.post.ts',
      'server/api/admin/news/[id].put.ts',
      'server/api/admin/reports/index.post.ts',
      'server/api/admin/reports/[id].put.ts',
    ]) {
      expect(readComponent(route)).toContain("assertFeaturedBudget('home'")
    }
    for (const route of [
      'server/api/admin/cases/index.post.ts',
      'server/api/admin/cases/[slug].put.ts',
      'server/api/admin/cases/[slug]/featured.patch.ts',
    ]) {
      expect(readComponent(route)).toContain("assertFeaturedBudget('cases'")
    }

    // 案例 featured PATCH 端点三态 + 404
    expect(caseFeaturedApi).toContain('requireAdmin')
    expect(caseFeaturedApi).toContain('z.object({ featured: z.boolean() })')
    expect(caseFeaturedApi).toContain('setCaseFeatured')
    expect(caseFeaturedApi).toContain(
      "statusCode: 404, statusMessage: 'Case not found'",
    )
    expect(casesAdminUtil).toContain('export async function setCaseFeatured(')

    // 公开读投影透出 featured，主站两组件动态优先 + 静态回退原位保留
    expect(casesRepo).toContain('featured: cases.featured')
    expect(newsRepo).toContain('featured: news.featured')
    const caseFeaturedSection = readComponent(
      'components/case/CaseFeaturedSection.vue',
    )
    const newsHero = readComponent('components/news/NewsHero.vue')
    expect(caseFeaturedSection).toContain("useFetch('/api/cases'")
    expect(caseFeaturedSection).toContain('item.featured === true')
    expect(caseFeaturedSection).toContain('caseFeatured')
    expect(newsHero).toContain("useFetch('/api/news'")
    expect(newsHero).toContain('item.featured === true')
    expect(newsHero).toContain('getNewsByCategory')

    // vben：案例推荐列 + PATCH 单列端点
    const contentApi = readComponent('admin/apps/web-antd/src/api/content.ts')
    const casesList = readComponent(
      'admin/apps/web-antd/src/views/content/cases/list.vue',
    )
    expect(contentApi).toContain('export const setCaseFeaturedApi')
    expect(casesList).toContain('setCaseFeaturedApi(record.slug, checked)')
    expect(casesList).toContain('案例精选最多 3 条')
  })
}
