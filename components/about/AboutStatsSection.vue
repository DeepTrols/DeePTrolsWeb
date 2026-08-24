<script setup lang="ts">
import HeroStatsStrip from '~/components/common/HeroStatsStrip.vue'
import SectionShell from '~/components/common/section/SectionShell.vue'
import { aboutStats } from '~/data/about'
</script>

<template>
  <SectionShell spacing="compact" background="default">
    <HeroStatsStrip :items="aboutStats" placement="section" />
  </SectionShell>
</template>
