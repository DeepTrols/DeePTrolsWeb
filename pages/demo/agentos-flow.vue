<script setup lang="ts">
import { definePageMeta } from '#imports'
import AgentOsArchitectureDemo from '~/components/flow/AgentOsArchitectureDemo.client.vue'

definePageMeta({
  layout: false,
})

useSeoMeta({
  title: 'AgentOS Vue Flow Demo - DeepTrols',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <main class="min-h-screen bg-slate-950 p-6">
    <AgentOsArchitectureDemo />
  </main>
</template>
