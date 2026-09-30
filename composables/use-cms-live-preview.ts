import type { Ref } from 'vue'
import type { PageSection } from '~/server/utils/page-sections'
import type { PublishedPagePayload } from '~/server/utils/pages-admin'

/**
 * CMS 实时预览桥（015.19e / 015.20b 提取为 composable，catch-all 与 index/about 分发器共用）：
 * 仅 preview 命中（服务端 isAdminRequest 门，preview:true 仅管理员可得）+ live=1 时监听后台
 * 编辑器 postMessage，渲染「未保存」sections。三重门 + origin 白名单 + 客户端轻消毒：
 * 未登录访问者拿不到 preview:true → 不注册监听；跨 origin 投喂被忽略；非法载荷保持上一帧。
 */
export const LIVE_PREVIEW_TYPE = 'dt-cms-live-preview'
export const LIVE_READY_TYPE = 'dt-cms-live-preview-ready'

// SSR 阶段 window 不存在：仅客户端求值（Nuxt 会在服务端产物里静态消除该分支）
const LIVE_ALLOWED_ORIGINS = import.meta.client
  ? import.meta.dev
    ? ['http://localhost:5666']
    : [window.location.origin]
  : []

function sanitizeSections(value: unknown): null | PageSection[] {
  // 上限与 page-sections.ts 的 max(50) 对齐；剔 on* 键同 CmsPageRenderer 纵深防御
  if (!Array.isArray(value) || value.length === 0 || value.length > 50) {
    return null
  }
  const cleaned: PageSection[] = []
  for (const item of value) {
    if (typeof item !== 'object' || item === null) {
      return null
    }
    const section: Record<string, unknown> = {}
    for (const [key, val] of Object.entries(item)) {
      if (key.startsWith('on')) {
        continue
      }
      section[key] = val
    }
    section.visible = section.visible === undefined ? true : Boolean(section.visible)
    cleaned.push(section as PageSection)
  }
  return cleaned
}

export function useCmsLivePreview(cmsPage: Ref<null | PublishedPagePayload | undefined>) {
  const route = useRoute()
  const liveSections = ref<null | PageSection[]>(null)
  const liveMeta = ref<{ seoDescription?: string, title?: string } | null>(null)

  function onLiveMessage(event: MessageEvent) {
    if (!LIVE_ALLOWED_ORIGINS.includes(event.origin)) {
      return
    }
    const data = event.data as { payload?: unknown, type?: string } | null
    if (!data || data.type !== LIVE_PREVIEW_TYPE || typeof data.payload !== 'object' || data.payload === null) {
      return
    }
    const { sections, seoDescription, title } = data.payload as { sections?: unknown, seoDescription?: string, title?: string }
    const cleaned = sanitizeSections(sections)
    if (!cleaned) {
      return
    }
    liveSections.value = cleaned
    liveMeta.value = { seoDescription, title }
  }

  const isLivePreview = computed(() => route.query.preview === '1' && route.query.live === '1')
  const liveReady = computed(() => isLivePreview.value && cmsPage.value?.preview === true)

  // 握手：编辑器 iframe @load 首发常早于本页 hydration，监听器还没挂上就丢了首帧；
  // 挂载完成后反向通知父窗口补发（targetOrigin 同白名单，绝不 '*'）
  function notifyParentReady() {
    const targetOrigin = LIVE_ALLOWED_ORIGINS[0]
    if (!targetOrigin || window.parent === window) {
      return
    }
    window.parent.postMessage({ type: LIVE_READY_TYPE }, targetOrigin)
  }

  if (import.meta.client) {
    watch(liveReady, (ready) => {
      if (ready) {
        window.addEventListener('message', onLiveMessage)
        notifyParentReady()
      }
      else {
        window.removeEventListener('message', onLiveMessage)
        liveSections.value = null
      }
    }, { immediate: true })
    onUnmounted(() => window.removeEventListener('message', onLiveMessage))
  }

  return { liveMeta, liveSections }
}
