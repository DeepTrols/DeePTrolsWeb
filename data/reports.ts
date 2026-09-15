export type ReportResourceType = '产品规格书' | '电子书' | '白皮书' | '视频' | '幻灯片' | '基准测试报告'
export type ReportSolutionFilterKey =
  | 'data-infrastructure'
  | 'knowledge-engineering'
  | 'smart-manufacturing'
  | 'smart-water'
  | 'smart-education'
  | 'fde'
  | 'compute-power'
export type ReportFilterKey = 'all' | ReportSolutionFilterKey

export interface ReportFilterTab {
  key: ReportFilterKey
  label: string
}

export interface ReportResource {
  type: ReportResourceType
  category: string
  /** 所属筛选分类；分类与资源的归属关系待内容确认后补充，未归属资源不出现在分类 tab 下 */
  solutionKey?: ReportSolutionFilterKey
  title: string
  summary: string
  image: string
  href: string
}

export const reportHero = {
  title: '白皮书&报告',
  description: '全球最新的AI相关白皮书&报告，深入了解人工智能的世界。',
}

export const reportFilterTabs: ReportFilterTab[] = [
  { key: 'all', label: '全部' },
  { key: 'data-infrastructure', label: '数据设施' },
  { key: 'knowledge-engineering', label: '知识工程' },
  { key: 'smart-manufacturing', label: '智能制造' },
  { key: 'smart-water', label: '智慧水利' },
  { key: 'smart-education', label: '智慧教育' },
  { key: 'fde', label: 'FDE' },
  { key: 'compute-power', label: '算电协同' },
]

export const reportResources: ReportResource[] = [
  {
    type: '白皮书',
    category: '企业 AI',
    title: '企业级 AI 应用落地白皮书',
    summary: '从场景规划、数据准备、知识构建到智能体交付，系统梳理企业 AI 应用建设路径。',
    image: '/images/home/solutions/data-center-ai.CDu93Miw.png',
    href: '/resources/reports/enterprise-ai-application',
  },
  {
    type: '基准测试报告',
    category: '数据工程',
    title: 'AI 时代的数据治理与数据底座报告',
    summary: '围绕数据标准、质量、资产与服务化能力，解析高质量数据如何支撑智能化创新。',
    image: '/images/home/solutions/data.DHKY-NE1.png',
    href: '/resources/reports/ai-data-governance',
  },
  {
    type: '电子书',
    category: '知识工程',
    title: '企业知识工程建设实践指南',
    summary: '覆盖知识采集、治理、检索与应用，让组织知识成为 AI 可理解、可调用的核心资产。',
    image: '/images/solutions/data-engineering.jpg',
    href: '/resources/reports/knowledge-engineering',
  },
  {
    type: '视频',
    category: '工业智能',
    title: '工业现场智能体应用场景解析视频',
    summary: '以设备数据、事件处置、工单协同与运行优化为主线，讲解智能体在工业现场的落地方式。',
    image: '/images/home/solutions/industrial.K00G2HaS.png',
    href: '/resources/reports/industrial-agent',
  },
  {
    type: '产品规格书',
    category: 'Token 管理',
    title: 'Token Hub 模型调用治理产品规格书',
    summary: '从模型接入、配额控制、成本统计到统一 API，说明企业级模型调用治理的产品能力。',
    image: '/images/solutions/data-center.jpg',
    href: '/resources/reports/token-governance',
  },
  {
    type: '幻灯片',
    category: 'AI 基础设施',
    title: 'AI 算力与基础设施建设方案幻灯片',
    summary: '面向企业 AI 应用规模化建设，梳理算力规划、资源调度与基础设施运营关键能力。',
    image: '/images/solutions/smart-energy.jpg',
    href: '/resources/reports/ai-infrastructure',
  },
]

export const featuredReportResources = reportResources.slice(0, 3)
