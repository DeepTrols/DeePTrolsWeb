<script setup lang="ts">
import TrustTabsSection from '~/components/common/TrustTabsSection.vue'
import { whyTrustTabs } from '~/data/why'
</script>

<template>
  <TrustTabsSection
    :tabs="whyTrustTabs"
    title="为什么DeepTrols值得信赖"
    title-id="why-trust-title"
    tablist-label="DeepTrols 信赖维度"
  />
</template>
