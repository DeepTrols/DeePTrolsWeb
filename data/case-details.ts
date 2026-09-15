import type { ArticleBlock } from '~/types/article'
import type { ReportSolutionFilterKey } from './reports'

export interface CaseRelatedProduct {
  name: string
  desc: string
  href: string
}

export interface CaseDetail {
  slug: string
  title: string
  /** 所属分类，标签文案由 reportFilterTabs 派生，面包屑链接 /cases?category=<key> */
  categoryKey: ReportSolutionFilterKey
  heroImage: string
  /** 结构化内容模版：排版固定在 ArticleContent，后台后续按此结构填充正式内容 */
  blocks: ArticleBlock[]
  relatedProducts: CaseRelatedProduct[]
}

// 占位图（正式内容由后台提供后替换）
const HERO_PLACEHOLDER = '/images/common/detail-hero-placeholder.svg'
const CONTENT_PLACEHOLDER = '/images/common/content-placeholder.svg'

// 模拟样例：7 条案例详情与 data/cases.ts 的 caseResources slug 一一对应，待产品提供后整体替换
export const caseDetails: CaseDetail[] = [
  {
    slug: 'automotive-parts-device-agent',
    title: '汽车零部件龙头企业设备智能体实践',
    categoryKey: 'smart-manufacturing',
    heroImage: HERO_PLACEHOLDER,
    relatedProducts: [
      { name: '探曜·AI物联感知平台', desc: '实现设备、数据与智能应用互联', href: '/products/ai-iot' },
      { name: 'Device Agent', desc: '具备自主执行能力的设备智能体', href: '/products/device-agent' },
      { name: '数曜·数据治理平台', desc: '构建高质量企业数据体系', href: '/products/data-governance' },
    ],
    blocks: [
      { type: 'heading', level: 2, text: '项目背景' },
      {
        type: 'paragraph',
        text: '客户是国内汽车零部件行业的龙头企业，为多家整车厂提供核心配套。生产线上设备种类多、节拍快，任何一次非计划停机都会沿供应链放大，直接影响交付与成本。',
      },
      {
        type: 'paragraph',
        text: '此前设备异常主要依赖人工巡检与事后报修，异常发现滞后、处置流程割裂，设备数据沉淀在多个系统中，难以形成统一的运行视图。',
      },
      { type: 'heading', level: 2, text: '建设内容' },
      { type: 'heading', level: 3, text: '设备数据全面接入' },
      {
        type: 'paragraph',
        text: '通过探曜 AI 物联感知平台在产线部署边缘采集能力，将关键设备的运行参数、状态信号与告警事件统一接入，构建设备运行的实时数据底座。',
      },
      { type: 'heading', level: 3, text: '设备智能体上岗' },
      {
        type: 'paragraph',
        text: '基于 Device Agent 构建设备智能体，对异常事件进行自动识别、归因与处置建议生成，并与工单系统联动，实现「事件发现—诊断—派单—闭环」的自动化流转。',
      },
      {
        type: 'image',
        src: CONTENT_PLACEHOLDER,
        alt: '设备智能体异常处置流程示意',
        caption: '设备智能体驱动的异常事件闭环流程（占位图）',
      },
      { type: 'heading', level: 2, text: '应用成效' },
      {
        type: 'list',
        items: [
          '异常事件平均发现时间由小时级缩短至分钟级',
          '非计划停机时间显著下降，产线交付稳定性提升',
          '维修工单自动派发，处置响应效率提升 50% 以上',
          '设备运行数据持续沉淀，为预测性维护奠定基础',
        ],
      },
      {
        type: 'quote',
        text: '设备智能体不是替代运维人员，而是把重复的诊断与流转工作自动化，让工程师专注于真正需要经验的复杂问题。',
      },
      { type: 'heading', level: 2, text: '实践价值与展望' },
      {
        type: 'paragraph',
        text: '该项目验证了「物联感知 + 设备智能体」在离散制造场景的落地路径，相关能力已在客户多条产线复制。下一阶段将结合历史运行数据推进预测性维护，从「快速处置」走向「提前预防」。',
      },
    ],
  },
  {
    slug: 'energy-group-data-governance',
    title: '能源集团级数据治理平台建设实践',
    categoryKey: 'data-infrastructure',
    heroImage: HERO_PLACEHOLDER,
    relatedProducts: [
      { name: '数曜·数据治理平台', desc: '构建高质量企业数据体系', href: '/products/data-governance' },
      { name: '数曜·数据要素监管平台', desc: '支撑数据要素合规监管', href: '/products/data-element-regulation' },
      { name: '数曜·数据开发平台', desc: '支持数据集成、开发与调度', href: '/products/data-development' },
    ],
    blocks: [
      { type: 'heading', level: 2, text: '项目背景' },
      {
        type: 'paragraph',
        text: '客户为大型综合能源集团，下属二级单位众多，长期信息化建设形成了大量分散的业务系统。数据标准不统一、质量参差不齐、跨单位共享困难，集团层面缺乏统一的数据资产视图。',
      },
      {
        type: 'paragraph',
        text: '随着集团数字化转型与 AI 应用建设提上日程，构建统一的数据底座成为最紧迫的基础工程。',
      },
      { type: 'heading', level: 2, text: '建设内容' },
      { type: 'heading', level: 3, text: '统一数据标准与质量体系' },
      {
        type: 'paragraph',
        text: '以数曜数据治理平台为核心，建立集团级数据标准体系，对主数据与核心业务数据开展质量稽核与问题闭环治理，形成可持续运营的质量管理机制。',
      },
      { type: 'heading', level: 3, text: '数据资产目录与要素管理' },
      {
        type: 'paragraph',
        text: '通过数曜数据要素监管平台构建全集团数据资产目录，实现资产确权、分级分类与合规流通管理，支撑数据要素在集团内外的安全共享。',
      },
      { type: 'heading', level: 3, text: '数据服务化输出' },
      {
        type: 'paragraph',
        text: '依托数曜数据开发平台完成多源数据集成与统一调度，以标准 API 形式向业务系统与 AI 应用输出高质量数据服务。',
      },
      {
        type: 'image',
        src: CONTENT_PLACEHOLDER,
        alt: '集团数据治理总体架构示意',
        caption: '集团级数据治理平台总体架构（占位图）',
      },
      { type: 'heading', level: 2, text: '应用成效' },
      {
        type: 'list',
        items: [
          '建成覆盖全集团的统一数据资产目录',
          '核心数据质量问题闭环治理，数据可用性大幅提升',
          '跨单位数据共享由「逐次申请」转为「目录化服务」',
          '为集团 AI 应用建设提供了高质量数据供给',
        ],
      },
      { type: 'heading', level: 2, text: '实践价值与展望' },
      {
        type: 'paragraph',
        text: '项目证明了数据治理不是一次性工程，而是「标准 + 平台 + 运营」的持续机制。集团正以此为底座推进经营分析与智能调度类 AI 应用，让数据资产持续转化为业务价值。',
      },
    ],
  },
  {
    slug: 'finance-knowledge-engineering',
    title: '金融机构企业知识库与智能问答实践',
    categoryKey: 'knowledge-engineering',
    heroImage: HERO_PLACEHOLDER,
    relatedProducts: [
      { name: '数曜·数据标签平台', desc: '为AI提供高质量训练数据', href: '/products/data-labeling' },
      { name: '数曜·数据治理平台', desc: '构建高质量企业数据体系', href: '/products/data-governance' },
    ],
    blocks: [
      { type: 'heading', level: 2, text: '项目背景' },
      {
        type: 'paragraph',
        text: '客户为区域性金融机构，制度文件、产品说明、操作规程等知识资产分散在多个部门与系统中。一线员工检索效率低，新员工培养周期长，专家经验难以沉淀复用。',
      },
      {
        type: 'paragraph',
        text: '机构希望构建统一的企业知识库，并在此基础上提供可信、可溯源的智能问答能力。',
      },
      { type: 'heading', level: 2, text: '建设内容' },
      { type: 'heading', level: 3, text: '知识采集与治理' },
      {
        type: 'paragraph',
        text: '对多源文档进行统一采集、清洗与结构化处理，借助数曜数据标签平台完成知识分类与标注，建立知识生命周期管理机制，确保入库知识的准确性与时效性。',
      },
      { type: 'heading', level: 3, text: '检索增强与智能问答' },
      {
        type: 'paragraph',
        text: '构建面向金融语义的检索增强问答链路，智能体基于知识库生成回答并附原文出处，做到「句句可溯源」，满足金融行业合规要求。',
      },
      {
        type: 'image',
        src: CONTENT_PLACEHOLDER,
        alt: '企业知识库智能问答链路示意',
        caption: '知识采集、治理到检索增强问答的整体链路（占位图）',
      },
      { type: 'heading', level: 2, text: '应用成效' },
      {
        type: 'list',
        items: [
          '制度与产品知识检索时间由分钟级降至秒级',
          '智能问答回答附带原文引用，可信可审计',
          '新员工上岗培训周期明显缩短',
          '专家经验沉淀为组织知识资产，持续复用',
        ],
      },
      {
        type: 'quote',
        text: '知识库的价值不在「存了多少文档」，而在「员工愿意问、系统答得准、监管查得清」。',
      },
      { type: 'heading', level: 2, text: '实践价值与展望' },
      {
        type: 'paragraph',
        text: '该项目形成了金融场景下知识工程的完整方法论。下一步将扩展至对公业务尽调、合规审查等更复杂场景，推动知识资产向业务决策环节延伸。',
      },
    ],
  },
  {
    slug: 'basin-smart-water',
    title: '流域管理机构智慧水利监测调度实践',
    categoryKey: 'smart-water',
    heroImage: HERO_PLACEHOLDER,
    relatedProducts: [
      { name: '探曜·AI物联感知平台', desc: '实现设备、数据与智能应用互联', href: '/products/ai-iot' },
      { name: '数曜·数据开发平台', desc: '支持数据集成、开发与调度', href: '/products/data-development' },
    ],
    blocks: [
      { type: 'heading', level: 2, text: '项目背景' },
      {
        type: 'paragraph',
        text: '客户为流域管理机构，辖区内的水文监测站点分布广、设备类型多，汛期数据量大且时效要求高。传统人工值守与分析模式难以满足精细化调度需要。',
      },
      {
        type: 'paragraph',
        text: '机构希望以物联感知与 AI 分析为核心，构建覆盖「监测—预警—调度」全链路的智慧水利平台。',
      },
      { type: 'heading', level: 2, text: '建设内容' },
      { type: 'heading', level: 3, text: '全域物联感知接入' },
      {
        type: 'paragraph',
        text: '通过探曜 AI 物联感知平台统一接入水位、流量、雨量、闸站工况等多类监测数据，实现站点状态实时可视与设备异常自动告警。',
      },
      { type: 'heading', level: 3, text: '水情分析与汛期预警' },
      {
        type: 'paragraph',
        text: '构建水情分析模型，对降雨—径流—水位过程进行滚动推演，超限时自动生成分级预警信息并推送至相关责任人。',
      },
      { type: 'heading', level: 3, text: '水资源调度辅助决策' },
      {
        type: 'paragraph',
        text: '结合用水计划与来水预测，为闸泵联合调度提供辅助决策建议，调度方案执行效果持续回流评估。',
      },
      {
        type: 'image',
        src: CONTENT_PLACEHOLDER,
        alt: '智慧水利监测调度平台示意',
        caption: '监测、预警、调度一体化平台总体架构（占位图）',
      },
      { type: 'heading', level: 2, text: '应用成效' },
      {
        type: 'list',
        items: [
          '监测数据自动化采集率达到 95% 以上',
          '汛期预警信息由人工整编转为自动生成、分钟级发布',
          '调度方案制定效率显著提升，水资源利用更加精细',
        ],
      },
      { type: 'heading', level: 2, text: '实践价值与展望' },
      {
        type: 'paragraph',
        text: '项目为流域级智慧水利建设提供了可复制的技术路径。后续将进一步引入智能体能力，探索预警与调度环节的半自动化执行，持续提升流域管理的智能化水平。',
      },
    ],
  },
  {
    slug: 'university-ai-education',
    title: '高等院校 AI 教育智能体应用实践',
    categoryKey: 'smart-education',
    heroImage: HERO_PLACEHOLDER,
    relatedProducts: [
      { name: 'Device Agent', desc: '具备自主执行能力的设备智能体', href: '/products/device-agent' },
      { name: '数曜·数据标签平台', desc: '为AI提供高质量训练数据', href: '/products/data-labeling' },
    ],
    blocks: [
      { type: 'heading', level: 2, text: '项目背景' },
      {
        type: 'paragraph',
        text: '客户为综合性高等院校，师生规模大、课程门类多。教务咨询重复性问题占比高，教师课后答疑精力有限，优质课程知识难以在课堂之外持续发挥作用。',
      },
      {
        type: 'paragraph',
        text: '学校希望引入 AI 教育智能体，为师生提供全天候、个性化的教学支持服务。',
      },
      { type: 'heading', level: 2, text: '建设内容' },
      { type: 'heading', level: 3, text: '课程知识资产沉淀' },
      {
        type: 'paragraph',
        text: '对课程大纲、讲义、习题与历年答疑记录进行结构化整理与标注，形成可被智能体理解与调用的课程知识库。',
      },
      { type: 'heading', level: 3, text: '教育智能体部署' },
      {
        type: 'paragraph',
        text: '面向学生部署课程答疑智能体，面向教师部署教学辅助智能体，覆盖教务咨询、课程答疑、学习建议等高频场景，回答均可追溯至课程知识来源。',
      },
      {
        type: 'image',
        src: CONTENT_PLACEHOLDER,
        alt: 'AI 教育智能体应用场景示意',
        caption: '覆盖教务咨询与课程答疑的教育智能体（占位图）',
      },
      { type: 'heading', level: 2, text: '应用成效' },
      {
        type: 'list',
        items: [
          '教务与课程咨询实现 7×24 小时即时响应',
          '教师重复性答疑工作量明显下降',
          '学生学习行为数据持续沉淀，支撑教学过程改进',
        ],
      },
      { type: 'heading', level: 2, text: '实践价值与展望' },
      {
        type: 'paragraph',
        text: '项目验证了教育智能体「以课程知识为根、以师生场景为本」的落地方式。学校计划在更多院系推广，并探索智能体在实验指导与就业辅导等场景的延伸应用。',
      },
    ],
  },
  {
    slug: 'retail-fde-delivery',
    title: '零售企业 AI 应用前沿部署交付实践',
    categoryKey: 'fde',
    heroImage: HERO_PLACEHOLDER,
    relatedProducts: [
      { name: 'Device Agent', desc: '具备自主执行能力的设备智能体', href: '/products/device-agent' },
      { name: '数曜·数据开发平台', desc: '支持数据集成、开发与调度', href: '/products/data-development' },
    ],
    blocks: [
      { type: 'heading', level: 2, text: '项目背景' },
      {
        type: 'paragraph',
        text: '客户为连锁零售企业，对 AI 应用有明确诉求但缺乏落地路径：业务场景分散、数据基础薄弱，内部团队难以独立完成从原型到生产的跨越。',
      },
      {
        type: 'paragraph',
        text: '客户选择以 FDE（前沿部署工程师）驻场模式启动合作，由 DeepTrols 工程师深入业务一线共同交付。',
      },
      { type: 'heading', level: 2, text: '交付过程' },
      { type: 'heading', level: 3, text: '场景挖掘与原型验证' },
      {
        type: 'paragraph',
        text: 'FDE 团队驻场梳理门店运营与供应链场景，两周内完成高价值场景优先级评估，并以可交互原型与业务方逐轮验证需求。',
      },
      { type: 'heading', level: 3, text: '生产级交付与能力转移' },
      {
        type: 'paragraph',
        text: '原型验证通过后推进生产级工程化：数据链路接入、模型服务部署、业务系统集成与灰度上线，并同步为客户团队提供运维与迭代培训，实现能力转移。',
      },
      {
        type: 'image',
        src: CONTENT_PLACEHOLDER,
        alt: 'FDE 驻场交付流程示意',
        caption: '从场景挖掘到生产交付的 FDE 驻场流程（占位图）',
      },
      { type: 'heading', level: 2, text: '应用成效' },
      {
        type: 'list',
        ordered: true,
        items: [
          '首批 AI 应用自启动到生产上线仅用数周',
          '业务方全程参与验证，需求偏差在原型阶段即被消除',
          '客户团队具备独立迭代能力，后续场景自主扩展',
        ],
      },
      {
        type: 'quote',
        text: 'FDE 模式的关键不是「替客户做」，而是「带着客户做」——把工程能力留在客户的组织里。',
      },
      { type: 'heading', level: 2, text: '实践价值与展望' },
      {
        type: 'paragraph',
        text: '该项目形成了零售行业 AI 应用交付的标准打法。双方已规划二期合作，将智能补货与门店巡检等场景纳入 FDE 交付管线。',
      },
    ],
  },
  {
    slug: 'datacenter-compute-power',
    title: '数据中心算电协同运营实践',
    categoryKey: 'compute-power',
    heroImage: HERO_PLACEHOLDER,
    relatedProducts: [
      { name: '探曜·AI物联感知平台', desc: '实现设备、数据与智能应用互联', href: '/products/ai-iot' },
      { name: '数曜·数据要素监管平台', desc: '支撑数据要素合规监管', href: '/products/data-element-regulation' },
    ],
    blocks: [
      { type: 'heading', level: 2, text: '项目背景' },
      {
        type: 'paragraph',
        text: '客户运营的区域性数据中心承载了大量 AI 训练与推理任务，算力负载波动剧烈，电费与制冷成本持续攀升，模型调用缺乏统一治理，成本归属不清。',
      },
      {
        type: 'paragraph',
        text: '数据中心需要一套「算力 + 能源 + 模型调用」协同的运营体系，在保障服务质量的同时压降综合成本。',
      },
      { type: 'heading', level: 2, text: '建设内容' },
      { type: 'heading', level: 3, text: '算电协同调度' },
      {
        type: 'paragraph',
        text: '通过探曜 AI 物联感知平台接入 IT 负载、制冷与供配电系统数据，构建算力任务与能源供给的协同调度机制，将可迁移任务安排至电价与碳排更优的时段执行。',
      },
      { type: 'heading', level: 3, text: '模型调用统一治理' },
      {
        type: 'paragraph',
        text: '部署 Token Hub 统一模型调用入口，实现配额控制、成本统计与用量审计，各业务线的模型开销清晰可核算。',
      },
      {
        type: 'image',
        src: CONTENT_PLACEHOLDER,
        alt: '算电协同运营体系示意',
        caption: '算力调度与能源协同的运营体系（占位图）',
      },
      { type: 'heading', level: 2, text: '应用成效' },
      {
        type: 'list',
        items: [
          '算力资源利用率显著提升，闲置时段有效盘活',
          '综合用电成本下降，制冷系统运行策略持续优化',
          '模型调用成本按业务线精确核算，用量治理有据可依',
        ],
      },
      { type: 'heading', level: 2, text: '实践价值与展望' },
      {
        type: 'paragraph',
        text: '项目验证了算电协同在区域数据中心的经济性。下一步将引入绿电交易信号与碳排核算，推动数据中心向「低碳智算」目标持续演进。',
      },
    ],
  },
]

export function getCaseDetailBySlug(slug: string) {
  return caseDetails.find((detail) => detail.slug === slug)
}
