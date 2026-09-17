<script setup lang="ts">
import type { Component } from 'vue'
import KnowledgeApplicationNode from './KnowledgeApplicationNode.vue'
import KnowledgeCenterNode from './KnowledgeCenterNode.vue'
import KnowledgeProcessingNode from './KnowledgeProcessingNode.vue'
import KnowledgeSourceNode from './KnowledgeSourceNode.vue'

type NodeData =
  | { kind: 'source', label: string, icon: Component, tone: 'violet' | 'blue' | 'emerald' | 'orange' }
  | { kind: 'label', label: string }
  | { kind: 'processing', label: string, steps: Array<{ label: string, icon: Component }> }
  | { kind: 'center', label: string, nodes: string[] }
  | { kind: 'application', label: string, items: Array<{ label: string, icon: Component, colorClass: string }> }

defineProps<{ data: NodeData }>()
</script>

<template>
  <KnowledgeSourceNode v-if="data.kind === 'source'" :data="data" />
  <div v-else-if="data.kind === 'label'" class="pointer-events-none whitespace-pre-line rounded-md border border-dt-line/50 bg-white/80 px-2 py-1 text-center text-[10px] font-medium leading-tight text-dt-text-muted backdrop-blur-sm">
    {{ data.label }}
  </div>
  <KnowledgeProcessingNode v-else-if="data.kind === 'processing'" :data="data" />
  <KnowledgeCenterNode v-else-if="data.kind === 'center'" :data="data" />
  <KnowledgeApplicationNode v-else :data="data" />
</template>
