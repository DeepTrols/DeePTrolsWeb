import {
  Activity,
  Cable,
  Unlink,
  Workflow,
} from '@lucide/vue'
import type { ProductFeatureGridItem } from '~/components/common/ProductFeatureGridSection.vue'

export const energySavingHero = {
  title: '智慧储能解决方案',
  description:
    '融合探曜·AI 物联感知与数曜·数据治理能力，实现储能设备统一接入、实时采集、边缘协同与多源异构数据治理。构建贯通设备、数据与业务的储能数字化底座，支撑运行监测、能效分析、故障预警、健康评估与充放电策略智能优化。',
  image: '/images/solutions/energy-saving-hero.png',
  imageAlt: '智慧储能解决方案',
}

export const energySavingPains: ProductFeatureGridItem[] = [
  {
    title: '设备接入复杂，储能运行状态难以统一感知',
    description:
      'PCS、BMS、EMS、电表、消防、温控及环境传感器等设备品牌、型号和通信协议多样，数据分散在不同设备与控制系统中，缺乏统一接入、实时采集与运行状态监测能力。',
    icon: Cable,
  },
  {
    title: '系统数据割裂，储能数据难以形成统一资产',
    description:
      '设备监控、能源管理、运维及业务系统相互独立，数据标准、设备编码和数据模型不统一，SOC、SOH、功率、告警及充放电等数据难以有效关联、治理和复用。',
    icon: Unlink,
  },
  {
    title: '运行状态复杂，异常与风险难以及时发现',
    description:
      '储能系统运行数据规模大、变化快，电芯、模组、电池簇及 PCS 状态相互关联，传统人工监控难以及时识别性能衰减、运行异常和潜在故障风险。',
    icon: Activity,
  },
  {
    title: '策略相对固定，储能价值难以充分释放',
    description:
      '充放电策略往往依赖固定规则，难以结合实时负荷、电价、设备状态及历史运行数据动态调整，导致峰谷套利、需量控制、能效优化和设备寿命之间难以实现协同最优。',
    icon: Workflow,
  },
]

export interface EnergySavingCapabilityCard {
  title: string
  points: string[]
  description: string
}

export const energySavingCapabilities: EnergySavingCapabilityCard[] = [
  {
    title: '储能设备接入管理',
    points: ['PCS / BMS / EMS 统一接入', 'Modbus / IEC 104 等协议解析', '设备状态实时采集'],
    description:
      '统一接入 PCS、BMS、EMS、电表、温控、消防及环境传感器，完成设备建模、协议解析、数据采集与运行状态监测，为上层储能应用提供实时设备数据。',
  },
  {
    title: '储能运行数据治理',
    points: ['储能数据模型标准化', '运行指标统一管理', '数据质量自动校验'],
    description:
      '对功率、电量、SOC、SOH、电压、电流、温度、告警等运行数据进行清洗、映射与标准化，统一设备编码、指标口径和数据模型，形成可信储能数据底座。',
  },
  {
    title: '电池健康状态评估',
    points: ['SOC / SOH 状态评估', '电芯一致性分析', '性能衰减趋势识别'],
    description:
      '基于电芯、模组、电池簇历史与实时运行数据，对容量、内阻、温差、压差及循环特征进行分析，识别电池性能衰减和异常趋势，为主动运维与寿命管理提供依据。',
  },
  {
    title: '充放电策略优化',
    points: ['峰谷电价策略计算', '负荷与需量动态分析', '充放电计划智能优化'],
    description:
      '综合电价、负荷预测、SOC、安全边界及设备运行效率等约束，动态优化充放电计划，在保障系统安全和电池寿命的基础上，提高储能利用效率与运营收益。',
  },
]

export interface EnergySavingValue {
  title: string
  description: string
}

export const energySavingValues: EnergySavingValue[] = [
  {
    title: '新能源高效消纳',
    description:
      '通过储能灵活调节充放电功率，平抑光伏、风电等新能源出力波动，提升新能源就地消纳能力与能源利用效率。',
  },
  {
    title: '削峰填谷与需量管理',
    description:
      '结合负荷曲线、峰谷电价与储能运行状态，优化充放电时段与功率策略，降低用能成本和最大需量，提升储能运营收益。',
  },
  {
    title: '源网荷储协同',
    description:
      '连接电源、电网、负荷与储能运行数据，支撑多能源单元协同调度与动态响应，让储能成为新型能源系统中的柔性调节节点。',
  },
]

export interface EnergySavingCaseStat {
  value: string
  label: string
}

export interface EnergySavingCase {
  title: string
  description: string
  stats: EnergySavingCaseStat[]
  reversed?: boolean
}

export const energySavingCases: EnergySavingCase[] = [
  {
    title: '某大型工业园区储能项目',
    description:
      '围绕园区储能系统建设统一设备接入与能源数据管理体系，贯通 PCS、BMS、EMS、电表及负荷侧数据，实现储能运行状态实时监测、能效分析与异常预警。结合峰谷电价、负荷曲线及设备状态优化充放电策略，提升储能利用效率与园区能源精细化运营能力。',
    stats: [
      { value: '50+', label: '储能设备接入' },
      { value: '99.9%', label: '关键运行数据采集可用率' },
      { value: '15%', label: '储能综合利用效率提升' },
    ],
  },
  {
    title: '某区域台区储能示范项目',
    description:
      '面向区域内多个配电台区，统一接入储能柜、PCS、BMS、电表及配电侧设备，实时采集功率、SOC、SOH、电压、电流、温度及告警数据。结合台区负荷变化进行储能运行分析与策略优化，支撑削峰填谷、台区重过载治理及供电能力提升。',
    stats: [
      { value: '30+', label: '台区储能单元接入' },
      { value: '100,000+', label: '运行数据点采集' },
      { value: '20%', label: '峰值负荷降低' },
    ],
    reversed: true,
  },
  {
    title: '某新能源企业分布式储能项目',
    description:
      '统一汇聚光伏、储能、负荷及计量数据，构建分布式能源统一数据底座，对储能系统运行效率、电池健康状态及新能源出力进行持续分析。通过储能灵活调节与源荷协同，提升新能源消纳能力，并为后续需求响应与源网荷储协同提供数据支撑。',
    stats: [
      { value: '100+', label: '能源设备统一接入' },
      { value: '10MW+', label: '储能容量集中管理' },
      { value: '25%', label: '新能源消纳能力提升' },
    ],
  },
]
