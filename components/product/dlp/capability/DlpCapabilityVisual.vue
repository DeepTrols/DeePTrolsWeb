<script setup lang="ts">
import DlpScenarioApplyVisual from './DlpScenarioApplyVisual.vue'
import DlpTagGovernanceVisual from './DlpTagGovernanceVisual.vue'
import DlpTagModelingVisual from './DlpTagModelingVisual.vue'
import DlpTagProductionVisual from './DlpTagProductionVisual.vue'
import DlpTagServiceVisual from './DlpTagServiceVisual.vue'

defineProps<{ index: number }>()

const visuals = [DlpTagModelingVisual, DlpTagProductionVisual, DlpTagGovernanceVisual, DlpTagServiceVisual, DlpScenarioApplyVisual]
</script>

<template>
  <component :is="visuals[index]" />
</template>
