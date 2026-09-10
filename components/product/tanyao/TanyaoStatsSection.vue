<script setup lang="ts">
import HeroStatsStrip from '~/components/common/HeroStatsStrip.vue'
import { tanyaoHeroStats } from '~/data/tanyao'
</script>

<template>
  <section class="bg-dt-bg flow-root">
    <div class="container mt-10 mb-10">
      <HeroStatsStrip :items="tanyaoHeroStats" :columns="4" placement="section" />
    </div>
  </section>
</template>
