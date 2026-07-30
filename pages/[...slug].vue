<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from '#imports'
import BaseButton from '~/components/common/BaseButton.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'

const route = useRoute()
const pageTitle = computed(() => {
  const slug = route.path.split('/').filter(Boolean).pop()
  return slug ? slug.replaceAll('-', ' ') : 'DeepTrols'
})

useSeoMeta({
  title: () => `${pageTitle.value} - DeepTrols`,
  description: 'DeepTrols 官网内容建设中。',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content" class="placeholder-page">
      <section class="container placeholder-page__inner" aria-labelledby="placeholder-title">
        <p>DeepTrols</p>
        <h1 id="placeholder-title">页面内容建设中</h1>
        <span>该栏目已纳入官网信息架构，后续任务会补充完整内容。</span>
        <BaseButton href="/">返回首页</BaseButton>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped lang="scss">
.placeholder-page {
  min-height: calc(100svh - var(--dt-header-height));
  padding: clamp(92px, 12vw, 160px) 0;
}

.placeholder-page__inner {
  display: grid;
  justify-items: start;
  max-width: 760px;
}

p {
  margin: 0 0 16px;
  color: var(--dt-color-primary);
  font-size: 13px;
  font-weight: 760;
  letter-spacing: 0;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: clamp(42px, 7vw, 74px);
  font-weight: 760;
  line-height: 1.08;
  letter-spacing: 0;
}

span {
  margin-top: 22px;
  color: var(--dt-color-text-muted);
  font-size: 18px;
  line-height: 1.7;
}

.base-button {
  margin-top: 34px;
}
</style>
