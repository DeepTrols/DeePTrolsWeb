import {
  BookOpen,
  Bot,
  Boxes,
  Brain,
  Briefcase,
  CalendarClock,
  ChartNoAxesCombined,
  Compass,
  Cpu,
  Database,
  GraduationCap,
  LayoutGrid,
  Microscope,
  Network,
  Presentation,
  Route,
  School,
  ShieldCheck,
  Unlink,
  UserPlus,
  Users,
  Workflow,
  Wrench,
  Zap,
} from '@lucide/vue'
import type { Component } from 'vue'
import type { ProductFeatureGridItem } from '~/components/common/ProductFeatureGridSection.vue'

export const educationHero = {
  title: '智慧教育解决方案',
  description:
    '基于智曜·智能引擎，统一接入大模型、知识、工具与校园业务系统，构建面向教育场景的 AI 智能体与智能工作流，为教学、学习、教务和校园服务提供可持续扩展的智能能力，推动教育从数字化应用走向 AI 原生。',
  image: '/images/solutions/education-hero.png',
  imageAlt: '智慧教育解决方案',
}

export const educationPains: ProductFeatureGridItem[] = [
  {
    title: 'AI 应用分散，模型能力难以统一管理',
    description:
      '不同教学与管理应用分别接入不同大模型，模型调用、权限、Token 和服务接口缺乏统一管理，随着 AI 应用增加，技术复杂度与运营成本持续上升。',
    icon: Boxes,
  },
  {
    title: 'AI 停留在问答，难以完成实际任务',
    description:
      '大量教育 AI 仍停留在问答、摘要和内容生成阶段，无法进一步调用教务、课程、办公等系统执行任务，AI 与真实业务流程之间存在明显断点。',
    icon: Bot,
  },
  {
    title: '系统相互独立，AI 缺乏业务上下文',
    description:
      '教务、教学、学工、科研和校园服务系统长期独立建设，AI 难以统一调用系统能力、获取业务上下文并完成跨系统任务。',
    icon: Unlink,
  },
  {
    title: '智能体快速增长，缺乏统一治理体系',
    description:
      '不同部门和应用独立建设智能体，缺乏统一的开发、发布、权限、安全和运行管理机制，难以形成学校级可持续扩展的 AI 能力体系。',
    icon: ShieldCheck,
  },
]

export interface EducationCapabilityCard {
  title: string
  points: string[]
  description: string
}

export const educationCapabilities: EducationCapabilityCard[] = [
  {
    title: '教育大模型网关',
    points: ['多模型统一接入', '智能模型路由', 'Token 用量精细管理'],
    description:
      '统一接入商业大模型、开源模型及学校私有化模型，为不同教育应用提供标准模型服务接口，根据任务、性能与成本动态选择模型，实现调用、权限和 Token 的统一管理。',
  },
  {
    title: '教育智能体开发',
    points: ['Agent 快速构建', 'Skills / Tools 灵活装配', '智能体统一发布'],
    description:
      '通过标准化 Agent Runtime 快速构建教师、学生、教务、科研及校园服务智能体，将模型、知识、工具和业务能力按需组合，大幅降低教育智能体开发门槛。',
  },
  {
    title: '教育智能工作流',
    points: ['复杂任务自动拆解', '多智能体协同执行', '业务流程自动编排'],
    description:
      '将自然语言任务转化为可执行工作流，通过智能体自主规划、工具调用和多 Agent 协作，完成从信息获取、分析判断到业务执行的复杂教育任务。',
  },
  {
    title: '校园 MCP 服务',
    points: ['校园系统能力封装', '业务工具统一调用', 'AI 与系统实时连接'],
    description:
      '将教务、教学、学工、科研、OA 等校园系统能力封装为标准 MCP 与 Tools，让智能体能够安全获取业务数据并调用系统能力，实现 AI 与校园业务流程真正连接。',
  },
]

export interface EducationValue {
  title: string
  subtitle: string
  description: string
  tags: string[]
  icon: Component
}

export const educationValues: EducationValue[] = [
  {
    title: '统一模型',
    subtitle: '一套入口连接多种 AI 能力',
    description:
      '统一管理不同厂商、不同类型的大模型与多模态模型，为全校 AI 应用提供标准化模型服务，减少重复接入与基础能力建设。',
    tags: ['多模型接入', '智能路由', 'Token Hub'],
    icon: Boxes,
  },
  {
    title: 'Agent 原生',
    subtitle: '每个教育场景都可以拥有智能体',
    description:
      '面向教师、学生、教务、科研及校园服务快速构建专属智能体，让不同角色获得真正理解其任务和业务环境的 AI 助手。',
    tags: ['Agent Runtime', 'Skills', 'Memory'],
    icon: Bot,
  },
  {
    title: '自动执行',
    subtitle: '从回答问题到完成任务',
    description:
      '智能体根据用户目标自主拆解任务、调用工具并执行工作流，让 AI 从传统 Copilot 进一步走向能够处理实际教育业务的 Agent。',
    tags: ['任务规划', '工具调用', 'Workflow'],
    icon: Workflow,
  },
  {
    title: '开放连接',
    subtitle: '让校园系统成为 AI 的能力工具',
    description:
      '通过 MCP 和标准工具接口连接学校已有业务系统，无需推翻原有信息化体系，即可逐步将教务、教学和校园服务能力开放给智能体调用。',
    tags: ['MCP', 'Tools', 'API'],
    icon: Network,
  },
]

