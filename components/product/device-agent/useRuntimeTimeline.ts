import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Skill 匹配进度条宽度类表（0%-100%，1% 粒度）：必须以字面量形式出现，Tailwind 才会编译。
 */
export const RUNTIME_BAR_WIDTH_CLASSES = [
  'w-[0%]', 'w-[1%]', 'w-[2%]', 'w-[3%]', 'w-[4%]', 'w-[5%]', 'w-[6%]', 'w-[7%]', 'w-[8%]', 'w-[9%]',
  'w-[10%]', 'w-[11%]', 'w-[12%]', 'w-[13%]', 'w-[14%]', 'w-[15%]', 'w-[16%]', 'w-[17%]', 'w-[18%]', 'w-[19%]',
  'w-[20%]', 'w-[21%]', 'w-[22%]', 'w-[23%]', 'w-[24%]', 'w-[25%]', 'w-[26%]', 'w-[27%]', 'w-[28%]', 'w-[29%]',
  'w-[30%]', 'w-[31%]', 'w-[32%]', 'w-[33%]', 'w-[34%]', 'w-[35%]', 'w-[36%]', 'w-[37%]', 'w-[38%]', 'w-[39%]',
  'w-[40%]', 'w-[41%]', 'w-[42%]', 'w-[43%]', 'w-[44%]', 'w-[45%]', 'w-[46%]', 'w-[47%]', 'w-[48%]', 'w-[49%]',
  'w-[50%]', 'w-[51%]', 'w-[52%]', 'w-[53%]', 'w-[54%]', 'w-[55%]', 'w-[56%]', 'w-[57%]', 'w-[58%]', 'w-[59%]',
  'w-[60%]', 'w-[61%]', 'w-[62%]', 'w-[63%]', 'w-[64%]', 'w-[65%]', 'w-[66%]', 'w-[67%]', 'w-[68%]', 'w-[69%]',
  'w-[70%]', 'w-[71%]', 'w-[72%]', 'w-[73%]', 'w-[74%]', 'w-[75%]', 'w-[76%]', 'w-[77%]', 'w-[78%]', 'w-[79%]',
  'w-[80%]', 'w-[81%]', 'w-[82%]', 'w-[83%]', 'w-[84%]', 'w-[85%]', 'w-[86%]', 'w-[87%]', 'w-[88%]', 'w-[89%]',
  'w-[90%]', 'w-[91%]', 'w-[92%]', 'w-[93%]', 'w-[94%]', 'w-[95%]', 'w-[96%]', 'w-[97%]', 'w-[98%]', 'w-[99%]',
  'w-[100%]',
] as const

export function getRuntimeBarWidthClass(progress: number, target: number): string {
  const ratio = Math.max(0, Math.min(1, progress))
  const pct = Math.min(100, Math.max(0, Math.round(ratio * target)))
  return RUNTIME_BAR_WIDTH_CLASSES[pct] ?? 'w-[0%]'
}

/**
 * 动画播完终态后的停留时长（ms）：随后 elapsed 归零循环重播，避免戛然而止。
 */
export const RUNTIME_LOOP_HOLD_MS = 1200

/**
 * 依时间推进的分段动画计时器（SSR 安全）：
 * elapsed 从 0 推进到 totalMs，终态停留 RUNTIME_LOOP_HOLD_MS 后归零循环重播；
 * 面板按 elapsed 阈值呈现阶段状态，restart 用于立即从第一阶段重播，组件卸载时自动清理 rAF。
 */
export function useRuntimeTimeline(totalMs: number) {
  const elapsed = ref(0)
  const finished = ref(false)

  let rafId: number | null = null
  let startedAt: number | null = null

  const cycleMs = totalMs + RUNTIME_LOOP_HOLD_MS

  function frame(now: number) {
    if (startedAt === null) {
      startedAt = now
    }

    const phase = (now - startedAt) % cycleMs
    const value = Math.min(phase, totalMs)
    elapsed.value = value
    finished.value = value >= totalMs
    rafId = requestAnimationFrame(frame)
  }

  function restart() {
    if (!import.meta.client) {
      return
    }
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
    }
    startedAt = null
    elapsed.value = 0
    finished.value = false
    rafId = requestAnimationFrame(frame)
  }

  onMounted(restart)

  onBeforeUnmount(() => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
    }
  })

  return { elapsed, finished, restart }
}

/**
 * 依次激活的阶段数：elapsed 到达 startMs 后每 intervalMs 完成一个，最多 count 个。
 */
export function stageCount(elapsedMs: number, startMs: number, intervalMs: number, count: number): number {
  if (elapsedMs < startMs) {
    return 0
  }
  return Math.min(count, Math.floor((elapsedMs - startMs) / intervalMs) + 1)
}
