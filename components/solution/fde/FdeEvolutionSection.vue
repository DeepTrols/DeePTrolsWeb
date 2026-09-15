<script setup lang="ts">
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import FdeEvolutionVisual from '~/components/solution/fde/FdeEvolutionVisual.vue'
import { fdeEvolutionItems } from '~/data/solutions/fde'
</script>

<template>
  <section class="relative flow-root bg-dt-bg pb-32 lg:pb-44" aria-labelledby="fde-evolution-title">
    <div class="container">
      <div class="mb-12 lg:mb-16">
        <SectionHeader
          title-id="fde-evolution-title"
          eyebrow="FDE 的价值演进"
          title="从 AI 原型，到真正进入生产"
          subtitle="贯穿场景定义、系统集成与生产交付，让 AI 从验证走向应用，并持续优化。"
          align="left"
          width="wide"
          nowrap-subtitle
        />
      </div>

      <div class="grid gap-0">
        <article
          v-for="(item, index) in fdeEvolutionItems"
          :key="item.title"
          class="group relative grid gap-0 border border-default lg:grid-cols-2"
          :class="index > 0 ? '-mt-px' : ''"
        >
          <div
            class="p-8 lg:flex lg:items-center lg:p-12"
            :class="item.visualSide === 'left' ? 'lg:col-start-2' : 'lg:col-start-1'"
          >
            <div class="w-full bg-default">
              <div>
                <span class="text-sm font-semibold uppercase tracking-wide text-muted">{{ item.eyebrow }}</span>
              </div>
              <h3 class="mt-3 text-2xl font-semibold leading-tight text-highlighted">{{ item.title }}</h3>
              <p class="mt-3 text-base leading-relaxed text-default">{{ item.description }}</p>
              <ul class="mt-5 space-y-2 text-base text-default">
                <li v-for="bullet in item.bullets" :key="bullet" class="flex items-start gap-2">
                  <span class="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70" aria-hidden="true"></span>
                  <span>{{ bullet }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div
            class="hidden px-4 lg:flex lg:items-center lg:justify-center [&_.rounded-lg]:rounded-none [&_.rounded-2xl]:rounded-none [&_.rounded-md]:rounded-none"
            :class="item.visualSide === 'left' ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-2'"
          >
            <FdeEvolutionVisual :variant="item.visual" :metric="item.metric" :metric-label="item.metricLabel" />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
