import {
  Activity,
  BadgeCheck,
  Bot,
  BrainCircuit,
  Building2,
  ChartNoAxesCombined,
  CheckCircle2,
  ClipboardCheck,
  Cpu,
  Database,
  Factory,
  FileText,
  Gauge,
  Globe2,
  HeartPulse,
  Layers3,
  Leaf,
  Network,
  RadioTower,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Waves,
  Workflow,
  Zap,
} from '@lucide/vue'
import type { Component } from 'vue'
import type {
  SolutionLinkItem,
  SolutionPageTemplateContent,
  SolutionShowcaseItem,
  SolutionSystemCard,
  SolutionTemplateAction,
  SolutionTemplateStat,
  SolutionTimelineItem,
} from '~/types/solution-template'

export const solutionUseCaseSlugs = [
  'manufacturing',
  'environment',
  'water',
  'energy',
  'data-governance',
  'enterprise-ai',
  'city',
  'healthcare',
] as const

export type SolutionUseCaseSlug = typeof solutionUseCaseSlugs[number]

export const solutionUseCaseRouteHrefs = [
  '/solutions/manufacturing',
  '/solutions/environment',
  '/solutions/water',
  '/solutions/energy',
  '/solutions/data-governance',
  '/solutions/enterprise-ai',
  '/solutions/city',
  '/solutions/healthcare',
] as const

export interface SolutionScenarioVisualSignal {
  label: string
  value: string
}

export interface SolutionScenarioVisualLayer {
  label: string
  description: string
  icon: Component
}

export interface SolutionScenarioVisualConfig {
  title: string
  subtitle: string
  icon: Component
  layers: SolutionScenarioVisualLayer[]
  signals: SolutionScenarioVisualSignal[]
}

export interface SolutionUseCasePage {
  slug: SolutionUseCaseSlug
  label: string
  href: `/solutions/${SolutionUseCaseSlug}`
  visual: SolutionScenarioVisualConfig
  content: SolutionPageTemplateContent
}

interface TextIconItem {
  title: string
  description: string
  icon: Component
}

interface TimelineSeed {
  category: string
  title: string
  description: string
  bullets: string[]
}

interface UseCaseSeed {
  slug: SolutionUseCaseSlug
  label: string
  gradient: string
  description: string
  icon: Component
  stats: SolutionTemplateStat[]
  values: TextIconItem[]
  approach: TimelineSeed[]
  architectureCards: SolutionSystemCard[]
  capabilities: TextIconItem[]
  showcase: TextIconItem[]
  visualTitle: string
  visualSubtitle: string
}

const heroActions: SolutionTemplateAction[] = [
  { label: '咨询合作', href: '/contact', variant: 'primary' },
  { label: '申请试用', href: '/try', variant: 'secondary' },
]

const ctaActions: SolutionTemplateAction[] = [
  { label: '咨询合作', href: '/contact', variant: 'primary' },
  { label: '申请试用', href: '/try', variant: 'secondary' },
]

const relatedLinks: SolutionLinkItem[] = [
  {
    title: '数曜·数据治理平台',
    description: '统一数据接入、治理、资产化与服务化能力。',
    href: '/products/data-governance',
    icon: Database,
  },
  {
    title: '博曜·企业级知识管理平台',
    description: '沉淀组织知识，支撑检索、问答与智能体调用。',
    href: '/products/knowledge-base',
    icon: FileText,
  },
  {
    title: '探曜·AI物联感知平台',
    description: '连接现场设备、实时数据与智能应用。',
    href: '/products/ai-iot',
    icon: RadioTower,
  },
]

