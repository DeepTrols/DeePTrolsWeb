import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Building2,
  ChartNoAxesCombined,
  CheckCircle2,
  Cpu,
  Database,
  Factory,
  FileText,
  Gauge,
  Landmark,
  Network,
  Orbit,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Waypoints,
} from '@lucide/vue'
import type { Component } from 'vue'

export interface Deliverable {
  title: string
  description: string
  icon: Component
  image: string
  href: string
}

export interface ProductCard {
  name: string
  title: string
  description: string
  icon: Component
}

export interface SolutionItem {
  key: string
  tab: string
  title: string
  englishTitle: string
  description: string
  image: string
  href: string
}

export interface EcosystemCard {
  title: string
  description: string
  tag: string
  href: string
  points?: string[]
  icon: Component
  variant: 'token' | 'agent' | 'infra' | 'report'
}

export interface CustomerStoryStat {
  value: string
  label: string
  icon: Component
}

export interface CustomerStory {
  name: string
  logoText: string
  title: string
  description: string
  image: string
  href: string
  stats: CustomerStoryStat[]
}

export interface InsightItem {
  category: string
  title: string
  summary: string
  image: string
  href: string
}

export const customerLogos = [
  { name: '武汉大数据', image: '/images/logos/wh-bigdata.png' },
  { name: '一汽丰田', image: '/images/logos/faw-toyota.png' },
  { name: '同仁堂健康', image: '/images/logos/tongrentang.png' },
  { name: '广药白云山', text: 'GYBYS' },
  { name: '岚图汽车', text: 'VOYAH' },
  { name: '赛睿', text: 'SteelSeries' },
  { name: '伟创力', text: 'Flex' },
  { name: '北京航空航天大学', image: '/images/logos/beihang.png' },
  { name: '中国地质大学', text: 'CUG' },
]

export const deliverables: Deliverable[] = [
  {
    title: '企业级 AI 应用构建与业务智能化服务',
    description:
      '通过连接企业数据、知识、模型与业务系统，围绕企业真实业务场景，提供从需求梳理、场景规划、智能体设计到应用开发、系统集成和持续运营的全流程服务。',
    icon: BrainCircuit,
    image: '/images/home/solutions/industrial.K00G2HaS.png',
    href: '/services/enterprise-ai-delivery',
  },
  {
    title: '企业级 AI 平台工程与数字化系统建设服务',
    description:
      '面向企业 AI 应用规模化建设需求，提供统一技术架构、平台研发、系统集成、数据工程、知识工程、模型服务和智能体工程等平台工程服务。',
    icon: Waypoints,
    image: '/images/home/solutions/data.DHKY-NE1.png',
    href: '/services/platform-engineering',
  },
  {
    title: 'AI 算力、模型与基础资源一体化服务',
    description:
      '围绕企业 AI 应用所需的算力、模型、数据和开发资源，提供 AI 服务器、算力中心规划建设、异构算力调度、模型接入管理、Token 管理及资源运营服务。',
    icon: Cpu,
    image: '/images/home/solutions/data-center-ai.CDu93Miw.png',
    href: '/services/infrastructure',
  },
]

export const platformInputs = [
  { label: '数据', icon: Database },
  { label: '知识', icon: FileText },
  { label: 'Token', icon: Sparkles },
  { label: '算力', icon: Cpu },
  { label: '安全', icon: ShieldCheck },
]

export const platformOutputs = [
  {
    title: '智能制造',
    rows: [
      { name: 'Manufacturing Brain', value: '规划 | 预测 | 排产', icon: Factory },
      { name: 'Manufacturing Intelligence', value: '质量 | 设备 | 供应链', icon: Gauge },
      { name: 'Manufacturing Copilot', value: '能源 | 安全 | 经营', icon: Bot },
    ],
  },
  {
    title: '企业AI应用',
    rows: [
      { name: 'Enterprise Brain', value: '知识 | 分析 | 决策', icon: BrainCircuit },
      { name: 'Enterprise Intelligence', value: '营销 | 销售 | 服务', icon: ChartNoAxesCombined },
      { name: 'Enterprise Copilot', value: '办公 | 协同 | 执行', icon: Bot },
    ],
  },
  {
    title: 'AI基础设施',
    rows: [
      { name: 'AI Infrastructure Brain', value: '调度 | 编排 | 治理', icon: Orbit },
      { name: 'AI Infrastructure Intelligence', value: '算力 | 模型 | 平台', icon: Network },
      { name: 'AI Infrastructure Copilot', value: '开发 | 运维 | 服务', icon: Cpu },
    ],
  },
]

