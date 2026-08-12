<script setup lang="ts">
import { Database, Sparkles } from '@lucide/vue'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { dgpGovernanceScenes } from '~/data/dgp'

interface HeroVisualToken {
  text: string
  tone?: 'primary' | 'muted'
}

const toneClasses: Record<string, string> = {
  primary: 'text-primary',
  muted: 'text-muted',
}

const COMMAND_CHAR_DELAY = 26
const LOG_CHAR_DELAY = 14
const AFTER_COMMAND_PAUSE = 520
const BETWEEN_LINES_PAUSE = 340
const SCENE_HOLD = 2600
const NEXT_SCENE_DELAY = 620

function tokenizeCommand(command: string): HeroVisualToken[] {
  const parts = command.split(' ')
  return parts.map((part, index) => ({
    text: index < parts.length - 1 ? `${part} ` : part,
    tone: index === 1 ? 'primary' : part.startsWith('--') ? 'muted' : undefined,
  }))
}

function tokenizeLog(log: string): HeroVisualToken[] {
  const [marker, ...rest] = log.split(' ')
  return [
    { text: `${marker} `, tone: 'primary' },
    { text: rest.join(' ') },
  ]
}

const sceneModels = dgpGovernanceScenes.map((scene) => ({
  ...scene,
  lines: [
    { plain: scene.command, tokens: tokenizeCommand(scene.command) },
    ...scene.logs.map((log) => ({ plain: log, tokens: tokenizeLog(log) })),
  ],
}))

function buildTerminalSizer(): string {
  const lineSets = sceneModels.map((scene) => scene.lines.map((line) => line.plain))
  const lineCount = Math.max(...lineSets.map((lines) => lines.length))
  const lines: string[] = []
  for (let index = 0; index < lineCount; index += 1) {
    let longest = ''
    for (const set of lineSets) {
      const candidate = set[index] ?? ''
      if (candidate.length > longest.length) {
        longest = candidate
      }
    }
    lines.push(longest)
  }
  return lines.join('\n')
}

const terminalSizer = buildTerminalSizer()

const sceneIndex = ref(0)
const lineIndex = ref(0)
const charCount = ref(0)

const activeScene = computed(() => sceneModels[sceneIndex.value])

function sliceTokens(tokens: HeroVisualToken[], budget: number): HeroVisualToken[] {
  let remaining = budget
  const sliced: HeroVisualToken[] = []
  for (const token of tokens) {
    if (remaining <= 0) {
      break
    }
    if (token.text.length <= remaining) {
      sliced.push(token)
      remaining -= token.text.length
      continue
    }
    sliced.push({ ...token, text: token.text.slice(0, remaining) })
    remaining = 0
  }
  return sliced
}

const visibleLines = computed(() => {
  const scene = sceneModels[sceneIndex.value]
  if (!scene) {
    return []
  }
  const visible: HeroVisualToken[][] = []
  for (let index = 0; index < scene.lines.length; index += 1) {
    const line = scene.lines[index]
    if (!line) {
      continue
    }
    if (index < lineIndex.value) {
      visible.push(line.tokens)
      continue
    }
    if (index === lineIndex.value) {
      visible.push(sliceTokens(line.tokens, charCount.value))
    }
  }
  return visible
})

let timer: ReturnType<typeof setTimeout> | undefined
let disposed = false

function tick() {
  if (disposed) {
    return
  }
  const scene = sceneModels[sceneIndex.value]
  const line = scene?.lines[lineIndex.value]
  if (!scene || !line) {
    return
  }

  if (charCount.value < line.plain.length) {
    charCount.value += 1
    timer = setTimeout(tick, lineIndex.value === 0 ? COMMAND_CHAR_DELAY : LOG_CHAR_DELAY)
    return
  }

  if (lineIndex.value === 0) {
    timer = setTimeout(() => {
      lineIndex.value = 1
      charCount.value = 0
      tick()
    }, AFTER_COMMAND_PAUSE)
    return
  }

  if (lineIndex.value < scene.lines.length - 1) {
    timer = setTimeout(() => {
      lineIndex.value += 1
      charCount.value = 0
      tick()
    }, BETWEEN_LINES_PAUSE)
    return
  }

  timer = setTimeout(() => {
    sceneIndex.value = (sceneIndex.value + 1) % sceneModels.length
    lineIndex.value = 0
    charCount.value = 0
    timer = setTimeout(tick, NEXT_SCENE_DELAY)
  }, SCENE_HOLD)
}

