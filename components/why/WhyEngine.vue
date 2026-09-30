<script setup lang="ts">
import type { WhyEngineLinkData } from '~/data/why-sections'
import { computed } from 'vue'
import { FileText } from '@lucide/vue'
import EngineLinksSection from '~/components/common/EngineLinksSection.vue'
import { resolveNavIcon } from '~/components/navigation/nav-icons'
import { whyEngineLinks as staticLinks } from '~/data/why'
import { whyEngineHeading } from '~/data/why-sections'

// 015.20b：CMS props 稀疏覆盖（后台行编辑）；缺省回退 data 静态。同名遮蔽保持模板/锁不变
const props = withDefaults(
  defineProps<{ description?: string, eyebrow?: string, links?: WhyEngineLinkData[], title?: string }>(),
  {
    description: whyEngineHeading.description,
    eyebrow: whyEngineHeading.eyebrow,
    links: undefined,
    title: whyEngineHeading.title,
  },
)

const whyEngineLinks = computed(() =>
  props.links
    ? props.links.map(link => ({ ...link, icon: resolveNavIcon(link.icon) ?? FileText }))
    : staticLinks,
)
</script>

<template>
  <EngineLinksSection
    :eyebrow="eyebrow"
    :title="title"
    title-id="why-engine-title"
    :description="description"
    :links="whyEngineLinks"
  />
</template>
