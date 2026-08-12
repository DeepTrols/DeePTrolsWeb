<script setup lang="ts">
import { ArrowUp } from '@lucide/vue'
import { computed } from 'vue'
import type { Component } from 'vue'

export interface AgentComposerScenario {
  label: string
  prompt: string
  icon?: Component
}

export interface AgentComposerSubmitPayload {
  prompt: string
  scenario: string | null
}

const props = withDefaults(
  defineProps<{
    scenarios?: AgentComposerScenario[]
    scenario?: string | null
    prompt?: string
    placeholder?: string
    label?: string
    sendLabel?: string
    rows?: number
  }>(),
  {
    scenarios: () => [],
    scenario: null,
    prompt: '',
    placeholder: '',
    label: 'Agent 编排器',
    sendLabel: '发送',
    rows: 3,
  },
)

const emit = defineEmits<{
  'update:prompt': [value: string]
  'update:scenario': [value: string | null]
  submit: [payload: AgentComposerSubmitPayload]
}>()

const activeScenario = computed(() => props.scenarios.find((item) => item.label === props.scenario) ?? null)

const ghostText = computed(() => activeScenario.value?.prompt ?? props.placeholder)

const canSubmit = computed(() => props.prompt.trim().length > 0)

function selectScenario(label: string) {
  emit('update:scenario', props.scenario === label ? null : label)
}

function handleInput(event: Event) {
  emit('update:prompt', (event.target as HTMLTextAreaElement).value)
}

function handleSubmit() {
  if (!canSubmit.value) {
    return
  }
  emit('submit', { prompt: props.prompt, scenario: props.scenario })
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
    event.preventDefault()
    handleSubmit()
  }
}
</script>

<template>
  <div class="relative">
    <div class="relative w-full">
      <div
        class="relative overflow-hidden rounded-2xl border border-primary/20 bg-elevated shadow-lg transition-shadow focus-within:border-primary/40"
      >
        <div class="relative min-h-[140px] px-5 pb-3 pt-5">
          <div
            v-if="!prompt && ghostText"
            class="pointer-events-none absolute inset-x-5 top-5 text-left text-base leading-relaxed text-muted sm:text-lg"
            aria-hidden="true"
          >
            {{ ghostText }}
            <span class="ml-[2px] inline-block h-[1em] w-[1.5px] animate-pulse bg-primary align-baseline"></span>
          </div>
          <textarea
            class="relative w-full resize-none bg-transparent text-base leading-relaxed text-highlighted outline-none sm:text-lg"
            :rows="rows"
            :value="prompt"
            :aria-label="label"
            @input="handleInput"
            @keydown="handleKeydown"
          ></textarea>
        </div>
        <div class="flex items-center justify-between gap-3 border-t border-primary/15 bg-dt-bg-soft/30 px-3 py-2.5">
          <div class="flex flex-wrap items-center gap-2">
            <button
              v-for="item in scenarios"
              :key="item.label"
              type="button"
              :aria-pressed="scenario === item.label"
              :class="[
                'inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors',
                scenario === item.label
                  ? 'border-primary/30 bg-primary/10 text-primary'
                  : 'border-default bg-dt-bg/70 text-muted hover:bg-dt-bg-soft/50 hover:text-highlighted',
              ]"
              @click="selectScenario(item.label)"
            >
              <component :is="item.icon" v-if="item.icon" class="size-3.5" aria-hidden="true" />
              <span class="hidden sm:inline">{{ item.label }}</span>
            </button>
          </div>
          <button
            type="button"
            :disabled="!canSubmit"
            :aria-label="sendLabel"
            :class="[
              'flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors',
              canSubmit ? 'cursor-pointer bg-primary/10 text-primary' : 'cursor-default bg-muted text-muted',
            ]"
            @click="handleSubmit"
          >
            <ArrowUp class="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
