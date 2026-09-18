<script setup lang="ts">
import BoyaoIntegrationFlow from '~/components/demo/boyao-integration/BoyaoIntegrationFlow.client.vue'
</script>

<template>
  <section class="overflow-x-auto bg-dt-bg px-4 py-16" aria-label="博曜系统集成架构 Demo">
    <div class="mx-auto min-w-[1704px] max-w-[1704px]">
      <div class="relative h-[580px] w-full overflow-hidden" role="img" aria-label="博曜企业级知识管理平台系统集成架构图，左侧 OA、ERP、CRM、MES 与网盘文件库等异构系统经博曜集成引擎统一采集入组织知识文档库，再经调用服务网关以知识门户、智能助手等端点回送同一批异构系统，形成系统集成、统一采集、开放调用的横向闭环">
        <BoyaoIntegrationFlow />
      </div>
    </div>
  </section>
</template>
