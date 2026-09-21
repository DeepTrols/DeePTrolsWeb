<script setup lang="ts">
import DgpAssetServiceVisual from './DgpAssetServiceVisual.vue'
import DgpQualityGovernanceVisual from './DgpQualityGovernanceVisual.vue'
import DgpSourceIntegrationVisual from './DgpSourceIntegrationVisual.vue'

defineProps<{ index: number }>()

const visuals = [DgpSourceIntegrationVisual, DgpQualityGovernanceVisual, DgpAssetServiceVisual]
</script>

<template>
  <component :is="visuals[index]" />
</template>
