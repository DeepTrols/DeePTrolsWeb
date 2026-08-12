import {
  Activity,
  Archive,
  BadgeCheck,
  Bot,
  Files,
  Inbox,
  Layers,
  Lightbulb,
  Puzzle,
  ScanText,
  Search,
  SearchX,
  Share2,
  ShieldCheck,
  Table2,
  Unlink,
  Users,
  Workflow,
  Zap,
} from '@lucide/vue'
import boyaoLogo from '../doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/博曜logo.svg?url'
import type { Component } from 'vue'
import type { HeroStatItem } from '~/components/common/HeroStatsStrip.vue'
import type { ValueMetric } from '~/components/common/card/ValueCard.vue'

export interface BoyaoFeatureItem {
  title: string
  description: string
  icon: Component
}

export interface BoyaoValueCard {
  key: 'efficiency' | 'integration' | 'application'
  eyebrow: string
  title: string
  description: string
  metrics?: ValueMetric[]
}

export interface BoyaoShowcaseBlock {
  title: string
  description: string
  icon: Component
}

export interface BoyaoShowcase {
  key: 'precision' | 'speed' | 'stability'
  eyebrow: string
  title: string
  subtitle: string
  reverse: boolean
  blocks: BoyaoShowcaseBlock[]
}

export { boyaoLogo }

export const boyaoHeroStats: HeroStatItem[] = [
  { value: '70%+', label: '运营效率提升' },
  { value: '50%+', label: '检索效率提升' },
  { value: '200+', label: '服务客户' },
]

export const boyaoChallenges: BoyaoFeatureItem[] = [
  {
    title: '来源收集难',
    description:
      '组织知识文档包含用户本地的创作、业务系统运行过程生成、外部的文献/专利/情报等，很难进行统一的收集管理',
    icon: Inbox,
  },
  {
    title: '知识查找难',
    description:
      '在组织运行当中，组织知识文档量级巨大，格式繁杂，其中包含文档、图片、音视频、图纸等等，员工很难在需要时快速找到',
    icon: SearchX,
  },
  {
    title: '业务利用难',
    description:
      '组织过往更加重视业务过程中的结构化数据管理，知识文档与业务脱节，导致业务知识沉淀困难，并且在业务上也很难得到知识支撑。',
    icon: Unlink,
  },
  {
    title: '知识挖掘难',
    description:
      '组织中非结构化数据包含大量的知识，隐性的知识难于挖掘，并且碎片化的知识点缺少关联，很难有效的支撑组织业务',
    icon: Puzzle,
  },
]

export const boyaoValueCards: BoyaoValueCard[] = [
  {
    key: 'efficiency',
    eyebrow: '业务效率',
    title: '提升内外部业务效率',
    description:
      '通过统一知识沉淀、智能检索与 AI 应用，减少重复查找与人工处理，让企业知识更快进入业务流程。',
    metrics: [
      { value: '10倍+', label: '构建与运营成本降低' },
      { value: '70%+', label: '运营效率提升' },
      { value: '20%+', label: '助力销售业绩增长' },
    ],
  },
  {
    key: 'integration',
    eyebrow: '知识整合',
    title: '海量碎片化知识整合',
    description:
      '统一整合文档、系统与经验知识，通过解析、抽取与语义建模，将分散信息转化为可持续运营的企业知识，实现可用知识源规模扩大 10 倍+、数据利用率提升 ≥50%、要素抽取准确度 ≥90%。',
  },
  {
    key: 'application',
    eyebrow: '知识应用',
    title: '更顺畅的知识共享应用',
    description:
      '通过智能检索、知识问答与 AI 智能体，让企业知识更易查找、理解与应用，实现检索效率提升 ≥50%、知识获取仅需 3 秒、长尾知识覆盖率提升 10 倍+。',
  },
]

export const boyaoCapabilitiesPlaceholder = '核心能力内容规划中，敬请期待'

