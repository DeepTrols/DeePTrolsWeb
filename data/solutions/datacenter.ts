import {
  Activity,
  Boxes,
  BrainCircuit,
  Building2,
  Cpu,
  Leaf,
  LineChart,
  Network,
  Server,
  Shuffle,
  Unplug,
  Zap,
} from '@lucide/vue'
import type { Component } from 'vue'
import type { ProductFeatureGridItem } from '~/components/common/ProductFeatureGridSection.vue'

export const datacenterHero = {
  title: '统筹算力、电力、冷却与储能，降低综合成本',
  description:
    '针对算力、电力、冷却和储能各自管理、难以协同的问题，统一预测算力需求、冷却负荷、电价、绿电出力及储能状态，动态优化能源供给和算力运行策略，实现算力与能源资源的协同运营。',
  image: '/images/solutions/datacenter-hero.webp',
  imageAlt: '算电协同运营方案',
}

export const datacenterPains: ProductFeatureGridItem[] = [
  {
    title: '算力与能源脱节',
    description: '算力任务变化无法及时传递到供电、制冷和储能系统，能源侧只能被动响应。',
    icon: Unplug,
  },
  {
    title: '多系统独立运行',
    description: '算力平台、EMS、制冷系统和储能系统各自优化，局部最优难以形成整体最优。',
    icon: Boxes,
  },
  {
    title: '供需预测不足',
    description: '算力需求、电价、绿电出力和冷却负荷具有明显波动，传统固定策略难以提前规划。',
    icon: LineChart,
  },
  {
    title: '调度策略缺乏协同',
    description: '峰谷电价、储能 SOC、冷源能力和算力任务之间缺少统一优化，综合运营成本难以下降。',
    icon: Shuffle,
  },
]

export const datacenterCapabilities: ProductFeatureGridItem[] = [
  {
    title: '算力需求预测',
    description: '结合历史任务、资源利用率和业务计划，预测未来算力负载及功率需求。',
    icon: Cpu,
  },
  {
    title: '能源供需预测',
    description: '统一预测电价、绿电出力、储能 SOC 和冷却负荷，为调度提前量提供依据。',
    icon: Zap,
  },
  {
    title: '多系统联合优化',
    description: '综合算力任务、电力容量、冷却能力和储能状态，计算全局最优运行策略。',
    icon: Network,
  },
  {
    title: '动态策略执行',
    description: '根据实时负载和预测结果动态调整算力运行、冷却设定及储能充放电策略。',
    icon: Activity,
  },
]

export interface DatacenterScenario {
  title: string
  description: string
  icon: Component
}

export const datacenterScenarios: DatacenterScenario[] = [
  {
    title: 'AI 数据中心',
    description: '面向 GPU 高密度机房，实现算力负荷与电力、制冷系统协同运行。',
    icon: Server,
  },
  {
    title: '智算中心',
    description: '针对训练与推理任务动态变化，实现资源调度与能源调度协同。',
    icon: BrainCircuit,
  },
  {
    title: '企业算力中心',
    description: '统一管理本地算力、能源设施与储能系统，提升整体运营效率。',
    icon: Building2,
  },
  {
    title: '零碳算力园区',
    description: '融合绿电、储能与算力调度，提升可再生能源消纳能力与园区能源效率。',
    icon: Leaf,
  },
]

export const datacenterSolutionLabel = '算电协同运营能力图'
export const datacenterLoopLabel = '算电协同运营闭环能力图'
