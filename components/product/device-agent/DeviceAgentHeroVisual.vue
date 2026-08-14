<script setup lang="ts">
import { ArrowUp } from '@lucide/vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { deviceAgentScenes } from '~/data/device-agent'

const TYPING_INTERVAL_MS = 45
const ADVANCE_DELAY_MS = 3200

const activeIndex = ref(0)
const typedText = ref('')

let typingTimer: ReturnType<typeof setInterval> | undefined
let advanceTimer: ReturnType<typeof setTimeout> | undefined

function clearTimers() {
  if (typingTimer !== undefined) {
    clearInterval(typingTimer)
    typingTimer = undefined
  }
  if (advanceTimer !== undefined) {
    clearTimeout(advanceTimer)
    advanceTimer = undefined
  }
}

function startTyping(index: number) {
  clearTimers()
  activeIndex.value = index
  typedText.value = ''
  const prompt = deviceAgentScenes[index]!.prompt
  let position = 0
  typingTimer = setInterval(() => {
    position += 1
    typedText.value = prompt.slice(0, position)
    if (position >= prompt.length) {
      clearTimers()
      advanceTimer = setTimeout(() => {
        startTyping((index + 1) % deviceAgentScenes.length)
      }, ADVANCE_DELAY_MS)
    }
  }, TYPING_INTERVAL_MS)
}

function selectScene(index: number) {
  startTyping(index)
}

function onPromptInput(event: Event) {
  clearTimers()
  typedText.value = (event.target as HTMLTextAreaElement).value
}

onMounted(() => {
  startTyping(0)
})

onBeforeUnmount(() => {
  clearTimers()
})
</script>

<template>
  <div class="relative mt-10 w-full max-w-[860px]">
    <div
      class="pointer-events-none absolute -inset-x-12 -bottom-4 -top-8 -z-0 rounded-[3rem] bg-primary/8 blur-3xl lg:-inset-x-24"
      aria-hidden="true"
    ></div>
    <div class="relative">
      <div class="relative w-full">
        <div
          class="relative overflow-hidden rounded-2xl border border-primary/20 bg-elevated shadow-lg transition-shadow"
        >
          <div class="relative min-h-[140px] px-5 pt-5 pb-3">
            <div
              aria-hidden="true"
              class="pointer-events-none absolute inset-x-5 top-5 text-left text-base leading-relaxed text-muted sm:text-lg"
            >
              {{ typedText }}<span
                class="ml-[2px] inline-block h-[1em] w-[1.5px] animate-pulse bg-primary align-baseline"
              ></span>
            </div>
            <textarea
              aria-label="Agent 编排器"
              rows="3"
              placeholder=""
              class="relative w-full resize-none bg-transparent text-base leading-relaxed text-highlighted outline-none sm:text-lg"
              @input="onPromptInput"
            ></textarea>
          </div>
          <div
            class="flex items-center justify-between gap-3 border-t border-primary/15 bg-dt-bg-soft/30 px-3 py-2.5"
          >
            <div class="flex flex-wrap items-center gap-1.5">
              <button
                v-for="(scene, index) in deviceAgentScenes"
                :key="scene.label"
                type="button"
                :aria-pressed="index === activeIndex ? 'true' : 'false'"
                :class="[
                  'inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors',
                  index === activeIndex
                    ? 'border-primary/30 bg-primary/10 text-primary'
                    : 'border-default bg-dt-bg/70 text-muted hover:bg-dt-bg-soft/50 hover:text-highlighted',
                ]"
                @click="selectScene(index)"
              >
                <component :is="scene.icon" class="size-3.5" aria-hidden="true" />
                <span class="hidden sm:inline">{{ scene.label }}</span>
              </button>
            </div>
            <button
              type="button"
              aria-label="发送"
              disabled
              class="flex size-8 shrink-0 cursor-default items-center justify-center rounded-lg bg-muted text-muted transition-colors"
            >
              <ArrowUp class="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
