<script setup lang="ts">
import { definePageMeta } from '#imports'
import TanyaoIotArchitectureDemo from '~/components/demo/TanyaoIotArchitectureDemo.client.vue'

definePageMeta({
  layout: false,
})

useSeoMeta({
  title: '探曜 AIoT 架构 Demo - DeepTrols',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <main class="min-h-screen bg-dt-bg">
    <TanyaoIotArchitectureDemo />
  </main>
</template>
