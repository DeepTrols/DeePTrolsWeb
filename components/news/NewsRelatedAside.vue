<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import PagerArrows from '~/components/common/PagerArrows.vue'
import NewsRelatedCard from '~/components/news/NewsRelatedCard.vue'
import { getNewsByCategory } from '~/data/news'
import type { NewsCategory } from '~/data/news'

// 复刻参考站 ma-aside：「相关动态」标题 + 3 张/组相关卡片（同分类排除当前文章）+ ma-relpager 组翻页
const props = defineProps<{
  category: NewsCategory
  currentId: number
}>()

const GROUP_SIZE = 3

const groupIndex = ref(0)
const relatedItems = computed(() =>
  getNewsByCategory(props.category).filter((item) => item.id !== props.currentId),
)
const totalGroups = computed(() => Math.max(1, Math.ceil(relatedItems.value.length / GROUP_SIZE)))
const visibleItems = computed(() =>
  relatedItems.value.slice(groupIndex.value * GROUP_SIZE, groupIndex.value * GROUP_SIZE + GROUP_SIZE),
)

watch(relatedItems, () => {
  groupIndex.value = 0
})

function previousGroup() {
  if (groupIndex.value > 0) {
    groupIndex.value -= 1
  }
}

function nextGroup() {
  if (groupIndex.value < totalGroups.value - 1) {
    groupIndex.value += 1
  }
}
</script>

<template>
  <aside class="mx-auto w-full min-w-0 max-w-[900px] xl:mx-0 xl:max-w-none">
    <h2 class="text-[38px] font-normal leading-[42px] text-[#1d2234] max-md:text-[28px] max-md:leading-[34px]">
      相关动态
    </h2>
    <p v-if="!relatedItems.length" class="mt-[43px] text-[#8a8a8a]">暂无相关动态</p>
    <NewsRelatedCard
      v-for="(item, index) in visibleItems"
      :key="item.id"
      :item="item"
      :class="index === 0 ? 'mt-[43px]' : 'mt-[42px]'"
    />
    <div
      v-if="relatedItems.length > GROUP_SIZE"
      class="mt-10 flex justify-start xl:mt-20 xl:justify-end"
    >
      <PagerArrows
        prev-label="上一组相关动态"
        next-label="下一组相关动态"
        :prev-disabled="groupIndex === 0"
        :next-disabled="groupIndex === totalGroups - 1"
        @prev="previousGroup"
        @next="nextGroup"
      />
    </div>
  </aside>
</template>
