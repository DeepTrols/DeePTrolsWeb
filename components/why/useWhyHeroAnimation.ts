import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

const CENTER_X = 280
const CENTER_Y = 240
const ORBIT_RADIUS = 150
const INNER_RADIUS = 68
const SPOKE_START_OFFSET = 28
const ROTATE_DURATION_MS = 800
const SETTLE_DELAY_MS = 200
const MESSAGE_DURATION_MS = 900
const HOLD_DURATION_MS = 400
const START_DELAY_MS = 400
const INITIAL_ROTATION_DEG = 270
const ROTATION_STEP_DEG = 90
// 原组件 zt * 0.6 / j = 50 * 0.6 / 150 = 0.2，即粒子在「中心向节点 20%」处换向
const PARTICLE_CENTER_RATIO = (50 * 0.6) / ORBIT_RADIUS

export type WhyHeroPhase = 'settling' | 'rotating' | 'message' | 'holding'

export interface WhyHeroParticle {
  x: number
  y: number
  opacity: number
  color: string
  r: number
}

// 四个节点按 90° 均布（原组件为 3 节点 [-90, 30, 150]）
const BASE_ANGLES = [-90, 0, 90, 180]

// 每个节点依次作为源，向环上相邻的两个节点发送粒子（原组件 3 节点为全量互发）
const FLOW_STEPS: { from: number; to: number[] }[] = [
  { from: 0, to: [1, 3] },
  { from: 3, to: [0, 2] },
  { from: 2, to: [1, 3] },
  { from: 1, to: [0, 2] },
]

function lerp(from: number, to: number, ratio: number) {
  return from + (to - from) * ratio
}

function easeInOutCubic(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - (-2 * value + 2) ** 3 / 2
}

