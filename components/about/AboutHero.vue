<script setup lang="ts">
import AboutHeroStats from '~/components/about/AboutHeroStats.vue'
import PageHero from '~/components/common/PageHero.vue'
import { aboutHero, aboutStats } from '~/data/about'
</script>

<template>
  <PageHero
    class="about-hero"
    title-id="about-hero-title"
    :title-line="aboutHero.title"
    :description="aboutHero.description"
    :visual-label="aboutHero.visualLabel"
    :background-video-src="aboutHero.backgroundVideo"
    align="center"
  >
    <template #after-actions>
      <div class="about-hero__stats mt-10">
        <AboutHeroStats :items="aboutStats" />
      </div>
    </template>
  </PageHero>
</template>

<style scoped lang="scss">
.about-hero {
  min-height: 560px;
}

.about-hero :deep(.page-hero__body) {
  padding-top: 8.5rem;
  padding-bottom: 7rem;
}

@media (min-width: 1024px) {
  .about-hero {
    min-height: 640px;
  }

  .about-hero :deep(.page-hero__body) {
    padding-top: 10.5rem;
    padding-bottom: 8rem;
  }
}
</style>