export interface EducationFlowStepCubeColors {
  shadow: string
  top: string
  tint: string
  icon: string
  left: string
  front: string
}

export interface EducationFlowStep {
  badge: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  icon: Component
  cubeColors: EducationFlowStepCubeColors
}

// 1:1 reproduction of the EMQX Edge step cubes: literal class strings so Tailwind can scan them.
export const educationFlowSteps: EducationFlowStep[] = [
  {
    badge: '01',
    title: '理解',
    subtitle: '理解用户目标与业务上下文',
    description:
      '结合用户身份、对话上下文、课程知识与校园业务数据，准确理解教师、学生和管理人员的真实任务，而不仅仅是识别一条 Prompt。',
    tags: ['Context', 'Memory', 'Knowledge'],
    icon: Brain,
    cubeColors: {
      shadow: 'border-violet-500',
      top: 'border-violet-500/45',
      tint: 'bg-violet-500/12',
      icon: 'text-violet-500',
      left: 'border-violet-500/65',
      front: 'border-violet-500',
    },
  },
  {
    badge: '02',
    title: '规划',
    subtitle: '将复杂目标拆解为可执行任务',
    description:
      '通过 Agent Runtime 对任务进行自主规划，根据目标动态选择模型、知识、Skills 与 Tools，并组织单 Agent 或多 Agent 协同完成复杂流程。',
    tags: ['Planning', 'Workflow', 'Multi-Agent'],
    icon: Route,
    cubeColors: {
      shadow: 'border-fuchsia-500',
      top: 'border-fuchsia-500/45',
      tint: 'bg-fuchsia-500/12',
      icon: 'text-fuchsia-500',
      left: 'border-fuchsia-500/65',
      front: 'border-fuchsia-500',
    },
  },
  {
    badge: '03',
    title: '执行',
    subtitle: '调用工具与业务系统完成任务',
    description:
      '通过 MCP、Tools 与 API 连接教务、教学、学工、科研及校园服务系统，执行查询、分析、生成、提交等操作，并将结果持续反馈至业务流程。',
    tags: ['MCP', 'Tools', 'Action'],
    icon: Zap,
    cubeColors: {
      shadow: 'border-blue-500',
      top: 'border-blue-500/45',
      tint: 'bg-blue-500/12',
      icon: 'text-blue-500',
      left: 'border-blue-500/65',
      front: 'border-blue-500',
    },
  },
]

export interface EducationDiagramEntry {
  name: string
  label: string
  icon: Component
}

export interface EducationDiagramBlock {
  title: string
  label: string
  icon: Component
}

export interface EducationDiagramFoundation {
  label: string
  icon: Component
}

// 右侧架构图：EMQX Edge 760×500 绝对定位画布的教育内容映射。
export const educationDiagram = {
  entries: [
    { name: 'Teacher', label: '教师工作台', icon: Presentation },
    { name: 'Student', label: '学生学习空间', icon: GraduationCap },
    { name: 'Campus Apps', label: '校园应用', icon: LayoutGrid },
  ] as EducationDiagramEntry[],
  leftTop: { title: '多模型统一接入', label: '大模型 / 多模态 / 私有模型', icon: Boxes },
  leftBottom: { title: '知识与上下文', label: '知识库 / 记忆 / 业务上下文', icon: BookOpen },
  rightTop: { title: '校园系统连接', label: '教务 / 教学 / 学工 / 科研', icon: Network },
  rightBottom: { title: '智能工具调用', label: '查询 / 分析 / 生成 / 执行', icon: Wrench },
  center: {
    name: '智曜·AgentOS',
    caption: '理解 · 规划 · 执行',
  },
  foundations: [
    { label: '模型与算力', icon: Cpu },
    { label: '知识与数据', icon: Database },
    { label: '校园业务系统', icon: School },
  ] as EducationDiagramFoundation[],
}

