<script setup lang="ts">
import { definePageMeta } from '#imports'
import AuthineAiApplicationDemo from '~/components/demo/AuthineAiApplicationDemo.vue'

definePageMeta({
  layout: false,
})

useSeoMeta({
  title: 'Authine AI Application Demo - DeepTrols',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <main class="min-h-screen bg-white">
    <AuthineAiApplicationDemo />
  </main>
</template>
