export const GR_ACTION_MS = 1000
export const GR_DOT_A_END_MS = 1600
export const GR_CHECK_START_MS = 1600
export const GR_CHECK_INTERVAL_MS = 700
export const GR_CHECK_DONE_MS = 4400
export const GR_RISK_MS = 4400
export const GR_DOT_B_END_MS = 5000
export const GR_APPROVAL_MS = 5000
export const GR_APPROVED_MS = 6200
export const GR_EXEC_MS = 6400
export const GR_EXEC_DONE_MS = 7400
export const GR_DONE_MS = 8400
export const GR_TOTAL_MS = 10000

export function grProgress(elapsed: number, start: number, end: number): number {
  return Math.max(0, Math.min(1, (elapsed - start) / (end - start)))
}

export type GrCheckState = 'pending' | 'active' | 'passed'

export function grCheckState(elapsed: number, index: number): GrCheckState {
  const start = GR_CHECK_START_MS + index * GR_CHECK_INTERVAL_MS
  if (elapsed >= start + GR_CHECK_INTERVAL_MS) {
    return 'passed'
  }
  if (elapsed >= start) {
    return 'active'
  }
  return 'pending'
}
