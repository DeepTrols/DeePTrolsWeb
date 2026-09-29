/**
 * WhyTrustTabs 信任标签页纯字符串数据（015.18）：无 ?url 资源、无组件引用，server 与客户端共享。
 * data/why.ts 由此 import 后解析图标组件并 re-export（导出签名不变）。
 */

export interface WhyTrustFeatureData {
  title: string
  subtitle: string
  description: string
  icon: string
}

export interface WhyTrustTabData {
  key: string
  label: string
  features: WhyTrustFeatureData[]
}

export const whyTrustTabsHeading = {
  title: '为什么DeepTrols值得信赖',
  tablistLabel: 'DeepTrols 信赖维度',
}

export const whyTrustTabsData: WhyTrustTabData[] = [
  {
    key: 'technology',
    label: '面向技术层',
    features: [
      {
        title: '生产级架构',
        subtitle: '面向企业生产环境',
        description:
          '采用高可用、可扩展、可观测的企业级架构设计，支持复杂业务持续稳定运行，为 AI 应用提供长期可靠的技术基础。',
        icon: 'Cpu',
      },
      {
        title: '开放兼容',
        subtitle: '不绑定任何技术路线',
        description:
          '兼容主流大模型、云平台、MCP 协议及企业业务系统，保护现有技术投资，帮助企业灵活构建开放 AI 能力。',
        icon: 'Network',
      },
      {
        title: '持续演进',
        subtitle: '紧跟AI技术发展',
        description:
          '持续融合智能体、推理模型及 AI 基础设施等前沿技术，快速响应技术迭代，保持企业 AI 能力持续领先。',
        icon: 'Orbit',
      },
      {
        title: '安全可控',
        subtitle: '企业级治理能力',
        description:
          '建立覆盖权限管理、模型治理、审计追踪及数据安全的治理体系，保障企业 AI 应用安全、稳定、可信运行。',
        icon: 'ShieldCheck',
      },
    ],
  },
  {
    key: 'business',
    label: '面向业务层',
    features: [
      {
        title: '行业理解',
        subtitle: '100+数字化交付经验',
        description:
          '积累丰富的数字化建设与项目交付经验，覆盖平台建设、数据治理、物联网等领域，为企业 AI 建设提供坚实基础。',
        icon: 'Building2',
      },
      {
        title: '场景驱动',
        subtitle: '20+行业场景',
        description:
          '深入制造、能源、环保、政务等行业核心业务场景，以真实业务需求驱动 AI 应用落地，持续创造业务价值。',
        icon: 'Gauge',
      },
      {
        title: '集成能力',
        subtitle: '连接企业现有业务系统',
        description:
          '具备丰富的企业系统集成经验，打通 ERP、MES、OA、CRM、IoT 等业务系统，实现 AI 与业务流程深度协同。',
        icon: 'Waypoints',
      },
      {
        title: '持续交付',
        subtitle: '覆盖AI全生命周期',
        description:
          '从咨询规划、方案设计到建设实施、运营优化，提供覆盖 AI 全生命周期的一体化服务，持续推动业务升级。',
        icon: 'CheckCircle2',
      },
    ],
  },
  {
    key: 'service',
    label: '面向服务层',
    features: [
      {
        title: '全程陪伴',
        subtitle: '咨询到运营',
        description:
          '围绕企业 AI 建设全过程，提供咨询规划、方案设计、项目实施及持续运营服务，全程陪伴客户能力成长。',
        icon: 'Bot',
      },
      {
        title: '快速交付',
        subtitle: '成熟交付体系',
        description:
          '依托成熟的方法论、标准化实施流程及丰富项目经验，有效降低项目风险，保障 AI 项目高质量、高效率交付。',
        icon: 'Sparkles',
      },
      {
        title: '长期服务',
        subtitle: '持续创造价值',
        description:
          '坚持长期服务理念，持续优化模型、应用与业务流程，推动 AI 能力不断演进，帮助企业持续释放业务价值。',
        icon: 'BrainCircuit',
      },
      {
        title: '效果量化',
        subtitle: '交付可量化的业务价值',
        description:
          '建立覆盖模型效果、业务效率、运营价值等多维评估体系，让 AI 建设成果可衡量、可验证、可持续优化。',
        icon: 'ChartNoAxesCombined',
      },
    ],
  },
  {
    key: 'growth',
    label: '面向长期价值',
    features: [
      {
        title: '能力内化',
        subtitle: '让企业掌握自身 AI 能力',
        description:
          '通过平台、知识、流程与方法论沉淀，将项目成果转化为企业可持续运营的内部能力，而不是一次性交付物。',
        icon: 'Database',
      },
      {
        title: '方法沉淀',
        subtitle: '形成可复制交付体系',
        description:
          '将行业经验、工程规范与智能体实践沉淀为标准化方法，帮助企业在更多场景中复用 AI 建设成果。',
        icon: 'FileText',
      },
      {
        title: '生态连接',
        subtitle: '连接模型、算力与社区',
        description:
          '围绕 Token Hub、算力基础设施、智能体社区与行业资源，构建开放生态，持续扩展企业 AI 应用边界。',
        icon: 'RadioTower',
      },
      {
        title: '价值运营',
        subtitle: '持续优化业务结果',
        description:
          '用指标、数据与运营机制持续评估 AI 应用效果，推动模型、流程和业务协同不断优化。',
        icon: 'ChartNoAxesCombined',
      },
    ],
  },
]
