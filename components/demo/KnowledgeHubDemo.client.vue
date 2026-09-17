<script setup lang="ts">
import KnowledgeHubFlow from '~/components/demo/knowledge-hub/KnowledgeHubFlow.client.vue'
</script>

<template>
  <section class="overflow-x-auto bg-dt-bg px-4 py-16" aria-label="博曜知识中枢架构 Demo">
    <div class="mx-auto min-w-[1704px] max-w-[1704px]">
      <div class="relative h-[520px] overflow-hidden" role="img" aria-label="博曜知识中枢架构图">
        <ClientOnly>
          <KnowledgeHubFlow />
          <template #fallback>
            <div class="size-full" aria-hidden="true"></div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </section>
</template>
