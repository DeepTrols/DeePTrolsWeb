<script setup lang="ts">
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import { dgpEvolutionItems } from '~/data/dgp'
</script>

<template>
  <section class="container pb-32 lg:pb-44" aria-labelledby="dgp-evolution-title">
    <div class="mb-12 flex flex-col items-center gap-2 text-center lg:mb-16">
      <SectionHeader
        eyebrow="企业级数据治理"
        title="企业数据治理体系的演进"
        title-id="dgp-evolution-title"
        subtitle="数曜·治理数据平台提供统一的数据治理底座，贯通数据接入、治理、资产与服务，持续沉淀高质量、可信赖的数据资产。"
        align="center"
        width="wide"
        eyebrow-size="sm"
        eyebrow-tone="primary"
        nowrap-subtitle
      />
    </div>

    <div>
      <div class="grid gap-10">
        <div
          v-for="(item, index) in dgpEvolutionItems"
          :key="item.title"
          class="group relative grid gap-6 lg:grid-cols-2 lg:gap-12"
        >
          <div
            class="lg:flex lg:items-center"
            :class="index % 2 === 1 ? 'lg:col-start-2 lg:pl-12' : 'lg:col-start-1 lg:pr-12'"
          >
            <article
              class="dt-card p-6 backdrop-blur-xl"
            >
              <div>
                <span class="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[13px] font-semibold text-primary/80">
                  {{ item.eyebrow }}
                </span>
              </div>
              <h3 class="mt-6 text-2xl font-bold leading-tight text-highlighted">{{ item.title }}</h3>
              <p class="mt-4 text-base leading-relaxed text-muted">{{ item.description }}</p>
              <ul class="mt-6 space-y-3">
                <li v-for="bullet in item.bullets" :key="bullet" class="flex items-start gap-3 text-sm leading-relaxed text-default">
                  <span class="mt-2 size-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_14px_rgba(94,78,255,0.65)]" aria-hidden="true"></span>
                  <span>{{ bullet }}</span>
                </li>
              </ul>
            </article>
          </div>

          <div
            class="relative min-h-[280px] overflow-hidden lg:min-h-[340px]"
            :class="index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-2 lg:row-start-1'"
            role="img"
            :aria-label="`${item.title} 配图占位符`"
          >
            <div class="absolute inset-0 grid place-items-center text-sm font-medium text-dt-text-muted">
              图片占位符
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
