<script setup lang="ts">
import type { ArticleBreadcrumbItem } from '~/types/article'

defineProps<{
  items: ArticleBreadcrumbItem[]
}>()
</script>

<template>
  <nav class="article-breadcrumb bg-[#eff0f3] pt-[var(--dt-header-height)]" aria-label="面包屑">
    <ol class="container flex h-[58px] items-center gap-1.5 text-sm leading-[21px]">
      <li
        v-for="(item, index) in items"
        :key="item.label"
        class="flex min-w-0 items-center gap-1.5"
      >
        <i
          v-if="index > 0"
          class="inline-block size-3 shrink-0 scale-[0.62] rotate-45 border-r-[1.4px] border-t-[1.4px] border-[#a6a6a6]"
          aria-hidden="true"
        />
        <NuxtLink
          v-if="item.href"
          :to="item.href"
          :class="index === 0 ? 'shrink-0 text-primary hover:underline' : 'min-w-0 truncate text-[#7e7e7e] hover:text-primary'"
        >
          {{ item.label }}
        </NuxtLink>
        <span v-else class="min-w-0 truncate text-[#7e7e7e]">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>
