import {
  BookOpen,
  Bot,
  Boxes,
  Brain,
  Cable,
  Cloud,
  Cpu,
  Database,
  Network,
  RadioTower,
  Server,
  Unlink,
  Workflow,
} from '@lucide/vue'
import type { ProductFeatureGridItem } from '~/components/common/ProductFeatureGridSection.vue'

export const manufacturingHero = {
  title: '智能制造解决方案',
  description:
    '融合数曜数据智能、博曜知识中枢、探曜物联感知与智曜 AI 引擎，贯通制造企业设备、数据、知识与业务流程，构建从实时感知、数据治理、智能分析到自主决策与执行的制造智能体系，推动生产优化、质量提升、设备运维与能源管理持续智能化。',
  image: '/images/solutions/manufacturing-hero.png',
  imageAlt: '智能制造解决方案',
}

export const manufacturingPains: ProductFeatureGridItem[] = [
  {
    title: '设备连接复杂，生产现场难以统一感知',
    description:
      'PLC、CNC、机器人、仪器仪表、传感器及各类工业设备品牌和协议复杂，设备数据分散在不同产线与控制系统中，缺乏统一接入、实时采集与状态监测能力。',
    icon: Cable,
  },
  {
    title: '业务系统割裂，制造数据难以形成统一资产',
    description:
      'ERP、MES、WMS、QMS、SCADA、EMS 等系统长期独立建设，数据标准、编码体系和数据模型不统一，形成大量数据孤岛，跨系统数据难以关联、分析和复用。',
    icon: Unlink,
  },
  {
    title: '制造知识高度依赖人员经验',
    description:
      '工艺参数、设备维修经验、质量问题处理方法、SOP 与技术文档分散在人员、文件和业务系统中，难以形成结构化、可检索、可推理、可持续积累的企业知识体系。',
    icon: Brain,
  },
  {
    title: 'AI 与实际生产流程脱节',
    description:
      '企业虽然已经开始应用大模型、机器视觉和数据分析技术，但大量 AI 应用仍停留在单点试验阶段，模型难以获取实时工业数据、调用企业知识并与生产系统形成业务闭环。',
    icon: Bot,
  },
]

export const manufacturingSolutionItems: ProductFeatureGridItem[] = [
  {
    title: '连接生产现场',
    description:
      '统一接入 PLC、CNC、机器人、传感器及工业控制系统，兼容多种工业协议，实现设备连接、实时数据采集与边缘协同，构建基于探曜的生产现场感知体系。',
    icon: RadioTower,
  },
  {
    title: '统一制造数据',
    description:
      '打通设备数据与 ERP、MES、WMS、SCADA 等业务系统，统一数据标准、模型与指标体系，依托数曜形成贯穿生产全流程的可信数据底座。',
    icon: Database,
  },
  {
    title: '沉淀制造知识',
    description:
      '整合工艺文件、设备资料、质量标准、SOP 与运维经验，将分散的制造知识结构化、资产化，并由博曜提供统一的知识检索、理解与智能服务。',
    icon: BookOpen,
  },
  {
    title: '驱动智能生产',
    description:
      '融合实时生产数据、制造知识与 AI 模型，依托智曜构建设备运维、质量分析、工艺优化与生产决策等智能应用，让 AI 从分析辅助走向业务决策与执行。',
    icon: Cpu,
  },
]

export interface ManufacturingCapabilityCard {
  title: string
  points: string[]
  description: string
}

export const manufacturingCapabilities: ManufacturingCapabilityCard[] = [
  {
    title: 'APS智能生产排程',
    points: ['多约束产能智能规划', '有限产能动态排程', '生产扰动实时重排'],
    description:
      '综合订单、工艺路线、设备产能、物料齐套与交期等约束，自动生成可执行生产计划，并根据插单、故障等生产扰动进行动态重排，提升产能利用与交付效率。',
  },
  {
    title: '设备预测性维护',
    points: ['健康状态实时感知', '异常根因智能诊断', '设备风险预测维护'],
    description:
      '融合设备实时运行数据、历史故障与运维知识，持续评估设备健康状态，智能诊断异常根因并预测潜在故障风险，实现从被动维修向预测性维护转变。',
  },
  {
    title: '工业知识工程',
    points: ['多源工业知识沉淀', '工业知识关联建模', '生产知识智能服务'],
    description:
      '统一汇聚工艺规范、设备手册、SOP、故障案例与专家经验，通过知识抽取、关联与语义理解构建企业工业知识体系，为工艺辅助、故障诊断、作业指导与智能决策提供可信知识支撑。',
  },
  {
    title: '工业智能体协同',
    points: ['生产运营智能分析', '工业知识智能推理', '业务任务自主执行'],
    description:
      '融合生产实时数据、工业知识与业务系统能力，构建面向设备、工艺、生产与运营场景的工业智能体，实现从信息获取、分析推理到任务执行的智能化业务协同。',
  },
]

