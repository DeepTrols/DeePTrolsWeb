<script setup lang="ts">
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import SectionShell from '~/components/common/section/SectionShell.vue'

withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    titleId: string
    subtitle: string
    contentFlush?: boolean
    headingWide?: boolean
    nowrapSubtitle?: boolean
    paddedTop?: boolean
    spacing?: 'default' | 'compact' | 'tight'
    eyebrowTransform?: 'uppercase' | 'natural'
  }>(),
  {
    contentFlush: false,
    headingWide: true,
    nowrapSubtitle: true,
    paddedTop: false,
    spacing: 'default',
    eyebrowTransform: 'uppercase',
  },
)
</script>

<template>
  <SectionShell
    class="product-system"
    :class="{ 'product-system--heading-wide': headingWide }"
    :title-id="titleId"
    background="transparent"
    :padded-top="paddedTop"
    :spacing="spacing"
  >
    <SectionHeader
      :title-id="titleId"
      :eyebrow="eyebrow"
      :title="title"
      :subtitle="subtitle"
      align="center"
      :nowrap-subtitle="nowrapSubtitle"
      :width="headingWide ? 'wide' : 'default'"
      subtitle-size="large"
      :eyebrow-transform="eyebrowTransform"
    />

    <div class="product-system__content" :class="{ '!mt-0': contentFlush }">
      <slot />
    </div>
  </SectionShell>
</template>

<style scoped lang="scss">
.product-system {
  background: transparent;
}

.product-system__content {
  display: grid;
  gap: 32px;
  margin-top: 42px;
}

@media (min-width: 1024px) {
  .product-system__content {
    margin-top: 48px;
  }
}
</style>
