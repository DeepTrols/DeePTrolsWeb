<script setup lang="ts">
import { FileText } from '@lucide/vue'
import { computed } from 'vue'
import ProductSystemCards from '~/components/common/ProductSystemCards.vue'
import ProductSystemFlowFrame from '~/components/common/ProductSystemFlowFrame.vue'
import ProductSystemSection from '~/components/common/ProductSystemSection.vue'
import DeepTrolsArchitectureFlow from '~/components/flow/DeepTrolsArchitectureFlow.client.vue'
import { resolveNavIcon } from '~/components/navigation/nav-icons'
import { productCards } from '~/data/home'
import { homeProductSystemHeading } from '~/data/home-sections'

// CMS 接管（015.18）：全部 props 可选，缺省读 data 静态 = 代码回退与 CMS 渲染共用同一 SFC
export interface HomeProductSystemCardInput {
  name: string
  title?: string
  description: string
  icon?: string
}

const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    subtitle?: string
    flowLabel?: string
    cards?: HomeProductSystemCardInput[]
  }>(),
  {
    eyebrow: homeProductSystemHeading.eyebrow,
    title: homeProductSystemHeading.title,
    subtitle: homeProductSystemHeading.subtitle,
    flowLabel: homeProductSystemHeading.flowLabel,
    cards: undefined,
  },
)

const resolvedCards = computed(() =>
  props.cards
    ? props.cards.map((card) => ({
        name: card.name,
        description: card.description,
        icon: resolveNavIcon(card.icon) ?? FileText,
      }))
    : productCards,
)
</script>

<template>
  <ProductSystemSection
    :eyebrow="eyebrow"
    :title="title"
    title-id="product-system-title"
    :subtitle="subtitle"
    padded-top
  >
    <ProductSystemFlowFrame
      :label="flowLabel"
    >
      <div class="relative z-[1] mx-auto h-full w-full overflow-hidden @container">
        <div class="absolute left-1/2 top-1/2 h-[560px] w-[1600px] -translate-x-1/2 -translate-y-1/2 scale-[min(1,calc(100cqw/1600px))]">
          <DeepTrolsArchitectureFlow />
        </div>
      </div>
    </ProductSystemFlowFrame>
    <ProductSystemCards :cards="resolvedCards" />
  </ProductSystemSection>
</template>
