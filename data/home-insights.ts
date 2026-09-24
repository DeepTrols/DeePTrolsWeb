// 首页「创新、洞察与新闻」静态回退数据（015.12 从 data/home.ts 抽出）：
// 独立成文件是因为 server 路由要 import 它做 API 层回退，
// 而 data/home.ts 顶层有 ?url 资源导入，Nitro 服务端构建无法解析。
export interface InsightItem {
  category: string
  title: string
  summary: string
  image: string
  href: string
}

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
