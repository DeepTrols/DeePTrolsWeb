# TASK-014.28 FlowMQ How It Works Demo

## Status
Done

## Scope
- Build a standalone demo route for the FlowMQ how-it-works Vue Flow section.
- Keep the original FlowMQ node positions, labels, edge paths, and visual hierarchy from the supplied DOM.
- Apply the current platform architecture card radius, border, and shadow treatment to all cards.
- Do not mount the demo into production pages.

## Files
- `pages/demo/flowmq-how-it-works.vue`
- `components/demo/FlowMqHowItWorksDemo.client.vue`
- `components/demo/flowmq/FlowMqHowItWorksFlow.client.vue`
- `components/demo/flowmq/FlowMqHowItWorksNode.vue`
- `components/demo/flowmq/FlowMqHowItWorksEdge.vue`

## Verification
- `pnpm typecheck`
- `pnpm lint`
- `pnpm test`
- `pnpm test:visual`
- `pnpm harness:engineering`
- `pnpm build`
