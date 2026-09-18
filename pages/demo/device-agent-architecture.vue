<script setup lang="ts">
import { definePageMeta } from '#imports'
import DeviceAgentArchitectureDemo from '~/components/demo/DeviceAgentArchitectureDemo.client.vue'

definePageMeta({
  layout: false,
})

useSeoMeta({
  title: 'Device Agent 架构 Demo - DeepTrols',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <main class="min-h-screen bg-dt-bg">
    <DeviceAgentArchitectureDemo />
  </main>
</template>
