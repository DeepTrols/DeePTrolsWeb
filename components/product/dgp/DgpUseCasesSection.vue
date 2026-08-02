<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from '~/components/common/BaseButton.vue'
import SectionHeading from '~/components/common/SectionHeading.vue'
import { dgpUseCases } from '~/data/dgp'

const activeKey = ref(dgpUseCases[0]?.key ?? '')
const activeUseCase = computed(() => dgpUseCases.find((item) => item.key === activeKey.value) ?? dgpUseCases[0])
</script>

<template>
  <section class="bg-dt-bg pb-32 lg:pb-44 !pb-0" aria-labelledby="dgp-use-cases-title">
    <div class="container">
      <div class="mb-12 text-center lg:mb-16">
        <SectionHeading
          eyebrow="应用场景"
          title="推动企业数据基础设施建设"
          title-id="dgp-use-cases-title"
          subtitle="构建统一的数据治理体系，帮助企业实现数据标准化、资产化与智能化，持续释放数据价值。"
          align="center"
        />
      </div>

      <div
        dir="ltr"
        data-orientation="horizontal"
        data-slot="root"
        class="mb-10 flex flex-col items-center gap-2"
      >
        <div
          data-slot="list"
          class="scrollbar-hide group relative -mb-px flex w-full justify-start overflow-x-auto overflow-y-hidden border-b border-dt-line p-1 md:justify-center"
          tabindex="0"
          data-orientation="horizontal"
          dir="ltr"
          role="tablist"
          aria-orientation="horizontal"
          aria-label="数曜·数据治理平台应用场景"
        >
          <button
            v-for="item in dgpUseCases"
            :id="`dgp-tab-${item.key}`"
            :key="item.key"
            type="button"
            data-slot="trigger"
            data-orientation="horizontal"
            role="tab"
            class="group relative inline-flex min-w-0 flex-shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-5 py-4 text-base font-medium text-dt-text-muted transition-colors hover:text-dt-text-highlighted focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-dt-primary disabled:cursor-not-allowed disabled:opacity-75 data-[state=active]:text-dt-text-highlighted"
            :tabindex="activeKey === item.key ? 0 : -1"
            :aria-selected="activeKey === item.key"
            :aria-controls="`dgp-panel-${item.key}`"
            :data-state="activeKey === item.key ? 'active' : 'inactive'"
            :data-active="activeKey === item.key ? '' : undefined"
            @click="activeKey = item.key"
          >
            <span
              v-if="activeKey === item.key"
              data-slot="indicator"
              class="absolute inset-x-5 -bottom-px h-1 rounded-full bg-dt-primary transition-all duration-200"
              aria-hidden="true"
            ></span>
            <span data-slot="label" class="truncate">{{ item.tab }}</span>
          </button>
        </div>
      </div>

      <div
        v-if="activeUseCase"
        :id="`dgp-panel-${activeUseCase.key}`"
        data-slot="content"
        data-orientation="horizontal"
        role="tabpanel"
        tabindex="0"
        data-state="active"
        :aria-labelledby="`dgp-tab-${activeUseCase.key}`"
        class="outline-none"
      >
        <article
          class="grid overflow-hidden rounded-2xl border border-dt-line bg-dt-bg lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)]"
        >
          <div
            class="relative min-h-[320px] overflow-hidden bg-dt-bg-soft/40 lg:min-h-[520px]"
            role="img"
            :aria-label="`${activeUseCase.title} 图片占位符`"
          >
            <div
              class="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:44px_44px] bg-[position:center_center]"
              aria-hidden="true"
            ></div>
            <div class="absolute inset-8 rounded-2xl border border-dt-line-strong bg-dt-bg/55" aria-hidden="true"></div>
            <div class="absolute inset-0 grid place-items-center text-sm font-medium text-dt-text-muted">
              图片占位符
            </div>
          </div>

          <div class="flex min-h-[360px] flex-col justify-end p-6 sm:p-8 lg:min-h-[520px] lg:p-10">
            <p class="text-sm font-semibold uppercase tracking-wide text-dt-primary/75">{{ activeUseCase.tab }}</p>
            <h3 class="mt-4 text-3xl font-bold leading-tight text-dt-text-highlighted sm:text-4xl">
              {{ activeUseCase.title }}
            </h3>
            <p class="mt-4 text-base leading-relaxed text-dt-text-muted sm:text-lg">{{ activeUseCase.description }}</p>
            <div class="mt-8">
              <BaseButton :href="activeUseCase.href" variant="secondary">了解更多</BaseButton>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
