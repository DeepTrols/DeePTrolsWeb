<script setup lang="ts">
import { definePageMeta } from '#imports'
import BoyaoIntegrationDemo from '~/components/demo/BoyaoIntegrationDemo.client.vue'

definePageMeta({
  layout: false,
})

useSeoMeta({
  title: '博曜系统集成架构 Demo - DeepTrols',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <main class="min-h-screen bg-dt-bg">
    <BoyaoIntegrationDemo />
  </main>
</template>
