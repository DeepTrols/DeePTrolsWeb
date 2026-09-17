<script setup lang="ts">
import { definePageMeta } from '#imports'
import RegulationArchitectureDemo from '~/components/demo/RegulationArchitectureDemo.client.vue'

definePageMeta({
  layout: false,
})

useSeoMeta({
  title: '数据要素监管架构 Demo - DeepTrols',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <main class="min-h-screen bg-dt-bg">
    <RegulationArchitectureDemo />
  </main>
</template>
