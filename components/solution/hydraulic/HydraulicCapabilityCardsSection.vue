<script setup lang="ts">
import BaseCard from '~/components/common/card/BaseCard.vue'
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import { hydraulicCapabilities } from '~/data/solutions/hydraulic'

// Vertical rhythm of the DeepCtrls sc-card reference: title 217.22px,
// points at --sc-point 255.22px plus a 26px step per line.
const pointTopClasses = ['top-[255.22px]', 'top-[281.22px]', 'top-[307.22px]']
</script>

<template>
  <section class="relative flow-root bg-[#f6f8fb] pb-16 lg:pb-32" aria-labelledby="hydraulic-capability-title">
    <div class="container mt-16">
      <div class="mb-12 text-center lg:mb-16">
        <SectionHeader
          title-id="hydraulic-capability-title"
          eyebrow="核心功能体系"
          title="从数据治理到知识决策，构建智慧水利核心能力"
          subtitle="贯通水利数据汇聚、知识构建、知识检索与业务应用全过程，让分散的数据和专业经验转化为可持续积累、可智能调用的水利知识资产，为水利业务人员提供统一知识服务与辅助决策能力。"
          align="center"
          width="wide"
        />
      </div>

      <div
        class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        <BaseCard
          v-for="card in hydraulicCapabilities"
          :key="card.title"
          as="article"
          padding="none"
          tabindex="0"
          class="group relative h-[367px] cursor-default bg-white outline-none"
        >
          <div class="absolute inset-x-0 top-0 h-[181px] w-full overflow-hidden bg-black">
            <img
              class="h-full w-full min-w-full object-cover"
              src="/images/solutions/hydraulic/image-placeholder.svg"
              :alt="card.title"
            />
          </div>
          <div
            class="absolute inset-x-0 bottom-0 top-[181px] bg-white transition-[top] duration-[380ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:top-[93px] group-focus-visible:top-[93px]"
            aria-hidden="true"
          ></div>
          <div
            class="pointer-events-none absolute inset-0 transition-transform duration-300 ease-out group-hover:-translate-y-[74px] group-focus-visible:-translate-y-[74px]"
          >
            <h3 class="absolute left-4 top-[217.22px] w-[271px] max-w-[calc(100%-32px)] text-[20px] font-medium leading-[20px] text-black">
              {{ card.title }}
            </h3>
            <span
              v-for="(point, index) in card.points"
              :key="point"
              class="absolute left-[40.22px] h-[14px] whitespace-nowrap text-[14px] leading-[14px] text-[#49546a] before:absolute before:left-[-16px] before:top-[5px] before:h-1 before:w-1 before:rounded-full before:bg-[#49546a] before:content-['']"
              :class="pointTopClasses[index]"
            >{{ point }}</span>
          </div>
          <p
            class="absolute left-4 right-4 top-[279.22px] text-justify text-[12px] font-light leading-[18px] text-[#3f4d64] opacity-0 transition-opacity delay-50 duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            {{ card.description }}
          </p>
        </BaseCard>
      </div>
    </div>
  </section>
</template>