export const manufacturingAdvantages: ProductFeatureGridItem[] = [
  {
    title: 'OT/IT深度融合',
    description:
      '贯通PLC、CNC、机器人等生产设备与 MES、ERP、WMS、SCADA等业务系统，连接生产现场与管理系统，构建统一的制造数据链路。',
    icon: Network,
  },
  {
    title: '多源异构数据治理',
    description:
      '统一汇聚设备、生产、工艺、质量、物料与经营数据，通过数曜完成数据标准化、治理、开发与资产化，为制造分析和 AI 应用提供可信数据基础。',
    icon: Database,
  },
  {
    title: '工业知识工程',
    description:
      '将工艺规范、设备手册、SOP、故障案例与专家经验转化为结构化工业知识，通过博曜实现知识沉淀、关联、检索与智能调用。',
    icon: BookOpen,
  },
  {
    title: '全域设备感知',
    description:
      '基于探曜连接设备、产线与边缘节点，实现工业协议接入、实时数据采集、设备状态监测与事件感知，为生产智能化提供实时数据入口。',
    icon: RadioTower,
  },
  {
    title: '边云协同计算',
    description:
      '支持边缘侧数据处理、规则计算与实时响应，并与云端数据和AI能力协同，在满足工业现场低时延需求的同时实现集中管理与智能分析。',
    icon: Cloud,
  },
  {
    title: '企业级AI智能体',
    description:
      '基于智曜构建设备、工艺、生产与运营智能体，融合实时数据与工业知识，使AI能够理解生产上下文、分析问题并辅助业务决策。',
    icon: Bot,
  },
  {
    title: 'AI与业务闭环',
    description:
      '通过 MCP、Tools、API 与 Workflow 连接企业现有业务系统，让AI不止于问答和分析，还能够调用工具、触发流程并协同完成业务任务。',
    icon: Workflow,
  },
  {
    title: '开放技术架构',
    description:
      '兼容主流工业协议、数据库、消息系统、AI 模型与企业应用，通过标准API和开放接口融入企业现有技术体系，降低系统集成与持续扩展成本。',
    icon: Boxes,
  },
  {
    title: '私有化与自主部署',
    description:
      '支持企业本地、私有云及混合环境部署，核心数据、知识与模型可运行于企业自主环境，满足制造企业对数据安全、系统可控与持续运营的要求。',
    icon: Server,
  },
]

export interface ManufacturingCaseStat {
  value: string
  label: string
}

export interface ManufacturingCase {
  title: string
  description: string
  stats: ManufacturingCaseStat[]
  reversed?: boolean
}

export const manufacturingCases: ManufacturingCase[] = [
  {
    title: '某大型装备制造企业',
    description:
      '围绕关键生产设备与核心产线，建设统一设备数据采集与智能运维体系，贯通设备实时状态、历史故障记录与维修知识。通过设备健康评估、异常诊断与风险预测，推动运维模式由故障后维修向预测性维护转变。',
    stats: [
      { value: '2,000+', label: '关键设备接入' },
      { value: '30%', label: '异常响应效率提升' },
      { value: '20%', label: '非计划停机降低' },
    ],
  },
  {
    title: '某汽车零部件制造企业',
    description:
      '打通 ERP、MES、设备及生产现场数据，围绕订单、工艺路线、设备产能和物料齐套构建 APS 智能排程体系。在插单、设备异常和计划变更等场景下实现动态重排，提升生产计划执行与资源协同效率。',
    stats: [
      { value: '10,000+', label: '生产数据点接入' },
      { value: '25%', label: '排产效率提升' },
      { value: '15%', label: '设备利用率提升' },
    ],
    reversed: true,
  },
  {
    title: '某高端制造企业',
    description:
      '统一汇聚工艺文件、设备手册、SOP、故障案例及专家经验，构建企业工业知识体系，并结合生产实时数据与工业智能体，为现场人员提供工艺查询、故障辅助诊断、作业指导与生产决策支持。',
    stats: [
      { value: '100,000+', label: '工业知识条目' },
      { value: '60%', label: '知识检索效率提升' },
      { value: '40%', label: '问题处理时间缩短' },
    ],
  },
]
