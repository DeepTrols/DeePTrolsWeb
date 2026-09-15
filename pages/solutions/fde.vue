<script setup lang="ts">
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import FdePageContent from '~/components/solution/fde/FdePageContent.vue'

useSeoMeta({
  title: 'FDE解决方案 - DeepTrols',
  description: 'DeepTrols FDE：深入业务现场，让AI从概念验证走向生产价值。',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <FdePageContent />
    <SiteFooter />
  </div>
</template>
