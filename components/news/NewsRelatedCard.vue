<script setup lang="ts">
import { formatNewsDateShort } from '~/data/news'
import type { NewsItem } from '~/data/news'

// 复刻参考站 ma-relcard：213px 媒体图（hover scale 1.04）+ 2 行截断标题（hover 主色）+ 日期
defineProps<{
  item: NewsItem
}>()
</script>

<template>
  <NuxtLink :to="`/news/${item.id}`" class="group block">
    <span class="block h-[213px] w-full overflow-hidden bg-[#8a8a8a]">
      <img
        :src="item.coverImage"
        :alt="item.title"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-[450ms] ease-out group-hover:scale-[1.04]"
      >
    </span>
    <span
      class="line-clamp-2 mt-[22px] block h-[50px] text-justify text-base font-light leading-[25px] text-black transition-colors group-hover:text-primary"
    >
      {{ item.title }}
    </span>
    <span class="mt-3 block text-[15px] font-light leading-[26px] text-[#555]">
      {{ formatNewsDateShort(item.publishedAt) }}
    </span>
  </NuxtLink>
</template>
