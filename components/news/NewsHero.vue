<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { formatNewsDate, getNewsByCategory } from '~/data/news'
import type { NewsCategory } from '~/data/news'

// 复刻参考站 mc-hero：650px 深色横幅，轮播当前分类最新 3 条头条（6s 自动 + 分段点击），
// 左文右图 + 底部分段条；使用项目统一 container 宽度与其他页面保持一致。
const props = defineProps<{
  category: NewsCategory
}>()

const AUTOPLAY_INTERVAL = 6000

const headlines = computed(() => getNewsByCategory(props.category).slice(0, 3))
const activeIndex = ref(0)
const activeHeadline = computed(() => headlines.value[activeIndex.value])
let autoplayTimer: ReturnType<typeof setInterval> | null = null

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

function startAutoplay() {
  stopAutoplay()
  if (headlines.value.length > 1) {
    autoplayTimer = setInterval(() => {
      activeIndex.value = (activeIndex.value + 1) % headlines.value.length
    }, AUTOPLAY_INTERVAL)
  }
}

function selectHeadline(index: number) {
  activeIndex.value = index
  startAutoplay()
}

watch(
  () => props.category,
  () => {
    activeIndex.value = 0
    startAutoplay()
  },
)

onMounted(startAutoplay)
onBeforeUnmount(stopAutoplay)
</script>

<template>
  <section
    class="news-hero relative overflow-hidden bg-[#111318] bg-[url('/images/news/news-hero-bg.svg')] bg-cover bg-center md:h-[650px]"
    aria-label="新闻头条"
  >
    <div class="container relative flex flex-col gap-10 pt-[calc(var(--dt-header-height)+48px)] pb-12 md:grid md:h-full md:grid-cols-[minmax(0,588fr)_minmax(0,712fr)] md:gap-[103px] md:pt-0 md:pb-0">
      <div class="md:pt-[223px]">
        <p v-if="activeHeadline" class="text-base leading-[31px] text-justify text-[#ffffffb8]">
          {{ formatNewsDate(activeHeadline.publishedAt) }}
        </p>
        <NuxtLink
          v-if="activeHeadline"
          :to="`/news/${activeHeadline.id}`"
          class="mt-5 line-clamp-2 block text-[26px] font-normal leading-[38px] tracking-[1px] !text-white transition-colors hover:!text-[#9db2ff] md:h-[99px] md:text-[30px] md:leading-[50px]"
        >
          {{ activeHeadline.title }}
        </NuxtLink>
        <p v-if="activeHeadline" class="mt-5 line-clamp-2 text-lg leading-[31px] tracking-[1px] text-[#ffffffc7]">
          {{ activeHeadline.summary }}
        </p>
        <p v-if="!activeHeadline" class="text-base text-[#68758c]">暂无新闻动态</p>

        <!-- 分段条：1px 基线 + 等宽分段按钮，激活分段为白色 2px 线（md 下按参考坐标绝对定位） -->
        <div
          class="relative mt-12 h-px bg-[#ffffff38] md:absolute md:top-[547px] md:left-[5px] md:mt-0 md:w-[647.5px]"
        >
          <div class="absolute inset-x-0 -top-1.5 flex h-[13px]">
            <button
              v-for="(headline, index) in headlines"
              :key="headline.id"
              type="button"
              class="relative flex-1 cursor-pointer after:absolute after:inset-x-0 after:top-[6px] after:h-px after:bg-transparent after:transition-colors after:duration-300"
              :class="index === activeIndex ? 'after:top-[5.5px] after:h-0.5 after:bg-white' : ''"
              :aria-label="`切换到第 ${index + 1} 条头条`"
              @click="selectHeadline(index)"
            />
          </div>
        </div>
      </div>

      <NuxtLink
        v-if="activeHeadline"
        :to="`/news/${activeHeadline.id}`"
        class="group block aspect-[712/361] w-full overflow-hidden bg-[#d9d9d9] md:mt-[186px] md:aspect-auto md:h-[361px]"
        :aria-label="activeHeadline.title"
      >
        <img
          :src="activeHeadline.coverImage"
          :alt="activeHeadline.title"
          class="h-full w-full object-cover transition-transform duration-[450ms] ease-out group-hover:scale-[1.03]"
        >
      </NuxtLink>
    </div>
  </section>
</template>
