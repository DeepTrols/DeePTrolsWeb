<script setup lang="ts">
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import { dlpTimelineItems } from '~/data/dlp'

function contentClasses(index: number) {
  return index % 2 === 1 ? 'lg:col-start-2 lg:pl-12' : 'lg:col-start-1 lg:pr-12'
}

function visualClasses(index: number) {
  return index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1 lg:pr-12' : 'lg:col-start-2 lg:row-start-1 lg:pl-12'
}
</script>

<template>
  <section class="pb-32 lg:pb-44" aria-labelledby="dlp-capability-flow-title">
    <div class="container">
      <div class="text-center">
        <SectionHeader
          eyebrow="核心能力"
          title="让每一个标签创造价值"
          title-id="dlp-capability-flow-title"
          subtitle="数曜·数据标签平台覆盖标签建模、生产、治理、服务与应用全流程，让企业标签更易构建、更易管理、更易复用。"
          align="center"
          width="wide"
          nowrap-subtitle
        />
      </div>

      <div class="relative mt-14 lg:mt-[4.5rem]">
        <div
          class="pointer-events-none absolute left-4 top-0 z-0 h-full w-px rounded-full bg-zinc-400/35 lg:left-1/2 lg:-translate-x-1/2"
          aria-hidden="true"
        ></div>

        <div class="relative z-10 space-y-12 lg:space-y-[4.5rem]">
          <div v-for="(item, index) in dlpTimelineItems" :key="item.number" class="relative">
            <span
              class="absolute left-4 top-4 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border border-primary/25 bg-dt-bg text-[13px] font-semibold text-primary shadow-[0_0_0_8px_var(--dt-color-bg)] lg:left-1/2"
            >
              {{ item.number }}
            </span>

            <div class="grid gap-6 pl-10 lg:grid-cols-2 lg:gap-12 lg:pl-0">
              <div class="lg:flex lg:items-center" :class="contentClasses(index)">
                <div class="py-4 lg:py-8">
                  <div>
                    <span class="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[13px] font-semibold text-primary/80">
                      {{ item.category }}
                    </span>
                  </div>
                  <h3 class="mt-6 text-2xl font-bold leading-tight text-highlighted sm:text-3xl">{{ item.title }}</h3>
                  <p class="mt-4 text-base leading-relaxed text-muted">{{ item.description }}</p>
                  <ul class="mt-6 space-y-3">
                    <li v-for="bullet in item.bullets" :key="bullet" class="flex items-start gap-3 text-sm leading-relaxed text-default">
                      <span class="mt-2 size-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_14px_rgba(94,78,255,0.65)]" aria-hidden="true"></span>
                      <span>{{ bullet }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div
                class="relative min-h-[280px] overflow-hidden rounded-2xl bg-dt-bg-soft/30 lg:min-h-[360px]"
                :class="visualClasses(index)"
                role="img"
                :aria-label="`${item.title} 图片占位符`"
              >
                <div
                  class="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:44px_44px] bg-[position:center_center]"
                  aria-hidden="true"
                ></div>
                <div class="absolute inset-8 rounded-2xl bg-dt-bg/45" aria-hidden="true"></div>
                <div class="absolute inset-0 grid place-items-center text-sm font-medium text-dt-text-muted">
                  图片占位符
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
