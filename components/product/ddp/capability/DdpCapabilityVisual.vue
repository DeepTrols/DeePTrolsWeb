<script setup lang="ts">
import DdpContinuousDeliveryVisual from './DdpContinuousDeliveryVisual.vue'
import DdpDataDevelopmentVisual from './DdpDataDevelopmentVisual.vue'
import DdpDataIntegrationVisual from './DdpDataIntegrationVisual.vue'
import DdpTaskOrchestrationVisual from './DdpTaskOrchestrationVisual.vue'

defineProps<{ index: number }>()

const visuals = [DdpDataIntegrationVisual, DdpDataDevelopmentVisual, DdpTaskOrchestrationVisual, DdpContinuousDeliveryVisual]
</script>

<template>
  <component :is="visuals[index]" />
</template>
