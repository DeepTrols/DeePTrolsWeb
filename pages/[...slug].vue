<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { useFetch, useRoute } from '#imports'
import BaseButton from '~/components/common/BaseButton.vue'
import CmsPageView from '~/components/common/CmsPageView.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import type { PageSection } from '~/server/utils/page-sections'
import type { PublishedPagePayload } from '~/server/utils/pages-admin'

const route = useRoute()
const pageTitle = computed(() => {
  const slug = route.path.split('/').filter(Boolean).pop()
  return slug ? slug.replaceAll('-', ' ') : 'DeepTrols'
})

// CMS 分发：published 页命中即渲染；404/草稿/无 DB → data 为 null → 保留占位页
// ?preview=1 透传（015.13 草稿预览）：key 拼 :preview 后缀防 published/draft 缓存互污
const isPreview = computed(() => route.query.preview === '1')
const { data: cmsPage } = await useFetch<PublishedPagePayload>(`/api/pages${route.path}`, {
  key: `cms-page${route.path}${isPreview.value ? ':preview' : ''}`,
  query: isPreview.value ? { preview: '1' } : undefined,
})

// 015.19e 实时预览：仅 preview 命中（服务端 isAdminRequest 门，preview:true 仅管理员可得）+ live=1 时
// 监听后台编辑器 postMessage，渲染「未保存」sections。三重门 + origin 白名单 + 客户端轻消毒：
// 未登录访问者拿不到 preview:true → 不注册监听；跨 origin 投喂被忽略；非法载荷保持上一帧。
const LIVE_PREVIEW_TYPE = 'dt-cms-live-preview'
const LIVE_READY_TYPE = 'dt-cms-live-preview-ready'
// SSR 阶段 window 不存在：仅客户端求值（Nuxt 会在服务端产物里静态消除该分支）
const LIVE_ALLOWED_ORIGINS = import.meta.client
  ? import.meta.dev
    ? ['http://localhost:5666']
    : [window.location.origin]
  : []

const liveSections = ref<null | PageSection[]>(null)
const liveMeta = ref<{ seoDescription?: string, title?: string } | null>(null)

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

const isLivePreview = computed(() => isPreview.value && route.query.live === '1')
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

const renderedPage = computed(() => {
  const page = cmsPage.value
  if (!page) {
    return null
  }
  if (!liveSections.value) {
    return page
  }
  return {
    ...page,
    sections: liveSections.value,
    seoDescription: liveMeta.value?.seoDescription ?? page.seoDescription,
    title: liveMeta.value?.title ?? page.title,
  }
})

useSeoMeta({
  title: () => `${renderedPage.value?.title ?? pageTitle.value} - DeepTrols`,
  description: () => renderedPage.value?.seoDescription || 'DeepTrols 官网内容建设中。',
  robots: () => (cmsPage.value ? 'index, follow' : 'noindex, nofollow'),
})
</script>

<template>
  <CmsPageView
    v-if="renderedPage"
    :page="renderedPage"
    :preview-banner="liveSections ? '实时预览 · 未保存内容' : undefined"
  />
  <div v-else class="site-shell">
    <SiteHeader />
    <main id="main-content" class="placeholder-page">
      <section class="flow-root pb-32 lg:pb-44" aria-labelledby="placeholder-title">
        <div class="container placeholder-page__inner">
          <p>DeepTrols</p>
          <h1 id="placeholder-title">页面内容建设中</h1>
          <span>该栏目已纳入官网信息架构，后续任务会补充完整内容。</span>
          <BaseButton href="/">返回首页</BaseButton>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped lang="scss">
.placeholder-page {
  min-height: calc(100svh - var(--dt-header-height));
  padding: clamp(92px, 12vw, 160px) 0;
}

.placeholder-page__inner {
  display: grid;
  justify-items: start;
  max-width: 760px;
}

p {
  margin: 0 0 16px;
  color: var(--dt-color-primary);
  font-size: 13px;
  font-weight: 760;
  letter-spacing: 0;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: clamp(42px, 7vw, 74px);
  font-weight: 760;
  line-height: 1.08;
  letter-spacing: 0;
}

span {
  margin-top: 22px;
  color: var(--dt-color-text-muted);
  font-size: 18px;
  line-height: 1.7;
}

.base-button {
  margin-top: 34px;
}
</style>
