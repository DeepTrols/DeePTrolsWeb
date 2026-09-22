<script setup lang="ts">
import DmsCockpitVisual from '~/components/product/dms/capability/DmsCockpitVisual.vue'
import DmsEventMonitorVisual from '~/components/product/dms/capability/DmsEventMonitorVisual.vue'
import DmsLifecycleVisual from '~/components/product/dms/capability/DmsLifecycleVisual.vue'
import DmsRuleCenterVisual from '~/components/product/dms/capability/DmsRuleCenterVisual.vue'
import DmsWorkOrderVisual from '~/components/product/dms/capability/DmsWorkOrderVisual.vue'

defineProps<{ index: number }>()

const visuals = [DmsRuleCenterVisual, DmsEventMonitorVisual, DmsWorkOrderVisual, DmsCockpitVisual, DmsLifecycleVisual]
</script>

<template>
  <component :is="visuals[index]" />
</template>
