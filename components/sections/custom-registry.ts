import type { Component } from 'vue'
import AboutAddressSection from '~/components/about/AboutAddressSection.vue'
import AboutContactSection from '~/components/about/AboutContactSection.vue'
import AboutHeroStats from '~/components/about/AboutHeroStats.vue'
import AboutIntroSection from '~/components/about/AboutIntroSection.vue'
import AboutTextBlock from '~/components/about/AboutTextBlock.vue'
import AboutValuesSection from '~/components/about/AboutValuesSection.vue'
import ContactFormSection from '~/components/contact/ContactFormSection.vue'
import HomeAbout from '~/components/home/HomeAbout.vue'
import HomeCustomerLogos from '~/components/home/HomeCustomerLogos.vue'
import HomeDeliverables from '~/components/home/HomeDeliverables.vue'
import HomeEcosystem from '~/components/home/HomeEcosystem.vue'
import HomeInsights from '~/components/home/HomeInsights.vue'
import HomeProductSystem from '~/components/home/HomeProductSystem.vue'
import HomeSolutions from '~/components/home/HomeSolutions.vue'
import DdpArchitecture from '~/components/product/ddp/DdpArchitecture.vue'
import DlpArchitecture from '~/components/product/dlp/DlpArchitecture.vue'
import DmsArchitecture from '~/components/product/dms/DmsArchitecture.vue'
import WhyEngine from '~/components/why/WhyEngine.vue'
import WhyServiceReset from '~/components/why/WhyServiceReset.vue'
import WhyTrustTabs from '~/components/why/WhyTrustTabs.vue'
import type { CustomSectionName } from './custom-names'

// custom 注册表：名字 → 定制组件（架构图类/内容类/营销类/表单类，015.13 起支持 props）。
// 键集合被 CustomSectionName 强制与 custom-names.ts 一一对应（漏改 typecheck 即挂）。
export const customSectionComponents: Record<CustomSectionName, Component> = {
  AboutAddressSection,
  AboutContactSection,
  AboutHeroStats,
  AboutIntroSection,
  AboutTextBlock,
  AboutValuesSection,
  ContactFormSection,
  DdpArchitecture,
  DlpArchitecture,
  DmsArchitecture,
  HomeAbout,
  HomeCustomerLogos,
  HomeDeliverables,
  HomeEcosystem,
  HomeInsights,
  HomeProductSystem,
  HomeSolutions,
  WhyEngine,
  WhyServiceReset,
  WhyTrustTabs,
}
