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
    eyebrowTransform?: 'uppercase' | 'natural'
  }>(),
  {
    eyebrow: undefined,
    titleId: undefined,
    subtitle: undefined,
    align: 'left',
    tone: 'dark',
    nowrapSubtitle: false,
    eyebrowTransform: 'uppercase',
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
    :eyebrow-transform="eyebrowTransform"
    :width="nowrapSubtitle ? 'wide' : 'default'"
  />
</template>
