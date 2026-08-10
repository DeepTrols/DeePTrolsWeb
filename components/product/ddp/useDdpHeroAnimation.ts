import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

// 原组件时序：行显示间隔 300ms，Tab 自动轮播 5000ms
const LINE_REVEAL_INTERVAL_MS = 300
const TAB_SWITCH_INTERVAL_MS = 5000

export type DdpHeroTab = 'sql' | 'flow'

export function useDdpHeroAnimation(lineCount: number) {
  const activeTab = ref<DdpHeroTab>('sql')
  const revealedLines = ref(0)
  let paused = false
  let lineTimer: ReturnType<typeof setTimeout> | null = null
  let switchTimer: ReturnType<typeof setTimeout> | null = null

  function revealLines() {
    if (activeTab.value !== 'sql' || revealedLines.value >= lineCount) return
    lineTimer = setTimeout(() => {
      revealedLines.value += 1
      revealLines()
    }, LINE_REVEAL_INTERVAL_MS)
  }

  function scheduleSwitch() {
    if (switchTimer) clearTimeout(switchTimer)
    switchTimer = setTimeout(() => {
      if (activeTab.value === 'sql') {
        activeTab.value = 'flow'
      } else {
        activeTab.value = 'sql'
        revealedLines.value = 0
        nextTick(() => revealLines())
      }
      scheduleSwitch()
    }, TAB_SWITCH_INTERVAL_MS)
  }

  function switchTab(tab: DdpHeroTab) {
    if (tab === 'sql') {
      revealedLines.value = 0
      nextTick(() => revealLines())
    }
    activeTab.value = tab
    if (switchTimer) clearTimeout(switchTimer)
    if (!paused) scheduleSwitch()
  }

  // 原组件 mouseenter 仅暂停 Tab 轮播，行显示动画继续
  function pause() {
    paused = true
    if (switchTimer) clearTimeout(switchTimer)
  }

  function resume() {
    paused = false
    scheduleSwitch()
  }

  onMounted(() => {
    revealLines()
    scheduleSwitch()
  })

  onBeforeUnmount(() => {
    if (lineTimer) clearTimeout(lineTimer)
    if (switchTimer) clearTimeout(switchTimer)
  })

  return {
    activeTab,
    revealedLines,
    switchTab,
    pause,
    resume,
  }
}
