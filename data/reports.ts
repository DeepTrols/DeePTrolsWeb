export interface ReportResource {
  type: '白皮书' | '报告'
  category: string
  title: string
  summary: string
  image: string
  href: string
}

export const reportHero = {
  title: '白皮书&报告',
  description: '全球最新的AI相关白皮书&报告，深入了解人工智能的世界。',
}

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
    type: '报告',
    category: '数据工程',
    title: 'AI 时代的数据治理与数据底座报告',
    summary: '围绕数据标准、质量、资产与服务化能力，解析高质量数据如何支撑智能化创新。',
    image: '/images/home/solutions/data.DHKY-NE1.png',
    href: '/resources/reports/ai-data-governance',
  },
  {
    type: '白皮书',
    category: '知识工程',
    title: '企业知识工程建设实践指南',
    summary: '覆盖知识采集、治理、检索与应用，让组织知识成为 AI 可理解、可调用的核心资产。',
    image: '/images/solutions/data-engineering.jpg',
    href: '/resources/reports/knowledge-engineering',
  },
  {
    type: '报告',
    category: '工业智能',
    title: '工业现场智能体应用趋势报告',
    summary: '分析设备数据、事件处置、工单协同与运行优化场景中的智能体落地方式。',
    image: '/images/home/solutions/industrial.K00G2HaS.png',
    href: '/resources/reports/industrial-agent',
  },
  {
    type: '白皮书',
    category: 'Token 管理',
    title: '企业模型调用与 Token 成本治理白皮书',
    summary: '从模型接入、配额控制、成本统计到统一 API，建立企业级模型调用治理体系。',
    image: '/images/solutions/data-center.jpg',
    href: '/resources/reports/token-governance',
  },
  {
    type: '报告',
    category: 'AI 基础设施',
    title: 'AI 算力与基础设施建设参考报告',
    summary: '面向企业 AI 应用规模化建设，梳理算力规划、资源调度与基础设施运营关键能力。',
    image: '/images/solutions/smart-energy.jpg',
    href: '/resources/reports/ai-infrastructure',
  },
]
