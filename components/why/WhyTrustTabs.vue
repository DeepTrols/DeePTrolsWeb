<script setup lang="ts">
import { FileText } from '@lucide/vue'
import { computed } from 'vue'
import TrustTabsSection from '~/components/common/TrustTabsSection.vue'
import { resolveNavIcon } from '~/components/navigation/nav-icons'
import { whyTrustTabs } from '~/data/why'

// CMS 接管（015.18）：全部 props 可选，零 props = why 页现状（缺省读 data 静态）
export interface WhyTrustTabInput {
  key: string
  label: string
  features: {
    title: string
    subtitle: string
    description: string
    icon?: string
  }[]
}

const props = withDefaults(
  defineProps<{
    title?: string
    tablistLabel?: string
    tabs?: WhyTrustTabInput[]
  }>(),
  {
    title: '为什么DeepTrols值得信赖',
    tablistLabel: 'DeepTrols 信赖维度',
    tabs: undefined,
  },
)

const resolvedTabs = computed(() =>
  props.tabs
    ? props.tabs.map((tab) => ({
        ...tab,
        features: tab.features.map((feature) => ({
          ...feature,
          icon: resolveNavIcon(feature.icon) ?? FileText,
        })),
      }))
    : whyTrustTabs,
)
</script>

<template>
  <TrustTabsSection
    :tabs="resolvedTabs"
    :title="title"
    title-id="why-trust-title"
    :tablist-label="tablistLabel"
  />
</template>
