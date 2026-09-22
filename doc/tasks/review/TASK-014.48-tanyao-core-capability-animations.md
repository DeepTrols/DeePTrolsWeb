# TASK-014.48：探曜·AI物联感知平台核心能力动画
---
* TaskName：探曜核心能力区六组动画（全栈连接/多协议/云边协同/时序数据引擎/规则引擎/深度融合）
* TaskDescription：将探曜·AI物联感知平台页面「核心能力 · 为智能感知而生，每一层都深度融合」交替时间线（AlternatingTimelineSection + tanyaoTimelineItems ×6）的六个图片占位符替换为全栈设备连接、多协议接入、云边协同、时序数据引擎、规则引擎、AI 深度融合六组循环动画。
* TaskCreator：User
* TaskCreationTime：2026-09-21
---

## 基本信息
| 字段 | 内容 |
|---|---|
| 编号 | TASK-014.48 |
| Epic | EPIC-014 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Claude |

## 任务目标
沿用 TASK-014.45~47 确立的能力动画配方（useRuntimeTimeline 循环时间轴 + macOS 窗口红绿灯栏 + 固定高度面板 + 四步 Stepper），在不改变 Section 标题、间距、文案和左右交替布局的前提下呈现探曜六项核心能力。用户指定配方 `$product-capability-animation`（技能文件已不存在，以 TASK-006.7 及 TASK-014.45~47 为事实配方）。

## 前置文档
- `AGENTS.md`
- `doc/tasks/review/TASK-014.45-dlp-core-capability-animations.md`
- `doc/tasks/review/TASK-014.47-dms-intelligent-regulation-animations.md`
- `components/product/device-agent/useRuntimeTimeline.ts`（统一状态机）

## 实现内容
1. 新建 `components/product/tanyao/capability/`：
   - `TanyaoDeviceConnectVisual`（全栈连接）：PLC 控制器/传感器网络/摄像头/第三方 IoT 平台四类设备依次上线（在线计数 0→4/4）+ Stepper 设备发现→协议接入→数据通道→在线管理。
   - `TanyaoProtocolVisual`（多协议）：Modbus/OPC UA/MQTT/BACnet/S7/CoAP 六枚协议 chip 逐个点亮汇入「开放连接器框架」卡 + Stepper 协议识别→解析适配→统一建模→生态扩展。
   - `TanyaoEdgeCloudVisual`（云边协同）：设备现场→探曜 Edge→云端平台三段链路依次激活，端到端时延 220ms→18ms 随边缘接管下降 + Stepper 边缘采集→就地计算→AI 推理→云端协同。
   - `TanyaoTsdbVisual`（时序数据引擎）：写入吞吐 0→126 万点/秒、时序库存储写入条经 `getRuntimeBarWidthClass` 填充，趋势分析/AI 训练数据两卡就绪 + Stepper 实时采集→持久存储→多维分析→模型训练。
   - `TanyaoRuleEngineVisual`（规则引擎）：温度超限→告警联动推送、设备离线→自动派发工单两条规则链依次触发执行 + Stepper 事件监听→条件判断→动作执行→联动编排。
   - `TanyaoAiFusionVisual`（深度融合）：故障预测/能效洞察/异常分析/运维助手四张智能体卡依次上线（智能体计数 0→20+），终态呈现 20+ 智能体与 50+ 感知算法 + Stepper 数据底座→模型接入→场景智能体→落地运行。
   - `TanyaoCapabilityVisual`：index → 六组件分发（DmsCapabilityVisual 同款）。
2. 动画统一 `useRuntimeTimeline(6000)` 循环 + `activeStep`（500ms 起每 1200ms 一步）+ `finished = elapsed >= 5300`；面板固定 `min-h-[280px] lg:min-h-[360px]` + 窗口红绿灯栏，Tailwind-only、Lucide 图标、无 `<style>`/inline style。
3. `TanyaoCapabilitySection` 经 `#visual` 注入分发组件，带 `transparent-visual`；探曜页核心能力区图片占位符全部移除。

### 锁同步
- `required-files.mjs`：新增 capability/ 7 文件。
- `sources.mjs`：新增 `tanyaoCapabilityVisual` + 6 个 visual 源。
- `checks/product-aiiot/tanyao.mjs`：timeline slot 断言 + 分发器断言 + 6 动画内容/窗口栏/无 style 断言（数组循环校验）。
- `tests/visual/product-aiiot/tanyao.contract.ts`：同步（timeline slot + 6 动画组断言）。

## 验收标准
- [x] 六组动画完成并接入原交替时间线布局
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [ ] Build 成功
- [x] 测试通过
- [x] 响应式正常
- [x] 文档已更新
- [x] Harness Engineering 检查通过

## 修改文件
| 文件 | 说明 |
|---|---|
| `components/product/tanyao/capability/TanyaoCapabilityVisual.vue` | 新建：六动画分发器 |
| `components/product/tanyao/capability/TanyaoDeviceConnectVisual.vue` | 新建：全栈设备连接动画 |
| `components/product/tanyao/capability/TanyaoProtocolVisual.vue` | 新建：多协议接入动画 |
| `components/product/tanyao/capability/TanyaoEdgeCloudVisual.vue` | 新建：云边协同动画 |
| `components/product/tanyao/capability/TanyaoTsdbVisual.vue` | 新建：时序数据引擎动画 |
| `components/product/tanyao/capability/TanyaoRuleEngineVisual.vue` | 新建：规则引擎动画 |
| `components/product/tanyao/capability/TanyaoAiFusionVisual.vue` | 新建：AI 深度融合动画 |
| `components/product/tanyao/TanyaoCapabilitySection.vue` | #visual slot 接入分发器 |
| `scripts/harness/{required-files.mjs,sources.mjs,checks/product-aiiot/tanyao.mjs}` | 锁同步 |
| `tests/visual/product-aiiot/tanyao.contract.ts` | 契约同步 |

## Git
| 字段 | 内容 |
|---|---|
| Branch | dev |
| Commit Message | feat(TASK-014.48): add tanyao core capability animations |
| Commit Hash | |

## 完成说明
六组动画接入既有交替时间线布局，均保持固定高度（280/360px）与 SSR 完整首帧（elapsed=0 静态渲染，客户端 rAF 启动循环）；面板顶部统一窗口红绿灯栏。探曜页核心能力区不再渲染图片占位符。

验证结果：
- `pnpm lint`：通过
- `pnpm typecheck`：通过
- `pnpm test`：通过（19 文件 / 137 用例）
- `pnpm harness:engineering`：通过
- SSR 验证：`/products/ai-iot` 200，HTML 含六组动画面板标记（全栈设备接入/多协议原生支持/云边协同计算/时序数据引擎/规则引擎/AI 智能应用落地）与六组红绿灯圆点
- Build 未执行（保护运行中的 dev 实例，与 TASK-014.36~47 一致）
