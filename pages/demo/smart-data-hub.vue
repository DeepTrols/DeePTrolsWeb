<script setup lang="ts">
import { definePageMeta } from '#imports'
import SmartDataHubDemo from '~/components/demo/SmartDataHubDemo.client.vue'

definePageMeta({
  layout: false,
})

useSeoMeta({
  title: '数曜数据开发平台架构 Demo - DeepTrols',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <main class="min-h-screen bg-dt-bg">
    <SmartDataHubDemo />
  </main>
</template>
