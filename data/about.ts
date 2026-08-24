export interface AboutStatItem {
  value: string
  label: string
}

export interface AboutValueItem {
  title: string
  revealTitle: string
  description: string
}

export interface AboutContactItem {
  label: string
  value: string
  href?: string
}

export const aboutHero = {
  title: '关于深度数智（DEEPTROLS）',
  description: '构建企业级AI能力体系，让智能成为业务增长的新引擎',
  visualLabel: 'ABOUTUS_HORE_WEBM',
  backgroundVideo: '/images/about/custom-rad-hero-bg-video.mp4',
}

export const aboutStats: AboutStatItem[] = [
  { value: '500+', label: '全球客户' },
  { value: '30+', label: '覆盖行业' },
  { value: '25+', label: '构建场景' },
]

export const aboutIntroParagraphs = [
  '武汉深度数智科技有限公司（DeepTrols）是一家专注于企业级AI落地与能力构建的技术服务公司，致力于帮助企业将人工智能从“工具能力”转化为“业务生产力”。围绕数据、知识与Agent执行能力，深度数智构建了一体化的AI产品与服务体系，为企业提供从底层数据基础到上层业务应用的全链路支撑。',
  '公司自主研发了数曜数据能力平台、博曜知识管理平台、智曜AI平台以及探曜AI物联能力平台，形成覆盖数据治理、知识工程、智能决策与业务执行的完整产品矩阵。同时，通过“企业FDE”服务体系，深度数智为企业提供从部署接入、场景落地到持续优化的全生命周期支持，确保AI能力能够真正融入业务流程并持续产生价值。',
]

export const aboutValues: AboutValueItem[] = [
  {
    title: '极客',
    revealTitle: '技术驱动',
    description:
      '保持对技术的热爱与探索，用技术寻找更优解。我们相信真正的创新源于对技术的持续钻研，并最终用技术解决真实问题、创造实际价值。',
  },
  {
    title: '执着',
    revealTitle: '不走捷径',
    description:
      '尊重专业、尊重规律，对真正重要的事情保持耐心与坚持。面对复杂问题不回避、不取巧，把困难的事情做对，把值得做的事情持续做好。',
  },
  {
    title: '学习',
    revealTitle: '持续进化',
    description:
      '保持好奇、开放与求知，在快速变化的技术世界中主动学习、持续思考。不断更新认知、验证实践，让个人、产品与组织一起进化。',
  },
]

export const aboutAddress = '湖北省武汉市江汉区泛海国际SOHO-2栋2307'

export const aboutContacts: AboutContactItem[] = [
  { label: '综合咨询', value: 'contact@deeptrols.com', href: 'mailto:contact@deeptrols.com' },
  { label: '产品咨询', value: 'product@deeptrols.com', href: 'mailto:product@deeptrols.com' },
  { label: '技术支持', value: 'support@deeptrols.com', href: 'mailto:support@deeptrols.com' },
  { label: '人才招聘', value: 'hr@deeptrols.com', href: 'mailto:hr@deeptrols.com' },
  { label: '社交媒体', value: 'DeepTrols' },
]
