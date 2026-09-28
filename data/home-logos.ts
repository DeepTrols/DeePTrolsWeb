// 首页「关于我们」横向滚动 Logo 墙静态回退数据（015.14 从 data/home.ts 抽出）：
// 独立成文件是因为 server 路由要 import 它做 API 层回退，
// 而 data/home.ts 顶层有资源 URL 导入（Vite query 后缀），Nitro 服务端构建无法解析。
// 条目两种形态：image（图片 Logo）或 text（纯文本 Logo）；DB 协议只收 image 条目，
// text 条目仅存在于本静态回退中（见 server/utils/showcase-admin.ts skippedTextEntries 语义）。
export interface CustomerLogo {
  name: string
  image?: string
  text?: string
}

export const customerLogos: CustomerLogo[] = [
  { name: '武汉大数据', image: '/images/logos/wh-bigdata.png' },
  { name: '一汽丰田', image: '/images/logos/faw-toyota.png' },
  { name: '同仁堂健康', image: '/images/logos/tongrentang.png' },
  { name: '广药白云山', text: 'GYBYS' },
  { name: '岚图汽车', text: 'VOYAH' },
  { name: '赛睿', text: 'SteelSeries' },
  { name: '伟创力', text: 'Flex' },
  { name: '北京航空航天大学', image: '/images/logos/beihang.png' },
  { name: '中国地质大学', text: 'CUG' },
]
