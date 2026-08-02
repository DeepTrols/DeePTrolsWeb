<script setup lang="ts">
import SectionHeading from '~/components/common/SectionHeading.vue'
import { dgpEvolutionItems } from '~/data/dgp'
</script>

<template>
  <section class="bg-dt-bg pb-32 lg:pb-44" aria-labelledby="dgp-evolution-title">
    <div class="container">
      <div class="mb-12 text-center lg:mb-16">
        <SectionHeading
          eyebrow="企业级数据治理"
          title="企业数据治理体系的演进"
          title-id="dgp-evolution-title"
          subtitle="数曜·治理数据平台提供统一的数据治理底座，贯通数据接入、治理、资产与服务，持续沉淀高质量、可信赖的数据资产。"
          align="center"
        />
      </div>

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
              class="rounded-2xl border border-dt-line bg-dt-bg p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-dt-primary/40"
            >
              <p class="text-sm font-semibold uppercase tracking-wide text-dt-primary/75">{{ item.eyebrow }}</p>
              <h3 class="mt-4 text-2xl font-bold leading-tight text-dt-text-highlighted sm:text-3xl">{{ item.title }}</h3>
              <p class="mt-4 text-base leading-relaxed text-dt-text-muted sm:text-lg">{{ item.description }}</p>
              <ul class="mt-6 grid gap-3">
                <li v-for="bullet in item.bullets" :key="bullet" class="flex items-center gap-3 text-sm text-dt-text">
                  <span class="size-1.5 rounded-full bg-dt-primary shadow-[0_0_14px_rgba(94,78,255,0.65)]" aria-hidden="true"></span>
                  <span>{{ bullet }}</span>
                </li>
              </ul>
            </article>
          </div>

          <div
            class="relative min-h-[280px] overflow-hidden rounded-2xl border border-dt-line bg-dt-bg-soft/40 lg:min-h-[340px]"
            :class="index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-2 lg:row-start-1'"
            role="img"
            :aria-label="`${item.title} 配图占位符`"
          >
            <div
              class="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:44px_44px] bg-[position:center_center]"
              aria-hidden="true"
            ></div>
            <div class="absolute inset-8 rounded-2xl border border-dt-line-strong bg-dt-bg/60" aria-hidden="true"></div>
            <div class="absolute inset-0 grid place-items-center text-sm font-medium text-dt-text-muted">
              图片占位符
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
