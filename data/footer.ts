export type FooterLink = {
  label: string
  href: string
  arrow?: boolean
}

export type FooterColumn = {
  title: string
  groups: FooterLink[][]
}

export type FooterSocial = {
  label: string
  href?: string
  path: string
}

export const footerColumns: FooterColumn[] = [
  {
    title: '产品',
    groups: [
      [
        { label: '数曜·数据治理平台', href: '/products/data-governance' },
        { label: '数曜·数据标签平台', href: '/products/data-labeling' },
        { label: '数曜·数据开发平台', href: '/products/data-development' },
        { label: '数曜·数据要素监管平台', href: '/products/data-element-regulation' },
        { label: '博曜·企业级知识管理平台', href: '/products/knowledge-management' },
      ],
      [
        { label: '探曜·AI物联感知平台', href: '/products/ai-iot-perception' },
        { label: 'Device Agent', href: '/products/device-agent' },
      ],
      [
        { label: 'API安全管控平台', href: '/products/api-security-control' },
        { label: 'API安全审计系统', href: '/products/api-security-audit' },
        { label: '业务威胁感知系统', href: '/products/business-threat-sensing' },
      ],
    ],
  },
  {
    title: '使用场景',
    groups: [
      [
        { label: '智能制造', href: '/solutions/manufacturing' },
        { label: '智能环保', href: '/solutions/environment' },
        { label: '智能水利', href: '/solutions/water' },
        { label: '智慧能源', href: '/solutions/energy' },
        { label: '数据治理', href: '/solutions/data-governance' },
        { label: '企业AI应用', href: '/solutions/enterprise-ai' },
        { label: '智慧城市', href: '/solutions/smart-city' },
        { label: '智慧医疗', href: '/solutions/healthcare' },
      ],
    ],
  },
  {
    title: '行业',
    groups: [
      [
        { label: '制造业', href: '/industries/manufacturing' },
        { label: '能源', href: '/industries/energy' },
        { label: '交通运输与物流', href: '/industries/transportation-logistics' },
        { label: '政府/公共事业', href: '/industries/government-public-sector' },
        { label: '教育', href: '/industries/education' },
        { label: '水利/水务', href: '/industries/water' },
        { label: '金融服务', href: '/industries/financial-services' },
        { label: '城市治理', href: '/industries/city-governance' },
        { label: '零售', href: '/industries/retail' },
      ],
    ],
  },
  {
    title: '服务',
    groups: [
      [
        { label: 'Token Hub', href: '/services/token-hub', arrow: true },
        { label: '白皮书&报告', href: '/resources/reports' },
        { label: '产品文档', href: '/docs' },
        { label: '算力与基础设施', href: '/services/infrastructure' },
        { label: '智能体社区', href: '/community/agents', arrow: true },
      ],
    ],
  },
  {
    title: '公司',
    groups: [
      [
        { label: '关于我们', href: '/about' },
        { label: '新闻动态', href: '/news' },
        { label: '合作伙伴', href: '/partners' },
        { label: '加入我们', href: '/careers' },
        { label: '联系我们', href: '/contact' },
        { label: '品牌资源', href: '/brand' },
        { label: '服务案例', href: '/cases' },
        { label: '投资计划', href: '/investment' },
      ],
    ],
  },
]

export const footerSocials: FooterSocial[] = [
  {
    label: 'GitHub',
    href: 'https://github.com',
    path:
      'M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  },
  {
    label: 'X',
    href: 'https://x.com',
    path:
      'M14.234 10.162L22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299l-.929-1.329L3.076 1.56h3.182l5.965 8.532l.929 1.329l7.754 11.09h-3.182z',
  },
  {
    label: '哔哩哔哩',
    href: 'https://www.bilibili.com',
    path:
      'M17.813 4.653h.854q2.266.08 3.773 1.574Q23.946 7.72 24 9.987v7.36q-.054 2.266-1.56 3.773c-1.506 1.507-2.262 1.524-3.773 1.56H5.333q-2.266-.054-3.773-1.56C.053 19.614.036 18.858 0 17.347v-7.36q.054-2.267 1.56-3.76t3.773-1.574h.774l-1.174-1.12a1.23 1.23 0 0 1-.373-.906q0-.534.373-.907l.027-.027q.4-.373.92-.373t.92.373L9.653 4.44q.107.106.187.213h4.267a.8.8 0 0 1 .16-.213l2.853-2.747q.4-.373.92-.373c.347 0 .662.151.929.4s.391.551.391.907q0 .532-.373.906zM5.333 7.24q-1.12.027-1.88.773q-.76.748-.786 1.894v7.52q.026 1.146.786 1.893t1.88.773h13.334q1.12-.026 1.88-.773t.786-1.893v-7.52q-.026-1.147-.786-1.894t-1.88-.773zM8 11.107q.56 0 .933.373q.375.374.4.96v1.173q-.025.586-.4.96q-.373.375-.933.374c-.56-.001-.684-.125-.933-.374q-.375-.373-.4-.96V12.44q0-.56.386-.947q.387-.386.947-.386m8 0q.56 0 .933.373q.375.374.4.96v1.173q-.025.586-.4.96q-.373.375-.933.374c-.56-.001-.684-.125-.933-.374q-.375-.373-.4-.96V12.44q.025-.586.4-.96q.373-.373.933-.373',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com',
    path:
      'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.06 2.06 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065m1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z',
  },
  {
    label: '微信公众号',
    path:
      'M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213c0 .163.13.295.29.295a.33.33 0 0 0 .167-.054l1.903-1.114a.86.86 0 0 1 .717-.098a10.2 10.2 0 0 0 2.837.403c.276 0 .543-.027.811-.05c-.857-2.578.157-4.972 1.932-6.446c1.703-1.415 3.882-1.98 5.853-1.838c-.576-3.583-4.196-6.348-8.596-6.348M5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178a1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18m5.34 2.867c-1.797-.052-3.746.512-5.28 1.786c-1.72 1.428-2.687 3.72-1.78 6.22c.942 2.453 3.666 4.229 6.884 4.229c.826 0 1.622-.12 2.361-.336a.72.72 0 0 1 .598.082l1.584.926a.3.3 0 0 0 .14.047c.134 0 .24-.111.24-.247c0-.06-.023-.12-.038-.177l-.327-1.233a.6.6 0 0 1-.023-.156a.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983a.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983a.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982',
  },
]
