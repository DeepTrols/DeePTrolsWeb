import {
  Activity,
  BookOpen,
  Bot,
  Cable,
  ClipboardList,
  FileText,
  Gauge,
  Gem,
  HeartPulse,
  Leaf,
  MessageCircleQuestion,
  Rocket,
  Wrench,
} from '@lucide/vue'
import deepseekLogo from '../doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/deepseek-logo.svg?url'
import kimiLogo from '../doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/kimi-logo.svg?url'
import qwenLogo from '../doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/qwen-logo.svg?url'
import zhipuLogo from '../doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/zhipu-logo.svg?url'
import shuyaoLogo from '../doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/数曜logo.svg?url'
import boyaoLogo from '../doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/博曜logo.svg?url'
import tanyaoIotLogo from '../doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/探曜IOT logo-1.svg?url'
import zhiyaoLogo from '../doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/智曜logo.svg?url'
import type { AlternatingTimelineItem } from '~/components/common/AlternatingTimelineSection.vue'
import type { HeroStatItem } from '~/components/common/HeroStatsStrip.vue'
import type { ProductFeatureGridItem } from '~/components/common/ProductFeatureGridSection.vue'
import type { SystemCard } from '~/components/common/SystemCards.vue'

export { boyaoLogo, deepseekLogo, kimiLogo, qwenLogo, shuyaoLogo, tanyaoIotLogo, zhiyaoLogo, zhipuLogo }

export const tanyaoHeroStats: HeroStatItem[] = [
  { value: '100+', label: '服务企业' },
  { value: '30+', label: '工业协议支持' },
  { value: '100+', label: '标准物模型' },
  { value: '百万TPS', label: '处理能力' },
]

export const tanyaoChallenges: ProductFeatureGridItem[] = [
  {
    title: '设备种类多、协议复杂',
    description:
      '设备、子系统和第三方平台来源广、差异大，协议碎片化严重，接入工作高度依赖定制开发，难复制、难扩展、难沉淀。',
    icon: Cable,
  },
  {
    title: '数据有了，但价值释放不出来',
    description:
      '没有统一模型、统一语义和统一时序治理，数据只能停留在采集层，难以真正进入业务应用与 AI 场景。',
    icon: Gem,
  },
  {
    title: 'AI 想做事，却进不了现场运行',
    description:
      'AI 要真正落地，不只是「看懂数据」，还要接入实时状态、边缘响应与执行通道；缺少这些底座能力，AI 很难从分析走向行动。',
    icon: Bot,
  },
  {
    title: '平台能连，却难以持续演进',
    description:
      '传统平台多停留在功能封装层，开放性不足，难与现有系统深度协同，也难以支撑新应用、新智能体和新场景持续扩展。',
    icon: Rocket,
  },
]

export const tanyaoSolutionCards: SystemCard[] = [
  {
    title: '多源接入',
    description: '统一连接设备、传感器与工业系统，兼容多种工业协议与数据接口，实现异构设备快速接入。',
  },
  {
    title: '边缘感知',
    description: '在现场完成数据采集、解析、清洗与实时计算，让设备状态与业务变化实时可感知。',
  },
  {
    title: 'AI 驱动',
    description: '融合 AI 分析、预测与决策能力，从设备数据中识别异常、洞察趋势并持续优化运行策略。',
  },
]

export const tanyaoTimelineItems: AlternatingTimelineItem[] = [
  {
    number: '01',
    category: '全栈连接',
    title: 'IoT平台全栈设备连接与接入',
    description:
      '作为物理世界运行底座的第一层能力，X-Link 探曜提供从设备、子系统到上层业务应用及第三方 IoT 平台的统一接入能力，满足多行业场景的连接与数据接入需求。',
    bullets: [],
  },
  {
    number: '02',
    category: '多协议',
    title: '原生支持多行业主流协议，开放连接器框架快速适配新设备',
    description:
      '内置丰富的协议栈和连接器生态，支持跨行业的标准通信协议，并通过开放框架实现私有协议与新设备的快速适配。原生支持Modbus RTU/TCP、OPC UA/DA、BACnet、MQTT、CoAP、HTTP、Profinet、EtherNet/IP、S7 等',
    bullets: [],
  },
  {
    number: '03',
    category: '云边协同',
    title: '云边协同，就地实时计算与智能响应',
    description:
      '通过 探曜Edge 边缘计算平台实现云边端协同架构，在设备现场完成数据采集、协议转换、实时计算和 AI 推理，满足各类场景对低延迟和高可靠的严苛要求。',
    bullets: [],
  },
  {
    number: '04',
    category: '时序数据引擎',
    title: '时序数据采集、存储与分析',
    description:
      '内置高性能时序数据引擎，支持海量设备数据的实时采集、持久化存储和多维分析，为设备监测、趋势分析和 AI 模型训练提供可靠的数据基础。',
    bullets: [],
  },
  {
    number: '05',
    category: '规则引擎',
    title: '规则引擎与事件驱动自动化',
    description:
      '基于设备状态与数据变化，驱动自动化规则和跨系统联动，通过灵活的规则配置和事件驱动机制，实现从设备告警、状态联动到跨系统业务流程的自动化编排。',
    bullets: [],
  },
  {
    number: '06',
    category: '深度融合',
    title: 'IoT平台驱动 AI 智能应用在物理世界落地',
    description:
      '探曜作为 AI 进入物理世界的运行底座，向上支撑 AI 原生应用、场景智能体和视觉与感知算法在真实物理场景中的落地运行。结合智曜能力，以集成故障预测、能效洞察、异常分析、运维助手、智能调度、设备健康等超20个智能体及50+感知算法。',
    bullets: [],
  },
]

export const tanyaoAgents: ProductFeatureGridItem[] = [
  {
    title: '设备知识Agent',
    description: '把设备资料、操作手册、维保规范和常见问题沉淀为可自然查询的智能能力。',
    icon: BookOpen,
  },
  {
    title: '异常分析Agent',
    description: '围绕设备异常、状态变化和告警信息，提供异常解释、分析和处置建议。',
    icon: Activity,
  },
  {
    title: '工单处置Agent',
    description: '面向工单生成、派发、处置与跟踪场景，提供智能辅助。',
    icon: ClipboardList,
  },
  {
    title: '运行报告Agent',
    description: '支持自然语言取数、自动生成报告、异常提示与建议输出。',
    icon: FileText,
  },
  {
    title: '能耗分析Agent',
    description: '面向能耗统计、异常识别、高耗对象发现和分析建议输出。',
    icon: Gauge,
  },
  {
    title: 'AIoT 伴随Agent',
    description: '在管理台内提供伴随式交互、导航、解释、分析和操作辅助。',
    icon: MessageCircleQuestion,
  },
  {
    title: '设备健康Agent',
    description: '围绕设备状态、异常记录和维保记录，输出健康判断和风险提示。',
    icon: HeartPulse,
  },
  {
    title: '预测维护Agent',
    description: '面向重点设备识别潜在风险、辅助维护时机判断和优先级排序。',
    icon: Wrench,
  },
  {
    title: '能效优化Agent',
    description: '围绕能效问题识别、优化建议和持续跟踪，支撑节能降耗工作。',
    icon: Leaf,
  },
]

export const tanyaoCtaActions = [
  { label: '立即咨询', href: '/contact', variant: 'primary' as const },
  { label: '申请试用', href: '/try', variant: 'secondary' as const },
]