export const productCards: ProductCard[] = [
  {
    name: '数曜',
    title: '构建企业可信数据资产，打造AI时代的数据基础',
    description:
      '围绕数据采集、治理、开发、资产管理与共享流通，帮助企业建立统一、高质量的数据资产体系，为AI应用持续提供可信数据支撑。',
    icon: Database,
  },
  {
    name: '博曜',
    title: '构建企业知识资产，释放组织知识价值',
    description:
      '围绕知识采集、加工、组织与应用，帮助企业沉淀业务经验和行业知识，打造可检索、可推理、持续演进的知识体系。',
    icon: FileText,
  },
  {
    name: '探曜',
    title: '连接工业现场，驱动制造智能升级',
    description:
      '聚焦工业物联网与 Manufacturing AI，提供设备互联、实时感知、生产优化和智能决策能力，推动制造过程持续智能化。',
    icon: RadioTower,
  },
  {
    name: '智曜',
    title: '构建企业AI基础设施，夯实智能应用底座',
    description:
      '提供模型、算力、推理、Token 与 AI 开发平台等基础设施产品，为企业构建统一、安全、高效的 AI 运行环境。',
    icon: Cpu,
  },
]

export const solutions: SolutionItem[] = [
  {
    key: 'manufacturing',
    tab: '智能制造',
    title: '智能制造智能中枢',
    englishTitle: 'Manufacturing Intelligence Hub',
    description: '融合 AI、数据与工业物联，打造覆盖制造全流程的智能化能力体系。',
    image: '/images/home/solutions/industrial.K00G2HaS.png',
    href: '/solutions/manufacturing',
  },
  {
    key: 'environment',
    tab: '智慧环保',
    title: '生态环境智能感知',
    englishTitle: 'Environmental Intelligence Sensing',
    description: '基于多源数据融合与 AI 推理，实现环境风险的智能识别、评估与预警。',
    image: '/images/home/solutions/smart-env.CWc2pooP.png',
    href: '/solutions/environment',
  },
  {
    key: 'energy',
    tab: '智慧能源',
    title: '电网运维、储能管理和智能计量',
    englishTitle: 'Energy Intelligence',
    description: '构建覆盖能源监测、分析、调度与优化的一体化智能能源体系。',
    image: '/images/home/solutions/smart-energy.DHKY-NE1.png',
    href: '/solutions/energy',
  },
  {
    key: 'water',
    tab: '智慧水利',
    title: '空间推理智能体',
    englishTitle: 'Spatial Reasoning Agent',
    description: '让 AI 理解空间数据，并驱动 GIS 智能分析与交互决策。',
    image: '/images/home/solutions/smart-Water.DHKY-NE1.png',
    href: '/solutions/water',
  },
  {
    key: 'compute',
    tab: '算力中心',
    title: 'AI算力基础设施',
    englishTitle: 'AI Computing Infrastructure',
    description: '提供海外 AI 服务器供应、算力中心建设及交付服务。',
    image: '/images/home/solutions/data-center-ai.CDu93Miw.png',
    href: '/solutions/compute',
  },
  {
    key: 'data',
    tab: '数据治理',
    title: '数据工程',
    englishTitle: 'Data Engineering',
    description: '覆盖数据采集、治理、开发与管理，构建统一数据底座。',
    image: '/images/home/solutions/data.DHKY-NE1.png',
    href: '/solutions/data-governance',
  },
]

