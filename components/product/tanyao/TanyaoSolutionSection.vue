<script setup lang="ts">
import ProductArchitectureSection from '~/components/common/ProductArchitectureSection.vue'
import SystemCards from '~/components/common/SystemCards.vue'
import TanyaoIotArchitectureFlow from '~/components/demo/tanyao-iot/TanyaoIotArchitectureFlow.client.vue'
import { tanyaoSolutionCards } from '~/data/tanyao'
</script>

<template>
  <ProductArchitectureSection
    eyebrow="解决方案"
    title="多源接入 → 边缘感知 → AI 驱动"
    title-id="tanyao-solution-title"
    subtitle="统一连接设备、传感器与工业系统，通过边缘实时采集与计算融合 AI 分析能力，让现场数据从实时感知走向智能决策。"
    label="探曜·AI物联感知平台解决方案架构图"
    fallback-text="解决方案架构图加载中"
  >
    <div class="relative z-[1] mx-auto h-full w-[min(1704px,100%)] overflow-hidden">
      <div class="absolute left-1/2 top-1/2 h-[520px] w-[1704px] -translate-x-1/2 -translate-y-1/2">
        <ClientOnly>
          <TanyaoIotArchitectureFlow />
          <template #fallback>
            <div class="size-full" aria-hidden="true"></div>
          </template>
        </ClientOnly>
      </div>
    </div>
    <template #after>
      <SystemCards :cards="tanyaoSolutionCards" />
    </template>
  </ProductArchitectureSection>
</template>
