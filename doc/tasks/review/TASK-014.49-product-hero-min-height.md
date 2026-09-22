# TASK-014.49 产品页 Hero 统一 min-height 655px

## 目标

将产品页面中除 Device Agent 页以外的其他产品页的 PageHero 高度统一为 `min-height: 655px`。

## 变更

- 6 个产品 Hero 组件的 `<PageHero>` 增加首个属性 `class="min-h-[655px]"`（PageHero 单根 `<section>`，class 透传生效）：
  - `components/product/dgp/DgpHero.vue`
  - `components/product/dlp/DlpHero.vue`
  - `components/product/ddp/DdpHero.vue`
  - `components/product/dms/DmsHero.vue`
  - `components/product/tanyao/TanyaoHero.vue`
  - `components/product/boyao/BoyaoHero.vue`
- `DeviceAgentHero`（align="center"）按要求不改。
- 方案/关于/报告等复用 PageHero 的非产品页面不受影响。

## 门禁同步

- harness：`dgp.mjs` / `dlp.mjs` / `ddp.mjs` / `dms.mjs` / `tanyao.mjs` hero 断言增加 `class="min-h-[655px]"`；`device-agent-base.mjs` 增加负向断言 `!deviceAgentHero.includes('min-h-[655px]')`。
- 契约：`dgp/dlp/ddp/dms.contract.ts`、`tanyao.contract.ts`、`boyao.contract.ts` 增加正向断言；`device-agent-base.contract.ts` 增加负向断言。

## 验证

- `pnpm lint && pnpm typecheck && pnpm test && pnpm harness:engineering` 全绿。
- SSR 冒烟：7 个产品页全部 200；`page-hero relative overflow-hidden min-h-[655px]` 在 data-governance / data-labeling / data-development / data-element-regulation / ai-iot / knowledge-base 各命中 1 次，device-agent 命中 0 次（符合预期）。
- 注：验证期间 `/products/data-governance` 曾短暂 500，为 typecheck 重建 `.nuxt` 触发 dev 重启的瞬态，重启后恢复 200。
