<script setup lang="ts">
import CtaSection from '~/components/common/CtaSection.vue'

const ctaActions = [
  { label: '咨询合作', href: '/contact', variant: 'primary' as const },
  { label: '申请试用', href: '/try', variant: 'secondary' as const },
]
</script>

<template>
  <CtaSection
    title="构建企业自身的AI能力"
    title-id="home-cta-title"
    description="让数据成为资产，让知识驱动决策，让AI创造价值"
    :actions="ctaActions"
  />
</template>
