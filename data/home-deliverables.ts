/**
 * 首页交付成果纯字符串数据（015.20b）：无 ?url 资源、无组件引用，
 * server（组件描述符 default/seed）与客户端共享；data/home.ts 解析图标后 re-export。
 * 注意：HomeDeliverables 的轮播 CSS 只支持 3 屏（[data-active-slide="0|1|2"]），
 * 服务端 zod 对 items 硬限 .min(3).max(3)。
 */

export interface DeliverableData {
  title: string
  description: string
  icon: string
  image: string
  href: string
}

export const deliverablesData: DeliverableData[] = [
  {
    title: '企业级 AI 应用构建与业务智能化服务',
    description:
      '通过连接企业数据、知识、模型与业务系统，围绕企业真实业务场景，提供从需求梳理、场景规划、智能体设计到应用开发、系统集成和持续运营的全流程服务。',
    icon: 'BrainCircuit',
    image: '/images/home/solutions/industrial.K00G2HaS.webp',
    href: '/services/enterprise-ai-delivery',
  },
  {
    title: '企业级 AI 平台工程与数字化系统建设服务',
    description:
      '面向企业 AI 应用规模化建设需求，提供统一技术架构、平台研发、系统集成、数据工程、知识工程、模型服务和智能体工程等平台工程服务。',
    icon: 'Waypoints',
    image: '/images/home/solutions/data.DHKY-NE1.webp',
    href: '/services/platform-engineering',
  },
  {
    title: 'AI 算力、模型与基础资源一体化服务',
    description:
      '围绕企业 AI 应用所需的算力、模型、数据和开发资源，提供 AI 服务器、算力中心规划建设、异构算力调度、模型接入管理、Token 管理及资源运营服务。',
    icon: 'Cpu',
    image: '/images/home/solutions/data-center-ai.CDu93Miw.webp',
    href: '/services/infrastructure',
  },
]
