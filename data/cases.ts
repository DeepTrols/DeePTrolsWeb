import type { ProductMetricItem } from '~/components/common/ProductMetricsSection.vue'
import type { ReportSolutionFilterKey } from './reports'

export interface CaseResource {
  /** 所属筛选分类；分类与案例的归属关系待内容提供后补充 */
  solutionKey?: ReportSolutionFilterKey
  title: string
  summary: string
  image: string
  href: string
}

export const caseHero = {
  title: '深度数智 智能化转型实践精选',
  subtitle:
    '从数据、知识与物联感知，到 AI 智能体与算力能源协同，DeepTrols 深入客户真实业务场景，将技术能力与行业需求结合，持续构建可运行、可验证、可演进的智能应用。',
  video: '/images/cases/case-hero.mp4',
}

export const caseMetrics: ProductMetricItem[] = [
  { value: '100+', label: '服务客户' },
  { value: '300+', label: '落地项目' },
  { value: '50%-70%', label: 'AI赋能业务提效' },
  { value: '10+', label: '覆盖行业' },
]

// 模拟样例：案例内容清单待产品提供后整体替换；每个分类 tab 各覆盖 1 条，便于验收过滤与搜索行为
export const caseResources: CaseResource[] = [
  {
    solutionKey: 'smart-manufacturing',
    title: '汽车零部件龙头企业设备智能体实践',
    summary:
      '基于探窑物联网关与 DeviceAgent 设备智能体，打通设备数据采集、异常事件处置与工单协同，助力产线非计划停机时间显著下降。',
    image: '/images/home/solutions/industrial.K00G2HaS.png',
    href: '/cases/automotive-parts-device-agent',
  },
  {
    solutionKey: 'data-infrastructure',
    title: '能源集团级数据治理平台建设实践',
    summary:
      '以数遥 DGP 与 DMS 为核心构建集团数据标准、质量与资产目录体系，实现数据要素统一管理与服务化输出，支撑下游 AI 应用建设。',
    image: '/images/home/solutions/data.DHKY-NE1.png',
    href: '/cases/energy-group-data-governance',
  },
  {
    solutionKey: 'knowledge-engineering',
    title: '金融机构企业知识库与智能问答实践',
    summary:
      '覆盖知识采集、治理、检索与应用全链路，让组织知识成为 AI 可理解、可调用的核心资产，智能问答准确率与响应效率双提升。',
    image: '/images/solutions/data-engineering.jpg',
    href: '/cases/finance-knowledge-engineering',
  },
  {
    solutionKey: 'smart-water',
    title: '流域管理机构智慧水利监测调度实践',
    summary:
      '融合物联感知与 AI 分析能力，构建水情监测、汛期预警与水资源调度一体化平台，提升流域管理的精细化与智能化水平。',
    image: '/images/home/solutions/smart-Water.DHKY-NE1.png',
    href: '/cases/basin-smart-water',
  },
  {
    solutionKey: 'smart-education',
    title: '高等院校 AI 教育智能体应用实践',
    summary:
      '面向教学管理与课堂答疑场景部署教育智能体，沉淀课程知识资产，为师生提供全天候智能问答与个性化学习支持。',
    image: '/images/solutions/education-hero.png',
    href: '/cases/university-ai-education',
  },
  {
    solutionKey: 'fde',
    title: '零售企业 AI 应用前沿部署交付实践',
    summary:
      '以前沿部署工程师（FDE）驻场方式，从业务原型验证到生产级交付持续迭代，帮助客户在数周内完成 AI 应用规模化落地。',
    image: '/images/home/solutions/data-center-ai.CDu93Miw.png',
    href: '/cases/retail-fde-delivery',
  },
  {
    solutionKey: 'compute-power',
    title: '数据中心算电协同运营实践',
    summary:
      '围绕算力调度与能耗优化构建算电协同运营体系，结合 Token Hub 模型调用治理，实现算力资源利用率与运营成本的双向改善。',
    image: '/images/home/solutions/smart-energy.DHKY-NE1.png',
    href: '/cases/datacenter-compute-power',
  },
]

export const caseFeatured = caseResources.slice(0, 3)