const seeds: UseCaseSeed[] = [
  {
    slug: 'manufacturing',
    label: '智能制造',
    gradient: '制造现场智能化升级',
    description: '融合设备数据、生产知识、质量规则与智能体应用，帮助制造企业建立覆盖计划、生产、质量、设备和能源的智能化运营能力。',
    icon: Factory,
    stats: [
      { value: '5+', label: '核心制造域' },
      { value: '24/7', label: '现场状态感知' },
      { value: '3层', label: '数据知识智能协同' },
    ],
    values: [
      { title: '生产状态可视', description: '打通 MES、设备、工艺与质量数据，形成实时生产状态视图。', icon: Activity },
      { title: '质量问题可追溯', description: '围绕批次、工序、设备和人员建立质量追踪链路。', icon: Search },
      { title: '设备运维可预测', description: '结合运行数据和维护知识，识别异常并辅助处置。', icon: Gauge },
      { title: '管理决策可协同', description: '让计划、生产、质量和能源团队围绕统一数据协作。', icon: Workflow },
    ],
    approach: [
      {
        category: '数据接入',
        title: '统一连接制造现场与业务系统',
        description: '将设备数据、工单、工艺、质检、仓储与能源数据汇入统一数据底座。',
        bullets: ['接入 PLC、SCADA、MES、ERP 等系统', '统一生产对象、设备对象和工艺对象', '建立跨系统数据映射关系'],
      },
      {
        category: '知识工程',
        title: '沉淀工艺、质量和运维知识',
        description: '将工艺规程、缺陷规则、维护经验和处置 SOP 结构化，供智能体持续调用。',
        bullets: ['工艺知识结构化', '质量规则与缺陷库治理', '运维经验和应急预案沉淀'],
      },
      {
        category: '智能应用',
        title: '构建制造智能体与运营中枢',
        description: '围绕排产、质量、设备、能耗和异常处置形成可运营的智能应用。',
        bullets: ['制造 Copilot', '设备异常辅助处置', '质量分析与产线优化'],
      },
    ],
    architectureCards: [
      { title: '现场连接层', description: '连接设备、产线、传感器和工业协议，形成实时数据入口。' },
      { title: '数据知识层', description: '沉淀生产数据、质量规则、工艺知识和运维经验。' },
      { title: '智能应用层', description: '面向计划、生产、质量、设备和能源构建智能应用。' },
    ],
    capabilities: [
      { title: '设备数据采集', description: '支持生产设备、环境传感器与工业系统数据接入。', icon: RadioTower },
      { title: '生产指标建模', description: '围绕产量、节拍、良率和停机建立统一指标。', icon: ChartNoAxesCombined },
      { title: '质量知识库', description: '沉淀缺陷、检验、返修和追溯规则。', icon: BadgeCheck },
      { title: '异常识别', description: '结合数据规则和模型推理发现生产异常。', icon: ShieldCheck },
      { title: '智能体协作', description: '让制造智能体参与问答、分析和任务编排。', icon: Bot },
      { title: '运营复盘', description: '保留事件链路和处置结果，支持持续改进。', icon: ClipboardCheck },
    ],
    showcase: [
      { title: '生产运营驾驶舱', description: '统一展示产线、订单、质量、设备和能耗状态。', icon: Gauge },
      { title: '质量追溯助手', description: '围绕产品批次快速定位问题来源和影响范围。', icon: Search },
      { title: '设备运维智能体', description: '结合设备上下文和 SOP 辅助现场人员处理异常。', icon: Bot },
    ],
    visualTitle: 'Manufacturing Hub',
    visualSubtitle: '设备、质量、工艺与智能体协同',
  },
  {
    slug: 'environment',
    label: '智慧环保',
    gradient: '生态环境智能感知',
    description: '围绕环境监测、污染源监管、风险预警和执法协同，构建多源数据融合与 AI 辅助研判能力。',
    icon: Leaf,
    stats: [
      { value: '多源', label: '环境数据融合' },
      { value: '分钟级', label: '风险识别' },
      { value: '闭环', label: '处置协同' },
    ],
    values: [
      { title: '环境态势清晰', description: '融合监测站、物联设备、气象、企业和空间数据。', icon: Globe2 },
      { title: '风险预警及时', description: '对异常排放、指标波动和区域风险进行辅助识别。', icon: ShieldCheck },
      { title: '监管线索可追踪', description: '保留事件来源、研判过程和处置记录。', icon: ClipboardCheck },
      { title: '协同处置更高效', description: '连接监测、分析、执法和企业整改流程。', icon: Workflow },
    ],
    approach: [
      {
        category: '融合感知',
        title: '统一环境监测与污染源数据',
        description: '汇聚空气、水、噪声、固废、企业排口和移动监测数据，形成环境态势底座。',
        bullets: ['多源监测数据接入', '污染源对象统一建模', '指标口径和区域网格统一'],
      },
      {
        category: '智能研判',
        title: '构建环境风险识别模型与知识库',
        description: '结合环境标准、历史案例和模型分析，对异常趋势形成辅助研判。',
        bullets: ['异常指标识别', '污染扩散与关联分析', '监管规则和案例知识沉淀'],
      },
      {
        category: '闭环治理',
        title: '形成预警、派发、处置、复盘闭环',
        description: '将风险事件与工单、执法、整改和复盘流程连接起来。',
        bullets: ['风险事件自动归集', '处置任务分派', '过程留痕和复盘分析'],
      },
    ],
    architectureCards: [
      { title: '监测接入层', description: '接入环境监测、企业排口、物联设备和空间数据。' },
      { title: '风险研判层', description: '结合规则、知识和模型识别风险并生成线索。' },
      { title: '监管协同层', description: '支撑预警、派发、整改、复核与复盘。' },
    ],
    capabilities: [
      { title: '指标异常识别', description: '对核心环境指标变化进行规则和模型联合识别。', icon: Activity },
      { title: '污染源档案', description: '建立企业、排口、设备和监管记录的统一档案。', icon: Database },
      { title: '空间关联分析', description: '结合区域网格和地理位置分析环境事件影响。', icon: Network },
      { title: '监管知识库', description: '沉淀标准、法规、处置流程和历史案例。', icon: FileText },
      { title: '预警工单协同', description: '将异常线索转为任务并跟踪处置结果。', icon: Workflow },
      { title: '趋势分析报告', description: '生成区域、企业和指标维度的分析报告。', icon: ChartNoAxesCombined },
    ],
    showcase: [
      { title: '环境风险驾驶舱', description: '统一呈现区域风险、指标趋势和异常线索。', icon: Globe2 },
      { title: '污染源监管助手', description: '辅助监管人员查询档案、研判异常和生成处置建议。', icon: Search },
      { title: '事件闭环管理', description: '打通预警、工单、执法、整改和复盘过程。', icon: ClipboardCheck },
    ],
    visualTitle: 'Environmental Sensing',
    visualSubtitle: '监测、研判、处置全链路协同',
  },
  {
    slug: 'water',
    label: '智慧水利',
    gradient: '空间推理与水利调度',
    description: '融合水文、水质、工程、空间与业务数据，面向防汛调度、河湖治理和水务运营构建可分析、可推演、可协同的智能能力。',
    icon: Waves,
    stats: [
      { value: 'GIS', label: '空间数据融合' },
      { value: '实时', label: '水情感知' },
      { value: '联动', label: '调度处置' },
    ],
    values: [
      { title: '水情态势统一', description: '整合雨情、水情、工情、水质和空间数据。', icon: Waves },
      { title: '风险研判更快', description: '辅助识别洪涝、水质、工程和区域运行风险。', icon: ShieldCheck },
      { title: '调度过程可追踪', description: '记录预测、研判、指令和处置结果。', icon: ClipboardCheck },
      { title: '业务协同顺畅', description: '连接监测、调度、巡检、应急和管理流程。', icon: Workflow },
    ],
    approach: [
      {
        category: '水利数据底座',
        title: '连接水文、工程与空间数据',
        description: '将实时监测、工程设施、河湖对象和 GIS 数据统一建模。',
        bullets: ['水位、流量、雨量、水质数据接入', '闸泵站、管网、河湖对象建模', '空间数据与业务对象关联'],
      },
      {
        category: '智能推理',
        title: '构建水利知识与空间推理能力',
        description: '沉淀水利业务规则、调度经验和应急预案，支撑智能问答和辅助研判。',
        bullets: ['水利知识库', '空间关系推理', '风险阈值和调度规则管理'],
      },
      {
        category: '调度协同',
        title: '支撑预警、会商、指令与复盘',
        description: '将分析结论连接到任务流和处置流程，形成闭环运营。',
        bullets: ['风险预警', '调度建议', '巡检和处置任务跟踪'],
      },
    ],
    architectureCards: [
      { title: '感知数据层', description: '接入水文站、闸泵站、管网、巡检和 GIS 数据。' },
      { title: '推理分析层', description: '融合规则、知识、空间关系和模型分析。' },
      { title: '业务协同层', description: '支撑防汛、水质、调度、巡检和应急管理。' },
    ],
    capabilities: [
      { title: '水利对象建模', description: '统一河湖、水库、闸站、管网和监测点对象。', icon: Database },
      { title: '空间关系分析', description: '识别上下游、影响范围和区域关联关系。', icon: Network },
      { title: '实时监测接入', description: '汇聚水位、流量、雨量、水质等实时数据。', icon: Activity },
      { title: '预案知识管理', description: '结构化调度规则、应急预案和处置经验。', icon: FileText },
      { title: '智能问答助手', description: '支持面向水利业务的检索、问答和分析。', icon: BrainCircuit },
      { title: '闭环处置跟踪', description: '记录预警、研判、指令、执行和复盘过程。', icon: ClipboardCheck },
    ],
    showcase: [
      { title: '水利态势一张图', description: '基于空间数据统一呈现水情、工情和风险。', icon: Globe2 },
      { title: '防汛调度助手', description: '辅助查询预案、分析趋势和生成调度建议。', icon: Bot },
      { title: '巡检处置闭环', description: '连接事件发现、任务派发、现场反馈和复盘。', icon: Workflow },
    ],
    visualTitle: 'Water Intelligence',
    visualSubtitle: '水情、空间、预案与调度协同',
  },
  {
    slug: 'energy',
    label: '智慧能源',
    gradient: '能源运行智能优化',
    description: '围绕电力、储能、用能和运维场景，构建覆盖监测、预测、调度、优化和成本分析的智能能源运营能力。',
    icon: Zap,
    stats: [
      { value: '全域', label: '能源数据接入' },
      { value: '预测', label: '负荷与风险' },
      { value: '优化', label: '调度与成本' },
    ],
    values: [
      { title: '能源状态透明', description: '汇聚电力、储能、设备、站点和用能数据。', icon: Activity },
      { title: '负荷趋势可预测', description: '结合历史曲线和业务计划辅助预测负荷变化。', icon: ChartNoAxesCombined },
      { title: '运维风险可识别', description: '识别设备异常、站点风险和运维瓶颈。', icon: ShieldCheck },
      { title: '能源成本可优化', description: '围绕调度策略、峰谷用电和资源配置优化成本。', icon: Gauge },
    ],
    approach: [
      {
        category: '数据汇聚',
        title: '连接能源设备、站点和业务系统',
        description: '统一接入计量、储能、电网、站点和运维数据，为智能分析提供基础。',
        bullets: ['能源设备和计量数据接入', '站点与资产对象统一建模', '运维和业务系统数据贯通'],
      },
      {
        category: '模型分析',
        title: '构建预测、异常和优化分析能力',
        description: '围绕负荷预测、设备状态、能耗结构和调度策略形成分析模型。',
        bullets: ['负荷与能耗趋势分析', '设备异常识别', '调度策略评估'],
      },
      {
        category: '运营协同',
        title: '支撑能源运营和运维闭环',
        description: '将分析结果连接到运维任务、调度建议和运营报告。',
        bullets: ['站点运营看板', '运维任务闭环', '成本与效率报告'],
      },
    ],
    architectureCards: [
      { title: '能源连接层', description: '接入计量、储能、站点、设备和业务系统。' },
      { title: '预测优化层', description: '提供负荷预测、异常识别和调度分析。' },
      { title: '运营应用层', description: '支撑能源运营、成本优化和运维闭环。' },
    ],
    capabilities: [
      { title: '计量数据治理', description: '统一用能、计量、站点和设备数据口径。', icon: Database },
      { title: '负荷预测', description: '结合历史数据和业务计划分析负荷趋势。', icon: ChartNoAxesCombined },
      { title: '储能调度分析', description: '辅助评估储能运行策略与调度方案。', icon: Cpu },
      { title: '设备状态监测', description: '识别运行异常和潜在维护风险。', icon: Gauge },
      { title: '成本分析', description: '围绕用能结构、峰谷差异和资源配置分析成本。', icon: CheckCircle2 },
      { title: '智能报告', description: '生成站点、区域和业务维度运营报告。', icon: FileText },
    ],
    showcase: [
      { title: '能源运营驾驶舱', description: '统一呈现负荷、能耗、储能、成本和风险。', icon: Gauge },
      { title: '站点运维助手', description: '辅助查询设备状态、定位异常并生成处置建议。', icon: Bot },
      { title: '用能优化分析', description: '面向区域、站点和设备输出优化建议。', icon: ChartNoAxesCombined },
    ],
    visualTitle: 'Energy Intelligence',
    visualSubtitle: '监测、预测、调度与成本优化',
  },
  {
    slug: 'data-governance',
    label: '数据治理',
    gradient: '企业可信数据底座',
    description: '围绕数据标准、质量、目录、血缘、资产和共享服务，帮助企业构建可治理、可理解、可复用的数据资产体系。',
    icon: Database,
    stats: [
      { value: '全周期', label: '数据治理覆盖' },
      { value: '统一', label: '标准与口径' },
      { value: '资产化', label: '数据服务输出' },
    ],
    values: [
      { title: '数据口径统一', description: '统一指标、标准、元数据和业务定义。', icon: BadgeCheck },
      { title: '数据质量可控', description: '围绕完整性、准确性、一致性和时效性建立检测规则。', icon: ShieldCheck },
      { title: '数据资产可见', description: '形成目录、血缘、标签和资产地图。', icon: Search },
      { title: '数据服务可复用', description: '将治理后的数据以 API、指标和数据产品方式服务业务。', icon: Network },
    ],
    approach: [
      {
        category: '现状盘点',
        title: '梳理数据资源、系统和业务对象',
        description: '从业务域、系统域和数据域梳理数据资产现状与治理优先级。',
        bullets: ['数据源盘点', '业务对象梳理', '治理问题识别'],
      },
      {
        category: '治理建设',
        title: '建设标准、质量、元数据和资产体系',
        description: '围绕数据治理基础能力建立统一管理和持续运营机制。',
        bullets: ['数据标准管理', '数据质量规则', '元数据与血缘分析'],
      },
      {
        category: '资产运营',
        title: '推动数据共享、服务化和价值评估',
        description: '让治理后的数据进入业务流程、AI 应用和数据产品运营。',
        bullets: ['数据目录和资产地图', '数据服务发布', '数据价值运营'],
      },
    ],
    architectureCards: [
      { title: '接入与盘点层', description: '连接数据库、文件、API、消息和业务系统。' },
      { title: '治理与资产层', description: '沉淀标准、质量、元数据、血缘、标签和目录。' },
      { title: '服务与运营层', description: '支撑数据服务、共享交换、指标应用和 AI 供给。' },
    ],
    capabilities: [
      { title: '数据标准管理', description: '统一字段、代码、指标和业务术语标准。', icon: BadgeCheck },
      { title: '数据质量检测', description: '配置质量规则并持续监控数据质量。', icon: ShieldCheck },
      { title: '元数据管理', description: '采集技术元数据、业务元数据和管理元数据。', icon: Layers3 },
      { title: '血缘影响分析', description: '分析数据流转链路和变更影响范围。', icon: Network },
      { title: '数据资产目录', description: '形成可检索、可申请、可运营的数据资产目录。', icon: Search },
      { title: '数据服务发布', description: '将数据能力封装为 API、指标和数据产品。', icon: Workflow },
    ],
    showcase: [
      { title: '数据治理工作台', description: '统一处理标准、质量、元数据和资产运营任务。', icon: Database },
      { title: '数据资产地图', description: '帮助业务理解数据来源、含义、关系和使用范围。', icon: Search },
      { title: 'AI 数据供给', description: '为知识工程、智能体和分析应用提供可信数据。', icon: BrainCircuit },
    ],
    visualTitle: 'Data Governance',
    visualSubtitle: '标准、质量、资产与服务化协同',
  },
  {
    slug: 'enterprise-ai',
    label: '企业AI应用',
    gradient: '真实业务中的智能体应用',
    description: '连接企业数据、知识、模型与业务系统，围绕真实业务流程构建可落地、可运营、可持续演进的 AI 应用。',
    icon: BrainCircuit,
    stats: [
      { value: '场景化', label: 'AI 应用规划' },
      { value: 'Agent', label: '智能体编排' },
      { value: '闭环', label: '运营优化' },
    ],
    values: [
      { title: '贴近业务流程', description: '从业务任务出发设计 AI 应用，而不是只做问答入口。', icon: Workflow },
      { title: '连接企业知识', description: '让组织制度、经验、案例和数据成为智能体上下文。', icon: FileText },
      { title: '集成业务系统', description: '连接 CRM、ERP、OA、工单、数据平台等系统。', icon: Network },
      { title: '持续运营优化', description: '基于使用反馈、效果评估和知识更新持续迭代。', icon: Activity },
    ],
    approach: [
      {
        category: '场景规划',
        title: '从业务问题拆解 AI 应用场景',
        description: '识别高频、复杂、可度量的业务任务，形成优先级和落地路径。',
        bullets: ['业务流程梳理', '场景价值评估', '应用边界定义'],
      },
      {
        category: '应用构建',
        title: '设计智能体、知识库和系统工具',
        description: '围绕任务链路组合数据、知识、模型、工具和审批机制。',
        bullets: ['智能体角色设计', '知识与数据接入', '工具调用和权限控制'],
      },
      {
        category: '持续运营',
        title: '建立评估、迭代和治理机制',
        description: '将 AI 应用纳入运营体系，持续优化准确性、效率和安全性。',
        bullets: ['效果评估', '知识更新', '运行审计与成本管理'],
      },
    ],
    architectureCards: [
      { title: '业务场景层', description: '识别任务、流程、角色和业务系统边界。' },
      { title: '智能体工程层', description: '组合模型、知识、工具、流程和安全策略。' },
      { title: '应用运营层', description: '支撑上线、监控、评估、迭代和持续运营。' },
    ],
    capabilities: [
      { title: '需求梳理', description: '从业务目标、流程和岗位任务定义 AI 场景。', icon: Search },
      { title: '智能体设计', description: '设计角色、任务、上下文、工具和协作机制。', icon: Bot },
      { title: '知识增强', description: '接入企业知识、制度、案例和数据上下文。', icon: FileText },
      { title: '系统集成', description: '连接业务系统，支持查询、写入、审批和执行。', icon: Network },
      { title: '安全治理', description: '控制权限、敏感数据、操作边界和审计留痕。', icon: ShieldCheck },
      { title: '效果运营', description: '持续评估使用效果、回答质量和业务收益。', icon: ChartNoAxesCombined },
    ],
    showcase: [
      { title: '企业知识助手', description: '面向员工、客服和运营团队提供知识检索与问答。', icon: BrainCircuit },
      { title: '业务流程 Copilot', description: '辅助生成报告、处理工单、分析客户和推进任务。', icon: Bot },
      { title: '管理决策助手', description: '结合数据指标和经营知识支持分析与决策。', icon: ChartNoAxesCombined },
    ],
    visualTitle: 'Enterprise AI Apps',
    visualSubtitle: '数据、知识、模型与业务系统连接',
  },
  {
    slug: 'city',
    label: '智慧城市',
    gradient: '城市运行智能治理',
    description: '围绕城市运行、公共服务、事件处置和数据治理，构建跨部门数据协同与智能化治理能力。',
    icon: Building2,
    stats: [
      { value: '跨部门', label: '城市数据协同' },
      { value: '多场景', label: '治理应用覆盖' },
      { value: '可追踪', label: '事件处置闭环' },
    ],
    values: [
      { title: '城市态势统一', description: '整合人口、空间、事件、设施和公共服务数据。', icon: Globe2 },
      { title: '事件处置闭环', description: '贯通发现、研判、派发、处置和复盘。', icon: ClipboardCheck },
      { title: '公共服务智能化', description: '围绕咨询、办理、分析和决策辅助提升服务效率。', icon: Users },
      { title: '数据共享有边界', description: '在合规和权限框架下推动跨部门数据共享。', icon: ShieldCheck },
    ],
    approach: [
      {
        category: '数据协同',
        title: '构建城市级数据与对象底座',
        description: '统一城市事件、设施、空间、人口和部门业务数据。',
        bullets: ['跨部门数据接入', '城市对象统一建模', '共享交换和权限管理'],
      },
      {
        category: '场景应用',
        title: '围绕高频治理任务建设智能应用',
        description: '将 AI 应用于事件研判、诉求分析、资源调度和服务问答。',
        bullets: ['事件智能分类', '诉求热点分析', '公共服务问答'],
      },
      {
        category: '运营治理',
        title: '形成城市治理评估与持续优化机制',
        description: '围绕事件链路、处置效率、服务质量和数据质量持续改进。',
        bullets: ['处置效率评估', '服务质量分析', '治理知识沉淀'],
      },
    ],
    architectureCards: [
      { title: '城市数据层', description: '整合空间、设施、事件、人口和部门业务数据。' },
      { title: '治理智能层', description: '提供知识检索、事件研判、趋势分析和智能体协同。' },
      { title: '城市应用层', description: '支撑运行管理、公共服务、应急处置和决策分析。' },
    ],
    capabilities: [
      { title: '城市对象建模', description: '统一区域、设施、事件、主体和业务对象。', icon: Layers3 },
      { title: '跨部门数据治理', description: '支撑数据目录、共享交换和权限控制。', icon: Database },
      { title: '事件智能研判', description: '辅助识别事件类型、影响范围和处置建议。', icon: BrainCircuit },
      { title: '工单流转协同', description: '连接派发、办理、反馈和复核流程。', icon: Workflow },
      { title: '服务知识库', description: '沉淀政策、流程、问答和办事指南。', icon: FileText },
      { title: '治理指标分析', description: '围绕区域、部门、事件和服务形成指标分析。', icon: ChartNoAxesCombined },
    ],
    showcase: [
      { title: '城市运行驾驶舱', description: '集中呈现城市事件、设施状态和治理指标。', icon: Building2 },
      { title: '公共服务智能助手', description: '面向公众和工作人员提供政策问答与办理辅助。', icon: Users },
      { title: '事件处置闭环', description: '对城市事件从发现到复盘进行全过程追踪。', icon: ClipboardCheck },
    ],
    visualTitle: 'City Intelligence',
    visualSubtitle: '城市数据、事件与治理流程协同',
  },
  {
    slug: 'healthcare',
    label: '智慧医疗',
    gradient: '医疗数据与知识智能化',
    description: '围绕医疗数据治理、知识沉淀、运营管理和辅助服务场景，帮助医疗机构构建安全、可信、可持续的智能化能力。',
    icon: HeartPulse,
    stats: [
      { value: '可信', label: '医疗数据治理' },
      { value: '知识化', label: '诊疗与管理经验' },
      { value: '安全', label: '权限与审计' },
    ],
    values: [
      { title: '医疗数据可治理', description: '统一治理结构化、非结构化和业务运营数据。', icon: Database },
      { title: '医疗知识可沉淀', description: '沉淀制度、流程、指南、病例和管理经验。', icon: FileText },
      { title: '服务效率可提升', description: '辅助咨询、导诊、运营分析和内部协同。', icon: Users },
      { title: '安全合规可追踪', description: '围绕敏感数据、权限、调用和行为建立审计机制。', icon: ShieldCheck },
    ],
    approach: [
      {
        category: '数据治理',
        title: '建立医疗数据标准和质量基础',
        description: '梳理患者、科室、诊疗、运营和管理数据，形成统一标准和质量规则。',
        bullets: ['医疗数据标准化', '数据质量检测', '敏感数据分级管理'],
      },
      {
        category: '知识工程',
        title: '构建可检索、可引用的医疗知识体系',
        description: '将制度、指南、流程和案例转化为 AI 可理解的知识资产。',
        bullets: ['知识采集和结构化', '权限隔离', '问答与引用溯源'],
      },
      {
        category: '智能应用',
        title: '面向运营和服务构建 AI 应用',
        description: '在安全边界内支持导诊咨询、管理分析、内部问答和流程协同。',
        bullets: ['运营分析助手', '内部知识问答', '流程协同与审计'],
      },
    ],
    architectureCards: [
      { title: '医疗数据层', description: '治理诊疗、运营、管理和知识文档数据。' },
      { title: '知识智能层', description: '支撑知识检索、智能问答、分析推理和权限控制。' },
      { title: '服务应用层', description: '面向导诊、运营、内部协同和管理分析构建应用。' },
    ],
    capabilities: [
      { title: '数据标准治理', description: '统一医疗业务对象、指标和字段口径。', icon: BadgeCheck },
      { title: '知识库建设', description: '沉淀制度、指南、流程、案例和常见问题。', icon: FileText },
      { title: '权限控制', description: '按角色、场景和数据敏感级别控制访问边界。', icon: ShieldCheck },
      { title: '智能问答', description: '提供带引用来源的内部知识检索与问答。', icon: BrainCircuit },
      { title: '运营分析', description: '围绕科室、资源、服务和质量进行分析。', icon: ChartNoAxesCombined },
      { title: '审计留痕', description: '记录访问、调用、反馈和处置过程。', icon: ClipboardCheck },
    ],
    showcase: [
      { title: '医疗知识助手', description: '支持制度、流程、指南和内部知识查询。', icon: BrainCircuit },
      { title: '运营分析看板', description: '辅助管理者观察服务效率、资源使用和质量指标。', icon: ChartNoAxesCombined },
      { title: '安全审计台账', description: '追踪数据访问、模型调用和应用操作记录。', icon: ClipboardCheck },
    ],
    visualTitle: 'Healthcare Intelligence',
    visualSubtitle: '医疗数据、知识与安全治理协同',
  },
]

