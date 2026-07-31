<script setup lang="ts">
import ServiceShowcaseSection from '~/components/common/ServiceShowcaseSection.vue'
import serviceOverviewSrc from '../../doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/fangangaishu@2x.png?url'
import { whyServiceItems } from '~/data/why'
</script>

<template>
  <ServiceShowcaseSection
    eyebrow="Service Model"
    title="业务价值可衡量，AI成果可持续"
    title-id="why-service-title"
    :items="whyServiceItems"
    :image-src="serviceOverviewSrc"
    image-alt="DeepTrols 方案概述"
  />
</template>

<style scoped lang="scss"></style>
