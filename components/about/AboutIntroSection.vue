<script setup lang="ts">
import AboutTextBlock from '~/components/about/AboutTextBlock.vue'
import SectionShell from '~/components/common/section/SectionShell.vue'
import { aboutIntroParagraphs } from '~/data/about'
</script>

<template>
  <SectionShell title-id="about-intro-title" background="default">
    <article class="about-intro-card rounded-2xl border border-default bg-default p-6 text-left shadow-sm sm:p-8 lg:p-10">
      <h2
        id="about-intro-title"
        class="mb-6 text-4xl font-bold leading-[1.2] tracking-tight text-highlighted sm:text-5xl"
      >
        公司介绍
      </h2>
      <AboutTextBlock :paragraphs="aboutIntroParagraphs" align="left" size="full" />
    </article>
  </SectionShell>
</template>
