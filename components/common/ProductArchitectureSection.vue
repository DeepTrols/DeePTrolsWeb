<script setup lang="ts">
import { computed, useSlots } from 'vue'
import ProductSystemFlowFrame from '~/components/common/ProductSystemFlowFrame.vue'
import ProductSystemSection from '~/components/common/ProductSystemSection.vue'

const props = withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    titleId: string
    subtitle: string
    label: string
    fallbackText?: string
    contentFlush?: boolean
    headingWide?: boolean
    nowrapSubtitle?: boolean
    frameOffset?: boolean
  }>(),
  {
    fallbackText: '产品架构图占位符',
    contentFlush: true,
    headingWide: true,
    nowrapSubtitle: true,
    frameOffset: true,
  },
)

const slots = useSlots()
const bodyClasses = computed(() => (props.frameOffset ? 'mt-12 lg:mt-16' : undefined))
</script>

<template>
  <ProductSystemSection
    :eyebrow="eyebrow"
    :title="title"
    :title-id="titleId"
    :subtitle="subtitle"
    :content-flush="contentFlush"
    :heading-wide="headingWide"
    :nowrap-subtitle="nowrapSubtitle"
  >
    <div :class="bodyClasses">
      <ProductSystemFlowFrame
        v-if="slots.default"
        :label="label"
        :fallback-text="fallbackText"
      >
        <slot />
      </ProductSystemFlowFrame>
      <ProductSystemFlowFrame
        v-else
        :label="label"
        :fallback-text="fallbackText"
      />
      <slot name="after" />
    </div>
  </ProductSystemSection>
</template>
