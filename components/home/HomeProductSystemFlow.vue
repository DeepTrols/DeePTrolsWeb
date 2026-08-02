<script setup lang="ts">
import ProductSystemFlowFrame from '~/components/common/ProductSystemFlowFrame.vue'
import EnterpriseFlow from '~/components/flow/EnterpriseFlow.client.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'

withDefaults(
  defineProps<{
    label: string
    fallbackText?: string
  }>(),
  {
    fallbackText: 'DeepTrolsOS 能力图加载中',
  },
)

const shouldRenderFlow = ref(false)
let desktopMediaQuery: MediaQueryList | undefined

function syncDesktopFlow() {
  shouldRenderFlow.value = Boolean(desktopMediaQuery?.matches)
}

onMounted(() => {
  desktopMediaQuery = window.matchMedia('(min-width: 1024px)')
  syncDesktopFlow()
  desktopMediaQuery.addEventListener('change', syncDesktopFlow)
})

onBeforeUnmount(() => {
  desktopMediaQuery?.removeEventListener('change', syncDesktopFlow)
})
</script>

<template>
  <ProductSystemFlowFrame :label="label" :fallback-text="fallbackText">
    <ClientOnly>
      <EnterpriseFlow v-if="shouldRenderFlow" />
      <div v-else class="home-product-system-flow__fallback">{{ fallbackText }}</div>
      <template #fallback>
        <div class="home-product-system-flow__fallback">{{ fallbackText }}</div>
      </template>
    </ClientOnly>
  </ProductSystemFlowFrame>
</template>

<style scoped lang="scss">
.home-product-system-flow__fallback {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  height: 100%;
  color: var(--dt-color-text-muted);
}
</style>
