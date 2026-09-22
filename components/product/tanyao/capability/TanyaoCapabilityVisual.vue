<script setup lang="ts">
import TanyaoAiFusionVisual from '~/components/product/tanyao/capability/TanyaoAiFusionVisual.vue'
import TanyaoDeviceConnectVisual from '~/components/product/tanyao/capability/TanyaoDeviceConnectVisual.vue'
import TanyaoEdgeCloudVisual from '~/components/product/tanyao/capability/TanyaoEdgeCloudVisual.vue'
import TanyaoProtocolVisual from '~/components/product/tanyao/capability/TanyaoProtocolVisual.vue'
import TanyaoRuleEngineVisual from '~/components/product/tanyao/capability/TanyaoRuleEngineVisual.vue'
import TanyaoTsdbVisual from '~/components/product/tanyao/capability/TanyaoTsdbVisual.vue'

defineProps<{ index: number }>()

const visuals = [
  TanyaoDeviceConnectVisual,
  TanyaoProtocolVisual,
  TanyaoEdgeCloudVisual,
  TanyaoTsdbVisual,
  TanyaoRuleEngineVisual,
  TanyaoAiFusionVisual,
]
</script>

<template>
  <component :is="visuals[index]" />
</template>
