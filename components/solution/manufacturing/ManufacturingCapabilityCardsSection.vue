<script setup lang="ts">
import BaseCard from '~/components/common/card/BaseCard.vue'
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import { manufacturingCapabilities } from '~/data/solutions/manufacturing'

// Vertical rhythm of the DeepCtrls sc-card reference: title 217.22px,
// points at --sc-point 255.22px plus a 26px step per line.
const pointTopClasses = ['top-[255.22px]', 'top-[281.22px]', 'top-[307.22px]']
</script>

<template>
  <section class="relative flow-root bg-[#f6f8fb] pb-16 lg:pb-32" aria-labelledby="manufacturing-capability-title">
    <div class="container mt-16">
      <div class="mb-12 text-center lg:mb-16">
        <SectionHeader
          title-id="manufacturing-capability-title"
          eyebrow="核心功能体系"
          title="四大核心功能，覆盖设备、质量、生产与能源全场景"
          subtitle="融合工业物联、数据智能、企业知识与 AI 能力，构建设备预测性维护、AI视觉质量检测、APS智能生产排程与工厂能源智能管理四大核心能力，提升制造企业生产效率、质量水平、设备可靠性与能源利用效率。"
          align="center"
        />
      </div>

      <div
        class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        <BaseCard
          v-for="card in manufacturingCapabilities"
          :key="card.title"
          as="article"
          padding="none"
          tabindex="0"
          class="group relative h-[367px] cursor-default bg-white outline-none"
        >
          <div class="absolute inset-x-0 top-0 h-[181px] w-full overflow-hidden bg-black">
            <img
              class="h-full w-full min-w-full object-cover"
              src="/images/solutions/manufacturing/image-placeholder.svg"
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
