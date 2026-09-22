# TASK-014.50 核心能力动画面板统一 BaseCard hover 阴影

## 目标

用户要求所有产品核心能力动画面板：边框统一 `border-muted`，hover 阴影与 BaseCard（dt-card）一致，去掉面板背后的背景光晕。

## 范围（27 个面板）

- DGP 企业级数据治理 ×3（`dgp/evolution/`，lg:min-h-[340px]）
- DLP 核心能力 ×5 + AI 辅助建标 DlpAiModelingVisual（320/460）
- DDP ×4、DMS ×5、探曜 ×6、博曜 ×3（均 280/360）

## 变更

面板根类统一为：

```
flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)] lg:min-h-[360px]
```

- `border-dt-line` → `border-muted`
- 阴影上下左右四边均匀（0 偏移环绕式）：静态 `0 0 16px rgba(15,23,42,0.08)` 柔和灰影；hover `0 0 28px rgba(30,68,224,0.22)` 蓝色光晕（取 dt-card hover 同色 rgba(30,68,224)，透明度 0.24→0.22 并改 0 偏移以覆盖四边，不改全局 token 避免影响所有 dt-card）
- 中途曾按 hero 视觉加 `rounded-[48px]` primary 渐变光晕层，用户反馈为背景色干扰，已全部移除（hero 自身光晕保留）

## 门禁同步

- harness：dgp/dlp/ddp/dms/tanyao.mjs 每个视觉断言含 hover 阴影整串类
- 契约：dgp/dlp/ddp/dms/tanyao/boyao 循环断言 + dlp aiModelingVisual 单独断言同步为同一整串

## 验证

- lint / typecheck / test(137) / test:visual(55) / harness:engineering 全绿
- SSR：6 个产品页 200；面板无 `rounded-[48px]` 残留；`hover:shadow-(--dt-shadow-primary)` 命中数 = 各页面板数（3/6/4/5/6/3）
- 生成的 tailwind.css 含 `.hover\:shadow-\(--dt-shadow-primary\):hover { --tw-shadow: var(--dt-shadow-primary) }`
