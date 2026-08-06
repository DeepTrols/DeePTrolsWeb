<script setup lang="ts">
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import { dmsValueItems } from '~/data/dms'
</script>

<template>
  <section class="container pb-32 lg:pb-44" aria-labelledby="dms-business-value-title">
    <div class="mb-12 flex flex-col items-center gap-2 text-center lg:mb-16">
      <SectionHeader
        eyebrow="业务价值"
        title="可量化的数据要素监管效能"
        title-id="dms-business-value-title"
        subtitle="从风险预防到事件处置，实现全过程监管闭环，为监管决策提供持续的数据支撑。"
        align="center"
        width="wide"
        nowrap-subtitle
        eyebrow-size="sm"
        eyebrow-tone="primary"
      />
    </div>

    <div class="grid gap-5 md:grid-cols-2">
      <article
        v-for="item in dmsValueItems"
        :key="item.title"
        class="group relative overflow-hidden rounded-2xl border border-default bg-default p-7 shadow-sm transition-shadow duration-500 hover:shadow-md lg:p-9"
      >
        <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
        <div class="flex items-baseline gap-3">
          <span class="text-4xl font-bold tracking-tight text-primary lg:text-5xl">{{ item.metric }}</span>
          <h3 class="text-lg font-semibold text-highlighted">{{ item.title }}</h3>
        </div>
        <p class="mt-5 text-base leading-relaxed text-muted">{{ item.description }}</p>
        <p class="mt-4 text-sm font-medium leading-relaxed text-default">{{ item.detail }}</p>
      </article>
    </div>
  </section>
</template>
