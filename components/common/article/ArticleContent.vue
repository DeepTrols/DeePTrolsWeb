<script setup lang="ts">
import { computed } from 'vue'
import type { ArticleBlock } from '~/types/article'

const props = withDefaults(
  defineProps<{
    blocks: ArticleBlock[]
    /** case = 案例详情 cd-content（默认）；news = 新闻详情 ma-content（正文色 #555、段落/列表下间距 30px、分隔线 #d9dde4、移动端行高 28/左对齐） */
    variant?: 'case' | 'news'
  }>(),
  { variant: 'case' },
)

// 排版固定复刻 DeepCtrls 案例详情 cd-content 规范（字号/行高/间距），仅以 Tailwind v4 utilities 表达。
// 新闻详情 ma-content 的标题层级/引用/图片间距与 cd-content 完全同源，仅正文色、段落/列表下间距、分隔线色与移动端行高不同。
const headingClasses: Record<2 | 3 | 4, string> = {
  2: 'first:mt-0 mb-5 mt-14 text-left text-[26px] font-medium leading-[38px] text-[#1d2234]',
  3: 'first:mt-0 mb-3.5 mt-10 text-left text-xl font-medium leading-8 text-[#1d2234]',
  4: 'first:mt-0 mb-2.5 mt-8 text-left text-[17px] font-medium leading-7 text-[#1d2234]',
}

const rootClasses = computed(() =>
  props.variant === 'news'
    ? 'article-content break-words text-base leading-[30px] text-justify text-[#555] max-md:text-left max-md:leading-7'
    : 'article-content break-words text-base leading-[30px] text-justify text-[#1d2234]',
)
const paragraphClasses = computed(() => (props.variant === 'news' ? 'mb-[30px]' : 'mb-12'))
const unorderedListClasses = computed(() =>
  props.variant === 'news'
    ? 'mb-[30px] list-disc pl-[26px] marker:text-primary'
    : 'mb-12 list-disc pl-[26px] marker:text-primary',
)
const orderedListClasses = computed(() =>
  props.variant === 'news'
    ? 'mb-[30px] list-decimal pl-[26px] marker:text-primary'
    : 'mb-12 list-decimal pl-[26px] marker:text-primary',
)
const dividerClasses = computed(() =>
  props.variant === 'news' ? 'my-12 h-px bg-[#d9dde4]' : 'my-12 h-px bg-[#e2e2e2]',
)
</script>

<template>
  <div :class="rootClasses">
    <template v-for="(block, index) in blocks" :key="index">
      <component
        :is="`h${block.level}`"
        v-if="block.type === 'heading'"
        :class="headingClasses[block.level]"
      >
        {{ block.text }}
      </component>
      <p v-else-if="block.type === 'paragraph'" :class="paragraphClasses">
        {{ block.text }}
      </p>
      <ul
        v-else-if="block.type === 'list' && !block.ordered"
        :class="unorderedListClasses"
      >
        <li v-for="item in block.items" :key="item" class="mb-2">
          {{ item }}
        </li>
      </ul>
      <ol
        v-else-if="block.type === 'list' && block.ordered"
        :class="orderedListClasses"
      >
        <li v-for="item in block.items" :key="item" class="mb-2">
          {{ item }}
        </li>
      </ol>
      <blockquote
        v-else-if="block.type === 'quote'"
        class="my-9 border-l-[3px] border-l-primary py-0.5 pl-6 text-[#3f4d64]"
      >
        {{ block.text }}
      </blockquote>
      <figure v-else-if="block.type === 'image'" class="my-10">
        <img :src="block.src" :alt="block.alt" class="mx-auto block h-auto max-w-full" loading="lazy">
        <figcaption v-if="block.caption" class="mt-3 text-center text-sm leading-5 text-[#7e7e7e]">
          {{ block.caption }}
        </figcaption>
      </figure>
      <div v-else-if="block.type === 'divider'" :class="dividerClasses" role="separator" />
    </template>
  </div>
</template>
