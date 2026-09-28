export function checkBackendAdminContracts(ctx) {
  const {
    assert,
    backendAdminUtil,
    backendLeadsAdminUtil,
    backendAdminLoginApi,
    backendAdminLogoutApi,
    backendAdminSessionApi,
    backendAdminLeadsListApi,
    backendAdminLeadPatchApi,
    backendContentAdminUtil,
    backendNewsAdminUtil,
    backendCasesAdminUtil,
    backendReportsAdminUtil,
    backendAdminNewsListApi,
    backendAdminNewsCreateApi,
    backendAdminNewsGetApi,
    backendAdminNewsUpdateApi,
    backendAdminNewsDeleteApi,
    backendAdminCasesListApi,
    backendAdminCasesCreateApi,
    backendAdminCaseGetApi,
    backendAdminCaseUpdateApi,
    backendAdminCaseDeleteApi,
    backendAdminReportsListApi,
    backendAdminReportsCreateApi,
    backendAdminReportGetApi,
    backendAdminReportUpdateApi,
    backendAdminReportDeleteApi,
    backendStorageUtil,
    backendMediaAdminUtil,
    backendAdminUploadApi,
    backendAdminMediaListApi,
    backendAdminMediaDeleteApi,
    backendMenuAdminUtil,
    backendNavigationApi,
    backendAdminMenuGetApi,
    backendAdminMenuPutApi,
    backendPagesAdminUtil,
    backendPageSectionsUtil,
    backendPagesPublicApi,
    backendAdminPagesListApi,
    backendAdminPagesCreateApi,
    backendAdminPageGetApi,
    backendAdminPageUpdateApi,
    backendAdminPageDeleteApi,
    cmsPageView,
    cmsPageRenderer,
    cmsCustomNames,
    cmsCustomRegistry,
    catchAllPage,
    adminPagesSectionsHelper,
    adminSectionsEditor,
    adminSectionBody,
    contentBlocksHtml,
    contentBlocksEditor,
    backendComponentAdminUtil,
    backendAdminComponentsGetApi,
    backendAdminComponentsPutApi,
    backendHomeInsightsApi,
    adminComponentsApi,
    adminComponentsRoutes,
    adminComponentsView,
    cmsCustomProps,
    backendPresetAdminUtil,
    backendAdminPresetsListApi,
    backendAdminPresetsCreateApi,
    backendAdminPresetUpdateApi,
    backendAdminPresetDeleteApi,
    adminPresetsApi,
    adminSectionPalette,
    adminPresetsView,
    adminPagesRoutes,
    adminPagesEditView,
    adminWebAntdPkg,
    homeInsights,
    navIconRegistry,
    navigationComposable,
    backendShowcaseAdminUtil,
    backendShowcasePublicApi,
    backendAdminShowcaseGetApi,
    backendAdminShowcasePutApi,
    showcaseComposable,
    homeLogosData,
    homeCustomerLogos,
    aboutIntroImageCarousel,
    adminShowcaseApi,
    adminShowcaseRoutes,
    adminCropperUpload,
    adminShowcaseGalleryView,
    adminShowcaseLogosView,
    backendNuxtConfig,
  } = ctx

  assert(
    backendAdminUtil.includes("const SESSION_NAME = 'dt-admin'") &&
      backendAdminUtil.includes('export async function requireAdmin(event: H3Event)') &&
      backendAdminUtil.includes('statusCode: 503') &&
      backendAdminUtil.includes('session.data.admin !== true') &&
      backendAdminUtil.includes('statusCode: 401') &&
      backendAdminUtil.includes('export function verifyAdminPassword(input: unknown, expected: string): boolean') &&
      backendAdminUtil.includes('timingSafeEqual') &&
      backendNuxtConfig.includes('adminPassword') &&
      backendNuxtConfig.includes('sessionPassword'),
    'Admin util must guard via sealed session (503 unconfigured / 401 unauthenticated) with a timing-safe password check wired to runtimeConfig.',
  )

  assert(
    backendAdminLoginApi.includes('consumeRateLimit(`admin-login:${ip}`)') &&
      backendAdminLoginApi.includes('verifyAdminPassword(body?.password, adminPassword)') &&
      backendAdminLoginApi.includes('session.update({ admin: true })') &&
      backendAdminLogoutApi.includes('session.clear()') &&
      backendAdminSessionApi.includes('requireAdmin'),
    'Login must be rate-limited and sealed-session based; logout clears the session; session.get probes auth for the external admin SPA.',
  )

  assert(
    backendLeadsAdminUtil.includes("z.enum(['new', 'followed', 'closed'])") &&
      backendLeadsAdminUtil.includes('export async function listLeads(): Promise<LeadRecord[]>') &&
      backendLeadsAdminUtil.includes('desc(leads.createdAt), desc(leads.id)') &&
      backendLeadsAdminUtil.includes('export async function updateLeadStatus(id: number, status: LeadStatus): Promise<boolean>') &&
      backendLeadsAdminUtil.includes('.returning({ id: leads.id })') &&
      backendAdminLeadsListApi.includes('requireAdmin') &&
      backendAdminLeadsListApi.includes('listLeads') &&
      backendAdminLeadPatchApi.includes('leadStatusSchema') &&
      backendAdminLeadPatchApi.includes('updateLeadStatus') &&
      backendAdminLeadPatchApi.includes('statusCode: 400') &&
      backendAdminLeadPatchApi.includes('statusCode: 404'),
    'Admin leads APIs must stay behind requireAdmin with zod-validated status transitions (400 invalid / 404 unknown).',
  )

  assert(
    backendContentAdminUtil.includes("contentStatusSchema = z.enum(['draft', 'published'])") &&
      backendContentAdminUtil.includes('solutionKeySchema') &&
      backendContentAdminUtil.includes('isoDateSchema') &&
      backendNewsAdminUtil.includes('newsInputSchema') &&
      backendNewsAdminUtil.includes('export async function createNews(input: NewsInput): Promise<number | null>') &&
      backendNewsAdminUtil.includes('export async function updateNews(id: number, input: NewsInput): Promise<boolean>') &&
      backendCasesAdminUtil.includes('caseSlugSchema') &&
      backendCasesAdminUtil.includes('caseUpdateSchema = caseInputSchema.omit({ slug: true })') &&
      backendCasesAdminUtil.includes("Promise<'conflict' | string | null>") &&
      backendReportsAdminUtil.includes("Promise<'conflict' | number | null>") &&
      backendReportsAdminUtil.includes("Promise<'conflict' | boolean>"),
    'Content admin utils must zod-validate news/case/report inputs, keep case slug immutable on update, and surface slug/href conflicts.',
  )

  const contentRoutes = [
    backendAdminNewsListApi,
    backendAdminNewsCreateApi,
    backendAdminNewsGetApi,
    backendAdminNewsUpdateApi,
    backendAdminNewsDeleteApi,
    backendAdminCasesListApi,
    backendAdminCasesCreateApi,
    backendAdminCaseGetApi,
    backendAdminCaseUpdateApi,
    backendAdminCaseDeleteApi,
    backendAdminReportsListApi,
    backendAdminReportsCreateApi,
    backendAdminReportGetApi,
    backendAdminReportUpdateApi,
    backendAdminReportDeleteApi,
  ]
  assert(
    contentRoutes.every((route) => route.includes('requireAdmin')) &&
      backendAdminNewsCreateApi.includes("statusCode: 400, statusMessage: 'Invalid news input'") &&
      backendAdminNewsCreateApi.includes('statusCode: 503') &&
      backendAdminNewsUpdateApi.includes("statusCode: 404, statusMessage: 'News not found'") &&
      backendAdminNewsDeleteApi.includes("statusCode: 404, statusMessage: 'News not found'") &&
      backendAdminCasesCreateApi.includes("statusCode: 409, statusMessage: 'Case slug already exists'") &&
      backendAdminCasesCreateApi.includes('statusCode: 503') &&
      backendAdminCaseUpdateApi.includes("statusCode: 404, statusMessage: 'Case not found'") &&
      backendAdminCaseDeleteApi.includes("statusCode: 404, statusMessage: 'Case not found'") &&
      backendAdminReportsCreateApi.includes("statusCode: 409, statusMessage: 'Report href already exists'") &&
      backendAdminReportsCreateApi.includes('statusCode: 503') &&
      backendAdminReportUpdateApi.includes("statusCode: 409, statusMessage: 'Report href already exists'") &&
      backendAdminReportUpdateApi.includes("statusCode: 404, statusMessage: 'Report not found'") &&
      backendAdminReportDeleteApi.includes("statusCode: 404, statusMessage: 'Report not found'"),
    'Admin content CRUD routes must stay behind requireAdmin with 400/404/409/503 semantics (case slug + report href conflicts).',
  )

  assert(
    backendMediaAdminUtil.includes('MAX_UPLOAD_BYTES = 5 * 1024 * 1024') &&
      backendMediaAdminUtil.includes('export function sniffImageMime(buffer: Buffer): MediaMime | null') &&
      backendMediaAdminUtil.includes('export async function listMedia(): Promise<MediaAssetRecord[]>') &&
      backendMediaAdminUtil.includes('export async function deleteMediaRecord(id: number): Promise<string | null>') &&
      backendStorageUtil.includes('export interface StorageDriver') &&
      backendStorageUtil.includes("PUBLIC_URL_PREFIX = '/uploads/'") &&
      backendStorageUtil.includes("path.includes('..')"),
    'Media library must keep a 5MB whitelist (magic-byte sniffed) upload protocol and a traversal-guarded local StorageDriver.',
  )

  assert(
    backendAdminUploadApi.includes('requireAdmin') &&
      backendAdminUploadApi.includes('consumeRateLimitWith(`admin-upload:${ip}`, 30') &&
      backendAdminUploadApi.includes('readMultipartFormData') &&
      backendAdminUploadApi.includes("statusCode: 400, statusMessage: 'Missing file'") &&
      backendAdminUploadApi.includes("statusCode: 413, statusMessage: 'File too large'") &&
      backendAdminUploadApi.includes("statusCode: 415, statusMessage: 'Unsupported image type'") &&
      backendAdminUploadApi.includes('statusCode: 503') &&
      backendAdminMediaListApi.includes('requireAdmin') &&
      backendAdminMediaListApi.includes('listMedia') &&
      backendAdminMediaDeleteApi.includes('requireAdmin') &&
      backendAdminMediaDeleteApi.includes("statusCode: 400, statusMessage: 'Invalid media id'") &&
      backendAdminMediaDeleteApi.includes("statusCode: 404, statusMessage: 'Media not found'"),
    'Admin upload/media routes must stay behind requireAdmin with rate-limited multipart upload (400/413/415/503) and 400/404 delete semantics.',
  )

  assert(
    backendMenuAdminUtil.includes("export const menuKeySchema = z.enum(['header', 'footer'])") &&
      backendMenuAdminUtil.includes('export const headerMenuSchema') &&
      backendMenuAdminUtil.includes('export const footerMenuSchema') &&
      backendMenuAdminUtil.includes('export function parseMenuItems(key: MenuKey, items: unknown)') &&
      backendMenuAdminUtil.includes('export async function getMenuItems(') &&
      backendMenuAdminUtil.includes('export async function upsertMenuItems(key: MenuKey') &&
      navIconRegistry.includes('export const navIconComponents: Record<string, Component>') &&
      navIconRegistry.includes('export function resolveNavIcon(name?: string)'),
    'Menu protocol must keep key enum (header/footer), whole-tree zod schemas, icon registry, and get/upsert helpers.',
  )

  assert(
    backendNavigationApi.includes('getMenuItems') &&
      backendNavigationApi.includes('primaryNavigation') &&
      backendNavigationApi.includes("statusCode: 400, statusMessage: 'Invalid menu key'") &&
      backendNavigationApi.includes('footerColumns') &&
      backendAdminMenuGetApi.includes('requireAdmin') &&
      backendAdminMenuGetApi.includes("source: 'static'") &&
      backendAdminMenuPutApi.includes('requireAdmin') &&
      backendAdminMenuPutApi.includes("statusCode: 400, statusMessage: 'Invalid menu items'") &&
      backendAdminMenuPutApi.includes('statusCode: 503') &&
      navigationComposable.includes('useHeaderNavigation') &&
      navigationComposable.includes('useFooterNavigation') &&
      navigationComposable.includes('default: () => primaryNavigation'),
    'Navigation APIs must stay DB-first with static fallback; admin menus routes behind requireAdmin; composable keeps useFetch default fallback.',
  )

  assert(
    backendShowcaseAdminUtil.includes(
      "SHOWCASE_KEYS = ['about-gallery', 'home-logos'] as const",
    ) &&
      backendShowcaseAdminUtil.includes('export const galleryItemSchema') &&
      backendShowcaseAdminUtil.includes('safeUrlSchema(500)') &&
      backendShowcaseAdminUtil.includes('export const logoItemSchema') &&
      backendShowcaseAdminUtil.includes('export function parseShowcaseItems(') &&
      backendShowcaseAdminUtil.includes('export async function getShowcase(') &&
      backendShowcaseAdminUtil.includes('export async function putShowcase('),
    'Showcase protocol (015.14) must keep the about-gallery/home-logos key whitelist, gallery/logo item zod schemas, and get/put helpers with three-state semantics.',
  )

  assert(
    backendShowcasePublicApi.includes('getShowcase') &&
      backendShowcasePublicApi.includes('aboutIntroGallery') &&
      backendShowcasePublicApi.includes('customerLogos') &&
      backendShowcasePublicApi.includes(
        "statusCode: 400, statusMessage: 'Invalid showcase key'",
      ) &&
      backendShowcasePublicApi.includes("source: 'static'") &&
      backendAdminShowcaseGetApi.includes('requireAdmin') &&
      backendAdminShowcaseGetApi.includes('skippedTextEntries') &&
      backendAdminShowcaseGetApi.includes(
        "statusCode: 404, statusMessage: 'Unknown showcase key'",
      ) &&
      backendAdminShowcasePutApi.includes('requireAdmin') &&
      backendAdminShowcasePutApi.includes(
        "statusCode: 400, statusMessage: 'Invalid showcase items'",
      ) &&
      backendAdminShowcasePutApi.includes('statusCode: 503') &&
      showcaseComposable.includes('useShowcaseGallery') &&
      showcaseComposable.includes('useShowcaseLogos') &&
      showcaseComposable.includes("key: 'showcase-about-gallery'") &&
      showcaseComposable.includes("key: 'showcase-home-logos'") &&
      showcaseComposable.includes('default: () => aboutIntroGallery') &&
      showcaseComposable.includes('default: () => customerLogos') &&
      homeLogosData.includes('export const customerLogos') &&
      aboutIntroImageCarousel.includes('useShowcaseGallery') &&
      homeCustomerLogos.includes('useShowcaseLogos'),
    'Showcase APIs (015.14) must stay DB-first with static fallback (admin GET counts skippedTextEntries); composable keeps fixed keys + default fallback; both main-site components consume the composable.',
  )

  assert(
    adminShowcaseApi.includes('getShowcaseApi') &&
      adminShowcaseApi.includes('saveShowcaseApi') &&
      adminShowcaseApi.includes('skippedTextEntries') &&
      adminShowcaseRoutes.includes("path: '/showcase/gallery'") &&
      adminShowcaseRoutes.includes("path: '/showcase/logos'") &&
      adminCropperUpload.includes('VCropper') &&
      adminCropperUpload.includes('getCropImage') &&
      adminCropperUpload.includes('uploadMediaApi') &&
      adminCropperUpload.includes('maxOutputHeight') &&
      adminShowcaseGalleryView.includes("aspect-ratio=\"10:16\"") &&
      adminShowcaseGalleryView.includes(':output-height="768"') &&
      adminShowcaseGalleryView.includes(':output-width="480"') &&
      adminShowcaseLogosView.includes(':max-output-height="192"') &&
      adminShowcaseLogosView.includes('skippedTextEntries > 0'),
    'vben showcase modules (015.14) must keep the /showcase routes, the VCropper-based CropperUpload (10:16 fixed gallery crop, free logo crop capped at 192px height), and gallery/logos editor views.',
  )

  assert(
    backendPagesAdminUtil.includes('export const CMS_RESERVED_EXACT_PATHS') &&
      backendPagesAdminUtil.includes('export const CMS_RESERVED_PREFIXES') &&
      backendPagesAdminUtil.includes('export function isReservedPagePath(slug: string)') &&
      backendPagesAdminUtil.includes('export const CODE_PAGE_CATALOG') &&
      backendPagesAdminUtil.includes("source: 'cms' | 'code'") &&
      backendPagesAdminUtil.includes("[...codeRows, ...cmsRows]") &&
      backendPagesAdminUtil.includes('pageUpdateSchema = pageInputSchema.omit({ slug: true })') &&
      backendPagesAdminUtil.includes('export async function getPublishedPage(') &&
      backendPagesAdminUtil.includes("row.status !== 'published'") &&
      backendPagesAdminUtil.includes("Promise<'conflict' | string | null>") &&
      backendPageSectionsUtil.includes("z.discriminatedUnion('type'") &&
      backendPageSectionsUtil.includes("z.literal('richText')") &&
      backendPageSectionsUtil.includes('articleBlocksSchema') &&
      backendPageSectionsUtil.includes('z.enum(CUSTOM_SECTION_NAMES)') &&
      backendPageSectionsUtil.includes('visible: z.boolean().default(true)') &&
      backendPageSectionsUtil.includes("sectionSpacingSchema = z.enum(['tight', 'compact', 'default'])"),
    'Pages protocol must keep reserved-path blacklist, code-page catalog merge (source cms|code), immutable slug PK, published-only public reads, conflict semantics, and a discriminatedUnion section schema with spacing enum and custom escape hatch.',
  )

  const pagesRoutes = [
    backendAdminPagesListApi,
    backendAdminPagesCreateApi,
    backendAdminPageGetApi,
    backendAdminPageUpdateApi,
    backendAdminPageDeleteApi,
  ]
  assert(
    pagesRoutes.every((route) => route.includes('requireAdmin')) &&
      backendAdminPagesCreateApi.includes("statusCode: 400, statusMessage: 'Invalid page input'") &&
      backendAdminPagesCreateApi.includes("statusCode: 409, statusMessage: 'Page slug already exists'") &&
      backendAdminPagesCreateApi.includes('statusCode: 503') &&
      backendAdminPageGetApi.includes("statusCode: 404, statusMessage: 'Page not found'") &&
      backendAdminPageUpdateApi.includes('pageUpdateSchema') &&
      backendAdminPageUpdateApi.includes("statusCode: 404, statusMessage: 'Page not found'") &&
      backendAdminPageDeleteApi.includes("statusCode: 404, statusMessage: 'Page not found'") &&
      backendPagesPublicApi.includes('getPublishedPage') &&
      backendPagesPublicApi.includes("statusCode: 404, statusMessage: 'Page not found'") &&
      catchAllPage.includes('CmsPageView') &&
      catchAllPage.includes('`/api/pages${route.path}`') &&
      cmsPageView.includes('CmsPageRenderer') &&
      cmsPageView.includes('SiteHeader') &&
      cmsPageView.includes('SiteFooter') &&
      cmsPageRenderer.includes('section.visible') &&
      cmsPageRenderer.includes('customSectionComponents[section.name]') &&
      cmsCustomNames.includes('CUSTOM_SECTION_NAMES') &&
      cmsCustomRegistry.includes('Record<CustomSectionName, Component>'),
    'CMS pages routes must stay behind requireAdmin with 400/404/409/503 semantics; public API serves published only; catch-all dispatches to CmsPageView; renderer filters visible and resolves the custom escape hatch.',
  )

  assert(
    adminPagesSectionsHelper.includes('export function createSection(') &&
      adminPagesSectionsHelper.includes('export function sectionSummary(') &&
      adminPagesSectionsHelper.includes('customSectionOptions') &&
      adminSectionsEditor.includes("defineModel<PageSection[]>('sections'") &&
      adminSectionsEditor.includes('moveItem(sections') &&
      adminSectionsEditor.includes('v-model:checked="s.visible"') &&
      adminSectionBody.includes("defineModel<PageSection>('section'") &&
      adminSectionBody.includes('function onBlocksInput(') &&
      adminSectionBody.includes('NAV_ICON_OPTIONS') &&
      adminSectionBody.includes('featureGridColumnOptions'),
    'vben structured section editor must keep the createSection factory, defineModel-based sections/SectionBody editing, move up/down ordering, visible switch, and richText JSON draft.',
  )

  assert(
    contentBlocksHtml.includes('export function blocksToHtml(') &&
      contentBlocksHtml.includes('export function htmlToBlocks(') &&
      contentBlocksHtml.includes('escapeHtml') &&
      contentBlocksHtml.includes('clampHeadingLevel') &&
      contentBlocksEditor.includes("from '@vben/plugins/tiptap'") &&
      contentBlocksEditor.includes("defineModel<null | unknown[]>('blocks'") &&
      contentBlocksEditor.includes('uploadMediaApi') &&
      contentBlocksEditor.includes('lastEmitted'),
    'vben rich-text blocks editor must keep the blocksToHtml/htmlToBlocks converter (escaped, heading-clamped) and the VbenTiptap wrapper with defineModel blocks, lastEmitted loop guard, and media-library image upload.',
  )

  assert(
    backendComponentAdminUtil.includes('export const PAGE_COMPONENT_IDS') &&
      backendComponentAdminUtil.includes('export const disabledComponentsSchema') &&
      backendComponentAdminUtil.includes('CUSTOM_SECTION_NAMES') &&
      backendComponentAdminUtil.includes('export async function getDisabledComponents(') &&
      backendComponentAdminUtil.includes('export async function setDisabledComponents(') &&
      backendComponentAdminUtil.includes('onConflictDoUpdate') &&
      backendAdminComponentsGetApi.includes('requireAdmin') &&
      backendAdminComponentsGetApi.includes("source: 'static'") &&
      backendAdminComponentsPutApi.includes('requireAdmin') &&
      backendAdminComponentsPutApi.includes('disabledComponentsSchema') &&
      backendAdminComponentsPutApi.includes("statusCode: 400, statusMessage: 'Invalid component list'") &&
      backendAdminComponentsPutApi.includes('statusCode: 503') &&
      adminComponentsApi.includes('getComponentsApi') &&
      adminComponentsApi.includes('saveComponentsApi') &&
      adminComponentsRoutes.includes('/components') &&
      adminComponentsView.includes('sectionTypeLabels') &&
      adminComponentsView.includes('customSectionLabels') &&
      adminComponentsView.includes('Switch'),
    'Component management must keep a zod-validated disabled list (8 section types + custom registry names) behind requireAdmin with static fallback, plus the vben /components toggle page.',
  )

  assert(
    cmsPageRenderer.includes('spacingClass(section)') &&
      cmsPageRenderer.includes(':spacing="section.spacing"') &&
      adminPagesSectionsHelper.includes('spacingOptions') &&
      adminSectionBody.includes('spacingOptions'),
    'Section spacing must be a three-tier enum end-to-end: zod schema, renderer spacingClass, and the vben editor spacing select.',
  )

  assert(
    backendNewsAdminUtil.includes('featured: z.boolean().default(false)') &&
      backendReportsAdminUtil.includes('featured: z.boolean().default(false)') &&
      backendHomeInsightsApi.includes('eq(news.featured, true)') &&
      backendHomeInsightsApi.includes('eq(reports.featured, true)') &&
      backendHomeInsightsApi.includes('staticInsights') &&
      !backendHomeInsightsApi.includes('requireAdmin') &&
      homeInsights.includes("useFetch<InsightItem[]>('/api/home/insights'") &&
      homeInsights.includes('default: () => insights'),
    'Home insights must merge featured published news (publishedAt desc) then reports (sortOrder asc), capped at 4, with static fallback in both the public API and the component useFetch default.',
  )

  assert(
    cmsCustomProps.includes('CUSTOM_COMPONENT_META') &&
      cmsCustomProps.includes('Record<CustomSectionName, RegisteredComponentMeta>') &&
      !cmsCustomProps.includes(".vue'") &&
      backendPageSectionsUtil.includes('superRefine') &&
      backendPageSectionsUtil.includes('props: z.record(') &&
      cmsPageRenderer.includes('v-bind="customProps(section)"') &&
      backendComponentAdminUtil.includes('export function listComponentRegistry(') &&
      backendComponentAdminUtil.includes('export function scanSectionUsage(') &&
      backendComponentAdminUtil.includes('export async function getComponentUsage(') &&
      backendAdminComponentsGetApi.includes('listComponentRegistry') &&
      backendAdminComponentsGetApi.includes('usage'),
    'Component registry (015.13) must keep a Vue-free CUSTOM_COMPONENT_META record, per-name props superRefine validation, renderer v-bind passthrough, and registry/usage on the admin components GET.',
  )

  assert(
    backendPresetAdminUtil.includes('export const presetInputSchema') &&
      backendPresetAdminUtil.includes('section: pageSectionSchema') &&
      backendPresetAdminUtil.includes('export async function listPresets(') &&
      backendPresetAdminUtil.includes('export async function createPreset(') &&
      backendPresetAdminUtil.includes('export async function updatePreset(') &&
      backendPresetAdminUtil.includes('export async function deletePreset(') &&
      backendAdminPresetsListApi.includes('requireAdmin') &&
      backendAdminPresetsCreateApi.includes('requireAdmin') &&
      backendAdminPresetsCreateApi.includes('statusCode: 400') &&
      backendAdminPresetsCreateApi.includes('statusCode: 503') &&
      backendAdminPresetUpdateApi.includes('requireAdmin') &&
      backendAdminPresetUpdateApi.includes('statusCode: 404') &&
      backendAdminPresetDeleteApi.includes('requireAdmin') &&
      backendAdminPresetDeleteApi.includes('statusCode: 404'),
    'Section presets (015.13) must keep the zod input schema (name/description/section) and four requireAdmin routes with 400/404/503 semantics.',
  )

  assert(
    adminSectionsEditor.includes('useSortable') &&
      adminSectionsEditor.includes('SectionPalette') &&
      adminSectionPalette.includes("pull: 'clone'") &&
      adminSectionBody.includes('BlocksEditor') &&
      adminSectionBody.includes('customComponents') &&
      adminWebAntdPkg.includes('@vueuse/integrations') &&
      adminPagesEditView.includes('iframe') &&
      adminPagesEditView.includes('preview=1') &&
      adminPresetsApi.includes('listPresetsApi') &&
      adminPagesRoutes.includes('/pages/presets') &&
      adminPresetsView.includes('deletePresetApi'),
    'vben page builder (015.13) must keep the sortable palette/editor, BlocksEditor rich text, descriptor-driven custom props, preview drawer, and presets list route.',
  )

  assert(
    backendAdminUtil.includes('export async function isAdminRequest(event: H3Event): Promise<boolean>') &&
      backendPagesPublicApi.includes('isAdminRequest') &&
      backendPagesPublicApi.includes("query.preview === '1'") &&
      backendPagesPublicApi.includes('getAdminPage') &&
      catchAllPage.includes(':preview') &&
      cmsPageView.includes('page.preview'),
    'Draft preview (015.13) must keep the soft isAdminRequest guard, the explicit ?preview=1 branch (admin page first), the dispatcher preview cache key, and the CmsPageView banner.',
  )
}
