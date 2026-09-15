<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'

// 共享翻页按钮组：复刻参考站 49×49 双箭头分页按钮（pager-arrow），
// 供新闻列表分页（mc-pager）与详情页相关动态组翻页（ma-relpager）复用；
// 参考站 hover 换图效果以 hover 变主色替代，不引入外部图标素材。
withDefaults(
  defineProps<{
    prevDisabled?: boolean
    nextDisabled?: boolean
    prevLabel?: string
    nextLabel?: string
  }>(),
  {
    prevDisabled: false,
    nextDisabled: false,
    prevLabel: '上一页',
    nextLabel: '下一页',
  },
)

defineEmits<{
  prev: []
  next: []
}>()
</script>

<template>
  <div class="flex items-center gap-[17px]">
    <button
      type="button"
      :disabled="prevDisabled"
      :aria-label="prevLabel"
      class="grid size-[49px] cursor-pointer place-items-center border border-[#dfe3ea] bg-white text-[#2d2d2d] transition-colors duration-200 hover:border-primary hover:text-primary disabled:cursor-default disabled:opacity-45 disabled:hover:border-[#dfe3ea] disabled:hover:text-[#2d2d2d]"
      @click="$emit('prev')"
    >
      <ArrowRight :size="20" class="rotate-180" aria-hidden="true" />
    </button>
    <button
      type="button"
      :disabled="nextDisabled"
      :aria-label="nextLabel"
      class="grid size-[49px] cursor-pointer place-items-center border border-[#dfe3ea] bg-white text-[#2d2d2d] transition-colors duration-200 hover:border-primary hover:text-primary disabled:cursor-default disabled:opacity-45 disabled:hover:border-[#dfe3ea] disabled:hover:text-[#2d2d2d]"
      @click="$emit('next')"
    >
      <ArrowRight :size="20" aria-hidden="true" />
    </button>
  </div>
</template>