export const boyaoFeatures: BoyaoFeatureItem[] = [
  {
    title: '知识文档采集存储',
    description: '全面采集来自用户本地、异构系统、外部情报的知识文档，归集与一个统一平台',
    icon: Archive,
  },
  {
    title: '知识文档在线协作',
    description: '无需本地编制传阅，通过系统在线编辑，在线协同、支持对内以及对外的文档共享',
    icon: Users,
  },
  {
    title: '知识文档合规管理',
    description: '对知识文档分类、标签、编号、模版、版本、权限等自动控制，满足合规要求',
    icon: ShieldCheck,
  },
  {
    title: '知识文档搜索利用',
    description: '知识文档提供了智能搜索通道，且通过门户、地图、专题等多种场景进行知识推荐',
    icon: Search,
  },
  {
    title: '知识文档业务融合',
    description: '自动采集业务文档，面向业务系统提供知识推送、搜索、管理、存储等服务支撑',
    icon: Workflow,
  },
  {
    title: '知识文档智慧创新',
    description: '结合AI技术实现知识文档智能推荐、知识图谱，利用大模型辅助知识创作、创新',
    icon: Lightbulb,
  },
]

export const boyaoShowcases: BoyaoShowcase[] = [
  {
    key: 'precision',
    eyebrow: '精准',
    title: '多模态文档解析，表格识别更精准',
    subtitle: '复杂版面也能准确理解，多模态内容一次解析、完整提取。',
    reverse: false,
    blocks: [
      {
        title: '兼容多种文件格式',
        description:
          '一个接口，支持 PDF、Word（doc/docx）、常见图片（jpg/png/webp/tiff）、HTML 等10+种文件格式，实现多模态文档解析',
        icon: Files,
      },
      {
        title: '支持复杂版面解析，提取多种信息要素',
        description:
          '一次请求，即可获取文字、表格、标题层级、公式、手写字符、图片信息，并且支持按Markdown和Json格式输出给大模型',
        icon: ScanText,
      },
      {
        title: '表格识别更精准',
        description: '有线表、无线表、密集表，跨页表、单元格合并表都能精准识别',
        icon: Table2,
      },
    ],
  },
  {
    key: 'speed',
    eyebrow: '高效',
    title: '解析速度极快，100页快至1.5秒',
    subtitle: '长文档极速处理，大批量文件也能持续高效解析。',
    reverse: true,
    blocks: [
      {
        title: '更快、更准',
        description: '深度调优自研算法，不仅解析准，而且快，100页长文档PDF在线解析快至1.5秒。',
        icon: Zap,
      },
      {
        title: '支持大批量离线解析',
        description:
          '支持离线自动批量解析处理，只需一次性上传大量文档，3天便可在后台高效精准解析500万页PDF。',
        icon: Layers,
      },
    ],
  },
  {
    key: 'stability',
    eyebrow: '稳定',
    title: '稳定性极高，成功率可达99.999%',
    subtitle: '高可用、高成功率，保障企业知识服务持续稳定运行。',
    reverse: false,
    blocks: [
      {
        title: '高成功率',
        description: '保障知识检索与智能应用可靠执行，服务成功率达 99.999%',
        icon: BadgeCheck,
      },
      {
        title: '高稳定性',
        description: '支持高并发业务持续稳定运行，保障知识服务全天候可靠可用',
        icon: Activity,
      },
    ],
  },
]

export const boyaoCapabilityNodes = [
  { title: '知识加工', description: '多模态文档解析', icon: ScanText },
  { title: '知识表示', description: '语义建模·知识图谱', icon: Share2 },
  { title: '知识应用', description: '智能检索·智能体', icon: Bot },
]

export const boyaoCtaActions = [
  { label: '立即咨询', href: '/contact', variant: 'primary' as const },
  { label: '申请试用', href: '/try', variant: 'secondary' as const },
]
