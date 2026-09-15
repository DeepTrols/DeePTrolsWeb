<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import type { ArticleLinkRowItem } from '~/types/article'

defineProps<{
  title: string
  titleId?: string
  items: ArticleLinkRowItem[]
}>()
</script>

<template>
  <section class="article-link-rows flow-root pb-32 lg:pb-44" :aria-labelledby="titleId">
    <div class="container">
      <h2 :id="titleId" class="text-[22px] font-medium leading-[30px] text-black max-md:text-xl">
        {{ title }}
      </h2>
      <ul class="mt-3">
        <li v-for="item in items" :key="item.href" class="border-b border-[#e2e2e2]">
          <NuxtLink :to="item.href" class="group flex h-[55px] items-center">
            <i class="ml-0.5 size-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span class="ml-3 min-w-0 flex-1 truncate text-base leading-6 text-[#555] transition-colors group-hover:text-primary">
              {{ item.label }}
            </span>
            <ArrowRight
              :size="18"
              class="ml-6 shrink-0 text-[#a6a6a6] transition-colors group-hover:text-primary"
              aria-hidden="true"
            />
          </NuxtLink>
        </li>
      </ul>
      <p v-if="items.length === 0" class="py-12 text-center text-base text-muted">
        暂无相关内容
      </p>
    </div>
  </section>
</template>
