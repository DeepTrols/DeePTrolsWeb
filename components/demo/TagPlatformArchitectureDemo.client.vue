<script setup lang="ts">
import TagPlatformArchitectureFlow from '~/components/demo/tag-platform/TagPlatformArchitectureFlow.client.vue'
</script>

<template>
  <section class="overflow-x-auto bg-dt-bg px-4 py-16" aria-label="数据标签平台架构 Demo">
    <div class="mx-auto min-w-[1704px] max-w-[1704px]">
      <div class="relative h-[640px] overflow-hidden" role="img" aria-label="数据标签平台架构">
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,var(--ui-primary)_0%,transparent_70%)] opacity-[0.08]"></div>

        <TagPlatformArchitectureFlow />
      </div>
    </div>
  </section>
</template>
