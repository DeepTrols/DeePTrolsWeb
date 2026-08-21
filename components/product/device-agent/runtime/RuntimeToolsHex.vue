<script setup lang="ts">
import { Box } from '@lucide/vue'

defineProps<{ active: boolean }>()
</script>

<template>
  <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
    <svg
      class="absolute left-1/2 top-1/2 h-[143px] w-[123px] -translate-x-1/2 -translate-y-1/2 xl:h-[224px] xl:w-[193px]"
      viewBox="0 0 146 170"
      fill="none"
    >
      <polygon points="73,18.3 122.5,51.7 122.5,118.4 73,151.7 23.6,118.4 23.6,51.7" class="stroke-primary/16" stroke-width="1" stroke-linejoin="round" />
      <polygon points="73,9.6 128.9,47.3 128.9,122.7 73,160.4 17.1,122.7 17.1,47.3" class="stroke-primary/12" stroke-width="1" stroke-linejoin="round" />
      <polygon points="73,0.9 135.4,42.9 135.4,127.1 73,169.1 10.6,127.1 10.6,42.9" class="stroke-primary/8" stroke-width="1" stroke-linejoin="round" />
    </svg>
    <div
      class="clip-hex relative h-[97px] w-[84px] transition-colors duration-300 xl:h-[152px] xl:w-[132px]"
      :class="active ? 'bg-primary/45' : 'bg-primary/30'"
    >
      <div class="clip-hex-inner absolute inset-px bg-dt-bg"></div>
      <div
        class="clip-hex-inner absolute inset-px flex flex-col items-center justify-center gap-1 text-center shadow-[inset_0_0_18px_rgba(139,92,246,0.15)] transition-colors duration-300"
        :class="active ? 'bg-primary/15' : 'bg-primary/10'"
      >
        <Box class="size-4 text-primary xl:size-5" aria-hidden="true" />
        <p class="text-xs font-semibold leading-4 text-highlighted xl:text-sm xl:leading-5">MCP 工具层</p>
        <p class="font-mono text-xs leading-4 text-muted">Tools Ready</p>
      </div>
    </div>
  </div>
</template>
