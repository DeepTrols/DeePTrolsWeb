<script setup lang="ts">
import { computed } from 'vue'

export interface CtaAction {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

export interface CtaMetric {
  label: string
  value?: string
}

const defaultMetrics: CtaMetric[] = [
  { label: '新一代智能基础设施' },
  { label: '四大智能技术底座' },
  { label: '覆盖关键产业场景' },
]

const props = withDefaults(
  defineProps<{
    title?: string
    titleId?: string
    description?: string
    actions?: CtaAction[]
    metrics?: CtaMetric[]
    ctaLabel?: string
    ctaHref?: string
    ariaLabel?: string
  }>(),
  {
    title: '以 AI 重塑数字世界与物理世界',
    titleId: 'contact-cta-title',
    description: '',
    actions: () => [],
    metrics: () => [],
    ctaLabel: '免费获取专属方案',
    ctaHref: '/contact',
    ariaLabel: 'AI 与关键产业场景',
  },
)

const resolvedMetrics = computed(() => (props.metrics?.length ? props.metrics : defaultMetrics))
</script>

<template>
  <section
    class="home-contact-cta relative h-[314px] overflow-hidden bg-[#2149db] bg-[url('/contact-cta-banner.webp')] bg-cover bg-center bg-no-repeat text-white max-[720px]:h-[260px] max-[720px]:bg-[position:62%_center]"
    :aria-labelledby="props.titleId"
  >
    <div class="home-contact-cta__inner relative z-[1] mx-auto h-full w-[var(--dt-container)] max-w-none">
      <h2
        :id="props.titleId"
        class="absolute left-0 top-[78px] m-0 w-full max-w-[759px] bg-[linear-gradient(90deg,#ffffff,#8ffbff_171.36%)] bg-clip-text text-[clamp(24px,4.1vw,42px)] font-medium leading-[1.15] tracking-[0] whitespace-nowrap text-transparent max-[720px]:top-[72px] max-[720px]:text-[22px] max-[720px]:leading-[1.2]"
      >
        {{ props.title }}
      </h2>
      <div
        class="home-contact-cta__metrics absolute left-0 top-[138px] flex flex-wrap items-center gap-x-5 gap-y-2 text-base font-normal leading-[18px] tracking-[1px] text-white max-[720px]:top-[120px] max-[720px]:gap-x-3 max-[720px]:gap-y-1.5 max-[720px]:text-[11px] max-[720px]:leading-4 max-[720px]:tracking-[0]"
        :aria-label="props.ariaLabel"
      >
        <div
          v-for="metric in resolvedMetrics"
          :key="metric.label"
          class="home-contact-cta__metric inline-flex h-[18px] items-center max-[720px]:h-3.5"
        >
          <img
            class="mr-[7px] size-4 shrink-0 max-[720px]:mr-1 max-[720px]:size-3.5"
            src="/images/icons/check-circle-white.svg"
            alt=""
            aria-hidden="true"
          >
          <span>{{ metric.label }}</span>
          <span
            v-if="metric.value"
            class="home-contact-cta__metric-value ml-3 text-[#76ff9b]"
          >
            {{ metric.value }}
          </span>
        </div>
      </div>
      <a
        :href="props.ctaHref"
        class="home-cta home-cta--contact home-cta--iconless absolute left-0 top-[190px] inline-flex h-[46px] w-[360px] max-w-full items-center justify-center gap-2 border border-white/70 bg-transparent px-6 text-base font-normal leading-6 text-white no-underline transition-[border-color,background-color,box-shadow] duration-200 hover:border-white hover:bg-white/10 hover:shadow-[0_0_24px_rgba(118,255,155,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white max-[720px]:top-[175px] max-[720px]:h-11 max-[720px]:w-full"
      >
        <span>{{ props.ctaLabel }}</span>
      </a>
    </div>
  </section>
</template>
