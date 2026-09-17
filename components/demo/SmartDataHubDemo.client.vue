<script setup lang="ts">
import SmartDataHubFlow from '~/components/demo/smart-data-hub/SmartDataHubFlow.client.vue'
</script>

<template>
  <section class="overflow-x-auto bg-dt-bg px-4 py-16" aria-label="数曜数据开发平台架构 Demo">
    <div class="mx-auto min-w-[1704px] max-w-[1704px]">
      <div class="relative h-[560px] overflow-hidden" role="img" aria-label="数曜数据开发平台智能数据开发引擎架构">
        <ClientOnly>
          <SmartDataHubFlow />
          <template #fallback>
            <div class="size-full" aria-hidden="true"></div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </section>
</template>
