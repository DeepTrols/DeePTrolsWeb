<script setup lang="ts">
import BoyaoBatchParsingVisual from './BoyaoBatchParsingVisual.vue'
import BoyaoHighAvailabilityVisual from './BoyaoHighAvailabilityVisual.vue'
import BoyaoMultimodalParsingVisual from './BoyaoMultimodalParsingVisual.vue'

defineProps<{ index: number }>()

const visuals = [BoyaoMultimodalParsingVisual, BoyaoBatchParsingVisual, BoyaoHighAvailabilityVisual]
</script>

<template>
  <component :is="visuals[index]" />
</template>
