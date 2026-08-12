import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  dmsHeroDisposalSteps,
  dmsHeroIntakeSteps,
  dmsHeroRiskRules,
  dmsHeroTabs,
} from '~/data/dms'

export type DmsHeroStageId = 'intake' | 'risk' | 'disposal'

export const STAGE_DURATION_MS = 5000
export const INTAKE_STEP_INTERVAL_MS = 800
export const RISK_SCAN_START_MS = 700
export const RISK_SCAN_INTERVAL_MS = 500
export const DISPOSAL_STEP_START_MS = 900
export const DISPOSAL_STEP_INTERVAL_MS = 800
export const DISPOSAL_DONE_DELAY_MS = 4100

const RISK_RULE_INDEX = dmsHeroRiskRules.findIndex((rule) => rule.risk)

export const PROGRESS_WIDTH_CLASSES = [
  'w-[0%]',
  'w-[4%]',
  'w-[8%]',
  'w-[12%]',
  'w-[16%]',
  'w-[20%]',
  'w-[24%]',
  'w-[28%]',
  'w-[32%]',
  'w-[36%]',
  'w-[40%]',
  'w-[44%]',
  'w-[48%]',
  'w-[52%]',
  'w-[56%]',
  'w-[60%]',
  'w-[64%]',
  'w-[68%]',
  'w-[72%]',
  'w-[76%]',
  'w-[80%]',
  'w-[84%]',
  'w-[88%]',
  'w-[92%]',
  'w-[96%]',
  'w-[100%]',
] as const

export function getProgressWidthClass(stageIndex: number, activeStage: number, progress: number): string {
  if (stageIndex < activeStage) {
    return PROGRESS_WIDTH_CLASSES[PROGRESS_WIDTH_CLASSES.length - 1] ?? 'w-[100%]'
  }
  if (stageIndex > activeStage) {
    return PROGRESS_WIDTH_CLASSES[0] ?? 'w-[0%]'
  }
  const step = Math.min(
    Math.round(progress * (PROGRESS_WIDTH_CLASSES.length - 1)),
    PROGRESS_WIDTH_CLASSES.length - 1,
  )
  return PROGRESS_WIDTH_CLASSES[step] ?? 'w-[0%]'
}

export function useDmsHeroAnimation() {
  const activeStage = ref(0)
  const progress = ref(0)
  const skipTransition = ref(false)

  const intakeDoneSteps = ref(0)
  const scannedRules = ref(0)
  const disposalDoneSteps = ref(0)
  const disposalComplete = ref(false)

  const riskFound = computed(() => scannedRules.value > RISK_RULE_INDEX)

  let rafId: number | null = null
  let startedAt: number | null = null
  const timeouts: ReturnType<typeof setTimeout>[] = []

  function schedule(handler: () => void, delay: number) {
    timeouts.push(setTimeout(handler, delay))
  }

  function clearTimeouts() {
    for (const timer of timeouts) {
      clearTimeout(timer)
    }
    timeouts.length = 0
  }

  function resetStageState() {
    intakeDoneSteps.value = 0
    scannedRules.value = 0
    disposalDoneSteps.value = 0
    disposalComplete.value = false
    clearTimeouts()
  }

  function frame(now: number) {
    if (startedAt === null) {
      startedAt = now
    }

    const next = Math.min((now - startedAt) / STAGE_DURATION_MS, 1)
    progress.value = next

    if (next < 1) {
      rafId = requestAnimationFrame(frame)
      return
    }

    advanceStage((activeStage.value + 1) % dmsHeroTabs.length)
  }

  function advanceStage(stage: number) {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }

    skipTransition.value = true
    activeStage.value = stage
    resetStageState()
    progress.value = 0
    startedAt = null

    requestAnimationFrame(() => {
      skipTransition.value = false
      rafId = requestAnimationFrame(frame)
    })
  }

  function switchStage(stage: number) {
    if (stage === activeStage.value) {
      return
    }
    advanceStage(stage)
  }

  watch(
    activeStage,
    (stage) => {
      if (!import.meta.client || dmsHeroTabs[stage]?.id !== 'intake') {
        return
      }
      dmsHeroIntakeSteps.forEach((_, index) => {
        schedule(() => {
          intakeDoneSteps.value = index + 1
        }, INTAKE_STEP_INTERVAL_MS * (index + 1))
      })
    },
    { immediate: true },
  )

  watch(
    activeStage,
    (stage) => {
      if (!import.meta.client || dmsHeroTabs[stage]?.id !== 'risk') {
        return
      }
      dmsHeroRiskRules.forEach((_, index) => {
        schedule(() => {
          scannedRules.value = index + 1
        }, RISK_SCAN_START_MS + RISK_SCAN_INTERVAL_MS * index)
      })
    },
    { immediate: true },
  )

  watch(
    activeStage,
    (stage) => {
      if (!import.meta.client || dmsHeroTabs[stage]?.id !== 'disposal') {
        return
      }
      dmsHeroDisposalSteps.forEach((_, index) => {
        schedule(() => {
          disposalDoneSteps.value = index + 1
        }, DISPOSAL_STEP_START_MS + DISPOSAL_STEP_INTERVAL_MS * index)
      })
      schedule(() => {
        disposalComplete.value = true
      }, DISPOSAL_DONE_DELAY_MS)
    },
    { immediate: true },
  )

  onMounted(() => {
    rafId = requestAnimationFrame(frame)
  })

  onBeforeUnmount(() => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
    }
    clearTimeouts()
  })

  return {
    activeStage,
    progress,
    skipTransition,
    intakeDoneSteps,
    scannedRules,
    riskFound,
    disposalDoneSteps,
    disposalComplete,
    switchStage,
  }
}