function toTimelineItems(items: TimelineSeed[]): SolutionTimelineItem[] {
  return items.map((item, index) => ({
    ...item,
    number: String(index + 1).padStart(2, '0'),
  }))
}

function toVisual(seed: UseCaseSeed): SolutionScenarioVisualConfig {
  return {
    title: seed.visualTitle,
    subtitle: seed.visualSubtitle,
    icon: seed.icon,
    layers: seed.architectureCards.map((card, index) => ({
      label: card.title,
      description: card.description,
      icon: [Database, BrainCircuit, Sparkles][index] ?? Layers3,
    })),
    signals: seed.stats,
  }
}

function createUseCasePage(seed: UseCaseSeed): SolutionUseCasePage {
  const titleId = `solution-${seed.slug}-hero-title`
  const labelPrefix = seed.label

  return {
    slug: seed.slug,
    label: seed.label,
    href: `/solutions/${seed.slug}`,
    visual: toVisual(seed),
    content: {
      seo: {
        title: `${seed.label}解决方案 - DeepTrols`,
        description: seed.description,
      },
      hero: {
        badge: '应用场景',
        badgeIcon: seed.icon,
        titleId,
        titleLine: `${seed.label}解决方案`,
        titleGradient: seed.gradient,
        description: seed.description,
        actions: heroActions,
        visualLabel: `${seed.label}场景智能化示意`,
      },
      heroStats: seed.stats,
      value: {
        eyebrow: 'Use Cases',
        title: `${labelPrefix}核心价值`,
        titleId: `solution-${seed.slug}-value-title`,
        subtitle: `围绕${labelPrefix}的真实业务流程，构建数据、知识、智能体和业务系统协同的智能化能力。`,
        items: seed.values,
        columns: 'four',
        nowrapSubtitle: true,
      },
      approach: {
        eyebrow: 'Approach',
        title: `${labelPrefix}落地路径`,
        titleId: `solution-${seed.slug}-approach-title`,
        subtitle: '从数据接入、知识沉淀到智能应用建设，形成可交付、可运营、可持续优化的实施路径。',
        items: toTimelineItems(seed.approach),
      },
      architecture: {
        eyebrow: 'Architecture',
        title: `${labelPrefix}方案架构`,
        titleId: `solution-${seed.slug}-architecture-title`,
        subtitle: '以统一数据底座连接业务对象、知识资产、模型服务和智能应用，保持架构清晰且便于持续演进。',
        label: `${labelPrefix}方案架构`,
        fallbackText: `${labelPrefix}方案架构图占位符`,
        cards: seed.architectureCards,
      },
      capabilities: {
        eyebrow: 'Capabilities',
        title: `${labelPrefix}核心能力`,
        titleId: `solution-${seed.slug}-capabilities-title`,
        subtitle: '围绕场景建设所需的数据治理、知识工程、智能体编排、系统集成和运营治理能力进行组合交付。',
        items: seed.capabilities,
        columns: 'three',
        nowrapSubtitle: true,
      },
      showcase: {
        eyebrow: 'Delivery',
        title: `${labelPrefix}服务交付`,
        titleId: `solution-${seed.slug}-showcase-title`,
        subtitle: '根据企业现状和场景优先级，提供从规划、建设到上线运营的端到端服务。',
        items: seed.showcase satisfies SolutionShowcaseItem[],
        fallbackText: `${labelPrefix}交付场景占位图`,
      },
      related: {
        eyebrow: 'Related',
        title: '相关产品与资源',
        titleId: `solution-${seed.slug}-related-title`,
        description: '结合数曜、博曜、探曜与企业级 AI 服务能力，为不同应用场景提供可复用的底座和交付方法。',
        links: relatedLinks,
      },
      cta: {
        title: `启动${labelPrefix}场景建设`,
        titleId: `solution-${seed.slug}-cta-title`,
        description: '让数据成为资产，让知识驱动决策，让 AI 创造价值。',
        actions: ctaActions,
      },
    },
  }
}

export const solutionUseCasePages: SolutionUseCasePage[] = seeds.map(createUseCasePage)

export const solutionUseCaseMap = Object.fromEntries(
  solutionUseCasePages.map((page) => [page.slug, page]),
) as Record<SolutionUseCaseSlug, SolutionUseCasePage>

export function getSolutionUseCaseBySlug(slug: string) {
  return solutionUseCaseMap[slug as SolutionUseCaseSlug]
}
