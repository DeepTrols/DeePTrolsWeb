export type NewsCategory = 'company' | 'media' | 'insight'

export interface NewsItem {
  id: number
  title: string
  summary: string
  coverImage: string
  category: NewsCategory
  /** 发布日期（东八区，YYYY-MM-DD）；展示格式由 formatNewsDate / formatNewsDateShort 派生 */
  publishedAt: string
}

export interface NewsCategoryTab {
  key: NewsCategory
  label: string
}

export const newsCategoryTabs: NewsCategoryTab[] = [
  { key: 'company', label: '公司动态' },
  { key: 'media', label: '新闻报道' },
  { key: 'insight', label: '技术洞见' },
]

// 模拟样例：封面统一使用占位图，正式素材待产品提供后整体替换
const COVER_PLACEHOLDER = '/images/common/content-placeholder.svg'

// 列表数据：标题/摘要/日期/分类取自参考站真实内容（共 40 条，按发布日期降序）；封面为占位图（模拟样例）
export const newsItems: NewsItem[] = [
  {
    id: 26,
    title: 'Physical AI如何重塑算力与能源底座？深度智控入选2026 IDC中国AI 50强',
    summary: '深度智控入选2026 IDC中国AI 50强。本文介绍PhyAI物理AI技术路线、能源智能体产品矩阵，以及其在算力中心和先进制造能源基础设施中的应用方向。',
    coverImage: COVER_PLACEHOLDER,
    category: 'media',
    publishedAt: '2026-08-01',
  },
  {
    id: 27,
    title: '算电协同AI平台是什么？深度智控L4级平台与DeepBot 3.0解析',
    summary: '解析深度智控L4级算电协同AI平台与DeepBot 3.0：通过PhyAI连接算力、电力和冷却系统，推动能效分析、智能决策与自主优化。',
    coverImage: COVER_PLACEHOLDER,
    category: 'insight',
    publishedAt: '2026-07-21',
  },
  {
    id: 28,
    title: '液冷AI智控平台如何提升智算中心能效？L4.5级技术与绿色算力实践',
    summary: '面向高密度智算中心，L4.5级液冷AI智控平台以PhyAI实现能效优化、主动热管理、泄漏预警和预测性运维，并推动绿色算力产业协同。',
    coverImage: COVER_PLACEHOLDER,
    category: 'insight',
    publishedAt: '2026-07-20',
  },
  {
    id: 87,
    title: 'WAIC直击：江苏省省长刘小涛一行莅临深度智控展台',
    summary: '7月18日下午，江苏省省长刘小涛、南京市市长李忠军与全球人工智能领域权威专家、香港科技大学校董会主席沈向洋教授一行莅临2026世界人工智能大会（WAIC 2026）深度智控展台参观调研，深入了解深度智控在物理人工智能（Physical AI）领域的技术创新与产业应用成果。深度智控创始人兼CEO李辉陪同介绍。 在展台现场，李辉向刘小涛省长、李忠军市长及沈向洋教',
    coverImage: COVER_PLACEHOLDER,
    category: 'insight',
    publishedAt: '2026-07-18',
  },
  {
    id: 89,
    title: '深度智控 x 旭创科技：AI for AI ，算力狂潮下的能效新解法',
    summary: '当全球热议 AI 浪潮时，旭创正在构筑 AI 的算力底座。 作为全球高速光模块龙头，旭创科技凭借800G、1.6T高速光模块核心产品，深度绑定英伟达、谷歌等全球顶级客户，持续为全球智算中心输送核心硬件，产线全年满负荷运转。',
    coverImage: COVER_PLACEHOLDER,
    category: 'insight',
    publishedAt: '2026-07-01',
  },
  {
    id: 90,
    title: '深度智控受邀出席夏季达沃斯 以物理AI破解全球能源挑战',
    summary: '6月23日至6月25日，世界经济论坛第十七届新领军者年会（2026夏季达沃斯）于大连举行。本届年会以“规模化创新”为主题，来自90多个国家和地区的1700余位商界、政界、学术界领袖以及创新者，将在超50场会议中围绕五个核心议题展开讨论。国务院总理李强出席开幕式并发表主旨讲话，倡导以开放创新携手应对全球发展难题。 作为世界经济论坛（WEF）2026年度Tech',
    coverImage: COVER_PLACEHOLDER,
    category: 'insight',
    publishedAt: '2026-06-25',
  },
  {
    id: 91,
    title: '入选达沃斯技术先锋全球百强、中国十强！深度智控以“物理AI”破解工业与算力能耗难题',
    summary: '近日，世界经济论坛（World Economic Forum，WEF）正式公布 2026 年度技术先锋（Technology Pioneers）榜单。深度智控凭借全球领先的物理AI（Physical AI）能效智控技术成功入选，跻身本年度全球100家获选企业之列，也是本届榜单中AI能效智控领域亚太唯一入选企业。 此次入选，标志着深度智控在人工智能与能源融合创',
    coverImage: COVER_PLACEHOLDER,
    category: 'insight',
    publishedAt: '2026-06-15',
  },
  {
    id: 92,
    title: '深度智控CEO李辉博士当选2025福布斯中国ESG影响力企业人物',
    summary: '近期，福布斯中国正式揭晓2025年度ESG影响力企业人物评选结果。南京深度智控科技有限公司创始人兼CEO李辉凭借在工业能源系统AI智能优化、绿色低碳技术创新及推动全球工业能效转型方面的突出贡献成功入选，成为新能源与碳中和的代表性人物。 本次评选由福布斯中国联合权威机构与行业专家共同发起，以“ESG理念与商业价值深度融合”为核心，从技术创新力、行业引领力、战略',
    coverImage: COVER_PLACEHOLDER,
    category: 'company',
    publishedAt: '2026-06-09',
  },
  {
    id: 93,
    title: '深度智控亮相第九届绿色工厂厂务大会，以物理AI重构智慧厂务运行模式',
    summary: '近期，第九届绿色工厂厂务大会于无锡举行。大会以“绿色厂务赋能绿色工厂节能降碳转型” 为主题，搭建国家级工业绿色升级交流平台，汇聚超 3 万人次行业精英、技术专家与产业代表，共探工业节能降碳、低碳转型的前沿路径与落地实践。 随着“双碳”战略持续推进，绿色厂务转型进入深水区，而物理AI的普及且在工业场景中持续深入，也推动着厂务系统从传统“经验驱动+分散管理”的运',
    coverImage: COVER_PLACEHOLDER,
    category: 'insight',
    publishedAt: '2026-05-26',
  },
  {
    id: 53,
    title: '深度智控 × 晶科越南｜冷站全局节能，年省电费超百万，打造海外光伏智造能效标杆',
    summary: '作为全球光伏龙头，晶科越南电池制造基地是其全球化产能布局的核心枢纽，承担高端光伏电池规模化生产与全球供应重任，直接支撑企业全球交付能力与 “一带一路” 沿线光伏供应链稳定。制冷站作为保障精密生产环境的关键动力系统，长期以 “稳定优先” 为运行原则，一旦能够满足生产需求，往往不会被频繁调整。但这也意味着，系统很容易长期停留在“可用但非最优”的状态。 深度智控以',
    coverImage: COVER_PLACEHOLDER,
    category: 'company',
    publishedAt: '2026-05-13',
  },
  {
    id: 29,
    title: '算电协同与源网荷储如何协同？深度智控综合能源平台解析',
    summary: '深度智控入选中国信通院算电协同技术攻坚单位。本文说明源网荷储综合能源平台的全局寻优、安全管控和智慧运维能力。',
    coverImage: COVER_PLACEHOLDER,
    category: 'company',
    publishedAt: '2026-04-21',
  },
  {
    id: 142,
    title: '物理AI的制造业迷思：从自动化到智能化，谁在为机器划定责任的边界？',
    summary: '当互联网AI在文字与视频的世界里狂奔时，一群深耕制造业数十年的“老兵”却保持着冷静的警惕。在他们看来，物理AI与互联网AI有着本质区别——它必须理解物理规律、承受责任的重量、并在安全与效率之间找到那条不可逾越的边界。 在“物理AI，未来工厂”巅峰对话中，主持人张礼立与四位制造业领域的资深专家——自动化“老兵”罗克韦尔中国区总裁石安、霍尼韦尔大中华区总裁余锋、',
    coverImage: COVER_PLACEHOLDER,
    category: 'insight',
    publishedAt: '2026-04-03',
  },
  {
    id: 76,
    title: '深算领航 共赢未来｜深度智控渠道体系启动会圆满落幕，以DeepBot智能体加速能效产业进入AI时代',
    summary: '3月31日，以“深算领航 共赢未来”为主题的深度智控“30+5”渠道体系启动会在南京圆满落幕。 本次大会汇聚全国核心渠道伙伴、行业专家与生态盟友，围绕“AI+能效”赛道，系统发布了DeepBotV2.0版本、市场推广策略、30+5渠道授牌与全周期激励政策等，标志着深度智控渠道生态建设迈入体系化推进的新阶段，核心产品DeepBot智能体正式开启规模化复制进程。',
    coverImage: COVER_PLACEHOLDER,
    category: 'insight',
    publishedAt: '2026-04-03',
  },
  {
    id: 94,
    title: '深度智控创始人兼CEO李辉博士登榜2025福布斯中国科创人物',
    summary: '3月9日，2025 福布斯中国科创人物评选结果正式发布。深度智控创始人兼 CEO李辉因开创“物理AI（PhyAI）”技术体系，并推动其在全球工业与智算中心能源系统AI优化领域实现规模化落地，成功入选 “领导力人物” 榜单。 同批登榜的还包括：阿里巴巴董事会主席蔡崇信、寒武纪创始人陈天石、沐曦创始人陈维良、字节跳动创始人梁汝波等各领域科创领军者，展现出人工智能',
    coverImage: COVER_PLACEHOLDER,
    category: 'company',
    publishedAt: '2026-03-11',
  },
  {
    id: 95,
    title: '泰国国家级能源龙头PTT泰国石油集团与深度智控达成战略合作，共启东南亚能效低碳新篇章',
    summary: '近日，泰国国家级核心龙头企业——泰国石油集团（Petroleum Authority of Thailand，简称PTT）与深度智控在泰国曼谷正式签署战略合作协议，并同步启动Energy Complex(EnCo)大楼空调AI节能项目。签约当日，PTT集团旗下Energy Complex总裁Mr.Sirasak Chandrema与深度智控COO张雨馨各携双',
    coverImage: COVER_PLACEHOLDER,
    category: 'company',
    publishedAt: '2025-12-25',
  },
  {
    id: 96,
    title: '深度智控再添国家级荣誉，成功揭榜国家智能制造重点项目',
    summary: '近日，工业和信息化部公示了2025年度智能制造系统解决方案“揭榜挂帅”项目名单。深度智控以“面向电子设备行业的高耗能装备能源管控与运维解决方案”成功揭榜，成为能效智控领域唯一入选产品。 “揭榜挂帅”工作由工信部与市场监管总局联合组织开展，面向原材料、高端装备、电子信息等重点行业，聚焦智能工厂建设痛点，发掘培育一批掌握核心技术、深耕细分行业、具有工业基因的专业',
    coverImage: COVER_PLACEHOLDER,
    category: 'company',
    publishedAt: '2025-12-24',
  },
  {
    id: 97,
    title: '赛道唯一！深度智控荣膺首届全国独角兽企业大赛总决赛最高荣誉奖项',
    summary: '近期，由工业和信息化部火炬高技术产业开发中心、中国电子学会、宁波高新技术产业开发区管理委员会共同主办的2025全国首届独角兽企业大赛总决赛闭幕式在浙江省宁波市成功举办。深度智控斩获大赛最高荣誉“总决赛优胜奖”！ 作为聚焦科创与产业融合的国家级赛事，大赛覆盖新一代信息技术、高端装备、新能源汽车、绿色环保等14大战略领域，吸引全国超1500家优质企业角逐。经多轮',
    coverImage: COVER_PLACEHOLDER,
    category: 'company',
    publishedAt: '2025-12-22',
  },
  {
    id: 98,
    title: '亮相世界智能制造博览会  深度智控以物理AI重塑能源效率未来',
    summary: '近期，2025世界智能制造博览会在南京国际博览中心圆满落幕。作为物理AI能效领域的技术先行者，深度智控携全球首个L4级能效智能体DeepBot及全场景解决方案亮相，以沉浸式产品展示与深度技术解析，向全球智能制造企业、行业专家与生态伙伴展示其在绿色低碳与能源智能化方面的最新突破。 全球能源价格波动、气候治理需求上升以及企业自身对效率与成本的双重要求，绿色制造已',
    coverImage: COVER_PLACEHOLDER,
    category: 'insight',
    publishedAt: '2025-12-08',
  },
  {
    id: 147,
    title: '以AI能效激活渠道生态，共赴“十五五”绿色发展新征程',
    summary: '在全国多地成功举办“卡位AI时代新机遇·建设渠道体系新生态”AI节能技术沙龙暨渠道招商大会之后，深度智控正式开启全国渠道布局的“高速增长纪元”。 如今，“30+5渠道启动会”密集落地长春、南京、苏州、深圳、济南等城市，为全球首个L4级能效智控智能体——DeepBot的全国规模化推广注入强劲势能。',
    coverImage: COVER_PLACEHOLDER,
    category: 'insight',
    publishedAt: '2025-12-03',
  },
  {
    id: 143,
    title: '从“制冷”到“智冷”，L4级能效智能体亮相CDCC峰会',
    summary: '11月20-21日，由CDCC主办的“2025数据中心标准峰会”在北京国家会议中心成功举办。作为数据中心行业的年度高端会议，大会集聚数据中心全行业技术专家，直面AIDC的变化与未来发展。 在“智算未来：AI驱动的创新实践”分论坛上，深度智控CEO李辉博士发表题为《新一代基于“PhyAI”的数据中心L4/5级能效智能体》的演讲，直面AIDC规模爆发背后的高能耗',
    coverImage: COVER_PLACEHOLDER,
    category: 'company',
    publishedAt: '2025-11-25',
  },
  {
    id: 99,
    title: '深度智控荣膺国家专精特新“小巨人”称号 夯实AI时代能效变革领军者地位',
    summary: '10月20日，江苏省工业和信息化厅公示第七批专精特新“小巨人”企业名单，深度智控凭借在AI能效领域的技术领先和成熟的商业落地能力成功入选。 “小巨人”企业是国家支持的中小企业群体中创新能力最强、专注细分领域、掌握核心技术、市场占有率高的“排头兵”，代表着行业高质量发展的中坚力量。此次入选，是继2023年获评“江苏省专精特新中小企业”后的快速突破，意味着深度智',
    coverImage: COVER_PLACEHOLDER,
    category: 'insight',
    publishedAt: '2025-10-27',
  },
  {
    id: 144,
    title: '新政相继出台，企业的绿色机会在哪？',
    summary: '9月24日，在联合气候变化峰会上，国家主席习近平宣布了中国新的气候目标：到2035年，中国全经济范围温室气体净排放量比峰值下降7%-10%，非化石能源消费占比超过30%……为绿色低碳转型划定了清晰目标。 推动绿色低碳转型，离不开创新驱动与制度保障的双轮发力。近期，《国务院关于深入实施“人工智能+”行动的意见》正式发布，为人工智能与各产业深度融合擘画了顶层框架',
    coverImage: COVER_PLACEHOLDER,
    category: 'company',
    publishedAt: '2025-10-15',
  },
  {
    id: 77,
    title: '研创面孔 | 深度智控：为工业节能开辟智慧新路径',
    summary: '深度智控研创面孔专访：聚焦PhyAI能效智控、DeepSYS与DeepBot在工业节能中的应用，并介绍宁德新能源等项目实践及团队服务经验。',
    coverImage: COVER_PLACEHOLDER,
    category: 'company',
    publishedAt: '2025-09-25',
  },
  {
    id: 100,
    title: '深度智控李辉受邀出席世界青年科学家论坛，与世界顶尖科学家共话未来',
    summary: '9月19日，江苏省委书记信长星在南京会见出席世界青年科学家论坛（南京）的中外科学家代表。南京深度智控科技有限公司董事长李辉作为全场唯一科技企业代表受邀参加，与多位诺贝尔奖获得者、国内外知名院士专家及青年科学家代表一道出席会见。 在会见中，信长星书记代表省委、省政府对各位科学家的到来表示欢迎。他指出，青年科技人才是创新活力之源，也是推动新质生产力发展的关键力量',
    coverImage: COVER_PLACEHOLDER,
    category: 'media',
    publishedAt: '2025-09-23',
  },
  {
    id: 78,
    title: '零碳转型难？深度智控在FCE2025上给出标准答案',
    summary: '9月15至17日，2025中国工厂大会暨展览（FCE2025）在杭州盛大开幕。本次盛会以“智汇绿色科技 擎动工业零碳”为主题，旨在全面推进绿色制造体系建设，发挥工厂在工业绿色低碳转型中的关键示范作用，加速先进绿色低碳技术与装备的规模化应用。 作为AI能效智控产品与解决方案提供商，深度智控携自主研发的PhyAI技术产品体系及覆盖先进制造、数据中心、公共事业等多',
    coverImage: COVER_PLACEHOLDER,
    category: 'company',
    publishedAt: '2025-09-18',
  },
  {
    id: 160,
    title: '【邀请函】PhyAI+节能，深度智控邀您参加2025工厂展',
    summary: '深度智控将于2025年9月15日至17日亮相杭州国际工厂绿色低碳建设大会，展示PhyAI、DeepBox与DeepBot节能方案及制造业、数据中心应用案例。',
    coverImage: COVER_PLACEHOLDER,
    category: 'insight',
    publishedAt: '2025-09-12',
  },
  {
    id: 101,
    title: '赴港亮相「未来城市绿色科技」Demo Day，深度智控向世界输出绿色“智”理',
    summary: '9月11日，由绿色未来创新生态网络（Green Future）联合香港房地产业科技协会（HKPTA）与香港贸易发展局（HKTDC）共同主办的「未来城市绿色科技」专场Demo Day于香港“一带一路周”期间成功举办。 本次Demo Day以“一带一路沿线创新投资趋势、绿色科技出海”为主题，旨在打造面向粤港沪三地的绿色科技转化与场景对接平台，吸引了沿线国家和地区',
    coverImage: COVER_PLACEHOLDER,
    category: 'company',
    publishedAt: '2025-09-12',
  },
  {
    id: 102,
    title: '节约232万美元/年！深度智控亮相机博会分享机场节能实践',
    summary: '2025年9月8日至10日，2025国际机场博览会暨第十届中国机场服务大会在广州举办。本届大会以“创新枢纽，全球机遇”为主题，汇聚了来自全球70多个国家和地区的170余家机场、190余家民航企业及2000多位行业领袖与专家，共同探讨民航领域的最新技术与发展趋势。 作为智慧能源管理领域的代表企业，深度智控受邀参展，并展示了由创始人李辉博士牵头，在美国达拉斯国际',
    coverImage: COVER_PLACEHOLDER,
    category: 'company',
    publishedAt: '2025-09-10',
  },
  {
    id: 103,
    title: '落子华南，共建共赢！深度智控深圳AI节能技术沙龙暨渠道招商会圆满举办',
    summary: '在全球碳中和目标与能源结构转型的加速推进中，人工智能与能源管理的深度融合正成为工业节能领域的新引擎。近日，深度智控在深圳成功举办“卡位AI时代新机遇 建设渠道体系新生态”AI节能技术沙龙暨渠道招商会。本次会议是深度智控在华南地区的首场渠道招商活动，聚焦PhyAI技术与DeepBot能效智能体规模化商业落地。活动定向邀约多家华南地区头部综合能源服务商参与。现场',
    coverImage: COVER_PLACEHOLDER,
    category: 'insight',
    publishedAt: '2025-09-08',
  },
  {
    id: 104,
    title: '汇聚“30+5”渠道体系力量，共建共赢新生态——深度智控与香港怡和集团合作洽谈活动圆满举办',
    summary: '8月22日，以“拉通渠道资源、互成生态伙伴”为主题的渠道生态伙伴见面洽谈会在深度智控成功举行。香港怡和集团（JEC）应邀走进深度智控，双方围绕资源共享与生态共建展开深度对话；英格索兰、鑫磊、威乐、南峰等多家生态伙伴企业共同参会，实现跨品牌、跨领域、多维度的生态链接，携手开启渠道协同新篇章。 此次活动打破了传统渠道合作的沟通壁垒，为优质资源的高效整合搭建桥梁，',
    coverImage: COVER_PLACEHOLDER,
    category: 'company',
    publishedAt: '2025-08-26',
  },
  {
    id: 79,
    title: '深度智控举办AI节能技术沙龙暨渠道招商会，共筑低碳未来',
    summary: '在全球碳中和目标与能源结构转型的双重推动下，“数字智能革命”与“绿色能源革命”正于AI经济时代交汇。工业与建筑领域的能效提升，已成为企业降本增效、实现可持续发展的关键路径。人工智能与能源管理的深度融合，不断突破传统能效管控瓶颈，推动节能行业迈入“数智化精准调控”新阶段。在这一进程中，渠道伙伴作为连接前沿技术与多元应用场景的桥梁，其战略地位与日俱增。 AI节能',
    coverImage: COVER_PLACEHOLDER,
    category: 'insight',
    publishedAt: '2025-08-22',
  },
  {
    id: 105,
    title: '深度智控 × 玉晶光电：共创光电行业中央空调数智化新标杆',
    summary: '在光电制造领域，恒温恒湿的生产环境是保障产品精度的核心，中央空调系统作为能耗关键环节，其效能升级始终是行业焦点。玉晶光电（厦门）有限公司集美分公司（简称 “玉晶光电”）作为大型光电企业，深知前沿制造与绿色发展的协同价值，主动寻求中央空调系统数智化突破。 玉晶光电着眼更高能效目标，携手深度智控新一代基于 “PhyAI” 的深度能效引擎，将孤立设备的机械运行升级',
    coverImage: COVER_PLACEHOLDER,
    category: 'company',
    publishedAt: '2025-08-06',
  },
  {
    id: 106,
    title: '深度智控DeepBot智能体渠道招商开启｜卡位AI能效黄金赛道，共享百亿级市场红利',
    summary: '工业与商业建筑用电占据全社会总能耗的75-78%，能效提升已成为企业绿色转型的“必答题”。 在国家“双碳”战略加速推进下，能效管理软件作为核心抓手，正迎来爆发式增长——预计2027年重点行业普及率将突破60%，市场规模超800亿元，年复合增长率高达28%。 聚焦这百亿级蓝海市场，深度智控凭借新一代基于“PhyAI”的深度能效引擎，诚邀全国有志于能效智控与工业',
    coverImage: COVER_PLACEHOLDER,
    category: 'insight',
    publishedAt: '2025-07-24',
  },
  {
    id: 148,
    title: '深度智控出席工达科技“智汇多能·零碳未来”交流会暨生态伙伴答谢晚宴，并达成战略合作',
    summary: '2025年7月18日，“智汇多能·零碳未来”交流会暨工达科技生态伙伴答谢晚宴在济南百花汀国际酒店隆重举行。本次活动由济南工达捷能科技发展有限公司主办、西门子（中国）有限公司协办，汇聚了300余位来自政府机构、科研院所、央企国企及产业链龙头企业的代表，围绕双碳目标下的技术创新与产业协同展开建设性对话。 作为大会特邀的标杆企业，深度智控与工达科技正式达成战略合作',
    coverImage: COVER_PLACEHOLDER,
    category: 'company',
    publishedAt: '2025-07-22',
  },
  {
    id: 140,
    title: '深度智控荣登创业邦2025全球化百强榜单，以“PhyAI”引擎重塑全球能效产业格局',
    summary: '7月4日，以“创新融通 无限可能”为主题的2025 DEMO WORLD企业开放式创新创投大会在上海松江圆满闭幕。会上，重磅发布了《创业邦2025中国企业全球化新势力100强》榜单，旨在揭晓那些引领行业、闪耀全球的先锋企业。 本次榜单分为「引领型」和「成长型」两个组别。其中，「引领型」企业有40家，2024年在海外市场已实现不低于1000万美金的营收；「成长',
    coverImage: COVER_PLACEHOLDER,
    category: 'insight',
    publishedAt: '2025-07-07',
  },
  {
    id: 166,
    title: '深度智控COO张雨馨荣登2025《财富》中国最具影响力的商界女性（未来榜）',
    summary: '7月2日，《财富》（中文版）发布了2025年中国最具影响力的商界女性榜单（MostPowerfulWomen，简称MPW），深度智控COO张雨馨荣登未来榜。 《财富》中国最具影响力的商界女性榜单始于2010年，旨在认可中国商界日益崛起的女性力量，荟聚了中国各行业最杰出的女性及新崛起的女性领导者。候选人包括了跨行业企业家、职业经理人、行业领军人物等。',
    coverImage: COVER_PLACEHOLDER,
    category: 'company',
    publishedAt: '2025-07-03',
  },
  {
    id: 107,
    title: '深度智控双项登顶国家强基榜｜领跑AI节能赛道，从中国强基迈向全球基准',
    summary: '在全球数字经济加速演进的关键节点，南京深度智控科技有限公司迎来高光时刻——在工业和信息化部"算力强基揭榜行动"评选中，公司凭借"AI驱动的算力中心节能调优平台"与"新一代智能制冷系统"两大突破性技术，成为全国范围内极少数实现"双项揭榜"的科技企业，强力输出AI时代绿色算力的范式答案。 作为中国算力基础设施建设领域的"奥林匹克"，"算力强基揭榜行动"代表着国家',
    coverImage: COVER_PLACEHOLDER,
    category: 'insight',
    publishedAt: '2025-07-03',
  },
  {
    id: 108,
    title: '双项突围！深度智控荣登工信部算力强基国家榜，全省唯一！',
    summary: '近日，工业和信息化部正式公布“算力强基揭榜行动”入围名单，南京深度智控科技有限公司凭借行业领先的“算力中心节能调优平台” 和 “新型制冷系统” 两大核心技术产品成功登榜，成为江苏省19家入围单位中少数双项揭榜的企业！ 国家级竞技场，全省力量强势领跑',
    coverImage: COVER_PLACEHOLDER,
    category: 'company',
    publishedAt: '2025-06-20',
  },
  {
    id: 109,
    title: '深度智控×歌尔（Goertek）：打造越南制造业“零碳”跃迁新标杆',
    summary: '歌尔股份有限公司成立于2001年，是全球布局的科技创新型企业，主要从事声学、光学、微电子、精密结构件等精密零组件，虚拟/增强现实、智能耳机、智能穿戴、智能家居等智能硬件，以及高端装备等产品的研发、制造与销售，是国家重点高新技术企业、国家技术创新示范企业、制造业单项冠军示范企业。凭借“智能制造+低碳发展”双轮驱动，歌尔在中国、越南等地布局生产基地，其中越南工厂',
    coverImage: COVER_PLACEHOLDER,
    category: 'company',
    publishedAt: '2025-06-19',
  },
  {
    id: 80,
    title: '深度智控——用AI重构能效极限，做绿色革命的“破局者”',
    summary: '（以下内容转载自《中国工业报社》） 在AI技术驱动的革命浪潮中，深度智控凭借“PhyAI”的前沿技术，正成为工业能效智控领域的引领者与破局者。2025年GFC2025第八届绿色工厂厂务大会期间，深度智控主办的“AI时代的能效变革”沙龙暨2025深度智控产品发布会上，清华大学、国家级绿色工厂示范单位、能源技术领军企业等200余位代表，共商AI时代的“双碳”转型',
    coverImage: COVER_PLACEHOLDER,
    category: 'insight',
    publishedAt: '2025-06-16',
  },
]

/** 列表/头条展示日期：YYYY/MM/DD（与参考站 mc-row__date、mc-hero__date 一致） */
export function formatNewsDate(publishedAt: string) {
  return publishedAt.replaceAll('-', '/')
}

/** 详情页发布时间与相关卡片日期：YYYY-M-D 不补零（与参考站 ma-time、ma-relcard__date 一致） */
export function formatNewsDateShort(publishedAt: string) {
  const [year, month, day] = publishedAt.split('-')
  return `${year}-${Number(month)}-${Number(day)}`
}

/** 按分类取新闻列表（日期降序；newsItems 本身已按日期降序排列） */
export function getNewsByCategory(category: NewsCategory): NewsItem[] {
  return newsItems.filter((item) => item.category === category)
}

export function getNewsCategoryLabel(category: NewsCategory) {
  return newsCategoryTabs.find((tab) => tab.key === category)?.label ?? '新闻动态'
}
