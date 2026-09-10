<script setup lang="ts">
import HeroStatsStrip from '~/components/common/HeroStatsStrip.vue'
import { tanyaoHeroStats } from '~/data/tanyao'
</script>

<template>
  <section class="bg-dt-bg flow-root pb-32 lg:pb-44">
    <div class="container">
      <HeroStatsStrip :items="tanyaoHeroStats" :columns="4" placement="section" />
    </div>
  </section>
</template>
