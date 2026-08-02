<script setup lang="ts">
import SectionHeading from '~/components/common/SectionHeading.vue'

withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    titleId: string
    subtitle: string
    contentFlush?: boolean
    headingWide?: boolean
    nowrapSubtitle?: boolean
  }>(),
  {
    contentFlush: false,
    headingWide: true,
    nowrapSubtitle: true,
  },
)
</script>

<template>
  <section class="section product-system" :class="{ 'product-system--heading-wide': headingWide }" :aria-labelledby="titleId">
    <div class="container">
      <SectionHeading
        :title-id="titleId"
        :eyebrow="eyebrow"
        :title="title"
        :subtitle="subtitle"
        align="center"
        :nowrap-subtitle="nowrapSubtitle"
      />

      <div class="product-system__content" :class="{ '!mt-0': contentFlush }">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.product-system {
  background: transparent;
}

.product-system--heading-wide :deep(.section-heading) {
  max-width: none;
}

.product-system :deep(.section-heading__subtitle) {
  font-size: 20px;
}

.product-system__content {
  display: grid;
  gap: 32px;
  margin-top: 42px;
}

@media (min-width: 1024px) {
  .product-system--heading-wide :deep(.section-heading__subtitle) {
    white-space: nowrap;
  }

  .product-system__content {
    margin-top: 48px;
  }
}
</style>
