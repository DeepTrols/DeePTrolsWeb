<script setup lang="ts">
import { Layers3 } from '@lucide/vue'
import TagPlatformArchitectureFlow from '~/components/demo/tag-platform/TagPlatformArchitectureFlow.client.vue'
</script>

<template>
  <section class="overflow-x-auto bg-dt-bg px-4 py-16" aria-label="数据标签平台架构 Demo">
    <div class="mx-auto min-w-[1600px] max-w-[1600px]">
      <div class="relative h-[640px] overflow-hidden" role="img" aria-label="数据标签平台架构">
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,var(--ui-primary)_0%,transparent_70%)] opacity-[0.08]"></div>

        <div class="pointer-events-none absolute left-1/2 top-5 z-20 w-[96%] max-w-6xl -translate-x-1/2">
          <div class="rounded-full border border-dashed border-primary/40 bg-white/95 px-4 py-2.5 shadow-sm backdrop-blur-sm">
            <div class="flex items-center justify-center gap-3">
              <span class="flex size-8 items-center justify-center rounded-full border border-primary/35 bg-primary/10 text-primary">
                <Layers3 class="size-4" aria-hidden="true" />
              </span>
              <div class="text-center">
                <p class="text-[13px] font-semibold uppercase tracking-[0.12em] text-primary">统一命名空间</p>
                <p class="text-[15px] font-semibold text-dt-text-highlighted">边缘到云端主题空间</p>
              </div>
            </div>
          </div>
        </div>

        <TagPlatformArchitectureFlow />
      </div>
    </div>
  </section>
</template>
