<script setup lang="ts">
import { computed } from 'vue'
import ArticleContent from '~/components/common/article/ArticleContent.vue'
import CtaSection from '~/components/common/CtaSection.vue'
import ProductFeatureGridSection from '~/components/common/ProductFeatureGridSection.vue'
import ProductMetricsSection from '~/components/common/ProductMetricsSection.vue'
import { resolveNavIcon } from '~/components/navigation/nav-icons'
import CmsHero from '~/components/sections/CmsHero.vue'
import CmsImageBanner from '~/components/sections/CmsImageBanner.vue'
import CmsLogoStrip from '~/components/sections/CmsLogoStrip.vue'
import { customSectionComponents } from '~/components/sections/custom-registry'
import type { PageSection } from '~/server/utils/page-sections'

// CMS 页渲染器：visible 过滤（数组顺序即展示顺序）→ 按 type 分发到注册表组件
const props = defineProps<{ sections: PageSection[] }>()

const visibleSections = computed(() => props.sections.filter(section => section.visible))

// featureGrid 的 icon 字段入库为字符串（nav-icons 注册表），渲染前解析回组件
function gridItems(section: Extract<PageSection, { type: 'featureGrid' }>) {
  return section.items.map(item => ({ ...item, icon: resolveNavIcon(item.icon) }))
}

// 间距三档（SectionShell 节奏）：cta（定高横幅）与 custom（自包含架构图）加在外层包裹 div；richText 内联 section 用同一张映射
function spacingClass(section: PageSection): string {
  switch (section.spacing) {
    case 'tight': {
      return 'pb-8 lg:pb-16'
    }
    case 'default': {
      return 'pb-32 lg:pb-44'
    }
    default: {
      return 'pb-16 lg:pb-32'
    }
  }
}
</script>

<template>
  <template v-for="(section, index) in visibleSections" :key="index">
    <CmsHero
      v-if="section.type === 'hero'"
      :section="section"
      :title-id="`cms-hero-${index}`"
      :spacing="section.spacing"
    />
    <ProductMetricsSection
      v-else-if="section.type === 'metrics'"
      :items="section.items"
      :spacing="section.spacing"
    />
    <ProductFeatureGridSection
      v-else-if="section.type === 'featureGrid'"
      :eyebrow="section.eyebrow ?? ''"
      :title="section.title"
      :title-id="`cms-feature-grid-${index}`"
      :subtitle="section.subtitle ?? ''"
      :items="gridItems(section)"
      :columns="section.columns"
      :spacing="section.spacing"
    />
    <div v-else-if="section.type === 'cta'" :class="spacingClass(section)">
      <CtaSection
        :title="section.title"
        :title-id="`cms-cta-${index}`"
        :description="section.description ?? ''"
        :cta-label="section.ctaLabel"
        :cta-href="section.ctaHref"
      />
    </div>
    <section
      v-else-if="section.type === 'richText'"
      class="container pt-6 lg:pt-10"
      :class="spacingClass(section)"
    >
      <ArticleContent :blocks="section.blocks" />
    </section>
    <CmsLogoStrip
      v-else-if="section.type === 'logoStrip'"
      :section="section"
      :spacing="section.spacing"
    />
    <CmsImageBanner
      v-else-if="section.type === 'imageBanner'"
      :section="section"
      :spacing="section.spacing"
    />
    <div v-else-if="section.type === 'custom'" :class="spacingClass(section)">
      <component :is="customSectionComponents[section.name]" />
    </div>
  </template>
</template>
