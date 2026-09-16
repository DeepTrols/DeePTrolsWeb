<script setup lang="ts">
import { definePageMeta } from '#imports'
import FlowMqHowItWorksDemo from '~/components/demo/FlowMqHowItWorksDemo.client.vue'

definePageMeta({
  layout: false,
})

useSeoMeta({
  title: 'FlowMQ How It Works Demo - DeepTrols',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <main class="min-h-screen bg-dt-bg">
    <FlowMqHowItWorksDemo />
  </main>
</template>
