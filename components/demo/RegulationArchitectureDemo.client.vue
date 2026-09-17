<script setup lang="ts">
import RegulationArchitectureFlow from '~/components/demo/regulation/RegulationArchitectureFlow.client.vue'
</script>

<template>
  <section class="overflow-x-auto bg-dt-bg px-4 py-16" aria-label="数据要素监管架构 Demo">
    <div class="mx-auto min-w-[1704px] max-w-[1704px]">
      <div class="relative h-[480px] w-full overflow-hidden" role="img" aria-label="数据要素监管平台连接监管对象、风险监管、协同处置和监管分析">
        <RegulationArchitectureFlow />
      </div>
    </div>
  </section>
</template>
