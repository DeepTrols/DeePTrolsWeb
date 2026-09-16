<script setup lang="ts">
import { definePageMeta } from '#imports'
import EmqxPlatformArchitectureDemo from '~/components/demo/EmqxPlatformArchitectureDemo.client.vue'

definePageMeta({
  layout: false,
})

useSeoMeta({
  title: 'DeepTrols Platform Architecture Demo - DeepTrols',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <main class="min-h-screen bg-dt-bg">
    <EmqxPlatformArchitectureDemo />
  </main>
</template>