export function useWhyHeroAnimation(nodeColors: readonly string[]) {
  const phase = ref<WhyHeroPhase>('settling')
  const rotation = ref(INITIAL_ROTATION_DEG)
  const step = ref(0)
  const progress = ref(0)
  const particles: WhyHeroParticle[] = [
    reactive({ x: 0, y: 0, opacity: 0, color: nodeColors[0] ?? '#8b5cf6', r: 3 }),
    reactive({ x: 0, y: 0, opacity: 0, color: nodeColors[0] ?? '#8b5cf6', r: 3 }),
  ]
  const timeouts: ReturnType<typeof setTimeout>[] = []
  let frame = 0

  const currentFlow = computed(() => FLOW_STEPS[step.value % FLOW_STEPS.length] ?? { from: 0, to: [1, 3] })
  const sourceIndex = computed(() => currentFlow.value.from)
  const targetIndexes = computed(() => currentFlow.value.to)

  function pointAt(baseAngle: number, radius: number): [number, number] {
    const angle = ((baseAngle + rotation.value) * Math.PI) / 180
    return [
      Number((CENTER_X + radius * Math.cos(angle)).toFixed(1)),
      Number((CENTER_Y + radius * Math.sin(angle)).toFixed(1)),
    ]
  }

  const nodePositions = computed(() => BASE_ANGLES.map((angle) => pointAt(angle, ORBIT_RADIUS)))

  const arcGradientCoords = computed(() =>
    nodePositions.value.map((position, index) => {
      const next = nodePositions.value[(index + 1) % nodePositions.value.length] ?? position
      return [...position, ...next]
    }),
  )

  const arcPaths = computed(() =>
    BASE_ANGLES.map((angle, index) => {
      const nextAngle = BASE_ANGLES[(index + 1) % BASE_ANGLES.length] ?? angle
      const [x1, y1] = pointAt(angle, ORBIT_RADIUS)
      const [x2, y2] = pointAt(nextAngle <= angle ? nextAngle + 360 : nextAngle, ORBIT_RADIUS)
      return `M ${x1} ${y1} A ${ORBIT_RADIUS} ${ORBIT_RADIUS} 0 0 1 ${x2} ${y2}`
    }),
  )

  const spokePaths = computed(() =>
    nodePositions.value.map(([x, y]) => {
      const dx = CENTER_X - x
      const dy = CENTER_Y - y
      const distance = Math.hypot(dx, dy)
      const startRatio = SPOKE_START_OFFSET / distance
      const endRatio = 1 - INNER_RADIUS / distance
      return `M ${(x + dx * startRatio).toFixed(1)} ${(y + dy * startRatio).toFixed(1)} L ${(x + dx * endRatio).toFixed(1)} ${(y + dy * endRatio).toFixed(1)}`
    }),
  )

  function isNodeGlowing(index: number) {
    const isSource = index === sourceIndex.value
    const isTarget = targetIndexes.value.includes(index)
    return (
      (isSource && phase.value === 'message' && progress.value < 0.5) ||
      (isTarget && ((phase.value === 'message' && progress.value > 0.88) || phase.value === 'holding'))
    )
  }

  function updateParticles(value: number) {
    const flow = currentFlow.value
    const [sourceX, sourceY] = pointAt(BASE_ANGLES[flow.from] ?? 0, ORBIT_RADIUS)
    const sourceColor = nodeColors[flow.from] ?? '#8b5cf6'
    progress.value = value
    flow.to.forEach((targetIndex, particleIndex) => {
      const particle = particles[particleIndex]
      if (!particle) return
      const [targetX, targetY] = pointAt(BASE_ANGLES[targetIndex] ?? 0, ORBIT_RADIUS)
      const targetColor = nodeColors[targetIndex] ?? '#8b5cf6'
      const sourceSideX = CENTER_X - (CENTER_X - sourceX) * PARTICLE_CENTER_RATIO
      const sourceSideY = CENTER_Y - (CENTER_Y - sourceY) * PARTICLE_CENTER_RATIO
      const targetSideX = CENTER_X + (targetX - CENTER_X) * PARTICLE_CENTER_RATIO
      const targetSideY = CENTER_Y + (targetY - CENTER_Y) * PARTICLE_CENTER_RATIO
      if (value < 0.04) {
        particle.x = sourceX
        particle.y = sourceY
        particle.opacity = value / 0.04
        particle.color = sourceColor
        particle.r = 3
      } else if (value < 0.47) {
        const ratio = (value - 0.04) / 0.43
        particle.x = lerp(sourceX, sourceSideX, ratio)
        particle.y = lerp(sourceY, sourceSideY, ratio)
        particle.opacity = 1
        particle.color = sourceColor
        particle.r = lerp(3, 4, ratio)
      } else if (value < 0.49) {
        particle.x = sourceSideX
        particle.y = sourceSideY
        particle.opacity = 1
        particle.color = sourceColor
        particle.r = 4
      } else if (value < 0.96) {
        const ratio = (value - 0.49) / 0.47
        particle.x = lerp(targetSideX, targetX, ratio)
        particle.y = lerp(targetSideY, targetY, ratio)
        particle.opacity = 1
        particle.color = targetColor
        particle.r = lerp(4, 3, ratio)
      } else {
        const ratio = (value - 0.96) / 0.04
        particle.x = targetX
        particle.y = targetY
        particle.opacity = 1 - ratio
        particle.color = targetColor
        particle.r = 3
      }
    })
  }

  function schedule(callback: () => void, delay: number) {
    timeouts.push(setTimeout(callback, delay))
  }

  function startMessage() {
    phase.value = 'message'
    progress.value = 0
    particles.forEach((particle) => {
      particle.opacity = 0
    })
    const startedAt = performance.now()
    function tick(now: number) {
      const value = Math.min((now - startedAt) / MESSAGE_DURATION_MS, 1)
      updateParticles(value)
      if (value < 1) {
        frame = requestAnimationFrame(tick)
        return
      }
      phase.value = 'holding'
      schedule(() => {
        particles.forEach((particle) => {
          particle.opacity = 0
        })
        progress.value = 0
        step.value = (step.value + 1) % FLOW_STEPS.length
        rotateRing()
      }, HOLD_DURATION_MS)
    }
    frame = requestAnimationFrame(tick)
  }

  function rotateRing() {
    phase.value = 'rotating'
    const startRotation = rotation.value
    const startedAt = performance.now()
    function tick(now: number) {
      const value = Math.min((now - startedAt) / ROTATE_DURATION_MS, 1)
      rotation.value = startRotation + ROTATION_STEP_DEG * easeInOutCubic(value)
      if (value < 1) {
        frame = requestAnimationFrame(tick)
        return
      }
      phase.value = 'settling'
      schedule(startMessage, SETTLE_DELAY_MS)
    }
    frame = requestAnimationFrame(tick)
  }

  onMounted(() => {
    schedule(startMessage, START_DELAY_MS)
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    timeouts.forEach((id) => clearTimeout(id))
  })

  return {
    particles,
    nodePositions,
    arcGradientCoords,
    arcPaths,
    spokePaths,
    isNodeGlowing,
  }
}
