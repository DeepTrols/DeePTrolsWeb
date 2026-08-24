<script setup lang="ts">
import AboutTextBlock from '~/components/about/AboutTextBlock.vue'
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import SectionShell from '~/components/common/section/SectionShell.vue'
import { aboutAddress } from '~/data/about'
</script>

<template>
  <SectionShell title-id="about-address-title" background="default">
    <div class="mb-12 lg:mb-16">
      <SectionHeader title="公司地址" title-id="about-address-title" align="center" />
    </div>
    <AboutTextBlock :paragraphs="[aboutAddress]" size="default" />
  </SectionShell>
</template>
