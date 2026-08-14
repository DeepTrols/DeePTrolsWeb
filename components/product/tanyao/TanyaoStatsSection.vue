<script setup lang="ts">
import HeroStatsStrip from '~/components/common/HeroStatsStrip.vue'
import { tanyaoHeroStats } from '~/data/tanyao'
</script>

<template>
  <section class="bg-dt-bg">
    <div class="container pb-24 pt-16 lg:pb-32 lg:pt-20">
      <HeroStatsStrip :items="tanyaoHeroStats" :columns="4" placement="section" />
    </div>
  </section>
</template>
