<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from '~/components/common/BaseButton.vue'
import BaseTabs from '~/components/common/tabs/BaseTabs.vue'
import { dgpUseCases } from '~/data/dgp'

const activeKey = ref(dgpUseCases[0]?.key ?? '')
const activeUseCase = computed(() => dgpUseCases.find((item) => item.key === activeKey.value) ?? dgpUseCases[0])
const useCaseTabs = computed(() => dgpUseCases.map((item) => ({ key: item.key, label: item.tab })))
</script>

<template>
  <section class="pb-32 lg:pb-44" aria-labelledby="dgp-use-cases-title">
    <div class="container">
      <h2
        id="dgp-use-cases-title"
        class="mb-4 text-center text-4xl font-bold leading-[1.2] tracking-tight text-highlighted md:mb-6 sm:text-5xl"
      >
        推动企业数据基础设施建设
      </h2>
      <p class="mb-6 text-center text-base text-default md:mb-8 md:text-xl lg:mb-12 lg:whitespace-nowrap sm:text-lg !mb-6">
        构建统一的数据治理体系，帮助企业实现数据标准化、资产化与智能化，持续释放数据价值。
      </p>

      <BaseTabs
        v-model="activeKey"
        class="mb-10 flex flex-col items-center gap-2"
        :items="useCaseTabs"
        id-prefix="dgp"
        panel-id-prefix="dgp-panel"
        label="数曜·数据治理平台应用场景"
        variant="underline"
      />

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
