<script setup lang="ts">
export interface ProductMetricItem {
  value: string
  label: string
}

defineProps<{
  items: ProductMetricItem[]
}>()

// Divider borders follow the DeepCtrls product-metrics reference:
// desktop 1x4 (right divider between cells), mobile 2x2 (bottom divider on the top row).
const cellBorderClasses = ['border-b border-r sm:border-b-0', 'border-b sm:border-b-0 sm:border-r', 'border-r', '']
</script>

<template>
  <section class="product-metrics flow-root bg-white pb-32 lg:pb-44" aria-label="产品核心指标">
    <div class="border-b border-[#edf0f6]">
      <div
        class="mx-auto grid min-h-[154px] w-[min(1424px,calc(100%-48px))] grid-cols-2 max-sm:w-[calc(100%-32px)] sm:grid-cols-4"
      >
        <div
          v-for="(item, index) in items"
          :key="item.label"
          class="grid place-content-center border-[#edf0f6] px-[18px] py-6 text-center"
          :class="cellBorderClasses[index]"
        >
          <strong class="text-[29px] leading-[27px] font-medium text-black">{{ item.value }}</strong>
          <span class="mt-[14px] text-[15px] leading-[18px] text-[#455c78]">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
