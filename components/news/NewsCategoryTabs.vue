<script setup lang="ts">
import { newsCategoryTabs } from '~/data/news'
import type { NewsCategory } from '~/data/news'

// 复刻参考站 mc-tabs：74px 白底分类 tab 条（三等分）+ 263×4 主色下划条，
// 激活/hover 文字变主色；切换由父页面同步 ?category= query。
defineProps<{
  activeCategory: NewsCategory
}>()

defineEmits<{
  change: [category: NewsCategory]
}>()
</script>

<template>
  <nav class="bg-white shadow-[0_12px_20px_#f1f5fa]" aria-label="新闻分类">
    <div class="container grid h-[74px] grid-cols-3">
      <button
        v-for="tab in newsCategoryTabs"
        :key="tab.key"
        type="button"
        class="relative cursor-pointer text-lg leading-[73px] text-[#969696] transition-colors duration-200 hover:text-primary"
        :class="tab.key === activeCategory ? 'text-primary' : ''"
        :aria-current="tab.key === activeCategory ? 'true' : undefined"
        @click="$emit('change', tab.key)"
      >
        <span>{{ tab.label }}</span>
        <i
          v-if="tab.key === activeCategory"
          class="absolute bottom-0 left-1/2 h-1 w-[263px] max-w-full -translate-x-1/2 bg-primary"
          aria-hidden="true"
        />
      </button>
    </div>
  </nav>
</template>