onMounted(() => {
  timer = setTimeout(tick, 700)
})

onBeforeUnmount(() => {
  disposed = true
  if (timer) {
    clearTimeout(timer)
  }
})
</script>

<template>
  <div
    class="relative w-full overflow-hidden rounded-2xl border border-default bg-dt-bg-soft/35 p-6 shadow-sm backdrop-blur-xl transition-colors duration-300 hover:border-primary/30 lg:p-7"
  >
    <div class="relative">
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 text-[13px] font-semibold text-highlighted">
            <Database class="size-4 text-muted" aria-hidden="true" />
            数曜·数据治理平台
          </div>
          <div class="flex items-center gap-2">
            <span
              class="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-[13px] font-semibold uppercase tracking-wide text-primary"
            >
              <Sparkles class="size-3.5" aria-hidden="true" />
              Intelligent
            </span>
            <span
              class="rounded-full border border-default bg-default px-3 py-1 text-[13px] font-semibold uppercase tracking-wide text-muted"
            >
              Governed Data
            </span>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div class="rounded-2xl border border-default bg-default p-4">
            <div class="space-y-3">
              <div
                v-for="(scene, index) in sceneModels"
                :key="scene.code"
                class="flex items-center gap-3 rounded-xl border px-3 py-2.5 transition"
                :class="
                  index === sceneIndex
                    ? 'border-primary/45 bg-primary/12 text-highlighted'
                    : 'border-default bg-dt-bg-soft/30 text-muted'
                "
              >
                <div
                  class="flex size-9 items-center justify-center rounded-xl"
                  :class="index === sceneIndex ? 'bg-primary/20 text-primary' : 'bg-dt-bg-soft/40 text-muted'"
                >
                  <component :is="scene.icon" class="size-4" aria-hidden="true" />
                </div>
                <div class="flex-1">
                  <div class="text-[13px] font-semibold text-highlighted">{{ scene.name }}</div>
                  <div class="text-[13px] text-muted">{{ scene.count }}</div>
                </div>
                <span
                  class="size-2.5 rounded-full bg-emerald-400/90 transition-opacity"
                  :class="index === sceneIndex ? 'opacity-100' : 'opacity-0'"
                ></span>
              </div>
            </div>

            <div v-if="activeScene" class="mt-4 rounded-xl border border-default bg-dt-bg-soft/30 px-3 py-2.5">
              <div class="relative grid font-mono text-[13px] font-medium">
                <div
                  v-for="scene in sceneModels"
                  :key="scene.code"
                  class="invisible col-start-1 row-start-1"
                  aria-hidden="true"
                >
                  {{ scene.code }}
                </div>
                <div class="col-start-1 row-start-1 text-primary">{{ activeScene.code }}</div>
              </div>
              <div class="relative mt-1 grid text-[12px]">
                <div
                  v-for="scene in sceneModels"
                  :key="scene.code"
                  class="invisible col-start-1 row-start-1"
                  aria-hidden="true"
                >
                  {{ scene.description }}
                </div>
                <div class="col-start-1 row-start-1 text-default">{{ activeScene.description }}</div>
              </div>
            </div>
          </div>

          <div class="overflow-hidden rounded-2xl border border-default bg-default">
            <div class="flex items-center gap-2 border-b border-default px-4 py-2.5">
              <span class="size-2.5 rounded-full bg-rose-400/80"></span>
              <span class="size-2.5 rounded-full bg-amber-400/80"></span>
              <span class="size-2.5 rounded-full bg-emerald-400/80"></span>
              <span class="ml-2 text-[10px] font-semibold uppercase tracking-wide text-muted">Client</span>
            </div>
            <div class="relative px-4 py-4 font-mono">
              <div
                class="invisible text-[13px] font-medium leading-relaxed whitespace-pre-wrap break-words"
                aria-hidden="true"
              >
                {{ terminalSizer }}
              </div>
              <div
                class="absolute inset-0 px-4 py-4 text-[13px] font-medium leading-relaxed whitespace-pre-wrap break-words text-highlighted"
              >
                <div v-for="(tokens, lineOffset) in visibleLines" :key="lineOffset">
                  <span
                    v-for="(token, tokenOffset) in tokens"
                    :key="tokenOffset"
                    :class="token.tone ? toneClasses[token.tone] : undefined"
                  >{{ token.text }}</span>
                  <span class="ml-0.5 inline-block h-3 w-[2px] bg-muted align-middle motion-safe:animate-pulse"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
