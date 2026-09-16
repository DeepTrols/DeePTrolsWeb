<script setup lang="ts">
import DeepTrolsArchitectureFlow from '~/components/flow/DeepTrolsArchitectureFlow.client.vue'
</script>

<template>
  <section class="overflow-x-auto bg-dt-bg px-4 py-16" aria-label="DeepTrols platform architecture demo">
    <div class="mx-auto min-w-[1600px] max-w-[1600px]">
      <div class="h-[560px] w-full">
        <div class="relative size-full overflow-hidden" role="img" aria-label="DeepTrols platform architecture">
          <DeepTrolsArchitectureFlow />
        </div>
      </div>
    </div>
  </section>
</template>
