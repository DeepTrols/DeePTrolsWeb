<script setup lang="ts">
import SectionHeader from '~/components/common/section/SectionHeader.vue'

withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    titleId?: string
    subtitle?: string
    align?: 'left' | 'center'
    tone?: 'dark' | 'light'
    nowrapSubtitle?: boolean
  }>(),
  {
    eyebrow: undefined,
    titleId: undefined,
    subtitle: undefined,
    align: 'left',
    tone: 'dark',
    nowrapSubtitle: false,
  },
)
</script>

<template>
  <SectionHeader
    :eyebrow="eyebrow"
    :title="title"
    :title-id="titleId"
    :subtitle="subtitle"
    :align="align"
    :tone="tone"
    :nowrap-subtitle="nowrapSubtitle"
    :width="nowrapSubtitle ? 'wide' : 'default'"
  />
</template>
