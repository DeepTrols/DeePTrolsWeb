<script setup lang="ts">
import AboutTextBlock from '~/components/about/AboutTextBlock.vue'
import SectionShell from '~/components/common/section/SectionShell.vue'
import { aboutIntroParagraphs } from '~/data/about'
</script>

<template>
  <SectionShell title-id="about-intro-title" background="default">
    <h2 id="about-intro-title" class="sr-only">公司介绍</h2>
    <AboutTextBlock :paragraphs="aboutIntroParagraphs" />
  </SectionShell>
</template>
