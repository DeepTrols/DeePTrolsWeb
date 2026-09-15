<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

interface AiApplicationCard {
  title: string
  subtitle: string
  intro: string[]
  icon: string
  image: string
}

const cards: AiApplicationCard[] = [
  {
    title: 'CRM',
    subtitle: '智能获客，精准转化',
    intro: ['AI营销助手｜AI客户洞察｜个性化产品推荐｜', '自动化营销流程｜销售预测分析'],
    icon: 'https://code.authine.com/uploads/20251009050015_816790.png',
    image: 'https://code.authine.com/uploads/20251009050010_519919.png',
  },
  {
    title: 'SRM',
    subtitle: '智慧供应，降本增效',
    intro: ['供应商资质审查｜自动化采购流程｜智能评标｜采购风险自动预警｜供应商评估与考核'],
    icon: 'https://code.authine.com/uploads/20251009050033_988657.png',
    image: 'https://code.authine.com/uploads/20251009050027_644897.png',
  },
  {
    title: '合同管理',
    subtitle: '智慧管控，合规经营',
    intro: ['合同相对方审查｜合同智能审批｜合同印章检查｜合同风险自动预警｜合同履约评价'],
    icon: 'https://code.authine.com/uploads/20251009050129_942899.png',
    image: 'https://code.authine.com/uploads/20251009050124_739696.png',
  },
  {
    title: '项目管理',
    subtitle: '智能驱动，交付无忧',
    intro: ['项目信息结构化识别｜项目策划书自动生成｜项目任务自动分配｜项目进度预测与风险预警｜项目预测分析'],
    icon: 'https://code.authine.com/uploads/20251009050150_755327.png',
    image: 'https://code.authine.com/uploads/20251009050144_130317.png',
  },
  {
    title: '综合办公',
    subtitle: '智能工作，高效协同',
    intro: ['智能AI助手｜文档智能生成｜流程自动化｜', '智能知识库｜智能数据分析'],
    icon: 'https://code.authine.com/uploads/20251009050207_833495.png',
    image: 'https://code.authine.com/uploads/20251009050159_974108.png',
  },
]

const loopedCards = computed(() => [...cards, ...cards, ...cards])
const viewport = ref<HTMLElement>()
const isPaused = ref(false)
let animationFrame = 0
let lastTime = 0
let observer: IntersectionObserver | undefined
const speed = 0.07

function tick(time: number) {
  const element = viewport.value

  if (element && !isPaused.value) {
    const delta = lastTime === 0 ? 0 : time - lastTime
    element.scrollLeft += delta * speed

    if (element.scrollLeft >= element.scrollWidth / 3) {
      element.scrollLeft -= element.scrollWidth / 3
    }
  }

  lastTime = time
  animationFrame = requestAnimationFrame(tick)
}

onMounted(() => {
  if (viewport.value) {
    observer = new IntersectionObserver(([entry]) => {
      isPaused.value = !entry?.isIntersecting
    })
    observer.observe(viewport.value)
  }

  animationFrame = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrame)
  observer?.disconnect()
})
</script>

<template>
  <section class="relative z-[2] overflow-hidden bg-white pb-[120px] pt-[98px] max-md:pb-12 max-md:pt-[43px]" aria-label="企业 AI 应用 Demo">
    <div class="absolute inset-0 z-0">
      <img
        src="https://code.authine.com/dist/images/aiApplicationBg.jpg"
        alt=""
        class="absolute inset-0 size-full object-cover"
        loading="lazy"
      />
    </div>

    <div class="relative z-[1] mx-auto w-[calc(100vw-40px)] max-w-[1896px]">
      <div class="mb-[65px] text-center max-md:mb-[34px]">
        <h2 class="mb-[9px] text-[40px] font-semibold leading-[1.25] text-[#1D2129] max-md:text-2xl">
          <span
            class="bg-[linear-gradient(102deg,#074CFF_12.91%,#4D7FFF_51.71%,#A38CF9_102.59%)] bg-clip-text text-transparent"
          >
            企业AI应用
          </span>
          让生产力数智跃迁
        </h2>
        <p class="text-base leading-6 text-[#1D2129] max-md:text-xs">聚焦企业核心领域、核心场景，推动企业业务智能升级</p>
      </div>

      <div
        ref="viewport"
        class="mb-12 overflow-hidden max-md:mb-6"
        aria-live="off"
        @mouseenter="isPaused = true"
        @mouseleave="isPaused = false"
      >
        <div class="flex w-max gap-6 lg:gap-[18px] min-[1268px]:gap-5 min-[1460px]:gap-6">
          <article
            v-for="(item, index) in loopedCards"
            :key="`${item.title}-${index}`"
            class="relative w-[360px] shrink-0 rounded-[14px] border-2 border-[#F5F5F5] bg-white p-8 max-md:w-[274px] max-md:px-4 max-md:pb-4 max-md:pt-[18px]"
          >
            <div class="absolute right-6 top-6 flex size-12 items-center justify-center rounded-full bg-[#F5F5F5] max-md:size-8">
              <img :src="item.icon" alt="" class="w-7 object-contain max-md:w-[18px]" loading="lazy" />
            </div>
            <h3 class="mb-0 text-lg leading-[1.45] text-[#1D2129] max-md:text-xs">{{ item.title }}</h3>
            <p class="mb-[13px] pr-[53px] text-2xl font-semibold leading-[1.4] text-[#1D2129] max-md:mb-3 max-md:pr-[30px] max-md:text-lg">
              {{ item.subtitle }}
            </p>
            <p class="mb-[21px] min-h-[84px] text-sm leading-7 text-black/60 max-md:mb-[19px] max-md:min-h-[60px] max-md:text-[10px] max-md:leading-5">
              <template v-for="(line, lineIndex) in item.intro" :key="line">
                {{ line }}<br v-if="lineIndex < item.intro.length - 1" />
              </template>
            </p>
            <div class="overflow-hidden rounded-lg">
              <img
                :src="item.image"
                :alt="item.title"
                class="h-auto w-full"
                loading="lazy"
              />
            </div>
          </article>
        </div>
      </div>

      <a
        href="https://code.authine.com/message/"
        target="_blank"
        rel="noreferrer"
        class="relative mx-auto flex h-14 w-[180px] items-center justify-center overflow-hidden rounded-lg bg-[linear-gradient(180deg,#0047FF_0%,#4B7DFF_100%)] text-base font-semibold text-white after:absolute after:left-1/2 after:top-1/2 after:size-[70px] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-[#A99AFF] after:opacity-0 after:blur-xl after:transition-opacity after:duration-300 hover:text-white hover:after:opacity-70 max-md:h-10 max-md:w-32 max-md:rounded max-md:text-sm"
      >
        <span class="relative z-[1]">立即体验</span>
      </a>
    </div>
  </section>
</template>
