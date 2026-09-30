<script setup lang="ts">
import { computed } from 'vue'
import AboutIntroImageCarousel from '~/components/about/AboutIntroImageCarousel.vue'
import AboutTextBlock from '~/components/about/AboutTextBlock.vue'
import SectionShell from '~/components/common/section/SectionShell.vue'
import { aboutIntroParagraphs as staticParagraphs } from '~/data/about'

// 015.20b：CMS props 稀疏覆盖（后台行编辑）；缺省回退 data 静态。同名遮蔽保持模板/锁不变
const props = withDefaults(
  defineProps<{ paragraphs?: string[], title?: string }>(),
  { paragraphs: undefined, title: '公司介绍' },
)

const aboutIntroParagraphs = computed(() => props.paragraphs ?? staticParagraphs)
</script>

<template>
  <SectionShell title-id="about-intro-title" background="default">
    <article class="about-intro-card rounded-2xl border border-default bg-default p-6 text-left shadow-sm sm:p-8 lg:p-10">
      <h2
        id="about-intro-title"
        class="mb-6 text-4xl font-bold leading-[1.2] tracking-tight whitespace-nowrap text-highlighted sm:text-5xl"
      >
        {{ title }}
      </h2>
      <AboutTextBlock :paragraphs="aboutIntroParagraphs" align="left" size="full" />
      <AboutIntroImageCarousel class="mt-10" />
    </article>
  </SectionShell>
</template>
