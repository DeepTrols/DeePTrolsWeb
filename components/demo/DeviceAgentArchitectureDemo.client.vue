<script setup lang="ts">
import DeviceAgentArchitectureFlow from '~/components/demo/device-agent/DeviceAgentArchitectureFlow.client.vue'
</script>

<template>
  <section class="overflow-x-auto bg-dt-bg px-4 py-16" aria-label="Device Agent 架构 Demo">
    <div class="mx-auto min-w-[1704px] max-w-[1704px]">
      <div class="relative h-[580px] w-full overflow-hidden" role="img" aria-label="Device Agent 架构图，展示实时数据、设备事件、告警事件、业务事件与用户指令通过 Device Context 和 Device Execution 连接到 Device Agent Runtime 与 Agent 应用、基础设施、Skills & Tools">
        <DeviceAgentArchitectureFlow />
      </div>
    </div>
  </section>
</template>
