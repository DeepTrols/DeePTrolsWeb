<script setup lang="ts">
import { Handle, MarkerType, Position, VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import { platformInputs, platformOutputs } from '~/data/home'

const inputNodes: Node[] = platformInputs.map((item, index) => ({
  id: `input-${item.label}`,
  type: 'inputNode',
  position: { x: 0, y: index * 82 },
  data: item,
  draggable: false,
  selectable: false,
}))

const outputNodes: Node[] = platformOutputs.map((item, index) => ({
  id: `output-${index}`,
  type: 'outputNode',
  position: { x: 650, y: index * 150 + 6 },
  data: item,
  draggable: false,
  selectable: false,
}))

const nodes: Node[] = [
  ...inputNodes,
  {
    id: 'deeptrols-os',
    type: 'coreNode',
    position: { x: 250, y: 122 },
    data: {
      title: 'DeepTrolsOS',
      capabilities: ['连接', '理解', '执行', '治理'],
    },
    draggable: false,
    selectable: false,
  },
  ...outputNodes,
]

const inputEdges: Edge[] = inputNodes.map((node) => ({
  id: `${node.id}-to-os`,
  source: node.id,
  target: 'deeptrols-os',
  animated: true,
  style: { stroke: '#5e4eff', strokeWidth: 1.4 },
  markerEnd: { type: MarkerType.ArrowClosed, color: '#5e4eff' },
}))

const outputEdges: Edge[] = outputNodes.map((node) => ({
  id: `os-to-${node.id}`,
  source: 'deeptrols-os',
  target: node.id,
  animated: true,
  style: { stroke: '#569aff', strokeWidth: 1.4 },
  markerEnd: { type: MarkerType.ArrowClosed, color: '#569aff' },
}))

const edges = [...inputEdges, ...outputEdges]
const proOptions = { hideAttribution: true }
</script>

<template>
  <VueFlow
    class="enterprise-flow"
    :nodes="nodes"
    :edges="edges"
    :nodes-draggable="false"
    :nodes-connectable="false"
    :elements-selectable="false"
    :zoom-on-scroll="false"
    :zoom-on-pinch="false"
    :pan-on-drag="false"
    :prevent-scrolling="false"
    :pro-options="proOptions"
    fit-view-on-init
  >
    <template #node-inputNode="{ data }">
      <div class="flow-node flow-node--input">
        <component :is="data.icon" :size="19" aria-hidden="true" />
        <span>{{ data.label }}</span>
        <Handle type="source" :position="Position.Right" />
      </div>
    </template>

    <template #node-coreNode="{ data }">
      <div class="flow-node flow-node--core">
        <Handle type="target" :position="Position.Left" />
        <strong>{{ data.title }}</strong>
        <div>
          <span v-for="capability in data.capabilities" :key="capability">{{ capability }}</span>
        </div>
        <Handle type="source" :position="Position.Right" />
      </div>
    </template>

    <template #node-outputNode="{ data }">
      <div class="flow-node flow-node--output">
        <Handle type="target" :position="Position.Left" />
        <h3>{{ data.title }}</h3>
        <ul>
          <li v-for="row in data.rows" :key="row.name">
            <component :is="row.icon" :size="17" aria-hidden="true" />
            <span>{{ row.name }}</span>
            <small>{{ row.value }}</small>
          </li>
        </ul>
      </div>
    </template>
  </VueFlow>
</template>

<style scoped lang="scss">
.enterprise-flow {
  position: relative;
  z-index: 1;
  height: 100%;
  background: transparent;
  overflow: hidden;
}

:deep(.vue-flow__handle) {
  width: 8px;
  height: 8px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: var(--dt-color-primary);
}

:deep(.vue-flow__node) {
  cursor: default;
}

.flow-node {
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: var(--dt-radius-sm);
  background: rgba(10, 18, 28, 0.9);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.18);
  color: var(--dt-color-text);
}

.flow-node--input {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 142px;
  min-height: 52px;
  padding: 0 14px;

  svg {
    color: var(--dt-color-secondary);
  }

  span {
    font-size: 14px;
    font-weight: 680;
  }
}

.flow-node--core {
  display: grid;
  place-items: center;
  width: 270px;
  min-height: 120px;
  border-color: rgba(166, 133, 255, 0.42);
  background:
    radial-gradient(circle at 50% 10%, rgba(94, 78, 255, 0.22), transparent 9rem),
    rgba(16, 17, 37, 0.94);
  padding: 22px;
  text-align: center;

  strong {
    font-size: 28px;
    font-weight: 760;
  }

  div {
    display: flex;
    gap: 12px;
    margin-top: 16px;
    color: var(--dt-color-text-muted);
    font-size: 13px;
  }
}

.flow-node--output {
  width: 310px;
  min-height: 126px;
  padding: 18px;

  h3 {
    margin: 0 0 12px;
    font-size: 17px;
    font-weight: 720;
  }

  ul {
    display: grid;
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: grid;
    grid-template-columns: 18px minmax(0, 1fr) auto;
    align-items: center;
    gap: 8px;
    font-size: 12px;

    svg {
      color: var(--dt-color-secondary);
    }

    span {
      color: #ffffff;
      font-weight: 650;
    }

    small {
      color: var(--dt-color-text-muted);
      white-space: nowrap;
    }
  }
}
</style>