export const ecosystemCards: EcosystemCard[] = [
  {
    title: 'Token Hub',
    description: '统一管理企业 AI Token，实现模型调用、配额控制与成本管理',
    tag: 'AI Token Service',
    href: '/services/token-hub',
    points: ['支持DeepSeek、Qwen、OpenAI等模型接入', 'Token 配额、成本及调用统计', '企业级统一 API 接入'],
    icon: Sparkles,
    variant: 'token',
  },
  {
    title: '智能体社区',
    description: '汇聚行业智能体、实践案例与开发资源，加速 AI 应用落地',
    tag: 'Agent Community',
    href: '/community',
    points: ['行业智能体持续更新', '开源项目与实践案例', '社区交流与技术分享'],
    icon: Bot,
    variant: 'agent',
  },
  {
    title: '算力与基础设施',
    description: '提供海外 AI 服务器供应、算力中心建设及基础设施交付。',
    tag: 'AI Infrastructure',
    href: '/services/infrastructure',
    icon: Cpu,
    variant: 'infra',
  },
  {
    title: '行业白皮书',
    description: 'AI 行业前沿研究、技术实践与数字化建设参考。',
    tag: 'Industry Insights',
    href: '/resources/reports',
    icon: FileText,
    variant: 'report',
  },
]

export const customerStoryStats: CustomerStoryStat[] = [
  { value: '国家级', label: '数据基础设施试点', icon: Landmark },
  { value: '公共数据', label: '交易流通平台', icon: Building2 },
  { value: '数据要素', label: '可信流通', icon: CheckCircle2 },
]

export const customerStories: CustomerStory[] = [
  {
    name: '武汉大数据',
    logoText: 'WH',
    title: '构建国家级数据基础设施，释放公共数据价值',
    description:
      '围绕公共数据交易流通平台建设，提供数据汇聚、数据治理、可信流通及共享交换能力，支撑武汉国家级数据基础设施试点建设。',
    image: '/images/home/solutions/data.DHKY-NE1.png',
    href: '/cases/wuhan-data',
    stats: customerStoryStats,
  },
  {
    name: '一汽丰田',
    logoText: 'FT',
    title: '打造制造数据闭环，提升智能运营效率',
    description:
      '连接生产、质量、设备与供应链数据，构建可持续演进的数据与知识底座，让智能分析和运营决策进入真实业务流程。',
    image: '/images/home/solutions/industrial.K00G2HaS.png',
    href: '/cases/manufacturing-intelligence',
    stats: [
      { value: '跨系统', label: '制造数据联通', icon: Network },
      { value: '智能化', label: '运营决策支撑', icon: BrainCircuit },
      { value: '可持续', label: '能力持续演进', icon: CheckCircle2 },
    ],
  },
  {
    name: '同仁堂健康',
    logoText: 'TRT',
    title: '沉淀行业知识资产，支撑健康业务智能化',
    description:
      '围绕知识采集、组织、检索与应用，帮助业务团队沉淀行业经验和产品知识，提升服务响应、内容生产与经营分析效率。',
    image: '/images/home/solutions/smart-env.CWc2pooP.png',
    href: '/cases/knowledge-intelligence',
    stats: [
      { value: '知识库', label: '业务经验沉淀', icon: FileText },
      { value: 'AI辅助', label: '服务响应提效', icon: Bot },
      { value: '经营侧', label: '洞察分析支持', icon: ChartNoAxesCombined },
    ],
  },
]

export const insights: InsightItem[] = [
  {
    category: 'Engineering',
    title: '企业 AI 平台建设中的数据、知识与执行闭环',
    summary: '从业务目标出发，规划可持续演进的企业级 AI 能力体系。',
    image: '/images/home/solutions/data.DHKY-NE1.png',
    href: '/insights/enterprise-ai-platform',
  },
  {
    category: 'Agent',
    title: '面向场景的智能体应用工程实践',
    summary: '让智能体围绕业务流程协作，而不是停留在单点工具调用。',
    image: '/images/home/solutions/industrial.K00G2HaS.png',
    href: '/insights/agent-engineering',
  },
  {
    category: 'Knowledge',
    title: '知识工程如何支撑企业智能决策',
    summary: '用结构化知识资产提升检索、推理与执行质量。',
    image: '/images/home/solutions/data-center-ai.CDu93Miw.png',
    href: '/insights/knowledge-engineering',
  },
  {
    category: 'Infrastructure',
    title: 'AI 基础设施的成本、治理与安全边界',
    summary: '在模型、算力与 Token 统一管理中建立企业级运行秩序。',
    image: '/images/home/solutions/smart-energy.DHKY-NE1.png',
    href: '/insights/ai-infrastructure',
  },
]

export const arrowIcon = ArrowRight
