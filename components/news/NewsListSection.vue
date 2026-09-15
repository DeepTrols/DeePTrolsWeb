<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import PagerArrows from '~/components/common/PagerArrows.vue'
import { formatNewsDate } from '~/data/news'
import type { NewsItem } from '~/data/news'

// 复刻参考站 mc-list：白底行列表（左文右缩略图，行距 pitch 310，行间 64px 空隙正中 1px #e7eaef 分隔线，末行无），
// 5 条/页 + 右对齐 49×49 双箭头分页（复用 PagerArrows）。
const props = defineProps<{
  items: NewsItem[]
}>()

const PAGE_SIZE = 5

const currentPage = ref(1)
const totalPages = computed(() => Math.max(1, Math.ceil(props.items.length / PAGE_SIZE)))
const pagedItems = computed(() =>
  props.items.slice((currentPage.value - 1) * PAGE_SIZE, currentPage.value * PAGE_SIZE),
)

watch(
  () => props.items,
  () => {
    currentPage.value = 1
  },
)

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value -= 1
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1
  }
}
</script>

<template>
  <section class="bg-white pt-12 md:pt-[138px]" aria-label="新闻列表">
    <div class="container pb-16 md:pb-[91px]">
      <p v-if="!items.length" class="py-[150px] text-center text-base text-[#68758c]">暂无新闻动态</p>

      <template v-for="(item, index) in pagedItems" :key="item.id">
        <div
          class="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,855fr)_minmax(0,484fr)] md:gap-x-[61px]"
          :class="index < pagedItems.length - 1 ? 'border-b border-[#e7eaef] pb-8 mb-8' : ''"
        >
          <div class="flex flex-col gap-2.5 md:pt-[11px]">
            <NuxtLink
              :to="`/news/${item.id}`"
              class="line-clamp-2 text-[22px] font-normal leading-10 tracking-[1px] !text-[#2d2d2d] transition-colors hover:!text-primary"
            >
              {{ item.title }}
            </NuxtLink>
            <p class="line-clamp-2 text-base leading-[26px] text-[#555]">
              {{ item.summary }}
            </p>
            <p class="mt-1.5 text-base leading-[31px] text-[#2d2d2d]">
              {{ formatNewsDate(item.publishedAt) }}
            </p>
          </div>
          <NuxtLink
            :to="`/news/${item.id}`"
            class="group aspect-[484/246] block w-full overflow-hidden rounded-[6px] bg-[#d9d9d9] shadow-[0_4px_16px_#1d22341a] transition-shadow duration-300 hover:shadow-[0_10px_28px_#1d223429] md:h-[246px] md:aspect-auto"
            :aria-label="item.title"
          >
            <img
              :src="item.coverImage"
              :alt="item.title"
              loading="lazy"
              class="h-full w-full object-cover transition-transform duration-[450ms] ease-out group-hover:scale-[1.04]"
            >
          </NuxtLink>
        </div>
      </template>

      <div v-if="items.length > PAGE_SIZE" class="mt-10 flex justify-center md:mt-20 md:justify-end">
        <PagerArrows
          :prev-disabled="currentPage === 1"
          :next-disabled="currentPage === totalPages"
          @prev="previousPage"
          @next="nextPage"
        />
      </div>
    </div>
  </section>
</template>
