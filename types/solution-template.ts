import type { Component } from 'vue'

export interface SolutionTemplateAction {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

export interface SolutionTemplateSeo {
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
}

export interface SolutionTemplateHero {
  badge?: string
  badgeIcon?: Component
  titleId: string
  titleLine: string
  titleGradient?: string
  description: string
  actions?: SolutionTemplateAction[]
  visualLabel?: string
  backgroundVideoSrc?: string
  align?: 'left' | 'center'
  visualSize?: 'default' | 'large' | 'fluid'
  flushBottom?: boolean
  flushVisualEnd?: boolean
}

export interface SolutionTemplateStat {
  value: string
  label: string
}

export interface SolutionFeatureItem {
  title: string
  description: string
  icon?: Component
  iconLabel?: string
}

export interface SolutionFeatureGridConfig {
  eyebrow: string
  title: string
  titleId: string
  subtitle: string
  items: SolutionFeatureItem[]
  columns?: 'two' | 'three' | 'four'
  nowrapSubtitle?: boolean
  iconBoxSize?: 40 | 48 | 56
  iconSize?: 20 | 24 | 28 | 48
  iconBordered?: boolean
  iconFilled?: boolean
}

export interface SolutionTimelineItem {
  number: string
  category: string
  title: string
  description: string
  bullets: string[]
}

export interface SolutionTimelineConfig {
  eyebrow: string
  title: string
  titleId: string
  subtitle: string
  items: SolutionTimelineItem[]
}

export interface SolutionSystemCard {
  title: string
  description: string
}

export interface SolutionArchitectureConfig {
  eyebrow: string
  title: string
  titleId: string
  subtitle: string
  label: string
  fallbackText?: string
  contentFlush?: boolean
  headingWide?: boolean
  nowrapSubtitle?: boolean
  frameOffset?: boolean
  cards?: SolutionSystemCard[]
}

export interface SolutionShowcaseItem {
  title: string
  description: string
  icon: Component
}

export interface SolutionShowcaseConfig {
  eyebrow: string
  title: string
  titleId: string
  subtitle?: string
  items: SolutionShowcaseItem[]
  imageSrc?: string
  imageAlt?: string
  fallbackText?: string
  reverse?: boolean
}

export interface SolutionLinkItem {
  title: string
  description: string
  href: string
  icon: Component
}

export interface SolutionLinksConfig {
  eyebrow: string
  title: string
  titleId: string
  description: string
  links: SolutionLinkItem[]
}

export interface SolutionCtaConfig {
  title: string
  titleId: string
  description: string
  actions: SolutionTemplateAction[]
}

export interface SolutionPageTemplateContent {
  seo: SolutionTemplateSeo
  hero: SolutionTemplateHero
  heroStats?: SolutionTemplateStat[]
  heroStatsColumns?: 3 | 4
  value?: SolutionFeatureGridConfig
  approach?: SolutionTimelineConfig
  architecture?: SolutionArchitectureConfig
  capabilities?: SolutionFeatureGridConfig
  showcase?: SolutionShowcaseConfig
  related?: SolutionLinksConfig
  cta?: SolutionCtaConfig
}
