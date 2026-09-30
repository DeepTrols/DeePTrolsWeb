<script setup lang="ts">
import type { WhyServiceItemData } from '~/data/why-sections'
import { computed } from 'vue'
import { FileText } from '@lucide/vue'
import ServiceShowcaseSection from '~/components/common/ServiceShowcaseSection.vue'
import serviceOverviewSrc from '~/assets/images/why/fangangaishu.png?url'
import { resolveNavIcon } from '~/components/navigation/nav-icons'
import { whyServiceItems as staticItems } from '~/data/why'
import { whyServiceResetHeading } from '~/data/why-sections'

// 015.20b：CMS props 稀疏覆盖（后台行编辑）；概览图保持代码内置。同名遮蔽保持模板/锁不变
const props = withDefaults(
  defineProps<{ eyebrow?: string, items?: WhyServiceItemData[], title?: string }>(),
  {
    eyebrow: whyServiceResetHeading.eyebrow,
    items: undefined,
    title: whyServiceResetHeading.title,
  },
)

const whyServiceItems = computed(() =>
  props.items
    ? props.items.map(item => ({ ...item, icon: resolveNavIcon(item.icon) ?? FileText }))
    : staticItems,
)
</script>

<template>
  <ServiceShowcaseSection
    :eyebrow="eyebrow"
    :title="title"
    title-id="why-service-title"
    :items="whyServiceItems"
    :image-src="serviceOverviewSrc"
    image-alt="DeepTrols 方案概述"
  />
</template>