export const educationAgents: ProductFeatureGridItem[] = [
  {
    title: 'AI 教师助手',
    subtitle: '让 AI 成为教师的智能教学伙伴',
    description:
      '提供智能备课、教案生成、课件辅助、试题生成、作业分析、教学总结与课程资料查询，减少重复性教学工作，辅助教师完成教学全过程。',
    tags: ['智能备课', '试题生成', '作业分析'],
    icon: Presentation,
  },
  {
    title: 'AI 学习助手',
    subtitle: '为学生提供个性化学习支持',
    description:
      '围绕课程学习提供知识讲解、课程答疑、学习计划、错题分析和内容推荐，根据学习过程持续提供针对性的学习辅助。',
    tags: ['课程答疑', '错题分析', '学习推荐'],
    icon: Brain,
  },
  {
    title: 'AI 教务助手',
    subtitle: '让复杂教务工作更高效',
    description:
      '连接教务与教学系统，辅助完成排课、课程查询、教学通知、数据统计、材料审核和信息汇总等任务，降低日常教务处理成本。',
    tags: ['智能排课', '材料审核', '教务查询'],
    icon: CalendarClock,
  },
  {
    title: 'AI 科研助手',
    subtitle: '贯穿科研全过程的智能辅助',
    description:
      '面向科研人员提供文献检索、资料整理、研究综述、论文辅助、科研数据分析及项目材料编制，加速科研信息获取与知识整理。',
    tags: ['文献检索', '研究分析', '材料编制'],
    icon: Microscope,
  },
  {
    title: 'AI 校园助手',
    subtitle: '构建统一校园智能服务入口',
    description:
      '连接学校制度、办事流程及校园服务系统，为师生提供政策咨询、事项查询、办事指引和服务办理，实现校园服务统一智能入口。',
    tags: ['政策咨询', '办事指引', '校园服务'],
    icon: Compass,
  },
  {
    title: 'AI 辅导员助手',
    subtitle: '辅助学生管理与日常服务',
    description:
      '面向辅导员日常工作，辅助完成通知发布、信息收集、学生事务查询、材料整理、工作总结及常见问题答复，提高学生事务处理效率。',
    tags: ['学生事务', '信息汇总', '通知管理'],
    icon: Users,
  },
  {
    title: 'AI 数据分析助手',
    subtitle: '让教育数据直接服务管理决策',
    description:
      '通过自然语言调用教学、教务和管理数据，完成指标查询、数据分析、趋势研判与报告生成，让管理人员无需复杂操作即可获取业务洞察。',
    tags: ['数据问答', '智能分析', '报告生成'],
    icon: ChartNoAxesCombined,
  },
  {
    title: 'AI 招生助手',
    subtitle: '覆盖招生咨询与服务全过程',
    description:
      '围绕招生政策、专业设置、培养方案、录取规则和校园信息，为考生及家长提供智能咨询，并辅助学校完成高频问题响应与招生信息服务。',
    tags: ['招生咨询', '专业问答', '政策解读'],
    icon: UserPlus,
  },
  {
    title: 'AI 行政办公助手',
    subtitle: '让校园行政工作智能协同',
    description:
      '连接学校 OA、制度知识与办公工具，辅助完成公文起草、会议纪要、材料汇总、制度查询、任务跟踪及日常办公事务处理。',
    tags: ['公文辅助', '会议纪要', '行政协同'],
    icon: Briefcase,
  },
]

export interface EducationCaseStat {
  value: string
  label: string
}

export interface EducationCase {
  title: string
  description: string
  stats: EducationCaseStat[]
  reversed?: boolean
}

export const educationCases: EducationCase[] = [
  {
    title: '某高校教育智能体平台',
    description:
      '围绕学校 AI 能力统一建设需求，基于智曜构建校级智能体运行平台，统一接入大模型、校园知识与业务工具，为不同院系快速构建教师、学生和管理类智能体，避免各部门重复建设 AI 基础能力。',
    stats: [
      { value: '20+', label: '教育智能体上线' },
      { value: '10+', label: '校园系统连接' },
      { value: '50%', label: '智能应用开发效率提升' },
    ],
  },
  {
    title: '某职业院校 AI 教学助手',
    description:
      '围绕教师备课、课程建设与学生答疑场景，将课程资源、专业知识与大模型能力接入智曜，通过 Agent Runtime 构建专业课程智能体，为教师提供教案、试题和教学内容辅助，为学生提供课程问答与学习支持。',
    stats: [
      { value: '200+', label: '专业课程接入' },
      { value: '10,000+', label: '师生用户覆盖' },
      { value: '40%', label: '教学辅助效率提升' },
    ],
    reversed: true,
  },
  {
    title: '某教育集团 AI 校园服务平台',
    description:
      '面向集团多校区统一 AI 服务需求，通过智曜连接校园知识、业务系统和第三方服务，构建统一 AI 校园入口。智能体能够根据师生需求调用不同系统和工具，提供咨询、查询、材料处理及校园事项服务。',
    stats: [
      { value: '10+', label: '校区统一覆盖' },
      { value: '30+', label: '业务工具接入' },
      { value: '60%', label: '重复咨询量降低' },
    ],
  },
]
