<script setup lang="ts">
import { definePageMeta } from '#imports'
import TagPlatformArchitectureDemo from '~/components/demo/TagPlatformArchitectureDemo.client.vue'

definePageMeta({
  layout: false,
})

useSeoMeta({
  title: '数据标签平台架构 Demo - DeepTrols',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <main class="min-h-screen bg-dt-bg">
    <TagPlatformArchitectureDemo />
  </main>
</template>
