<script setup lang="ts">
import ProductArchitectureSection from '~/components/common/ProductArchitectureSection.vue'
import DeviceAgentArchitectureFlow from '~/components/demo/device-agent/DeviceAgentArchitectureFlow.client.vue'
</script>

<template>
  <ProductArchitectureSection
    eyebrow="智能体架构"
    title="从设备模型，到真正会行动的 Agent"
    title-id="device-agent-architecture-title"
    subtitle="Agent 理解设备能力，读取实时状态，执行指令并返回可验证的结果。"
    label="Device Agent 智能体架构图"
    fallback-text="智能体架构图加载中"
    :content-flush="false"
    :frame-offset="false"
  >
    <div class="relative z-[1] mx-auto h-full w-[min(1704px,100%)] overflow-hidden">
      <div class="absolute left-1/2 top-1/2 h-[560px] w-[1704px] -translate-x-1/2 -translate-y-1/2">
        <ClientOnly>
          <DeviceAgentArchitectureFlow :viewport-y="24.7" :zoom="0.98" />
          <template #fallback>
            <div class="size-full" aria-hidden="true"></div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </ProductArchitectureSection>
</template>
