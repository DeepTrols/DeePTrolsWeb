<script setup lang="ts">
import PageHero from '~/components/common/PageHero.vue'
import { aboutHero } from '~/data/about'
</script>

<template>
  <PageHero
    title-id="about-hero-title"
    :title-line="aboutHero.title"
    :description="aboutHero.description"
    :visual-label="aboutHero.visualLabel"
    :background-video-src="aboutHero.backgroundVideo"
    align="center"
  />
</template>
