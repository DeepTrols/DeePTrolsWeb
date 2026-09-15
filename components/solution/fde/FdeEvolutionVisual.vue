<script setup lang="ts">
import FdeEvolutionProductionVisual from '~/components/solution/fde/FdeEvolutionProductionVisual.vue'
import FdeEvolutionPrototypeVisual from '~/components/solution/fde/FdeEvolutionPrototypeVisual.vue'
import FdeEvolutionScaleVisual from '~/components/solution/fde/FdeEvolutionScaleVisual.vue'

defineProps<{
  variant: 'prototype' | 'production' | 'scale'
  metric: string
  metricLabel: string
}>()
</script>

<template>
  <FdeEvolutionPrototypeVisual v-if="variant === 'prototype'" :metric="metric" :metric-label="metricLabel" />
  <FdeEvolutionProductionVisual v-else-if="variant === 'production'" :metric="metric" :metric-label="metricLabel" />
  <FdeEvolutionScaleVisual v-else :metric="metric" :metric-label="metricLabel" />
</template>
