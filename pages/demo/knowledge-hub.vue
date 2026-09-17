<script setup lang="ts">
import { definePageMeta } from '#imports'
import KnowledgeHubDemo from '~/components/demo/KnowledgeHubDemo.client.vue'

definePageMeta({
  layout: false,
})

useSeoMeta({
  title: '博曜知识中枢架构 Demo - DeepTrols',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <main class="min-h-screen bg-dt-bg">
    <KnowledgeHubDemo />
  </main>
</template>
