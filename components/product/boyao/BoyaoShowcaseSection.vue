<script setup lang="ts">
import { boyaoShowcases } from '~/data/boyao'
</script>

<template>
  <section class="container grid gap-20 pb-32 lg:gap-28 lg:pb-44" aria-label="博曜文档解析能力">
    <div
      v-for="item in boyaoShowcases"
      :key="item.key"
      class="grid gap-6 lg:grid-cols-2 lg:gap-12"
      :aria-labelledby="`boyao-showcase-${item.key}`"
    >
      <div
        class="lg:flex lg:items-center"
        :class="item.reverse ? 'lg:col-start-2 lg:pl-12' : 'lg:col-start-1 lg:pr-12'"
      >
        <div class="py-4 lg:py-8">
          <div>
            <span
              class="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[13px] font-semibold text-primary/80"
            >
              {{ item.eyebrow }}
            </span>
          </div>
          <h3 :id="`boyao-showcase-${item.key}`" class="mt-6 text-2xl font-bold leading-tight text-highlighted">
            {{ item.title }}
          </h3>
          <p class="mt-4 text-base leading-relaxed text-muted">{{ item.subtitle }}</p>

          <div class="mt-8 space-y-6">
            <div v-for="block in item.blocks" :key="block.title">
              <h4 class="flex items-center gap-3 text-base font-semibold text-highlighted">
                <span
                  class="size-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_14px_rgba(94,78,255,0.65)]"
                  aria-hidden="true"
                ></span>
                {{ block.title }}
              </h4>
              <p class="mt-2 pl-[18px] text-sm leading-relaxed text-muted">{{ block.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="relative min-h-[280px] overflow-hidden rounded-2xl border border-default bg-muted/20 lg:min-h-[340px]"
        :class="item.reverse ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-2 lg:row-start-1'"
        role="img"
        :aria-label="`${item.title} 配图占位符`"
      >
        <div class="absolute inset-0 grid place-items-center text-sm font-medium text-dt-text-muted">图片占位符</div>
      </div>
    </div>
  </section>
</template>
